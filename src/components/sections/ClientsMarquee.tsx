import { motion } from 'framer-motion';

const clients = [
  {
    name: 'Google',
    logo: 'M16.52 17.94h5.86c.46-2.65-.18-5.74-1.85-8l-4.01 4v4zm-1.01-7.47v4l4.01-4c-1.15-1.54-2.78-2.72-4.69-3.28l.68 3.28zm-1.42-4.25c-2.06.39-3.92 1.63-5.14 3.28l4.01 4v-4l1.13-3.28zm-6.11 4.25c-.85 1.55-1.34 3.35-1.34 5.24 0 1.89.5 3.68 1.34 5.24l4.01-4v-2.47l-4.01-4zm5.02 1.98v2.47L8.99 19c1.22 1.65 3.08 2.89 5.14 3.28l-1.13-9.83z',
  },
  {
    name: 'Microsoft',
    logo: 'M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z',
  },
  {
    name: 'Amazon',
    logo: 'M15.93 17.09c-2.27.66-5.73 1.12-8.59 1.12-2.87 0-6.33-.46-8.6-1.12-.45-.13-.74-.57-.74-1.05v-7.11c0-.47.29-.91.74-1.04 2.27-.66 5.73-1.13 8.6-1.13 2.86 0 6.32.47 8.59 1.13.45.13.74.57.74 1.04v7.11c0 .48-.29.92-.74 1.05z',
  },
  {
    name: 'Apple',
    logo: 'M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.64 4.03 2.68 4.04-.02.09-.46 1.58-1.55 3.11l-.83.72z',
  },
  {
    name: 'Meta',
    logo: 'M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm6.24 9.16c-.85 0-1.6.43-2.05 1.08l-3.48-2v-.76c0-1.37-1.12-2.49-2.49-2.49S7.73 6.11 7.73 7.48v9.04c0 1.37 1.12 2.49 2.49 2.49s2.49-1.12 2.49-2.49v-3.85l3.48 2c.45.65 1.2 1.08 2.05 1.08 1.38 0 2.49-1.11 2.49-2.48V11.64c0-1.37-1.11-2.48-2.49-2.48z',
  },
  {
    name: 'Oracle',
    logo: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-4-9h8v2H8z',
  },
  {
    name: 'IBM',
    logo: 'M21 16V8h-3v8h3zM3 8v8h3V8H3zm4 0v8h3V8H7zm4 0v8h3V8h-3zm4 0v8h3V8h-3z',
  }
];

export const ClientsMarquee = () => {
  return (
    <section className="w-full py-32 bg-background/50 overflow-hidden">
      <div className="container mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600">Trusted Clients</span>
        </h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
          Join the ranks of industry leaders who trust our expertise to deliver innovative solutions.
        </p>
        <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:opacity-90 transition-all duration-300 group relative overflow-hidden">
          <span className="relative z-10 flex items-center">
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
            Book a Consultation
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
        </button>
      </div>

      <div className="relative w-full">
        {/* Gradient Overlays */}
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-background to-transparent z-10"></div>
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-background to-transparent z-10"></div>

        {/* First Row - Left to Right */}
        <div className="relative flex overflow-hidden py-12 mb-20">
          <motion.div
            className="flex whitespace-nowrap"
            initial={{ x: "0%" }}
            animate={{ x: "-50%" }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear"
            }}
          >
            {[...clients, ...clients].map((client, index) => (
              <div
                key={`first-${index}`}
                className="flex items-center space-x-8 group mx-12"
              >
                <div className="w-28 h-28 rounded-xl bg-neutral-800/20 border border-neutral-700/30 flex items-center justify-center text-muted-foreground/50 group-hover:text-primary group-hover:border-primary/50 transition-all duration-300 p-6">
                  <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
                    <path d={client.logo} />
                  </svg>
                </div>
                <span className="text-muted-foreground/70 group-hover:text-primary text-2xl font-semibold tracking-wide transition-colors duration-300 whitespace-nowrap min-w-[120px]">
                  {client.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Second Row - Right to Left */}
        <div className="relative flex overflow-hidden py-12">
          <motion.div
            className="flex whitespace-nowrap"
            initial={{ x: "-50%" }}
            animate={{ x: "0%" }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear"
            }}
          >
            {[...clients.reverse(), ...clients].map((client, index) => (
              <div
                key={`second-${index}`}
                className="flex items-center space-x-8 group mx-12"
              >
                <div className="w-28 h-28 rounded-xl bg-neutral-800/20 border border-neutral-700/30 flex items-center justify-center text-muted-foreground/50 group-hover:text-primary group-hover:border-primary/50 transition-all duration-300 p-6">
                  <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
                    <path d={client.logo} />
                  </svg>
                </div>
                <span className="text-muted-foreground/70 group-hover:text-primary text-2xl font-semibold tracking-wide transition-colors duration-300 whitespace-nowrap min-w-[120px]">
                  {client.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
