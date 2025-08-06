import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { 
  Search, 
  Users,
  Mail,
  Phone,
  Calendar,
  Eye,
  MoreHorizontal
} from 'lucide-react';
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface UserProfile {
  id: string;
  user_id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
}

interface UserStats {
  consultations_count: number;
  meetings_count: number;
  last_consultation: string | null;
}

export function UsersManager() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [userStats, setUserStats] = useState<Record<string, UserStats>>({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Fetch user profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      setUsers(profiles || []);

      // Fetch user statistics
      if (profiles && profiles.length > 0) {
        const stats: Record<string, UserStats> = {};
        
        for (const profile of profiles) {
          // Count consultations
          const { data: consultations } = await supabase
            .from('consultations')
            .select('id, created_at')
            .eq('user_id', profile.user_id);

          // Count meetings through consultations
          const { data: meetings } = await supabase
            .from('meetings')
            .select('created_at, consultation_id')
            .in('consultation_id', consultations?.map(c => c.id) || []);

          stats[profile.user_id] = {
            consultations_count: consultations?.length || 0,
            meetings_count: meetings?.length || 0,
            last_consultation: consultations?.[0]?.created_at || null,
          };
        }
        
        setUserStats(stats);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user =>
    user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
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
          <h1 className="text-3xl font-bold gradient-text">Users Manager</h1>
          <p className="text-muted-foreground mt-2">
            Manage registered users and their activities
          </p>
        </div>
        <Badge variant="outline" className="neon-border">
          {filteredUsers.length} Users
        </Badge>
      </div>

      {/* Search */}
      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="glass-input pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>
            View and manage registered user accounts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Contact Info</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => {
                const stats = userStats[user.user_id] || { consultations_count: 0, meetings_count: 0, last_consultation: null };
                
                return (
                  <TableRow key={user.id} className="hover:bg-muted/20">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {getInitials(user.full_name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">
                            {user.full_name || 'No name provided'}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            ID: {user.user_id.substring(0, 8)}...
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {user.email && (
                          <div className="flex items-center gap-1 text-sm">
                            <Mail className="h-3 w-3" />
                            {user.email}
                          </div>
                        )}
                        {user.phone && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            {user.phone}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex gap-2">
                          <Badge variant="outline" className="text-xs">
                            {stats.consultations_count} consultations
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {stats.meetings_count} meetings
                          </Badge>
                        </div>
                        {stats.last_consultation && (
                          <div className="text-xs text-muted-foreground">
                            Last activity: {format(new Date(stats.last_consultation), 'MMM dd, yyyy')}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {format(new Date(user.created_at), 'MMM dd, yyyy')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setSelectedUser(user)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="glass-card max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5 text-primary" />
                                User Details
                              </DialogTitle>
                              <DialogDescription>
                                Complete user profile and activity information
                              </DialogDescription>
                            </DialogHeader>
                            {selectedUser && (
                              <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                  <Avatar className="h-16 w-16">
                                    <AvatarFallback className="bg-primary/10 text-primary text-xl">
                                      {getInitials(selectedUser.full_name)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <h3 className="text-xl font-semibold">
                                      {selectedUser.full_name || 'No name provided'}
                                    </h3>
                                    <p className="text-muted-foreground">
                                      User ID: {selectedUser.user_id}
                                    </p>
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                                    <p className="text-lg">{selectedUser.email || 'Not provided'}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-muted-foreground">Phone</label>
                                    <p className="text-lg">{selectedUser.phone || 'Not provided'}</p>
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-3 gap-4">
                                  <div>
                                    <label className="text-sm font-medium text-muted-foreground">Consultations</label>
                                    <p className="text-2xl font-bold text-primary">
                                      {userStats[selectedUser.user_id]?.consultations_count || 0}
                                    </p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-muted-foreground">Meetings</label>
                                    <p className="text-2xl font-bold text-green-500">
                                      {userStats[selectedUser.user_id]?.meetings_count || 0}
                                    </p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-muted-foreground">Status</label>
                                    <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                                      Active
                                    </Badge>
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                                  <div>
                                    <label className="text-sm font-medium text-muted-foreground">Joined</label>
                                    <p className="text-sm">{format(new Date(selectedUser.created_at), 'MMM dd, yyyy HH:mm')}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-muted-foreground">Last Updated</label>
                                    <p className="text-sm">{format(new Date(selectedUser.updated_at), 'MMM dd, yyyy HH:mm')}</p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="glass-card">
                            <DropdownMenuItem>View Consultations</DropdownMenuItem>
                            <DropdownMenuItem>View Meetings</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-500">
                              Suspend User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          
          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No users found</h3>
              <p className="text-muted-foreground">
                {searchTerm 
                  ? 'Try adjusting your search criteria'
                  : 'No users have registered yet'
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}