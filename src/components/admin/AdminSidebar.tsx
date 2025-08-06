import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { useState } from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  MessageSquare, 
  Users, 
  Settings,
  ChevronRight
} from 'lucide-react';

interface AdminSidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const menuItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'consultations', label: 'Consultations', icon: MessageSquare },
  { id: 'meetings', label: 'Meetings', icon: Calendar },
  { id: 'users', label: 'Users', icon: Users },
];

export function AdminSidebar({ currentView, onViewChange }: AdminSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sidebar className={`glass border-r border-glass-border ${collapsed ? 'w-14' : 'w-64'}`}>
      <SidebarContent className="p-4">
        <div className="flex items-center gap-3 mb-8">
          {!collapsed && (
            <>
              <div className="p-2 rounded-lg bg-primary/10 neon-border">
                <Settings className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold gradient-text">Admin Panel</h2>
                <p className="text-sm text-muted-foreground">WiredLeaf Management</p>
              </div>
            </>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground mb-4">
            {!collapsed && "Navigation"}
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    onClick={() => onViewChange(item.id)}
                    className={`
                      group w-full flex items-center gap-3 px-3 py-3 rounded-lg
                      transition-all duration-200 ripple
                      ${currentView === item.id 
                        ? 'bg-primary/10 text-primary neon-border' 
                        : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                      }
                    `}
                  >
                    <item.icon className={`h-5 w-5 ${currentView === item.id ? 'text-primary' : ''}`} />
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left">{item.label}</span>
                        {currentView === item.id && (
                          <ChevronRight className="h-4 w-4 text-primary" />
                        )}
                      </>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="absolute top-4 right-4">
          <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
        </div>
      </SidebarContent>
    </Sidebar>
  );
}