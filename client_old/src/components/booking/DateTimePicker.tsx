import { useState, useEffect, memo } from "react";
import Calendar from "react-calendar";
import { format, addDays, isSameDay } from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon, CheckCircleIcon, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface DateTimePickerProps {
  selectedDate: Date | null;
  selectedTime: string | null;
  onSelectDate: (date: Date) => void;
  onSelectTime: (time: string | null) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function DateTimePicker({ 
  selectedDate, 
  selectedTime, 
  onSelectDate, 
  onSelectTime, 
  onNext, 
  onBack 
}: DateTimePickerProps) {
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [calendarDate, setCalendarDate] = useState<Date>(selectedDate || new Date());
  
  const fetchAvailableSlots = async (date: Date) => {
    try {
      const formattedDate = format(date, 'yyyy-MM-dd');
      const response = await fetch(`/api/admin/availability?start=${formattedDate}&end=${formattedDate}`);
      const data = await response.json();
      
      if (data && data[0]?.availableSlots) {
        return data[0].availableSlots;
      }
      return [];
    } catch (error) {
      console.error('Error fetching availability:', error);
      return [];
    }
  };
  
  // Generate time slots for a day
  const generateTimeSlots = (date: Date): string[] => {
    // For now, return fixed time slots
    // In a real implementation, this would check the database or call fetchAvailableSlots
    
    // Get day of week (0 = Sunday, 1 = Monday, etc.)
    const dayOfWeek = date.getDay();
    
    // Default time slots
    const morningSlots = ['9:00 AM', '10:00 AM', '11:00 AM'];
    const afternoonSlots = ['1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];
    const eveningSlots = ['5:00 PM', '6:00 PM'];
    
    // Weekday schedule (Monday to Friday)
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      return [...morningSlots, ...afternoonSlots, ...eveningSlots];
    }
    
    // Saturday schedule (shorter day)
    if (dayOfWeek === 6) {
      return [...morningSlots, '1:00 PM', '2:00 PM']; 
    }
    
    // Sunday (no availability)
    return [];
  };
  
  // Update available times when selected date changes
  useEffect(() => {
    if (selectedDate) {
      const timeSlots = generateTimeSlots(new Date(selectedDate));
      setAvailableTimes(timeSlots);
    }
  }, [selectedDate]);
  
  // Handle date selection
  const handleDateChange = (value: any) => {
    const date = value as Date;
    onSelectDate(date);
    setCalendarDate(date);
    onSelectTime(null); // Reset time when date changes
    // No need to auto-advance after date selection since user still needs to select a time
  };
  
  // Handle time selection
  const handleTimeSelection = (time: string) => {
    onSelectTime(time);
    
    // Automatically move to next step when a time is selected
    // Short delay to allow the UI to update with the selected time
    setTimeout(() => {
      if (selectedDate) {
        onNext();
      }
    }, 500);
  };
  
  // Group time slots by period
  const timeSlotsByPeriod = {
    Morning: availableTimes.filter(time => time.includes('AM')),
    Afternoon: availableTimes.filter(time => time.includes('PM') && parseInt(time.split(':')[0]) < 5),
    Evening: availableTimes.filter(time => time.includes('PM') && parseInt(time.split(':')[0]) >= 5),
  };
  
  // Determine if we can proceed to next step
  const canProceed = selectedDate && selectedTime;
  
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2">
          <h3 className="text-lg font-medium text-text-primary mb-4">Select your preferred appointment date:</h3>
          
          <div className="calendar-container bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="text-center mb-4 text-xl font-medium">
              {format(calendarDate, 'MMMM yyyy')}
            </div>
            <Calendar
              onChange={handleDateChange}
              value={calendarDate}
              minDate={new Date()}
              maxDate={addDays(new Date(), 60)}
              tileDisabled={({ date }) => {
                // Disable dates that don't have availability
                // In a real app, this would be based on your business logic
                const dayOfWeek = date.getDay();
                return dayOfWeek === 0; // Disable Sundays
              }}
              tileClassName={({ date, view }) => {
                const classes = [];
                
                // Base styles for all dates
                if (view === 'month') {
                  classes.push('rounded-full w-10 h-10 mx-auto flex items-center justify-center');
                }
                
                // Highlight selected date
                if (selectedDate && isSameDay(date, new Date(selectedDate))) {
                  classes.push('bg-primary text-white font-medium');
                }
                
                // Show available dates
                const dayOfWeek = date.getDay();
                const isAvailable = dayOfWeek !== 0 && date >= new Date() && date <= addDays(new Date(), 60);
                if (isAvailable && !isSameDay(date, new Date(selectedDate || 0))) {
                  // Style for available dates (light green background)
                  const day = date.getDate();
                  const month = date.getMonth();
                  
                  // Add special highlighting to certain dates to show they're available
                  if ((day % 3 === 0 || day % 7 === 0) && month === new Date().getMonth()) {
                    classes.push('bg-primary/10 text-primary hover:bg-primary/20');
                  } 
                }
                
                return classes.join(' ');
              }}
              prevLabel={<ChevronLeftIcon className="h-5 w-5" />}
              nextLabel={<ChevronRightIcon className="h-5 w-5" />}
              className="rounded-lg"
            />
            
            <div className="mt-4 flex items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary/10"></div>
                <span>Available slots</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span>Selected date</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:w-1/2">
          {selectedDate ? (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-medium flex items-center gap-2 mb-5">
                <span>Available times for</span> 
                <span className="text-primary font-semibold">
                  {format(new Date(selectedDate), 'EEE, MMMM d')}
                </span>
              </h3>
              
              {Object.entries(timeSlotsByPeriod).map(([period, slots]) => (
                slots.length > 0 && (
                  <div key={period} className="mb-8">
                    <h4 className="text-lg text-gray-700 mb-3">{period}</h4>
                    <div className="grid grid-cols-3 gap-3">
                      {slots.map((time) => (
                        <motion.div
                          key={time}
                          onClick={() => handleTimeSelection(time)}
                          className={`
                            flex items-center justify-center p-3 rounded-lg border cursor-pointer
                            transition-all duration-200 relative
                            ${selectedTime === time
                              ? 'bg-primary text-white border-primary shadow-md'
                              : 'border-gray-200 hover:border-primary hover:shadow-sm'
                            }
                          `}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Clock className={`w-4 h-4 mr-2 ${selectedTime === time ? 'text-white' : 'text-primary'}`} />
                          <span>{time}</span>
                          
                          {/* Checkmark for selected time */}
                          {selectedTime === time && (
                            <motion.div 
                              className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white shadow-sm"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 500, damping: 15 }}
                            >
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                              </svg>
                            </motion.div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )
              ))}
              
              {availableTimes.length === 0 && (
                <div className="p-4 bg-gray-50 rounded-md text-center">
                  <p className="text-text-secondary">No available time slots for this date.</p>
                  <p className="text-text-secondary text-sm mt-1">Please select another date.</p>
                </div>
              )}
              
              {!selectedTime && availableTimes.length > 0 && (
                <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-lg text-amber-800 text-sm">
                  <p>Please select a time slot to continue</p>
                </div>
              )}
              
              {selectedTime && (
                <motion.div 
                  className="mt-6 p-4 bg-green-50 border border-green-100 rounded-lg text-green-800"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="font-medium mb-1">Your selection</h4>
                  <div className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2" />
                    <span>
                      {format(new Date(selectedDate), 'EEEE, MMMM d, yyyy')} at {selectedTime}
                    </span>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <Button
                      onClick={onNext}
                      className="bg-green-600 hover:bg-green-700 text-white px-6"
                    >
                      Continue with this time
                      <ChevronRightIcon className="h-5 w-5 ml-1" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-8 bg-white rounded-xl shadow-sm border border-gray-100">
              <p className="text-text-secondary text-center">
                Please select a date to view available time slots.
              </p>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8 flex justify-between">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="border-primary text-primary hover:bg-primary-light hover:text-white"
        >
          <ChevronLeftIcon className="h-5 w-5 mr-1" />
          Back to Services
        </Button>
        
        {!selectedTime && (
          <div className="text-sm text-gray-500 italic flex items-center">
            Please select a date and time to continue
          </div>
        )}
      </div>
    </div>
  );
}
