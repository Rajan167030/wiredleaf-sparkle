import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X, Sparkles } from 'lucide-react';
import { AuthDialog } from '@/components/auth/AuthDialog';
import { BookingForm } from '@/components/booking/BookingForm';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Contact', href: '/contact' },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

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
              {isLoggedIn ? (
                <Button
                  onClick={() => setIsBookingOpen(true)}
                  className="ripple bg-gradient-primary hover:shadow-neon"
                >
                  Book a Call
                </Button>
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
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                {/* Mobile Auth Buttons */}
                <div className="mt-6 space-y-3">
                  {isLoggedIn ? (
                    <Button
                      onClick={() => {
                        setIsBookingOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className="w-full ripple bg-gradient-primary hover:shadow-neon"
                    >
                      Book a Call
                    </Button>
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