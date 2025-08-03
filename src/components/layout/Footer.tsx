import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  Sparkles,
  ArrowRight,
  Heart 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const footerSections = [
  {
    title: 'About',
    links: [
      { name: 'Our Story', href: '/about' },
      { name: 'Team', href: '/about#team' },
      { name: 'Careers', href: '/careers' },
      { name: 'Blog', href: '/blog' },
    ]
  },
  {
    title: 'Quick Links',
    links: [
      { name: 'Home', href: '/' },
      { name: 'Services', href: '/services' },
      { name: 'Portfolio', href: '/portfolio' },
      { name: 'Contact', href: '/contact' },
    ]
  },
  {
    title: 'Services',
    links: [
      { name: 'Gen AI Apps', href: '/services#ai' },
      { name: 'Web Development', href: '/services#web' },
      { name: 'UI/UX Design', href: '/services#design' },
      { name: 'Digital Marketing', href: '/services#marketing' },
    ]
  },
];

const socialLinks = [
  { icon: Github, href: 'https://github.com/wiredleaf', label: 'GitHub' },
  { icon: Twitter, href: 'https://twitter.com/wiredleaf', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com/company/wiredleaf', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:hello@wiredleaf.com', label: 'Email' },
];

export const Footer = () => {
  return (
    <footer className="relative bg-background-secondary border-t border-glass-border">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      <div className="relative container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="relative">
                <Sparkles className="h-8 w-8 text-primary animate-pulse-glow" />
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" />
              </div>
              <span className="text-2xl font-space-grotesk font-bold gradient-text">
                WiredLeaf
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Transforming ideas into digital reality with cutting-edge AI solutions 
              and modern web technologies.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card p-3 rounded-xl ripple hover:shadow-neon transition-all duration-300 group"
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-6 text-foreground">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:underline"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-foreground">
              Newsletter
            </h3>
            <p className="text-muted-foreground mb-6">
              Stay updated with our latest AI innovations and tech insights.
            </p>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-background/50 border-glass-border focus:border-primary"
                />
                <Button 
                  size="icon"
                  className="ripple bg-gradient-primary hover:shadow-neon"
                >
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-glass-border pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>by</span>
              <span className="text-primary font-semibold">WiredLeaf</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <Link to="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <span>© 2024 WiredLeaf. All rights reserved.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
    </footer>
  );
};