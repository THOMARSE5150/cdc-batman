import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { format, subDays } from "date-fns";
import { 
  AlertCircle, 
  Clock, 
  Download, 
  Mail, 
  Phone, 
  RefreshCw, 
  Search, 
  User, 
  XCircle, 
  LogOut, 
  LogIn, 
  MessageSquare, 
  Calendar,
  Filter, 
  ShieldCheck,
  MailCheck,
  Inbox,
  SlidersHorizontal
} from "lucide-react";

// Define the Contact type based on our schema
interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

export default function AdminContacts() {
  const [adminToken, setAdminToken] = useState<string>(localStorage.getItem("adminToken") || "");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem("adminToken"));
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [timeFilter, setTimeFilter] = useState<string>("all");
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Fetch contacts data if authenticated
  const { data: contacts, isLoading, isError, error, refetch } = useQuery<Contact[]>({
    queryKey: ["/api/admin/contacts", adminToken],
    queryFn: async () => {
      if (!adminToken) return [];
      return await apiRequest("GET", "/api/admin/contacts", null, {
        headers: {
          Authorization: `Bearer ${adminToken}`
        }
      });
    },
    enabled: isAuthenticated,
    refetchInterval: 30000 // Refetch every 30 seconds to keep data fresh
  });

  const handleLogin = () => {
    localStorage.setItem("adminToken", adminToken);
    setIsAuthenticated(true);
    refetch();
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setAdminToken("");
    setIsAuthenticated(false);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setTimeout(() => setIsRefreshing(false), 500); // Keep loading animation visible for at least 500ms
  };

  // Format the date for display
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "PPP 'at' p");
    } catch (e) {
      return "Date unavailable";
    }
  };

  // Filter contacts by search term and time period
  const getFilteredContacts = () => {
    if (!contacts) return [];
    
    let filtered = [...contacts];
    
    // Apply search filter if search term exists
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(contact => 
        `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(term) || 
        contact.firstName.toLowerCase().includes(term) ||
        contact.lastName.toLowerCase().includes(term) ||
        contact.email.toLowerCase().includes(term) || 
        contact.phone.toLowerCase().includes(term) || 
        contact.message.toLowerCase().includes(term)
      );
    }
    
    // Apply time filter
    if (timeFilter !== 'all') {
      const now = new Date();
      let cutoffDate;
      
      switch (timeFilter) {
        case 'today':
          cutoffDate = new Date(now.setHours(0, 0, 0, 0));
          break;
        case 'week':
          cutoffDate = subDays(now, 7);
          break;
        case 'month':
          cutoffDate = subDays(now, 30);
          break;
        default:
          cutoffDate = new Date(0); // Beginning of time
      }
      
      filtered = filtered.filter(contact => new Date(contact.createdAt) >= cutoffDate);
    }
    
    return filtered;
  };

  // Export contacts to CSV
  const exportToCSV = () => {
    if (!contacts || contacts.length === 0) return;
    
    // Get filtered contacts
    const filteredContacts = getFilteredContacts();
    
    // Create CSV header row
    const headers = ['ID', 'First Name', 'Last Name', 'Email', 'Phone', 'Message', 'Date'];
    
    // Create CSV content
    const csvContent = [
      headers.join(','),
      ...filteredContacts.map(contact => [
        contact.id,
        `"${contact.firstName.replace(/"/g, '""')}"`, // Escape quotes in CSV
        `"${contact.lastName.replace(/"/g, '""')}"`, 
        `"${contact.email.replace(/"/g, '""')}"`,
        `"${contact.phone.replace(/"/g, '""')}"`,
        `"${contact.message.replace(/"/g, '""').replace(/\n/g, ' ')}"`,
        `"${formatDate(contact.createdAt)}"`
      ].join(','))
    ].join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `contacts-export-${format(new Date(), 'yyyy-MM-dd')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            {/* Decorative background elements */}
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-primary/10 rounded-full blur-[100px] opacity-80"></div>
            <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-[80px] opacity-70"></div>
            
            {/* Login card */}
            <Card className="backdrop-blur-sm bg-white/80 dark:bg-black/40 border border-gray-100/40 dark:border-gray-700/30 shadow-xl overflow-hidden relative">
              {/* Glass reflections */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-white/5 to-transparent rounded-full transform rotate-12 blur-sm"></div>
                <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-white/10 dark:from-white/5 to-transparent"></div>
              </div>
              
              <CardHeader className="relative border-b border-gray-100/50 dark:border-gray-800/50 pb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5 bg-primary/10 rounded-full backdrop-blur-sm shadow-inner">
                    <ShieldCheck className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Admin Portal</CardTitle>
                    <CardDescription className="text-sm opacity-80">Secure access to client messages</CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-8 relative">
                <div className="space-y-7">
                  <div className="space-y-4">
                    <div className="flex items-center mb-2">
                      <User className="h-4 w-4 text-primary mr-2" />
                      <label htmlFor="token" className="text-sm font-medium">Admin Access Token</label>
                    </div>
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-primary/5 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-1000"></div>
                      <div className="relative">
                        <Input
                          id="token"
                          type="password"
                          value={adminToken}
                          onChange={(e) => setAdminToken(e.target.value)}
                          placeholder="Enter your secure admin token"
                          className="pr-10 bg-white/80 dark:bg-gray-800/60 border-gray-100 dark:border-gray-700/50 focus:ring-2 focus:ring-primary/30 shadow-sm"
                          onKeyDown={(e) => e.key === 'Enter' && adminToken && handleLogin()}
                        />
                        <LogIn className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/60" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="relative border-t border-gray-100/50 dark:border-gray-800/50 pt-6 pb-8">
                <Button 
                  className="w-full relative bg-primary hover:bg-primary/90 group overflow-hidden shadow-lg shadow-primary/20"
                  onClick={handleLogin}
                  disabled={!adminToken}
                >
                  <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-primary-dark/80 group-hover:translate-x-full"></span>
                  <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-primary/90 group-hover:translate-x-full"></span>
                  <span className="relative flex items-center justify-center">
                    <LogIn className="mr-2 h-4 w-4" />
                    <span>Access Dashboard</span>
                  </span>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      {/* Decorative background elements */}
      <div className="fixed top-0 right-0 -mt-16 -mr-16 w-96 h-96 bg-primary/5 rounded-full blur-[120px] opacity-60 z-0 pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 -mb-32 -ml-32 w-80 h-80 bg-primary/5 rounded-full blur-[100px] opacity-50 z-0 pointer-events-none"></div>
      
      <Card className="backdrop-blur-md bg-white/80 dark:bg-black/40 border border-gray-100/40 dark:border-gray-700/30 shadow-lg mb-8 relative z-10">
        <div className="relative overflow-hidden">
          {/* Glass reflections */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-white/10 dark:from-white/5 to-transparent"></div>
            <div className="absolute -top-1/3 -right-1/3 w-2/3 h-2/3 bg-gradient-to-br from-primary/5 to-transparent rounded-full transform rotate-12 blur-lg"></div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center p-6">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div className="p-3 bg-primary/10 rounded-full shadow-inner backdrop-blur-sm">
                <Inbox className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Contact Submissions</h1>
                <p className="text-text-secondary text-sm mt-1">Track and respond to client enquiries</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="flex items-center gap-2 border-primary/50 text-primary hover:bg-primary/10 transition-all backdrop-blur-sm"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {isLoading ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12 bg-white/90 dark:bg-black/50 backdrop-blur-sm rounded-xl shadow-md"
        >
          <div className="animate-spin w-8 h-8 border-3 border-primary border-opacity-30 border-t-primary rounded-full mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading contact submissions...</p>
        </motion.div>
      ) : isError ? (
        <Alert variant="destructive" className="mb-6 border-0 shadow-md">
          <AlertCircle className="h-5 w-5" />
          <AlertDescription className="ml-2">
            {error instanceof Error ? error.message : "Failed to load contacts. Please check your token and try again."}
          </AlertDescription>
        </Alert>
      ) : (
        <>
          {/* Filter controls */}
          <Card className="backdrop-blur-md bg-white/80 dark:bg-black/40 border border-gray-100/40 dark:border-gray-700/30 shadow-md overflow-hidden mb-6 relative z-10">
            <div className="relative">
              {/* Glass reflections */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-white/10 dark:from-white/5 to-transparent"></div>
                <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-primary/5 to-transparent rounded-full transform rotate-12 blur-lg"></div>
              </div>
              
              <div className="p-5 relative">
                <div className="flex items-center gap-3 mb-5 text-text-primary">
                  <div className="p-2 bg-primary/10 rounded-full shadow-inner backdrop-blur-sm">
                    <Filter className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-medium text-lg">Search & Filter</h3>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 relative">
                  <div className="relative flex-1 group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-1000"></div>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 h-6 w-6 flex items-center justify-center rounded-full bg-primary/10">
                        <Search className="h-3 w-3 text-primary" />
                      </div>
                      <Input
                        placeholder="Search by name, email, phone, or message content..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-white/80 dark:bg-gray-800/60 border-gray-100 dark:border-gray-700/50 rounded-lg focus:ring-2 focus:ring-primary/30 shadow-sm h-10"
                      />
                      {searchTerm && (
                        <button 
                          className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground hover:text-gray-900 bg-gray-200/70 dark:bg-gray-700/70 rounded-full flex items-center justify-center transition-colors"
                          onClick={() => setSearchTerm("")}
                          aria-label="Clear search"
                        >
                          <XCircle className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div className="w-full sm:w-52 group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-1000"></div>
                    <div className="relative">
                      <Select value={timeFilter} onValueChange={setTimeFilter}>
                        <SelectTrigger className="bg-white/80 dark:bg-gray-800/60 border-gray-100 dark:border-gray-700/50 focus:ring-2 focus:ring-primary/30 shadow-sm h-10">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-primary/70" />
                            <SelectValue placeholder="Filter by time" />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All time</SelectItem>
                          <SelectItem value="today">Today</SelectItem>
                          <SelectItem value="week">Last 7 days</SelectItem>
                          <SelectItem value="month">Last 30 days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={handleRefresh} 
                      className={`bg-white/80 dark:bg-gray-800/60 border-gray-100 dark:border-gray-700/50 hover:bg-primary/5 shadow-sm h-10 w-10 ${isRefreshing ? "animate-spin" : ""}`}
                      title="Refresh"
                    >
                      <RefreshCw className="h-4 w-4 text-primary" />
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={exportToCSV} 
                      disabled={!contacts || contacts.length === 0}
                      title="Export to CSV"
                      className="flex items-center gap-2 bg-white/80 dark:bg-gray-800/60 border-gray-100 dark:border-gray-700/50 hover:bg-primary/5 shadow-sm h-10"
                    >
                      <Download className="h-4 w-4 text-primary" />
                      <span className="hidden sm:inline">Export</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          {/* Filter info */}
          <div className="flex flex-wrap gap-2 items-center mb-6">
            {searchTerm && (
              <Badge variant="outline" className="flex items-center gap-1">
                <span>Search: {searchTerm}</span>
                <button onClick={() => setSearchTerm("")} aria-label="Clear search">
                  <XCircle className="h-3 w-3 ml-1" />
                </button>
              </Badge>
            )}
            
            {timeFilter !== 'all' && (
              <Badge variant="outline" className="flex items-center gap-1">
                <span>Time: {timeFilter === 'today' ? 'Today' : timeFilter === 'week' ? 'Last 7 days' : 'Last 30 days'}</span>
                <button onClick={() => setTimeFilter("all")} aria-label="Clear time filter">
                  <XCircle className="h-3 w-3 ml-1" />
                </button>
              </Badge>
            )}
            
            {/* Display filtered count */}
            {contacts && (
              <div className="ml-auto text-sm text-text-secondary">
                Showing {getFilteredContacts().length} of {contacts.length} entries
              </div>
            )}
          </div>

          <AnimatePresence mode="wait">
            {contacts && contacts.length > 0 ? (
              getFilteredContacts().length > 0 ? (
                <div className="space-y-6">
                  {getFilteredContacts().map((contact, index) => (
                    <Card 
                      key={contact.id}
                      className="backdrop-blur-md bg-white/80 dark:bg-black/40 border border-gray-100/40 dark:border-gray-700/30 shadow-md overflow-hidden relative z-10 hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="relative">
                        {/* Glass reflections */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                          <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-white/10 dark:from-white/5 to-transparent"></div>
                          <div className="absolute -top-1/3 -right-1/3 w-2/3 h-2/3 bg-gradient-to-br from-primary/5 to-transparent rounded-full transform rotate-12 blur-lg"></div>
                        </div>
                        
                        <CardHeader className="pb-3 border-b border-gray-100/50 dark:border-gray-800/50">
                          <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                            <div className="flex items-start gap-4">
                              <div className="p-2.5 rounded-full bg-primary/10 shadow-inner backdrop-blur-sm flex items-center justify-center flex-shrink-0 mt-1">
                                <MessageSquare className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <CardTitle className="text-xl flex flex-wrap items-center gap-2">
                                  {contact.firstName} {contact.lastName}
                                  <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full font-normal ml-1 backdrop-blur-sm">
                                    ID: {contact.id}
                                  </span>
                                </CardTitle>
                                <div className="flex flex-col md:flex-row mt-2 gap-5">
                                  <div className="flex items-center text-sm text-text-secondary/80">
                                    <div className="p-1 rounded-full bg-primary/5 mr-2 shadow-inner">
                                      <Mail className="h-3.5 w-3.5 text-primary/70" />
                                    </div>
                                    <span>{contact.email}</span>
                                  </div>
                                  {contact.phone && (
                                    <div className="flex items-center text-sm text-text-secondary/80">
                                      <div className="p-1 rounded-full bg-primary/5 mr-2 shadow-inner">
                                        <Phone className="h-3.5 w-3.5 text-primary/70" />
                                      </div>
                                      <span>{contact.phone}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center mt-2 sm:mt-0 px-3 py-1.5 text-sm text-text-secondary bg-primary/10 backdrop-blur-sm rounded-full shadow-inner">
                              <Clock className="h-4 w-4 mr-2 text-primary/70" />
                              <span>{formatDate(contact.createdAt)}</span>
                            </div>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="pt-5">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="p-1 rounded-full bg-primary/10 mr-1 shadow-inner">
                              <MessageSquare className="h-3.5 w-3.5 text-primary" />
                            </div>
                            <h3 className="text-sm font-medium text-text-primary">Message Content</h3>
                          </div>
                          <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary/5 to-transparent rounded-lg blur opacity-75"></div>
                            <div className="relative bg-white/90 dark:bg-gray-800/60 p-5 rounded-lg border border-gray-100/50 dark:border-gray-700/30 whitespace-pre-wrap shadow-sm">
                              {contact.message}
                            </div>
                          </div>
                        </CardContent>
                        
                        <CardFooter className="border-t border-gray-100/50 dark:border-gray-800/50 py-4 flex justify-end">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="bg-white/70 dark:bg-gray-800/50 border-primary/30 text-primary hover:bg-primary/10 flex items-center gap-2 shadow-sm transition-all duration-300 hover:shadow"
                            onClick={() => {
                              window.location.href = `mailto:${contact.email}?subject=Re: Your message to Celia Dunsmore Counselling`;
                            }}
                          >
                            <MailCheck className="h-4 w-4 text-primary" />
                            <span>Reply via Email</span>
                          </Button>
                        </CardFooter>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-14 backdrop-blur-md bg-white/80 dark:bg-black/40 border border-gray-100/40 dark:border-gray-700/30 rounded-xl shadow-lg relative overflow-hidden">
                  {/* Glass reflections */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-white/15 dark:from-white/5 to-transparent"></div>
                    <div className="absolute -top-1/3 left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-primary/5 to-transparent rounded-full transform rotate-12 blur-xl"></div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="p-5 bg-primary/5 backdrop-blur-sm rounded-full mx-auto w-24 h-24 flex items-center justify-center mb-6 shadow-inner">
                      <Search className="h-12 w-12 text-primary opacity-60" />
                    </div>
                    <h3 className="text-2xl font-medium mb-3">No matching submissions</h3>
                    <p className="text-text-secondary mt-2 max-w-md mx-auto px-6">
                      Try adjusting your search terms or filters to find what you're looking for.
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-8 bg-white/70 dark:bg-gray-800/50 border-primary/30 text-primary hover:bg-primary/10 shadow-sm transition-all duration-300 hover:shadow"
                      onClick={() => {
                        setSearchTerm("");
                        setTimeFilter("all");
                      }}
                    >
                      <span className="relative px-2">Clear All Filters</span>
                    </Button>
                  </div>
                </div>
              )
            ) : (
              <div className="text-center py-14 backdrop-blur-md bg-white/80 dark:bg-black/40 border border-gray-100/40 dark:border-gray-700/30 rounded-xl shadow-lg relative overflow-hidden">
                {/* Glass reflections */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-white/15 dark:from-white/5 to-transparent"></div>
                  <div className="absolute -top-1/3 right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-primary/5 to-transparent rounded-full transform -rotate-12 blur-xl"></div>
                </div>
                
                <div className="relative z-10">
                  <div className="p-5 bg-primary/5 backdrop-blur-sm rounded-full mx-auto w-24 h-24 flex items-center justify-center mb-6 shadow-inner">
                    <Inbox className="h-12 w-12 text-primary opacity-60" />
                  </div>
                  <h3 className="text-2xl font-medium mb-3">No contact submissions yet</h3>
                  <p className="text-text-secondary mt-2 max-w-md mx-auto px-6">
                    When clients submit the contact form, their messages will appear here.
                  </p>
                </div>
              </div>
            )}
          </AnimatePresence>
        </>
      )}
    </motion.div>
  );
}