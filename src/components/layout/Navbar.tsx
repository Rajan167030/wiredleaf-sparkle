import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X, Sparkles, UserCircle, LogOut } from 'lucide-react';
import { AuthDialog } from '@/components/auth/AuthDialog';
import { BookingForm } from '@/components/booking/BookingForm';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from '@/integrations/supabase/client';

const navItems = [
  { name: 'Home', href: '/', section: 'hero' },
  { name: 'About', href: '/about', section: 'about' },
  { name: 'Services', href: '/services', section: 'services' },
  { name: 'Contact', href: '/contact', section: 'contact' },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ email: string | null; name: string | null } | null>(null);
  const location = useLocation();

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsLoggedIn(true);
        // Get user profile data
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name, email')
          .eq('id', session.user.id)
          .single();
        
        setUser({
          email: session.user.email,
          name: profile?.full_name || session.user.email?.split('@')[0] || 'User'
        });
      }
    };

    checkSession();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setIsLoggedIn(true);
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name, email')
          .eq('id', session.user.id)
          .single();

        setUser({
          email: session.user.email,
          name: profile?.full_name || session.user.email?.split('@')[0] || 'User'
        });
      } else if (event === 'SIGNED_OUT') {
        setIsLoggedIn(false);
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    setIsBookingOpen(true);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setUser(null);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigation = (item: typeof navItems[0], e: React.MouseEvent) => {
    if (location.pathname === '/' && item.section) {
      e.preventDefault();
      scrollToSection(item.section);
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'glass backdrop-blur-xl border-b border-white/10'
            : 'bg-transparent'
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <Sparkles className="h-8 w-8 text-primary group-hover:animate-pulse transition-all duration-300" />
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/40 transition-all duration-300" />
              </div>
              <span className="text-xl font-space-grotesk font-bold gradient-text">
                WiredLeaf
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={(e) => handleNavigation(item, e)}
                  className={cn(
                    'relative px-4 py-2 text-sm font-medium transition-all duration-300 group',
                    location.pathname === item.href
                      ? 'text-primary'
                      : 'text-foreground/70 hover:text-primary'
                  )}
                >
                  <span className="relative z-10">{item.name}</span>
                  <div
                    className={cn(
                      'absolute inset-0 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-all duration-300',
                      location.pathname === item.href && 'opacity-100'
                    )}
                  />
                  <div
                    className={cn(
                      'absolute bottom-0 left-1/2 h-0.5 bg-gradient-primary transform -translate-x-1/2 transition-all duration-300',
                      location.pathname === item.href
                        ? 'w-full'
                        : 'w-0 group-hover:w-full'
                    )}
                  />
                </Link>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {isLoggedIn && user ? (
                <div className="flex items-center space-x-4">
                  <Button
                    onClick={() => setIsBookingOpen(true)}
                    className="ripple bg-gradient-primary hover:shadow-neon"
                  >
                    Book a Call
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="flex items-center space-x-2">
                        <UserCircle className="h-5 w-5" />
                        <span className="font-medium">{user.name}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={handleSignOut} className="text-red-500">
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => setIsAuthOpen(true)}
                    className="ripple"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => setIsAuthOpen(true)}
                    className="ripple bg-gradient-primary hover:shadow-neon"
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden ripple"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden"
            >
              <div className="glass-card mt-4 p-6 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      'block px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300',
                      location.pathname === item.href
                        ? 'text-primary bg-primary/10'
                        : 'text-foreground/70 hover:text-primary hover:bg-primary/5'
                    )}
                    onClick={(e) => handleNavigation(item, e)}
                  >
                    {item.name}
                  </Link>
                ))}

                {/* Mobile Auth Buttons */}
                <div className="mt-6 space-y-3">
                  {isLoggedIn && user ? (
                    <>
                      <div className="px-4 py-3 text-sm font-medium text-primary bg-primary/10 rounded-lg flex items-center">
                        <UserCircle className="h-5 w-5 mr-2" />
                        <span>{user.name}</span>
                      </div>
                      <Button
                        onClick={() => {
                          setIsBookingOpen(true);
                          setIsMenuOpen(false);
                        }}
                        className="w-full ripple bg-gradient-primary hover:shadow-neon"
                      >
                        Book a Call
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          handleSignOut();
                          setIsMenuOpen(false);
                        }}
                        className="w-full ripple text-red-500 border-red-500/30 hover:bg-red-500/10"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsAuthOpen(true);
                          setIsMenuOpen(false);
                        }}
                        className="w-full ripple neon-border"
                      >
                        Login
                      </Button>
                      <Button
                        onClick={() => {
                          setIsAuthOpen(true);
                          setIsMenuOpen(false);
                        }}
                        className="w-full ripple bg-gradient-primary hover:shadow-neon"
                      >
                        Sign Up
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Auth Dialog */}
      <AuthDialog
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={handleAuthSuccess}
      />

      {/* Booking Form */}
      <BookingForm
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </>
  );
};