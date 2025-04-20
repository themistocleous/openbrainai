import { motion } from 'framer-motion';
import { ArrowRight, Brain, Shield, Zap, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";

// Animation variants extracted for reusability
const animations = {
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  },
  floatingAnimation: {
    y: [0, 10, 0],
    transition: { duration: 1.5, repeat: Infinity }
  }
};

// Features data extracted for easy maintenance
const FEATURES = [
  {
    title: "Efficient Assessment",
    description: "Reduce evaluation time by up to 60% while maintaining clinical accuracy.",
    icon: <Zap size={32} />,
  },
  {
    title: "HIPAA Compliant",
    description: "Enterprise-grade security with end-to-end encryption and data protection.",
    icon: <Shield size={32} />,
  },
  {
    title: "AI-Powered Insights",
    description: "Gain clinical and linguistic insights from patient speech and writing samples.",
    icon: <Brain size={32} />,
  },
];

// Custom floating circle component for better readability
const FloatingCircle = ({ index, scrollY }) => {
  const size = 60 + index * 40;
  const top = `${10 + index * 10}%`;
  const left = `${10 + index * 15}%`;
  const translateY = scrollY * (0.1 + index * 0.05);

  return (
    <div
      className="absolute rounded-full bg-white bg-opacity-10 transition-transform duration-100 ease-out"
      style={{
        top,
        left,
        width: `${size}px`,
        height: `${size}px`,
        transform: `translateY(${translateY}px)`,
      }}
    />
  );
};

// Feature card component for better organization
const FeatureCard = ({ feature, index }) => (
  <motion.div
    key={index}
    className="p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition-all border border-gray-100 dark:border-gray-700 text-center"
    variants={animations.fadeInUp}
  >
    <div className="p-5 mb-6 bg-blue-50 dark:bg-blue-900/20 rounded-full text-blue-600 dark:text-blue-400 inline-flex">
      {feature.icon}
    </div>
    <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
    <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
  </motion.div>
);

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  // Throttled scroll handler for better performance
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Generate floating circles with memoization
  const floatingCircles = useMemo(() => 
    Array(5).fill().map((_, i) => (
      <FloatingCircle key={i} index={i} scrollY={scrollY} />
    )), [scrollY]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Gradient background with animation */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-800 to-purple-700 opacity-90 dark:opacity-80 animate-gradientFlow bg-[length:200%_200%]" />

        {/* Floating circles for visual interest */}
        <div className="absolute inset-0 overflow-hidden">
          {floatingCircles}
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={animations.staggerContainer}
          >
            <motion.h1
              className="text-5xl md:text-6xl font-bold leading-tight mb-6 text-white"
              variants={animations.fadeInUp}
            >
              Empowering Neurological Research with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">
                Open Brain AI
              </span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-blue-100 mb-10"
              variants={animations.fadeInUp}
            >
              A multilingual, AI-powered platform built for clinicians and researchers working with language and cognition.
            </motion.p>
            <motion.div className="flex flex-wrap justify-center gap-6" variants={animations.fadeInUp}>
              <Link
                to="/register"
                className="group px-8 py-4 text-lg font-medium bg-white text-blue-600 rounded-xl hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center"
              >
                Get Started <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <Link
                to="/demo"
                className="px-8 py-4 text-lg font-medium rounded-xl bg-white/10 text-white border border-white/30 hover:bg-white/20 transition-all duration-300 flex items-center"
              >
                Watch Demo <Play className="ml-2" size={20} />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={animations.floatingAnimation}
        >
          <div className="w-8 h-12 rounded-full border-2 border-white/50 flex justify-center pt-2">
            <div className="w-1 h-3 bg-white/70 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 md:px-12 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={animations.fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">
              Why Choose{" "}
              <span className="text-blue-600 dark:text-blue-400">Open Brain AI?</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Streamline your language analysis with AI-driven features tailored for clinical practice and cognitive research.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={animations.staggerContainer}
          >
            {FEATURES.map((feature, i) => (
              <FeatureCard key={i} feature={feature} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Infographic Section with improved accessibility */}
      <section className="w-full bg-white dark:bg-gray-900 py-16 px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <img
            src="/assets/features-infographic.png"
            alt="Open Brain AI features visualization showing language processing, patient analytics, and clinical workflow integration"
            className="mx-auto max-w-4xl w-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </motion.div>
      </section>

      {/* New CTA Section */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Research Workflow?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
              Join hundreds of leading researchers and clinicians who have already integrated Open Brain AI into their practice.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                to="/register"
                className="group px-8 py-4 text-lg font-medium bg-white text-blue-600 rounded-xl hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center"
              >
                Start Free Trial <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 text-lg font-medium rounded-xl bg-transparent text-white border border-white hover:bg-white/10 transition-all duration-300"
              >
                Contact Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}