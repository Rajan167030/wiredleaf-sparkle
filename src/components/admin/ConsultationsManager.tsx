import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { 
  Search, 
  Filter, 
  Eye, 
  Calendar,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  User
} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { format } from 'date-fns';

interface Consultation {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string;
  message: string | null;
  preferred_date: string | null;
  preferred_time: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export function ConsultationsManager() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchConsultations();
  }, []);

  const fetchConsultations = async () => {
    try {
      const { data, error } = await supabase
        .from('consultations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setConsultations(data || []);
    } catch (error) {
      console.error('Error fetching consultations:', error);
      toast({
        title: "Error",
        description: "Failed to fetch consultations",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateConsultationStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('consultations')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;

      await fetchConsultations();
      toast({
        title: "Status Updated",
        description: `Consultation status changed to ${status}`,
      });
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Error",
        description: "Failed to update consultation status",
        variant: "destructive",
      });
    }
  };

  const filteredConsultations = consultations.filter(consultation => {
    const matchesSearch = consultation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         consultation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         consultation.service.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || consultation.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'approved': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'rejected': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'completed': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-12 bg-primary/20 rounded"></div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Consultations Manager</h1>
          <p className="text-muted-foreground mt-2">
            Manage and track all consultation requests
          </p>
        </div>
        <Badge variant="outline" className="neon-border">
          {filteredConsultations.length} Total
        </Badge>
      </div>

      {/* Filters */}
      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or service..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="glass-input pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48 glass-input">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="glass-card">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Consultations Table */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>All Consultations</CardTitle>
          <CardDescription>
            View and manage consultation requests from clients
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client Info</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Preferred Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredConsultations.map((consultation) => (
                <TableRow key={consultation.id} className="hover:bg-muted/20">
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{consultation.name}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {consultation.email}
                      </div>
                      {consultation.phone && (
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {consultation.phone}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{consultation.service}</Badge>
                  </TableCell>
                  <TableCell>
                    {consultation.preferred_date ? (
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-3 w-3" />
                        {format(new Date(consultation.preferred_date), 'MMM dd, yyyy')}
                        {consultation.preferred_time && (
                          <div className="flex items-center gap-1 ml-2">
                            <Clock className="h-3 w-3" />
                            {consultation.preferred_time}
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">Not specified</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={consultation.status}
                      onValueChange={(value) => updateConsultationStatus(consultation.id, value)}
                    >
                      <SelectTrigger className={`w-32 ${getStatusColor(consultation.status)}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="glass-card">
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-muted-foreground">
                      {format(new Date(consultation.created_at), 'MMM dd, yyyy')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedConsultation(consultation)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="glass-card max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <User className="h-5 w-5 text-primary" />
                            Consultation Details
                          </DialogTitle>
                          <DialogDescription>
                            Full details of the consultation request
                          </DialogDescription>
                        </DialogHeader>
                        {selectedConsultation && (
                          <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Name</label>
                                <p className="text-lg">{selectedConsultation.name}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Email</label>
                                <p className="text-lg">{selectedConsultation.email}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Phone</label>
                                <p className="text-lg">{selectedConsultation.phone || 'Not provided'}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Service</label>
                                <p className="text-lg">{selectedConsultation.service}</p>
                              </div>
                            </div>
                            
                            {selectedConsultation.message && (
                              <div>
                                <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                                  <MessageSquare className="h-3 w-3" />
                                  Message
                                </label>
                                <div className="mt-2 p-4 rounded-lg bg-muted/20">
                                  <p className="text-sm">{selectedConsultation.message}</p>
                                </div>
                              </div>
                            )}
                            
                            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Status</label>
                                <Badge className={`${getStatusColor(selectedConsultation.status)} mt-1`}>
                                  {selectedConsultation.status}
                                </Badge>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Created</label>
                                <p className="text-sm">{format(new Date(selectedConsultation.created_at), 'MMM dd, yyyy HH:mm')}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Updated</label>
                                <p className="text-sm">{format(new Date(selectedConsultation.updated_at), 'MMM dd, yyyy HH:mm')}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredConsultations.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No consultations found</h3>
              <p className="text-muted-foreground">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'No consultation requests have been submitted yet'
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}