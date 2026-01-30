import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ExternalLink, Github, Linkedin, Mail, Instagram, ArrowRight, Code2, MessageCircle } from 'lucide-react';

const App = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  const skills = [
    { category: 'Frontend', items: ['React', 'HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS', 'Framer Motion'] },
    { category: 'Backend', items: ['Python', 'Django', 'Flask', 'REST APIs', 'PostgreSQL', 'Firebase', 'SQL'] },
    { category: 'Tools', items: ['Git', 'GitHub', 'VS Code', 'Postman', 'Linux', 'Netlify'] }
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(
          'https://api.github.com/users/harish-jiji/repos?sort=updated&per_page=10'
        );
        const data = await res.json();

        if (!Array.isArray(data)) {
          console.error('GitHub API error:', data);
          setProjects([]);
          return;
        }

        const filteredRepos = data.filter(
          repo =>
            repo.name.toLowerCase() !== 'portfolio' &&
            !repo.fork
        );

        const projectsWithLanguages = await Promise.all(
          filteredRepos.map(async (repo) => {
            let languages = [];

            try {
              const langRes = await fetch(repo.languages_url);
              const langData = await langRes.json();
              languages = Object.keys(langData); // Helper to get keys
            } catch (err) {
              console.warn('Language fetch failed for', repo.name);
            }

            return {
              title: repo.name.replace(/[-_]/g, ' '),
              description: repo.description || 'No description provided.',
              github: repo.html_url,
              link: repo.homepage || null,
              tech: languages.length > 0 ? languages : [repo.language].filter(Boolean)
            };
          })
        );

        setProjects(projectsWithLanguages);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoadingProjects(false);
      }
    };

    fetchProjects();
  }, []);

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
  };

  return (
    <div className="bg-slate-950 text-white font-sans h-screen w-full overflow-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-slate-950/50 border-b border-slate-800/50 h-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <div
              className="flex-shrink-0 cursor-pointer"
              onClick={() => setActiveTab('home')}
            >
              <div className="text-2xl font-black bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
                HJ
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${activeTab === item.id ? 'bg-slate-800/80 text-cyan-400' : 'hover:bg-slate-800/50 hover:text-cyan-400'}`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileOpen && (
            <div className="md:hidden absolute top-20 left-0 w-full bg-slate-950/95 backdrop-blur-md border-b border-slate-800/50 pb-4 shadow-2xl">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileOpen(false);
                  }}
                  className="block w-full text-left px-6 py-4 text-sm font-medium hover:bg-slate-800/50 hover:text-cyan-400 transition-all text-white border-b border-slate-800/30 last:border-0"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Main Content Area - Scrollable Container for Content only */}
      <main className="relative z-10 w-full h-full pt-20 overflow-y-auto overflow-x-hidden">
        <AnimatePresence mode="wait">

          {/* HOME SECTION */}
          {activeTab === 'home' && (
            <motion.section
              key="home"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4"
            >
              <div className="text-center max-w-4xl mx-auto">
                <div className="inline-block mb-6">
                  <span className="px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 text-sm font-medium text-cyan-400">
                    Welcome to my creative space ✨
                  </span>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight text-white">
                  <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    Harish Jiji
                  </span>
                </h1>

                <p className="text-xl md:text-2xl text-slate-300 mb-8 font-light">
                  Full-Stack Developer | Building scalable web applications
                </p>

                <p className="text-base md:text-lg text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                  I craft elegant solutions for complex problems. Passionate about clean code, efficient algorithms, and creating meaningful digital experiences.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                  <button
                    onClick={() => setActiveTab('projects')}
                    className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl font-semibold hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 text-white"
                  >
                    View My Projects
                  </button>
                  <a
                    href="/Harish_Jiji_Resume.pdf"
                    download="Harish_Jiji_Resume.pdf"
                    className="px-8 py-4 border-2 border-slate-600 rounded-xl font-semibold hover:bg-slate-800/50 hover:border-cyan-400 transition-all duration-300 text-white inline-block cursor-pointer"
                  >
                    Download Resume
                  </a>
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-6 mb-16 relative z-50">
                  <a href="https://github.com/harish-jiji" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-slate-800/50 border border-slate-700 flex items-center justify-center hover:bg-blue-500/20 hover:border-blue-500 transition-all text-white cursor-pointer" title="GitHub">
                    <Github size={20} />
                  </a>
                  <a href="https://www.linkedin.com/in/harish-jiji/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-slate-800/50 border border-slate-700 flex items-center justify-center hover:bg-blue-500/20 hover:border-blue-500 transition-all text-white cursor-pointer" title="LinkedIn">
                    <Linkedin size={20} />
                  </a>
                  <a href="mailto:harishjiji16@gmail.com" className="w-12 h-12 rounded-full bg-slate-800/50 border border-slate-700 flex items-center justify-center hover:bg-blue-500/20 hover:border-blue-500 transition-all text-white cursor-pointer" title="Email Me">
                    <Mail size={20} />
                  </a>
                </div>
              </div>
            </motion.section>
          )}

          {/* ABOUT SECTION */}
          {activeTab === 'about' && (
            <motion.section
              key="about"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12"
            >
              <div className="max-w-6xl mx-auto w-full">
                <h2 className="text-4xl md:text-5xl font-black mb-12 text-white">
                  About <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Me</span>
                </h2>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <p className="text-lg text-slate-300 leading-relaxed">
                      With a strong background in full-stack development, I've helped build scalable web applications that solve real-world problems.
                    </p>
                    <p className="text-lg text-slate-300 leading-relaxed">
                      My expertise spans modern frontend frameworks like React and Next.js, paired with robust backend solutions using Python (Django, Flask). I'm obsessed with writing clean, maintainable code and creating intuitive user experiences.
                    </p>
                    <div className="pt-6 space-y-4">
                      {["Full-Stack Capability", "Clean Code Enthusiast", "Always Learning"].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                          <span className="text-slate-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="relative">
                    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-8 backdrop-blur">
                      <div className="space-y-8">
                        {[
                          // { number: '7+', label: 'Projects Built' },
                          { number: 'Full-Stack', label: 'Frontend & Backend' },
                          { number: 'REST APIs', label: 'Design & Integration' },
                          { number: 'Python & React', label: 'Core Tech Stack' }
                        ].map((stat, i) => (
                          <div key={i} className="border-b border-slate-700/50 pb-6 last:border-0 last:pb-0">
                            <div className="text-3xl md:text-4xl font-black text-cyan-400 mb-2">{stat.number}</div>
                            <div className="text-slate-400">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {/* SKILLS SECTION */}
          {activeTab === 'skills' && (
            <motion.section
              key="skills"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12"
            >
              <div className="max-w-6xl mx-auto w-full">
                <h2 className="text-4xl md:text-5xl font-black mb-12 text-white">
                  Technical <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Skills</span>
                </h2>

                <div className="grid md:grid-cols-3 gap-8">
                  {skills.map((skillGroup, i) => (
                    <div
                      key={i}
                      className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 border border-slate-700/50 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10"
                    >
                      <h3 className="text-2xl font-bold mb-6 text-cyan-400">{skillGroup.category}</h3>
                      <div className="space-y-3">
                        {skillGroup.items.map((skill, j) => (
                          <div
                            key={j}
                            className="flex items-center gap-3 p-3 rounded-lg bg-slate-700/20 hover:bg-slate-700/40 transition-all"
                          >
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
                            <span className="text-slate-200">{skill}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>
          )}

          {/* PROJECTS SECTION */}
          {activeTab === 'projects' && (
            <motion.section
              key="projects"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="min-h-[calc(100vh-80px)] flex items-start justify-center px-4 py-12"
            >
              <div className="max-w-6xl mx-auto w-full">
                <h2 className="text-4xl md:text-5xl font-black mb-12 text-white">
                  Featured <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Projects</span>
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 pb-20">
                  {loadingProjects ? (
                    <div className="col-span-2 text-center text-slate-400 text-lg py-12">
                      <div className="animate-spin w-8 h-8 border-4 border-cyan-400 border-t-transparent rounded-full mx-auto mb-4"></div>
                      Loading projects from GitHub...
                    </div>
                  ) : (
                    projects.map((project, i) => (
                      <div
                        key={i}
                        className="group bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-slate-700/50 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 overflow-hidden flex flex-col"
                      >
                        <div className="flex justify-between items-start mb-4 relative z-10">
                          <h3 className="text-2xl font-bold group-hover:text-cyan-400 transition-colors text-white capitalize">
                            {project.title}
                          </h3>
                          <div className="flex gap-2">
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer" title="View Code">
                              <Github size={24} />
                            </a>
                            {project.link && (
                              <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer" title="Live Demo">
                                <ExternalLink size={24} />
                              </a>
                            )}
                          </div>
                        </div>

                        <p className="text-slate-400 text-base mb-6 leading-relaxed relative z-10 flex-grow">
                          {project.description || "No description provided."}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                          {project.tech.map((tech, j) => (
                            <span
                              key={j}
                              className="px-3 py-1 bg-slate-700/50 rounded-full text-xs font-medium text-cyan-300 border border-slate-600/50"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="flex gap-4 mt-auto z-10">
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-slate-300 hover:text-white font-semibold transition-all cursor-pointer"
                          >
                            <Code2 size={16} />
                            View Code
                          </a>
                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-cyan-400 font-semibold hover:gap-3 transition-all group-hover:text-cyan-300 cursor-pointer"
                            >
                              View Project
                              <ArrowRight size={16} />
                            </a>
                          )}
                        </div>
                      </div>
                    ))
                  )}

                  {!loadingProjects && projects.length === 0 && (
                    <div className="col-span-2 text-center text-slate-400 py-12">
                      No projects found. Check back soon!
                    </div>
                  )}
                </div>
              </div>
            </motion.section>
          )}

          {/* CONTACT SECTION */}
          {activeTab === 'contact' && (
            <motion.section
              key="contact"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12"
            >
              <div className="max-w-5xl mx-auto w-full transform -translate-y-8">
                <h2 className="text-4xl md:text-5xl font-black mb-12 text-center text-white">
                  Let's <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Connect</span>
                </h2>

                <div className="grid md:grid-cols-2 gap-8 items-stretch">
                  {/* WhatsApp Card */}
                  <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-8 backdrop-blur flex flex-col items-center justify-center text-center transform hover:scale-[1.02] transition-all duration-300 h-full">
                    <h3 className="text-2xl font-bold text-white mb-2">Quick Chat</h3>
                    <p className="text-slate-400 mb-6">Scan to chat or click the button below</p>

                    <div className="relative w-48 h-48 mb-6 rounded-xl overflow-hidden border-4 border-white/10 shadow-2xl">
                      <img src="/whatsapp_qr.jpg" alt="WhatsApp QR Code" className="w-full h-full object-cover" />
                    </div>

                    <a
                      href="https://wa.me/qr/35LIT2C2Z6BRB1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-8 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-[#25D366]/20 cursor-pointer"
                    >
                      <MessageCircle size={20} />
                      Chat on WhatsApp
                    </a>
                  </div>

                  {/* Social Links Card */}
                  <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-8 backdrop-blur flex flex-col justify-center h-full">
                    <h3 className="text-2xl font-bold text-white mb-6 text-center">Social Profiles</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { icon: Github, label: 'GitHub', href: 'https://github.com/harish-jiji', color: 'hover:border-slate-400 hover:text-slate-100' },
                        { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/harish-jiji/', color: 'hover:border-blue-400 hover:text-blue-400' },
                        { icon: Mail, label: 'Email', href: 'mailto:harishjiji16@gmail.com', color: 'hover:border-red-400 hover:text-red-400' },
                        { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/h___a__r___i__?igsh=MWVhOWNqbmh4bjlxMg==', color: 'hover:border-pink-500 hover:text-pink-500' }
                      ].map((item, i) => (
                        <a
                          key={i}
                          href={item.href}
                          target={item.href.startsWith('mailto') ? "" : "_blank"}
                          rel={item.href.startsWith('mailto') ? "" : "noopener noreferrer"}
                          className={`flex flex-col items-center justify-center p-6 bg-slate-800/30 border border-slate-700/50 rounded-xl transition-all group ${item.color} cursor-pointer hover:bg-slate-800/60`}
                        >
                          <item.icon size={32} className="mb-3 text-slate-400 group-hover:text-inherit transition-colors" />
                          <span className="text-sm font-medium text-slate-500 group-hover:text-inherit transition-colors">{item.label}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

        </AnimatePresence>

        {/* Persistent Footer if needed, but active section handles content */}
        <footer className="w-full py-6 text-center text-slate-500 text-sm border-t border-slate-800/30">
          <p>Designed & Built with ❤️ by Harish Jiji | © 2026</p>
        </footer>
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&display=swap');
        body { font-family: 'Space Grotesk', sans-serif; }
      `}</style>
    </div>
  );
};

export default App;
