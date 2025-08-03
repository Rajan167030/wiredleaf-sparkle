import { motion } from 'framer-motion';
import { Bot, Code, Palette, TrendingUp, Database, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    id: 'ai',
    icon: Bot,
    title: 'Gen AI Apps',
    subtitle: 'Fine-tuned LLM Solutions',
    description: 'Custom AI applications powered by large language models, tailored to your specific business needs and industry requirements.',
    features: ['Custom LLM Training', 'Natural Language Processing', 'Chatbot Development', 'AI Integration'],
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'web',
    icon: Code,
    title: 'Website Development',
    subtitle: 'E-commerce & Portfolio Sites',
    description: 'Modern, responsive websites built with cutting-edge technologies. From simple portfolios to complex e-commerce platforms.',
    features: ['React & Next.js', 'E-commerce Solutions', 'CMS Integration', 'SEO Optimization'],
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    id: 'dashboards',
    icon: Database,
    title: 'Admin Dashboards',
    subtitle: 'Data Visualization & Management',
    description: 'Powerful admin panels and dashboards with real-time analytics, data visualization, and comprehensive management tools.',
    features: ['Real-time Analytics', 'Custom Reporting', 'User Management', 'API Integration'],
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    id: 'design',
    icon: Palette,
    title: 'Graphic Design',
    subtitle: 'Brand Identity & Visual Design',
    description: 'Stunning visual designs that capture your brand essence. From logos to complete brand identity systems.',
    features: ['Logo Design', 'Brand Identity', 'UI/UX Design', 'Print Design'],
    gradient: 'from-orange-500 to-red-500'
  },
  {
    id: 'marketing',
    icon: TrendingUp,
    title: 'Digital Marketing',
    subtitle: 'SEO & Growth Strategies',
    description: 'Comprehensive digital marketing strategies to boost your online presence and drive sustainable business growth.',
    features: ['SEO Optimization', 'Content Strategy', 'Social Media', 'PPC Campaigns'],
    gradient: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'mobile',
    icon: Smartphone,
    title: 'Mobile Apps',
    subtitle: 'iOS & Android Development',
    description: 'Native and cross-platform mobile applications that deliver exceptional user experiences on all devices.',
    features: ['React Native', 'iOS Development', 'Android Development', 'App Store Optimization'],
    gradient: 'from-teal-500 to-cyan-500'
  }
];

const Services = () => {
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
            Our <span className="gradient-text">Services</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Comprehensive digital solutions powered by cutting-edge AI technology 
            and modern development practices.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className="glass-card p-8 h-full tilt-card transition-all duration-500 hover:shadow-elevated group-hover:scale-[1.02]">
                  {/* Icon with Gradient Background */}
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.gradient} p-4 group-hover:shadow-neon transition-all duration-300`}>
                      <service.icon className="w-full h-full text-white" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r opacity-20 blur-xl rounded-2xl group-hover:opacity-40 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-primary font-medium mb-4">{service.subtitle}</p>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="mb-8">
                    <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider">
                      Key Features
                    </h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <Button 
                    className="w-full ripple bg-gradient-to-r from-transparent to-transparent border border-primary/30 hover:border-primary hover:shadow-neon transition-all duration-300 group/btn"
                    variant="outline"
                  >
                    <span className="group-hover/btn:text-primary transition-colors">
                      Learn More
                    </span>
                  </Button>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10" />
        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-space-grotesk font-bold mb-6">
              Ready to Transform Your <span className="gradient-text">Business?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let's discuss how our services can help you achieve your goals 
              and stay ahead of the competition.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button 
                size="lg"
                className="ripple bg-gradient-primary hover:shadow-neon text-lg px-8 py-6 rounded-2xl"
              >
                Start Your Project
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="ripple neon-border text-lg px-8 py-6 rounded-2xl"
              >
                Schedule Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;