import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";

const personalDetailsSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters."),
  lastName: z.string().min(2, "Last name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(8, "Please enter a valid phone number."),
  address: z.string().optional(),
  haveReferral: z.boolean().default(false),
  referralDetails: z.string().optional(),
  additionalNotes: z.string().optional(),
});

export default function PersonalDetails({ personalDetails, onUpdateDetails, onNext, onBack }) {
  const [haveReferral, setHaveReferral] = useState(personalDetails?.haveReferral || false);
  
  const form = useForm({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: personalDetails || {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      haveReferral: false,
      referralDetails: "",
      additionalNotes: "",
    },
  });
  
  const onSubmit = (data) => {
    onUpdateDetails(data);
    onNext();
  };
  
  const handleReferralChange = (checked) => {
    setHaveReferral(checked);
    form.setValue("haveReferral", checked);
    if (!checked) {
      form.setValue("referralDetails", "");
    }
  };
  
  return (
    <div>
      <h2 className="text-2xl font-medium text-text-primary mb-6">Personal Details</h2>
      <p className="text-text-secondary mb-8">
        Please provide your contact information so we can confirm your appointment.
      </p>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your first name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Your email address" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Your address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="haveReferral"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between space-y-0 p-4 border rounded-md">
                  <div className="space-y-0.5">
                    <FormLabel>I have a Mental Health Care Plan or referral</FormLabel>
                    <FormDescription>
                      Medicare rebates are available with a valid Mental Health Care Plan
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked);
                        handleReferralChange(checked);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            {haveReferral && (
              <FormField
                control={form.control}
                name="referralDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Referral Details</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Please provide your GP's name and any relevant details about your referral"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            <FormField
              control={form.control}
              name="additionalNotes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Notes (optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Any specific concerns or information you would like to share before your appointment"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-between pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onBack}
                className="border-primary text-primary hover:bg-primary-light hover:text-white"
              >
                <ChevronLeftIcon className="h-5 w-5 mr-1" />
                Back
              </Button>
              
              <Button 
                type="submit"
                className="bg-primary hover:bg-primary-dark text-white"
              >
                Continue
                <ChevronRightIcon className="h-5 w-5 ml-1" />
              </Button>
            </div>
          </form>
        </Form>
      </motion.div>
    </div>
  );
}
