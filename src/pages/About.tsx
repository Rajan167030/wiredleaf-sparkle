import { motion } from 'framer-motion';
import { Users, Target, Eye, Award } from 'lucide-react';

const teamMembers = [
  {
    name: 'Alex Chen',
    role: 'AI Engineer',
    image: '/api/placeholder/150/150',
    bio: 'Specializes in machine learning and neural networks with 8+ years of experience.'
  },
  {
    name: 'Sarah Wilson',
    role: 'Full Stack Developer',
    image: '/api/placeholder/150/150',
    bio: 'Expert in React, Node.js, and cloud architecture with a passion for clean code.'
  },
  {
    name: 'David Park',
    role: 'UI/UX Designer',
    image: '/api/placeholder/150/150',
    bio: 'Creates stunning user experiences with a focus on accessibility and performance.'
  }
];

const testimonials = [
  {
    text: "WiredLeaf transformed our business with their AI solutions. Outstanding results!",
    author: "John Smith",
    company: "Tech Corp"
  },
  {
    text: "Professional, innovative, and delivered beyond expectations. Highly recommended!",
    author: "Maria Garcia",
    company: "StartupXYZ"
  },
  {
    text: "The team's expertise in modern web development is unmatched.",
    author: "Robert Johnson",
    company: "Digital Agency"
  }
];

const About = () => {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="relative container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-space-grotesk font-bold mb-6"
          >
            About <span className="gradient-text">WiredLeaf</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            We're a passionate team of innovators dedicated to bridging the gap between 
            cutting-edge AI technology and practical business solutions.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 tilt-card"
            >
              <Target className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To democratize AI technology and make it accessible to businesses of all sizes, 
                helping them transform their operations and achieve unprecedented growth through 
                innovative digital solutions.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 tilt-card"
            >
              <Eye className="w-12 h-12 text-accent mb-6" />
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be the leading force in AI-driven digital transformation, creating a future 
                where intelligent technology seamlessly integrates with human creativity to 
                solve complex challenges.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-background-secondary/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-space-grotesk font-bold mb-6">
              Meet Our <span className="gradient-text">Team</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Talented individuals working together to create extraordinary digital experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 text-center tilt-card group"
              >
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-primary p-1">
                  <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                    <Users className="w-16 h-16 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-primary font-medium mb-4">{member.role}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-space-grotesk font-bold mb-6">
              What Our <span className="gradient-text">Clients Say</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 animate-float tilt-card"
                style={{ animationDelay: `${index * 0.5}s` }}
              >
                <Award className="w-8 h-8 text-accent mb-4" />
                <p className="text-muted-foreground mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-primary text-sm">{testimonial.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;