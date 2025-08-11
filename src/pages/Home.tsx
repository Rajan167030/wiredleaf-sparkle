import { Hero } from '@/components/sections/Hero';
import { motion } from 'framer-motion';
import { Users, Target, Bot, Code, Palette, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ScrollingText } from '@/components/sections/ScrollingText';
import { ClientsMarquee } from '@/components/sections/ClientsMarquee';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="hero">
        <Hero />
      </section>

      {/* About Section Overview */}
      <section id="about" className="py-20 bg-background-secondary/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-space-grotesk font-bold mb-6">
              About <span className="gradient-text">Us</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              We're a passionate team of innovators dedicated to bridging the gap between 
              cutting-edge AI technology and practical business solutions.
            </p>
            <Link to="/about">
              <Button variant="outline" className="neon-border">Learn More About Us</Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Section Overview */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-space-grotesk font-bold mb-6">
              Our <span className="gradient-text">Services</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              Comprehensive digital solutions powered by cutting-edge technology.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <motion.div className="glass-card p-6" whileHover={{ scale: 1.02 }}>
              <Bot className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Gen AI Apps</h3>
              <p className="text-muted-foreground">Custom AI applications powered by LLMs</p>
            </motion.div>
            <motion.div className="glass-card p-6" whileHover={{ scale: 1.02 }}>
              <Code className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Web Development</h3>
              <p className="text-muted-foreground">Modern, responsive website solutions</p>
            </motion.div>
            <motion.div className="glass-card p-6" whileHover={{ scale: 1.02 }}>
              <Palette className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Design Services</h3>
              <p className="text-muted-foreground">Stunning visual and UX design</p>
            </motion.div>
          </div>
          
          <div className="text-center">
            <Link to="/services">
              <Button variant="outline" className="neon-border">View All Services</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Scrolling Text Animation */}
      <ScrollingText />

      {/* Clients Marquee */}
      <ClientsMarquee />

      {/* Contact Section Overview */}
      <section id="contact" className="py-20 bg-background-secondary/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-space-grotesk font-bold mb-6">
              Get in <span className="gradient-text">Touch</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Ready to start your next project? We're here to help bring your ideas to life.
            </p>
            <Link to="/contact">
              <Button className="bg-gradient-primary hover:shadow-neon">Contact Us</Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;