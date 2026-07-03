import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';

export default function Hero() {
  const asciiArt = `
  +-----------------------+
  |  System.init()        |
  |  > Loading assets...  |
  +-----------------------+
  `;

  return (
    <section className="min-h-screen flex items-center max-w-7xl mx-auto px-8 pt-20">
      <div className="flex-1 pr-12 z-10">
        <motion.pre 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-gray-400 font-mono mb-8"
        >
          {asciiArt}
        </motion.pre>
        
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-6xl font-extrabold tracking-tight mb-6 text-black"
        >
          Full-Stack Web Developer.
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-gray-600 mb-10 max-w-lg leading-relaxed"
        >
          6th Semester BCA Student building seamless experiences with PHP, MySQL, JavaScript, and Firebase.
        </motion.p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-black text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-colors"
        >
          View Selected Works
        </motion.button>
      </div>
      
      <div className="flex-1 h-[600px] w-full relative">
        <div className="absolute inset-0 bg-transparent flex items-center justify-center overflow-hidden">
          <Spline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" />
        </div>
      </div>
    </section>
  );
}