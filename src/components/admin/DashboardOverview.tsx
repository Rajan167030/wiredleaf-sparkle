import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MessageSquare, Users, Clock, TrendingUp, AlertCircle } from 'lucide-react';

interface Stats {
  totalConsultations: number;
  pendingConsultations: number;
  totalMeetings: number;
  todayMeetings: number;
  totalUsers: number;
}

export function DashboardOverview() {
  const [stats, setStats] = useState<Stats>({
    totalConsultations: 0,
    pendingConsultations: 0,
    totalMeetings: 0,
    todayMeetings: 0,
    totalUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch consultations stats
      const { data: consultations } = await supabase
        .from('consultations')
        .select('status');

      // Fetch meetings stats
      const { data: meetings } = await supabase
        .from('meetings')
        .select('start_time, status');

      // Fetch users stats (profiles)
      const { data: users } = await supabase
        .from('profiles')
        .select('id');

      const today = new Date().toISOString().split('T')[0];
      const todayMeetings = meetings?.filter(meeting => 
        meeting.start_time.startsWith(today)
      ).length || 0;

      setStats({
        totalConsultations: consultations?.length || 0,
        pendingConsultations: consultations?.filter(c => c.status === 'pending').length || 0,
        totalMeetings: meetings?.length || 0,
        todayMeetings,
        totalUsers: users?.length || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Consultations',
      value: stats.totalConsultations,
      description: `${stats.pendingConsultations} pending review`,
      icon: MessageSquare,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Total Meetings',
      value: stats.totalMeetings,
      description: `${stats.todayMeetings} scheduled today`,
      icon: Calendar,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'Registered Users',
      value: stats.totalUsers,
      description: 'Active user profiles',
      icon: Users,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      title: 'Pending Actions',
      value: stats.pendingConsultations,
      description: 'Require immediate attention',
      icon: AlertCircle,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
    },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="glass-card">
              <CardContent className="p-6">
                <div className="animate-pulse space-y-3">
                  <div className="h-4 bg-primary/20 rounded w-3/4"></div>
                  <div className="h-8 bg-primary/20 rounded w-1/2"></div>
                  <div className="h-3 bg-primary/20 rounded w-full"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-2">
            Manage your consultations, meetings, and users efficiently
          </p>
        </div>
        <Badge variant="outline" className="neon-border">
          <Clock className="h-3 w-3 mr-1" />
          Live Data
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card, index) => (
          <Card key={card.title} className="glass-card hover:neon-glow transition-all duration-300 tilt-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${card.bgColor}`}>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold gradient-text mb-1">
                {card.value}
              </div>
              <p className="text-xs text-muted-foreground">
                {card.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Quick Actions
            </CardTitle>
            <CardDescription>
              Most common administrative tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors cursor-pointer">
              <span className="text-sm">Review Pending Consultations</span>
              <Badge variant="secondary">{stats.pendingConsultations}</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors cursor-pointer">
              <span className="text-sm">Schedule New Meetings</span>
              <Badge variant="outline">+</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors cursor-pointer">
              <span className="text-sm">Today's Meetings</span>
              <Badge variant="secondary">{stats.todayMeetings}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest system updates and changes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
              <div className="flex-1">
                <p className="text-sm">New consultation request received</p>
                <p className="text-xs text-muted-foreground">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
              <div className="flex-1">
                <p className="text-sm">Meeting scheduled successfully</p>
                <p className="text-xs text-muted-foreground">15 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2"></div>
              <div className="flex-1">
                <p className="text-sm">User profile updated</p>
                <p className="text-xs text-muted-foreground">1 hour ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}