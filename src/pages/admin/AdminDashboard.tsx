import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { DashboardOverview } from '@/components/admin/DashboardOverview';
import { ConsultationsManager } from '@/components/admin/ConsultationsManager';
import { MeetingsManager } from '@/components/admin/MeetingsManager';
import { UsersManager } from '@/components/admin/UsersManager';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { useToast } from '@/hooks/use-toast';

export default function AdminDashboard() {
  const [currentView, setCurrentView] = useState('overview');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate('/admin/login');
        return;
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Auth check error:', error);
      navigate('/admin/login');
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged Out",
        description: "Successfully logged out from admin dashboard",
      });
      navigate('/admin/login');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to logout",
        variant: "destructive",
      });
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'overview':
        return <DashboardOverview />;
      case 'consultations':
        return <ConsultationsManager />;
      case 'meetings':
        return <MeetingsManager />;
      case 'users':
        return <UsersManager />;
      default:
        return <DashboardOverview />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="glass-card p-8">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-primary/20 rounded w-48"></div>
            <div className="h-4 bg-primary/20 rounded w-32"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex bg-background">
        <AdminSidebar 
          currentView={currentView} 
          onViewChange={setCurrentView} 
        />
        
        <div className="flex-1 flex flex-col">
          <AdminHeader onLogout={handleLogout} />
          
          <main className="flex-1 p-6 overflow-auto">
            {renderCurrentView()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}