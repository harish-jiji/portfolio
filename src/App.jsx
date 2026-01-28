import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, Code2, Database, Terminal, User, Briefcase, Cpu } from 'lucide-react';

const Hero = ({ setActiveSection }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center h-full text-center px-4"
    >
      <div className="mb-6 relative">
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary shadow-2xl relative z-10">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrFa6-vP8JydAzX2J372ZA4fMVLNf2WrMesYo_ur6jJ8OsfDhBg2MFfhomZrcXNQZqaOrzPCxztofFy6iwVahpwa5NjL-R7tt2rHRXUC88rtqE0CxKk_LKnWY9k9qeGaR4Wc6hEcd_gxBL2qw5sYOVHIu3eQFVHvnXLq3H8TpSNvSmzzLRNp_YI54VWddV0MUZQOvqJ-M8SxJfyxpbN_9IP8vqwFGH-hgytW43N8cpgQWCrKeo7Pk7LaKo1qfaoTKfFYlw8pJAafw"
            alt="Harish Jiji"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full -z-0"></div>
      </div>

      <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
        Hi, I'm Harish Jiji
      </h1>
      <h2 className="text-xl md:text-2xl text-primary font-medium mb-6">
        Full-Stack Developer
      </h2>
      <p className="text-gray-400 max-w-2xl text-lg mb-8 leading-relaxed">
        I build scalable web applications with <span className="text-white font-semibold">Python</span> & <span className="text-white font-semibold">React</span>.
        Passionate about clean code, efficient algorithms, and solving real-world problems.
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => setActiveSection('projects')}
          className="bg-primary hover:bg-blue-600 text-white px-8 py-3 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg shadow-primary/25"
        >
          View Projects
        </button>
        <button className="border border-gray-600 hover:border-white text-gray-300 hover:text-white px-8 py-3 rounded-full font-medium transition-all hover:bg-white/5">
          Download Resume
        </button>
      </div>
    </motion.div>
  );
};

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto h-full flex flex-col justify-center px-4"
    >
      <div className="bg-[#1b1f27] border border-gray-800 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <User size={120} />
        </div>

        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <span className="text-primary">01.</span> About Me
        </h2>

        <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
          <p>
            I am a Full-Stack Developer based in <span className="text-white">Kerala, India</span>, with a strong foundation in building dynamic web applications.
            My journey involves mastering both backend logic with <span className="text-primary">Python (Django, Flask)</span> and frontend interactivity using <span className="text-primary">React</span>.
          </p>
          <p>
            I enjoy transforming complex requirements into seamless digital experiences. Whether it's architecting a RESTful API or crafting a pixel-perfect UI,
            I bring a growth mindset and a commitment to quality in every line of code I write.
          </p>
          <div className="pt-4 grid grid-cols-2 gap-4">
            <div className="bg-background-dark/50 p-4 rounded-lg border border-gray-800">
              <h3 className="text-white font-bold mb-1">Location</h3>
              <p className="text-gray-400">Kerala, India</p>
            </div>
            <div className="bg-background-dark/50 p-4 rounded-lg border border-gray-800">
              <h3 className="text-white font-bold mb-1">Focus</h3>
              <p className="text-gray-400">Full-Stack Development</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend",
      icon: <Code2 className="text-blue-400" />,
      skills: ["React", "HTML5", "CSS3", "JavaScript", "Tailwind CSS", "Framer Motion"]
    },
    {
      title: "Backend",
      icon: <Database className="text-green-400" />,
      skills: ["Python", "Django", "Flask", "REST APIs", "PostgreSQL", "SQL"]
    },
    {
      title: "Tools & Others",
      icon: <Terminal className="text-yellow-400" />,
      skills: ["Git", "GitHub", "VS Code", "Postman", "Linux", "Netlify"]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto h-full flex flex-col justify-center px-4"
    >
      <h2 className="text-3xl font-bold mb-10 text-center">
        <span className="text-primary">02.</span> Technical Arsenal
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {skillCategories.map((category, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -5 }}
            className="bg-[#1b1f27] border border-gray-800 rounded-xl p-6 shadow-xl hover:border-primary/30 transition-colors group"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gray-800/50 rounded-lg group-hover:bg-primary/20 transition-colors">
                {category.icon}
              </div>
              <h3 className="text-xl font-bold text-white">{category.title}</h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="px-3 py-1 bg-background-dark text-gray-300 text-sm rounded-md border border-gray-800 group-hover:border-gray-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "Real-Time Missing Person Finder",
      desc: "An AI-powered platform utilizing Flask and REST APIs to help locate missing persons through real-time data processing.",
      stack: ["Flask", "Python", "AI", "REST API"],
      links: { github: "#", demo: "#" },
      featured: true
    },
    {
      title: "Rental House Portal",
      desc: "Real-estate aggregator with geolocation features allowing users to find and list rental properties seamlessy.",
      stack: ["React", "Django", "PostgreSQL", "Mapbox"],
      links: { github: "#", demo: "#" },
      featured: false
    },
    {
      title: "Movie Collection App",
      desc: "A responsive React application for cinephiles to browse, search, and curate their personal movie watchlists.",
      stack: ["React", "TMDB API", "Tailwind CSS"],
      links: { github: "#", demo: "#" },
      featured: false
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto h-full flex flex-col justify-center px-4 py-8"
    >
      <h2 className="text-3xl font-bold mb-8 text-center bg-background-dark/90 sticky top-0 py-4 z-10 md:static md:bg-transparent">
        <span className="text-primary">03.</span> Featured Projects
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto max-h-[70vh] md:max-h-none pr-2 custom-scrollbar">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className={`bg-[#1b1f27] border ${project.featured ? 'border-primary/50 ring-1 ring-primary/20' : 'border-gray-800'} rounded-xl p-6 flex flex-col h-full hover:transform hover:scale-[1.02] transition-all duration-300`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-gray-800/50 rounded-lg">
                <Briefcase size={20} className={project.featured ? "text-primary" : "text-gray-400"} />
              </div>
              <div className="flex gap-3">
                <a href={project.links.github} className="text-gray-400 hover:text-white transition-colors"><Github size={18} /></a>
                <a href={project.links.demo} className="text-gray-400 hover:text-white transition-colors"><ExternalLink size={18} /></a>
              </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
              {project.title}
            </h3>

            <p className="text-gray-400 text-sm mb-6 flex-grow leading-relaxed">
              {project.desc}
            </p>

            <div className="flex flex-wrap gap-2 mt-auto">
              {project.stack.map((tech, tIdx) => (
                <span key={tIdx} className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const Contact = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto h-full flex flex-col justify-center px-4 text-center"
    >
      <div className="text-primary mb-4 font-mono">04. What's Next?</div>
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Get In Touch</h2>
      <p className="text-gray-400 text-lg mb-10 leading-relaxed">
        I'm currently looking for new opportunities. Whether you have a question, a project to discuss, or just want to say hi, my inbox is always open!
      </p>

      <div className="flex justify-center gap-6 mb-12">
        <a href="mailto:harishjiji16@gmail.com" className="group flex flex-col items-center gap-2 text-gray-400 hover:text-primary transition-colors">
          <div className="p-4 bg-[#1b1f27] rounded-full border border-gray-800 group-hover:border-primary transition-colors">
            <Mail size={24} />
          </div>
          <span className="text-sm">Email</span>
        </a>
        <a href="#" className="group flex flex-col items-center gap-2 text-gray-400 hover:text-primary transition-colors">
          <div className="p-4 bg-[#1b1f27] rounded-full border border-gray-800 group-hover:border-primary transition-colors">
            <Github size={24} />
          </div>
          <span className="text-sm">GitHub</span>
        </a>
        <a href="#" className="group flex flex-col items-center gap-2 text-gray-400 hover:text-primary transition-colors">
          <div className="p-4 bg-[#1b1f27] rounded-full border border-gray-800 group-hover:border-primary transition-colors">
            <Linkedin size={24} />
          </div>
          <span className="text-sm">LinkedIn</span>
        </a>
      </div>

      <a
        href="mailto:harishjiji16@gmail.com"
        className="inline-block bg-primary hover:bg-blue-600 text-white px-8 py-3 rounded-full font-bold transition-all mx-auto shadow-lg shadow-primary/20"
      >
        Say Hello
      </a>
    </motion.div>
  );
};

function App() {
  const [activeSection, setActiveSection] = React.useState('hero');

  const navItems = [
    { id: 'hero', label: 'Home', icon: <Terminal size={18} /> },
    { id: 'about', label: 'About', icon: <User size={18} /> },
    { id: 'skills', label: 'Skills', icon: <Cpu size={18} /> },
    { id: 'projects', label: 'Projects', icon: <Briefcase size={18} /> },
    { id: 'contact', label: 'Contact', icon: <Mail size={18} /> },
  ];

  return (
    <div className="h-screen bg-background-dark text-slate-100 font-display overflow-hidden flex flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 pointer-events-none">
        <div className="bg-[#1b1f27]/90 backdrop-blur-md border border-gray-800 rounded-full p-1.5 shadow-2xl pointer-events-auto flex gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2
                ${activeSection === item.id
                  ? 'bg-primary text-white shadow-md'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'}
              `}
            >
              <span className="hidden md:block">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow relative w-full max-w-7xl mx-auto pt-24 pb-8 px-4 h-full">
        <AnimatePresence mode="wait">
          {activeSection === 'hero' && <Hero key="hero" setActiveSection={setActiveSection} />}
          {activeSection === 'about' && <About key="about" />}
          {activeSection === 'skills' && <Skills key="skills" />}
          {activeSection === 'projects' && <Projects key="projects" />}
          {activeSection === 'contact' && <Contact key="contact" />}
        </AnimatePresence>
      </main>

      {/* Footer Branding */}
      <div className="fixed bottom-4 left-0 right-0 text-center text-xs text-gray-600 pointer-events-none">
        Designed & Built by Harish Jiji
      </div>
    </div>
  );
}

export default App;
