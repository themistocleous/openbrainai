import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Theme implementation with proper initialization
  const [theme, setTheme] = useState(() => {
    // First check localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    // Then check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    // Default to light theme
    return 'light';
  });

  // Enhanced toggle theme function with console logging for debugging
  const toggleTheme = () => {
    console.log('Toggle theme clicked, current theme:', theme);
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      console.log('Setting new theme:', newTheme);
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  // Apply theme to document body with console logging
  useEffect(() => {
    console.log('Applying theme to body:', theme);
    document.body.setAttribute('data-theme', theme);
  }, [theme]);


  // Animate elements when they come into view
  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.service-card, .portfolio-item, .feature');
      
      elements.forEach(element => {
        // Check if element is in viewport
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('animated');
        }
      });
    };
    
    // Run once on page load
    animateOnScroll();
    
    // Add event listener
    window.addEventListener('scroll', animateOnScroll);
    
    // Clean up
    return () => window.removeEventListener('scroll', animateOnScroll);
  }, []);

  // Handle scroll and set active section
  useEffect(() => {
    setIsLoaded(true);
    
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      const scrollPosition = window.scrollY + 300;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle nav link click
  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
    
    const section = document.getElementById(sectionId);
    window.scrollTo({
      top: section.offsetTop,
      behavior: 'smooth'
    });
  };

  // Escape key to close menu - simple functionality
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isMenuOpen]);

  return (
    <div className={`app ${isLoaded ? 'loaded' : ''}`}>
      <header className="header">
        <div className="logo-container">
          <div className="logo">
            <span>Open Brain AI</span>
          </div>          
        </div>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />
        
        {/* Header actions container with theme toggle and mobile menu button */}
        <div className="header-actions">
          {/* Theme toggle button with explicit type and enforced styling */}
          <button 
            className="theme-toggle" 
            onClick={toggleTheme} 
            aria-label="Toggle dark/light theme"
            type="button"
          >
            {theme === 'light' ? 
              <span className="theme-icon">🌙</span> : 
              <span className="theme-icon">☀️</span>
            }
          </button>
          <span></span>
          {/* Mobile menu button - enhanced for better touch targets */}
          <div 
            className={`mobile-menu-btn ${isMenuOpen ? 'open' : ''}`} 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
            role="button"
            tabIndex="0"
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        

        
        {/* Simple mobile navigation - matching original design */}
        <nav className={`${isMenuOpen ? 'open' : ''}`}>
          <ul>
            {['home', 'about', 'features', 'cases', 'downloads'].map(section => (
              <li key={section}>
                <a 
                  href={`#${section}`}
                  className={activeSection === section ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(section);
                  }}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <div className="hero">
        <div className="hero-content">
          <h1>
            <span className="animate-in">Open </span>
            <span className="animate-in" style={{ animationDelay: '0.2s' }}>Brain</span>
            <span className="animate-in" style={{ animationDelay: '0.4s' }}> AI</span>
          </h1>
          <h2>
          <span className="animate-in" style={{ animationDelay: '0.8s' }}> version 2</span>
          </h2>
          <p className="animate-in" style={{ animationDelay: '0.6s' }}>A dynamic academic platform providing AI tools and resources to support the work of clinicians, educators, and researchers.</p>
          <p className="animate-in" style={{ animationDelay: '0.6s' }}>The Open Brain AI version 1 is currently sleeping. We are transitioning into Open Brain AI v.2 (expected release day May 15, 2025) </p>
<p className="animate-in text-gray-700 dark:text-gray-300 leading-relaxed" style={{ animationDelay: '0.6s' }}>
  Developed by{" "}
  <a
    href="http://charalambosthemistocleous.com"
    className="text-blue-600 dark:text-blue-400 hover:underline"
    target="_blank"
    
  >
    <i>Charalambos (Haris) Themistocleous</i>
  </a>,{" "}
  <a
    href="https://www.uv.uio.no/isp/english/"
    className="text-blue-600 dark:text-blue-400 hover:underline"
    target="_blank"
    
  >
    <i>Department of Special Needs Education</i>
  </a>,{" "}
  <a
    href="https://www.uv.uio.no/english/"
    className="text-blue-600 dark:text-blue-400 hover:underline"
    target="_blank"
    
  >
    <i>Faculty of Educational Sciences</i>
  </a>,{" "}
  <a
    href="https://www.uio.no/english/"
    className="text-blue-600 dark:text-blue-400 hover:underline"
    target="_blank"
    
  >
    <i>University of Oslo</i>
  </a>.
</p>

          <div className="hero-buttons animate-in" style={{ animationDelay: '0.3s' }}>
            <button className="primary-btn" onClick={() => handleNavClick('portfolio')}>Learn More</button>
            <button className="secondary-btn" onClick={() => handleNavClick('downloads')}>Downloads</button>
          </div>
        </div>
        <div className="hero-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>

      <main>
        <section id="home" className="section-container">
          <div className="card">
            <div className="card-content">
              <h2>Key<span className="highlight"> Features</span></h2>
              <p>
              Empowering Language Analysis with Cutting-Edge AI
              </p>
              <div className="features">
                <div className="feature">
                  <h2>HIPAA and GDPR</h2>
                  <p>Open Brain AI is now run locally to ensure compliance with stringent data privacy and security regulations, including the Health Insurance Portability and Accountability Act (HIPAA) in the United States and the General Data Protection Regulation (GDPR) in the European Union.</p>
                </div>
                <div className="feature">
                  <h2>Language Analysis</h2>
                  <ul>
                 <li>Audio transcription</li>
                 <li>Automatic translation </li>
                 <li>Grammar error correction</li> 
                 <li>Transcription to the International Phonetic Alphabet (IPA)</li>     
                 <li>Readability scoring</li> 
                 <li>Phonology, morphology, syntax, semantic, and lexical measures</li> 
                  </ul>
                </div>
                <div className="feature">
                  <h2>Multilingual Support</h2>
                  <p>OBAI offers tools for a wide range of languages, including English, Danish, Dutch, Finnish, French, German, Greek, Italian, Norwegian, Polish, Portuguese, Romanian, Russian, Spanish, and Swedish.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section-container">
          <div className="card">
            <div className="card-content">
              <h2>About <span className="highlight">Open Brain AI</span></h2>
              <div className="about-grid">
                <div className="about-text">
                  <p>
                  <strong>Open Brain AI (OBAI)</strong> was born out of a vision to automate language analysis in clinical and research settings. Recognizing the time-consuming and labor-intensive nature of traditional neurolinguistic assessments.</p>
                  <p>                 
                  The project is being actively developed by <a href="http://charalambosthemistocleous.com"><i>Charalambos (Haris) Themistocleous</i></a> at the Department of Special Needs Education, University of Oslo. It is supported by team of experts in artificial intelligence, linguistics, and healthcare set out to develop a cutting-edge computational platform that could automate and enhance these critical processes. 
                  </p>
                  <p>
                  Researchers, educators, and clinicians who want to learn more about the features or have feature requests, please email us at charalth@uio.no.
                  </p>
                  <div className="stats">
  <div className="stat">
    <span className="stat-number">15+</span>
    <span className="stat-label">Supported Languages</span>
  </div>
  <div className="stat">
    <span className="stat-number">8+</span>
    <span className="stat-label">Language Domains</span>
  </div>
  <div className="stat">
    <span className="stat-number">40+</span>
    <span className="stat-label">Application Areas</span>
  </div>
</div>
        </div>
        <div className="about-image">
          <div className="image-placeholder">
            <div className="inner-shape">
            <img src="/assets/obai-editor.png" alt="editor-preview"  style={{ maxWidth: '300%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
        </section>

        <section id="features" className="section-container">
  <div className="card">
    <div className="card-content">
      <h2>Features and <span className="highlight">Capabilities</span></h2>
      <p className="service-intro">
        We provide powerful AI-driven language analysis capabilities to support
        your clinical, research, or educational needs.
      </p>

      <div className="services-grid">
        <div className="service-card">
          <div className="service-icon">
            <i className="fas fa-language"></i> {/* Font Awesome icon for Language */}
          </div>
          <h3>Multilingual Analysis</h3>
          <p>
            Analyze text and audio in multiple languages, including English,
            Spanish, French, German, and more.
          </p>
        </div>

        <div className="service-card">
          <div className="service-icon">
            <i className="fas fa-file-alt"></i> {/* Font Awesome icon for Text/File */}
          </div>
          <h3>Comprehensive Text Analysis</h3>
          <p>
            Gain insights from grammar checks and readability scores to detailed
            linguistic feature extraction.
          </p>
        </div>

        <div className="service-card">
          <div className="service-icon">
            <i className="fas fa-microphone"></i> {/* Font Awesome icon for Microphone/Audio */}
          </div>
          <h3>Audio Transcription & Analysis</h3>
          <p>
            Automatically transcribe audio files and analyze speech patterns for
            clinical or research purposes.
          </p>
        </div>

        <div className="service-card">
          <div className="service-icon">
            <i className="fas fa-brain"></i> {/* Font Awesome icon for Brain/AI */}
          </div>
          <h3>AI-Powered Assistance</h3>
          <p>
            Utilize our AI Companion for text generation, summarization, and
            grammar refinement.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
       <section id="cases" className="section-container">
  <div className="card">
    <div className="card-content">
      <h2>
      Application <span className="highlight">Cases</span>
      </h2>
      <p className="portfolio-intro">
        Explore how Open Brain AI is applied in real-world scenarios to advance
        research, clinical practice, and language analysis.
      </p>

      <div className="portfolio-grid">
        <div className="portfolio-item">
          <div className="portfolio-image">
            {/* You'll likely replace this with an actual image */}
            <div className="image-placeholder">
            <img src="/assets/measures-demo.png" alt="measures-demo"  style={{ maxWidth: '100%' }} />
             {/*   <i className="fas fa-brain fa-3x"></i>  */}
            </div>
            <div className="image-overlay">
              <h4>PPA Subtyping</h4>
              <p>Research • Neurology</p>
               {/*  <button className="view-project-btn">Learn More</button> */}
            </div>
          </div>
        </div>

        <div className="portfolio-item">
          <div className="portfolio-image">
            <div className="image-placeholder">
            <img src="/assets/measures-demo.png" alt="measures-demo"  style={{ maxWidth: '100%' }} />
              {/*   <i className="fas fa-file-medical fa-3x"></i>  */}
            </div>
            <div className="image-overlay">
              <h4>MCI Assessment</h4>
              <p>Clinical • Diagnostics</p>
               {/*  <button className="view-project-btn">Learn More</button> */}
            </div>
          </div>
        </div>

        <div className="portfolio-item">
          <div className="portfolio-image">
            <div className="image-placeholder">
            <img src="/assets/measures-demo.png" alt="measures-demo"  style={{ maxWidth: '100%' }} />
                {/*               <i className="fas fa-language fa-3x"></i> */}
            </div>
            <div className="image-overlay">
              <h4>Aphasia Analysis</h4>
              <p>Research • Therapy</p>
               {/*  <button className="view-project-btn">Learn More</button> */}
            </div>
          </div>
        </div>

        <div className="portfolio-item">
          <div className="portfolio-image">
            <div className="image-placeholder">
            <img src="/assets/measures-demo.png" alt="measures-demo"  style={{ maxWidth: '100%' }} />
                 {/* <i className="fas fa-user-md fa-3x"></i> */}
            </div>
            <div className="image-overlay">
              <h4>Clinical Reporting</h4>
              <p>Clinical • Workflow</p>
               {/*  <button className="view-project-btn">Learn More</button> */}
            </div>
          </div>
        </div>

        <div className="portfolio-item">
          <div className="portfolio-image">
            <div className="image-placeholder">
            <img src="/assets/measures-demo.png" alt="measures-demo"  style={{ maxWidth: '100%' }} />           
                  {/* <i className="fas fa-book-reader fa-3x"></i> */}
            </div>
            <div className="image-overlay">
              <h4>Language Education</h4>
              <p>Education • Accessibility</p>
               {/*  <button className="view-project-btn">Learn More</button> */}
            </div>
          </div>
        </div>

        {/* You can add more items as needed */}
      </div>
    </div>
  </div>
</section>
<section id="downloads" className="section-container">
  <div className="card">
    <div className="card-content">
      <h2>
        Downloads & <span className="highlight">Resources</span>
      </h2>
      <p className="downloads-intro">
        Access essential tools and resources to enhance your experience with Open
        Brain AI.
      </p>

      <div className="services-grid">
        <div className="service-card coming-soon">
          <div className="service-icon">
            <i className="fas fa-file-excel fa"></i>
          </div>
          <h3>
            Advanced Clinical Tools <span className="label new">BETA</span>
          </h3>
          <p>
            Download the standalone application for in-depth grammar, spelling,
            and phonology analysis.
          </p>
          <button className="download-button disabled">
            Coming Soon
          </button>
          <p className="release-date">
            Available by May 15th, 2025
          </p>
        </div>

        <div className="service-card coming-soon">
          <div className="service-icon">
            <i className="fas fa-book fa"></i>
          </div>
          <h3>
            OBAI User Manual <span className="label pdf">PDF</span>
          </h3>
          <p>
            A comprehensive guide to using the Open Brain AI platform and its
            features.
          </p>
          <button className="download-button disabled">
            Coming Soon
          </button>
          <p className="release-date">
            Available by May 15th, 2025
          </p>
        </div>

        <div className="service-card">
          <div className="service-icon">
            <i className="fas fa-question-circle fa"></i>
          </div>
          <h3>
            Support & FAQs
          </h3>
          <p>
            Find answers to common questions and get assistance with Open Brain AI.
          </p>
          <a href="/support" className="download-button">
            Visit Support Page
          </a>
        </div>

        {/* Add more download cards as needed */}
      </div>

      <p className="downloads-note">
        We are working hard to bring you these resources. Thank you for your
        patience!
      </p>
    </div>
  </div>
</section>
      </main>

      <footer>
        <div className="footer-content">
          <div className="footer-logo">
            <div className="logo">
              <span>Open Brain AI</span>
            </div>
            <p>Committed to supporting clinicians and educators with computational AI models and to helping patients and students who struggle with speech.</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-section">
              <h4>Navigation</h4>
              <ul>
                {['home', 'about', 'features', 'cases', 'downloads'].map(section => (
                  <li key={section}>
                    <a href={`#${section}`} onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(section);
                    }}>
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Features</h4>
              <ul>
                <li><a href="#features">Multilingual Analysis</a></li>
                <li><a href="#features">Comprehensive Text Analysis</a></li>
                <li><a href="#features">Audio Transcription & Analysis</a></li>
                <li><a href="#features">AI-Powered Assistance</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Connect</h4>
              <div className="social-links">
                <a href="https://twitter.com/openbrainai"><i className="fa-brands fa-x-twitter"></i></a>
                <a href="https://www.reddit.com/r/openbrainai/"><i className="fab fa-reddit"></i></a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 Open Brain AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App