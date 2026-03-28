import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ExternalLink, Github, Linkedin, Mail, Instagram, ArrowRight, Code2, User, MessageSquare, Send, CheckCircle2, Home, Briefcase } from 'lucide-react';
import styled from 'styled-components';
import NotFound from './components/NotFound';

const CarouselWrapper = styled.div`
  .wrapper {
    width: 100%;
    height: 100%;
    min-height: 450px;
    position: relative;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    cursor: grab;
  }

  .wrapper:active {
    cursor: grabbing;
  }

  .card-3d-container {
    position: relative;
    width: clamp(200px, 20vw, 300px);
    height: clamp(250px, 25vw, 350px);
    transform-style: preserve-3d;
    transform: perspective(1000px);
    will-change: transform;
    margin: 0 auto;
  }

  .card-carousel {
    position: absolute;
    width: 140px;
    height: 190px;
    background-color: rgba(15, 23, 42, 0.95);
    border: solid 2px rgba(var(--colorCard), 0.5);
    border-radius: 1rem;
    top: 50%;
    left: 50%;
    transform-origin: center center;
    transform: translate(-50%, -50%) rotateY(calc((360deg / var(--quantity)) * var(--index))) translateZ(280px);
    transition: box-shadow 0.3s, border-color 0.3s, scale 0.3s;
    will-change: transform;
    cursor: pointer;
    backdrop-filter: blur(5px);
    z-index: 10;
    overflow: hidden;

    @media (min-width: 768px) {
      width: 190px;
      height: 260px;
      transform: translate(-50%, -50%) rotateY(calc((360deg / var(--quantity)) * var(--index))) translateZ(400px);
    }
  }

  .img-carousel {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1.5rem;
    text-align: center;
    border-radius: 0.8rem; /* slightly less than outer radius */
  }
`;

const DetailCardWrapper = styled.div`
  .card {
   --background: linear-gradient(to left, #2b82f7 0%, #ea539e 100%);
   width: 350px;
   min-height: 480px;
   padding: 5px;
   border-radius: 1rem;
   overflow: visible;
   background: #2b82f7;
   background: var(--background);
   position: relative;
   z-index: 1;
  }

  .card::after {
   position: absolute;
   content: "";
   top: 30px;
   left: 0;
   right: 0;
   z-index: -1;
   height: 100%;
   width: 100%;
   transform: scale(0.9);
   filter: blur(35px);
   background: #2b82f7;
   background: var(--background);
   transition: opacity .5s;
  }

  .card-info {
   --color: #0f172a;
   background: var(--color);
   display: flex;
   flex-direction: column;
   padding: 1.5rem;
   width: 100%;
   height: 100%;
   overflow: hidden;
   border-radius: .7rem;
   color: white;
  }

  /*Hover*/
  .card:hover::after {
   opacity: 0.5;
  }

  .card .title-magic {
   font-weight: 900;
   font-size: 1.5rem;
   letter-spacing: .05em;
   background: var(--background);
   -webkit-background-clip: text;
   -webkit-text-fill-color: transparent;
   margin-bottom: 1rem;
   text-transform: uppercase;
  }
`;

const ExploreButtonWrapper = styled.div`
  flex: 1;
  .explore-btn {
    width: 100%;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;
    background-color: rgb(161, 255, 20);
    border-radius: 12px;
    color: rgb(19, 19, 19);
    font-weight: 700;
    text-transform: uppercase;
    font-size: 10px;
    border: none;
    position: relative;
    cursor: pointer;
    transition: all .5s;
    box-shadow: 0 10px 15px -3px rgba(161, 255, 20, 0.2);
    padding-left: 12px;
  }

  .svgIcon {
    height: 24px;
    transition-duration: 1.5s;
    fill: rgb(19, 19, 19);
  }

  .explore-btn:hover {
    background-color: rgb(192, 255, 20);
    box-shadow: 0 20px 25px -5px rgba(161, 255, 20, 0.3);
  }

  .explore-btn:active {
    transform: scale(0.97);
  }

  .explore-btn:hover .svgIcon {
    transform: rotate(250deg);
  }
`;

const StyledLoader = styled.div`
  .svg-frame {
    position: relative;
    width: 300px;
    height: 300px;
    transform-style: preserve-3d;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .svg-frame svg {
    position: absolute;
    transition: .5s;
    z-index: calc(1 - (0.2 * var(--j)));
    transform-origin: center;
    width: 344px;
    height: 344px;
    fill: none;
  }

  .svg-frame:hover svg {
    transform: rotate(-80deg) skew(30deg) translateX(calc(45px * var(--i))) translateY(calc(-35px * var(--i)));
  }

  .svg-frame svg #center {
    transition: .5s;
    transform-origin: center;
  }

  .svg-frame:hover svg #center {
    transform: rotate(-30deg) translateX(45px) translateY(-3px);
  }

  #out2 {
    animation: rotate16 7s ease-in-out infinite alternate;
    transform-origin: center;
  }

  #out3 {
    animation: rotate16 3s ease-in-out infinite alternate;
    transform-origin: center;
    stroke: #00ffff;
  }

  #inner3,
  #inner1 {
    animation: rotate16 4s ease-in-out infinite alternate;
    transform-origin: center;
  }

  #center1 {
    fill: #00ffff;
    animation: rotate16 2s ease-in-out infinite alternate;
    transform-origin: center;
  }

  @keyframes rotate16 {
    to {
      transform: rotate(360deg);
    }
  }
`;

const ContactFormWrapper = styled.div`
  .input-group {
    position: relative;
    margin-bottom: 1.5rem;
  }

  .input-field {
    width: 100%;
    padding: 12px 16px 12px 48px;
    background: rgba(30, 41, 59, 0.4);
    border: 1px solid rgba(148, 163, 184, 0.2);
    border-radius: 12px;
    color: white;
    outline: none;
    transition: all 0.3s ease;
    backdrop-filter: blur(8px);
    font-size: 0.95rem;
  }

  .input-field:focus {
    border-color: #22d3ee;
    box-shadow: 0 0 15px rgba(34, 211, 238, 0.2);
    background: rgba(30, 41, 59, 0.6);
  }

  .input-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: #94a3b8;
    transition: all 0.3s ease;
    pointer-events: none;
  }

  .input-field:focus + .input-icon {
    color: #22d3ee;
  }

  .textarea-field {
    min-height: 120px;
    resize: none;
    padding-top: 16px;
  }

  .textarea-icon {
    top: 24px;
    transform: none;
  }

  .submit-btn {
    width: 100%;
    padding: 14px;
    background: linear-gradient(90deg, #3b82f6, #06b6d4);
    border: none;
    border-radius: 12px;
    color: white;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    overflow: hidden;
    position: relative;
  }

  .submit-btn:hover:not(:disabled) {
    box-shadow: 0 10px 20px -10px rgba(6, 182, 212, 0.5);
    transform: translateY(-2px);
    filter: brightness(1.1);
  }

  .submit-btn:active:not(:disabled) {
    transform: scale(0.98);
  }

  .submit-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .btn-text {
    position: relative;
    z-index: 1;
  }

  .success-message {
    animation: slideIn 0.3s ease-out;
  }

  @keyframes slideIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const Loader = () => {
  return (
    <StyledLoader>
      <div className="svg-frame">
        <svg style={{ '--i': 0, '--j': 0 }}>
          <g id="out1">
            <path d="M72 172C72 116.772 116.772 72 172 72C227.228 72 272 116.772 272 172C272 227.228 227.228 272 172 272C116.772 272 72 227.228 72 172ZM197.322 172C197.322 158.015 185.985 146.678 172 146.678C158.015 146.678 146.678 158.015 146.678 172C146.678 185.985 158.015 197.322 172 197.322C185.985 197.322 197.322 185.985 197.322 172Z" />
            <path strokeMiterlimit={16} strokeWidth={2} stroke="#00FFFF" d="M72 172C72 116.772 116.772 72 172 72C227.228 72 272 116.772 272 172C272 227.228 227.228 272 172 272C116.772 272 72 227.228 72 172ZM197.322 172C197.322 158.015 185.985 146.678 172 146.678C158.015 146.678 146.678 158.015 146.678 172C146.678 185.985 158.015 197.322 172 197.322C185.985 197.322 197.322 185.985 197.322 172Z" />
          </g>
        </svg>
        <svg style={{ '--i': 1, '--j': 1 }}>
          <g id="out2">
            <path fill="#00FFFF" d="M102.892 127.966L105.579 123.75L101.362 121.063L98.6752 125.28L102.892 127.966ZM90.2897 178.19L85.304 178.567L85.6817 183.553L90.6674 183.175L90.2897 178.19ZM94.3752 177.88L94.7529 182.866L99.7386 182.488L99.3609 177.503L94.3752 177.88ZM106.347 130.168L110.564 132.855L113.251 128.638L109.034 125.951L106.347 130.168ZM93.3401 194.968L91.9387 190.168L87.1391 191.569L88.5405 196.369L93.3401 194.968ZM122.814 237.541L119.813 241.54L123.812 244.541L126.813 240.542L122.814 237.541ZM125.273 234.264L129.272 237.265L132.273 233.266L128.274 230.265L125.273 234.264ZM97.2731 193.819L102.073 192.418L100.671 187.618L95.8717 189.02L97.2731 193.819ZM152.707 92.3592L157.567 91.182L156.389 86.3226L151.53 87.4998L152.707 92.3592ZM119.097 109.421L115.869 105.603L112.05 108.831L115.278 112.649L119.097 109.421ZM121.742 112.55L117.924 115.778L121.152 119.596L124.97 116.368L121.742 112.55ZM153.672 96.3413L154.849 101.201L159.708 100.023L158.531 95.1641L153.672 96.3413ZM253.294 161.699L258.255 161.07L257.626 156.11L252.666 156.738L253.294 161.699ZM247.59 203.639L245.66 208.251L250.272 210.182L252.203 205.569L247.59 203.639ZM243.811 202.057L239.198 200.126L237.268 204.739L241.88 206.669L243.811 202.057ZM249.23 162.214L248.601 157.253L243.641 157.882L244.269 162.842L249.23 162.214ZM172 90.0557V85.0557H167V90.0557H172ZM208.528 98.6474L206.299 103.123L206.299 103.123L208.528 98.6474ZM237.396 122.621L240.409 126.611L244.399 123.598L241.386 119.608L237.396 122.621ZM234.126 125.09L230.136 128.103L233.149 132.093L237.139 129.08L234.126 125.09ZM206.701 102.315L204.473 106.791L204.473 106.791L206.701 102.315ZM172 94.1529H167V99.1529H172V94.1529ZM244.195 133.235L248.601 130.87L246.235 126.465L241.83 128.83L244.195 133.235ZM250.83 149.623L252.195 154.433L257.005 153.067L255.64 148.257L250.83 149.623ZM246.888 150.742L242.078 152.107L243.444 156.917L248.254 155.552L246.888 150.742ZM240.586 135.174L238.22 130.768L233.815 133.134L236.181 137.539L240.586 135.174ZM234.238 225.304L238.036 228.556L241.288 224.759L237.491 221.506L234.238 225.304ZM195.159 250.604L196.572 255.4L196.572 255.4L195.159 250.604ZM148.606 250.534L143.814 249.107L142.386 253.899L147.178 255.326L148.606 250.534ZM149.775 246.607L151.203 241.816L146.411 240.388L144.983 245.18L149.775 246.607ZM194.001 246.674L195.415 251.47L195.415 251.47L194.001 246.674ZM231.126 222.639L234.379 218.841L230.581 215.589L227.329 219.386L231.126 222.639Z" />
          </g>
        </svg>
        <svg style={{ '--i': 0, '--j': 2 }}>
          <g id="inner3">
            <path fill="#00FFFF" d="M195.136 135.689L195.474 135.904L195.689 135.566L195.351 135.352L195.136 135.689ZM171.624 128.946L171.627 129.346L171.624 128.946ZM148.232 136.099L148.011 135.765L147.678 135.986L147.899 136.32L148.232 136.099Z" />
          </g>
          <path stroke="#00FFFF" fill="none" d="M240.944 172C240.944 187.951 235.414 203.408 225.295 215.738C215.176 228.068 201.095 236.508 185.45 239.62" id="out3" />
        </svg>
        <svg style={{ '--i': 1, '--j': 3 }}>
          <g id="inner1">
            <path fill="#00FFFF" d="M145.949 124.51L148.554 129.259C156.575 124.859 165.672 122.804 174.806 123.331C183.94 123.858 192.741 126.944 200.203 132.236C207.665 137.529 213.488 144.815 217.004 153.261C220.521 161.707 221.59 170.972 220.09 179.997L224.108 180.665L224.102 180.699L229.537 181.607C230.521 175.715 230.594 169.708 229.753 163.795L225.628 164.381C224.987 159.867 223.775 155.429 222.005 151.179C218.097 141.795 211.628 133.699 203.337 127.818C195.045 121.937 185.266 118.508 175.118 117.923C165.302 117.357 155.525 119.474 146.83 124.037Z" clipRule="evenodd" fillRule="evenodd" />
          </g>
        </svg>
        <svg style={{ '--i': 2, '--j': 4 }}>
          <path fill="#00FFFF" d="M180.956 186.056C183.849 184.212 186.103 181.521 187.41 178.349C188.717 175.177 189.013 171.679 188.258 168.332C187.503 164.986 185.734 161.954 183.192 159.65C180.649 157.346 177.458 155.883 174.054 155.46C170.649 155.038 167.197 155.676 164.169 157.288C161.14 158.9 158.683 161.407 157.133 164.468C155.582 167.528 155.014 170.992 155.505 174.388C155.997 177.783 157.524 180.944 159.879 183.439L161.129 182.259C159.018 180.021 157.648 177.186 157.207 174.141C156.766 171.096 157.276 167.989 158.667 165.245C160.057 162.5 162.261 160.252 164.977 158.806Z" id="center1" />
          <path fill="#00FFFF" d="M172 166.445C175.068 166.445 177.556 168.932 177.556 172C177.556 175.068 175.068 177.556 172 177.556C168.932 177.556 166.444 175.068 166.444 172Z" id="center" />
        </svg>
      </div>
    </StyledLoader>
  );
}

const App = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [readMore, setReadMore] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Carousel 3D Rotation State
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [spinSpeed, setSpinSpeed] = useState(0.8); // Speed of auto-rotation
  const [dragVelocity, setDragVelocity] = useState(0); // For inertia

  useEffect(() => {
    if (projects.length === 0) return;
    let animationFrameId;

    const rotate = () => {
      if (autoRotate && !isDragging) {
        setRotation(prev => prev - spinSpeed);
      } else if (!isDragging && Math.abs(dragVelocity) > 0.01) {
        // Apply inertia after letting go
        setRotation(prev => prev - dragVelocity);
        setDragVelocity(prev => prev * 0.95); // Friction
      }
      animationFrameId = requestAnimationFrame(rotate);
    };

    animationFrameId = requestAnimationFrame(rotate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [autoRotate, projects, spinSpeed, isDragging, dragVelocity]);

  const handleDragStart = (e) => {
    setIsDragging(true);
    setAutoRotate(false);
    setDragVelocity(0);
    setStartX(e.type.includes('mouse') ? e.pageX : e.touches[0].pageX);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
    const diff = currentX - startX;
    setRotation(prev => prev + diff * 0.5); // Sensitivity of drag
    setDragVelocity(-diff * 0.5); // Set velocity for inertia
    setStartX(currentX);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    // Auto rotate will gently take over once inertia slows down, or we could just set it to true.
    // Let's set autoRotate true and let the velocity decay.
    setAutoRotate(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    /**
     * GOOGLE FORM LINKING:
     * 1. Go to your Google Form preview/live page.
     * 2. Replace the FORM_ID below with the ID from your URL.
     * 3. The entry.xxxx IDs are extracted from your DOM dump.
     */
    const FORM_ID = '1FAIpQLSdSeCa5OtI6KlmthfVqgMnW1WJLDNxFoHrtyR4i-MStbVnQgg'; 
    const GOOGLE_FORM_URL = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`;

    const queryParams = new URLSearchParams();
    queryParams.append('entry.1822658888', formData.name);
    queryParams.append('entry.1410136296', formData.email);
    queryParams.append('entry.1739050397', formData.message);

    try {
      await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: queryParams.toString()
      });
      
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      // Removed auto-reset of success status to allow user to see confirmation
    } catch (error) {
      console.error('Submission error:', error);
      setIsSubmitting(false);
      // In 'no-cors' mode, we usually assume success if it didn't crash
      setSubmitStatus('success');
    }
  };

  const handleTabChange = (id) => {
    if (activeTab === id || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(id);
      setSelectedProject(null);
      setMobileOpen(false);
      setIsTransitioning(false);
    }, 600);
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'skills', label: 'Skills', icon: Code2 },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  const skills = [
    { category: 'Frontend', items: ['React', 'HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS', 'Framer Motion'] },
    { category: 'Backend', items: ['Python', 'Django', 'Flask', 'REST APIs', 'PostgreSQL', 'Firebase', 'SQL'] },
    { category: 'Tools', items: ['Git', 'GitHub', 'VS Code', 'Postman', 'Linux', 'Netlify'] }
  ];
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectError, setProjectError] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const CACHE_KEY = 'portfolio_github_projects';
        const CACHE_EXPIRY = 60 * 60 * 1000; // 1 hour

        // 1. Check if we have valid cached data
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
          try {
            const { data, timestamp } = JSON.parse(cachedData);
            if (Date.now() - timestamp < CACHE_EXPIRY) {
              setProjects(data);
              setLoadingProjects(false);
              return;
            }
          } catch (e) {
            console.error('Failed to parse cached project data');
          }
        }

        // 2. Fetch from API if no valid cache
        const res = await fetch(
          'https://api.github.com/users/harish-jiji/repos?sort=updated&per_page=12'
        );
        const data = await res.json();

        if (!res.ok || !Array.isArray(data)) {
          console.error('GitHub API error (Rate limit?):', data);
          // If we have stale cache, use it as a fallback when rate limited
          if (cachedData) {
            try {
              const { data: staleData } = JSON.parse(cachedData);
              if (staleData && staleData.length > 0) {
                setProjects(staleData);
                setProjectError(false);
                return;
              }
            } catch (e) {}
          }
          setProjects([]);
          setProjectError(true);
          return;
        }

        const filteredRepos = data.filter(
          repo =>
            repo.name.toLowerCase() !== 'portfolio' &&
            !repo.fork
        );

        const projectsWithLanguages = await Promise.all(
          filteredRepos.map(async (repo) => {
            // Assign a color based on title hash for the carousel
            const colors = [
              '142, 249, 252', '142, 252, 204', '142, 252, 157', '215, 252, 142', 
              '252, 252, 142', '252, 208, 142', '252, 142, 142', '252, 142, 239',
              '204, 142, 252', '142, 202, 252'
            ];
            const color = colors[Math.abs(repo.name.length) % colors.length];

            let allLangs = [];
            try {
              const langRes = await fetch(repo.languages_url);
              if (langRes.ok) {
                const langData = await langRes.json();
                allLangs = Object.keys(langData).slice(0, 4); // Limit to top 4 for UI
              } else {
                allLangs = [repo.language].filter(Boolean);
              }
            } catch (e) {
              allLangs = [repo.language].filter(Boolean);
            }

            return {
              repoName: repo.name,
              title: repo.name.replace(/[-_]/g, ' '),
              description: repo.description || 'No description provided.',
              github: repo.html_url,
              link: repo.homepage || null,
              tech: allLangs,
              color: color,
              stars: repo.stargazers_count,
              forks: repo.forks_count,
              updatedAt: new Date(repo.updated_at).toLocaleDateString()
            };
          })
        );

        // 3. Save successful fetch to local storage
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          data: projectsWithLanguages,
          timestamp: Date.now()
        }));

        setProjects(projectsWithLanguages);
        setProjectError(false);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
        setProjectError(true);
      } finally {
        setLoadingProjects(false);
      }
    };

    fetchProjects();
  }, []);

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, scale: 0.95 },
    in: { opacity: 1, scale: 1 },
    out: { opacity: 0, scale: 1.05 }
  };

  const pageTransition = {
    type: 'spring',
    stiffness: 100,
    damping: 20
  };

  return (
    <div className="bg-slate-950 text-white font-sans h-screen w-full overflow-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Navbar (Hidden on Mobile) */}
      <nav className="hidden md:block fixed top-0 w-full z-50 backdrop-blur-md bg-slate-950/50 border-b border-slate-800/50 h-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <div
              className="flex-shrink-0 cursor-pointer"
              onClick={() => handleTabChange('home')}
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
                  onClick={() => handleTabChange(item.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${activeTab === item.id ? 'bg-slate-800/80 text-cyan-400' : 'hover:bg-slate-800/50 hover:text-cyan-400'}`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button - Removed in favor of bottom nav */}
            {/* <button
              className="md:hidden text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button> */}
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-slate-950/95 backdrop-blur-md border-t border-slate-800/50 pb-safe">
        <div className="flex justify-around items-center px-2 py-2">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`flex flex-col items-center justify-center w-full py-2 transition-colors ${isActive ? 'text-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <div className={`transition-transform duration-300 ${isActive ? '-translate-y-1' : ''}`}>
                  <Icon size={22} className={isActive ? 'drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' : ''} />
                </div>
                <span className={`text-[9px] mt-1 font-bold tracking-wider uppercase transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area - Scrollable Container for Content only */}
      <main className="relative z-10 w-full h-full pt-4 md:pt-20 pb-20 md:pb-0 overflow-y-auto overflow-x-hidden">
        <AnimatePresence mode="wait">
          {isTransitioning ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center p-4 absolute z-50 bg-slate-950/80 backdrop-blur-sm"
            >
              <Loader />
            </motion.div>
          ) : (
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
                      onClick={() => handleTabChange('projects')}
                      className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl font-semibold hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 text-white"
                    >
                      View My Projects
                    </button>
                    <a
                      href="/Harish_Jiji_Resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-4 bg-slate-800/50 border-2 border-slate-700 rounded-xl font-semibold hover:bg-slate-800 hover:border-cyan-400 transition-all duration-300 text-white inline-block cursor-pointer flex items-center justify-center gap-2"
                    >
                      <ExternalLink size={20} />
                      View Resume
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
              className="min-h-[calc(100vh-80px)] w-full flex flex-col items-center justify-center px-4 py-8 md:py-12 overflow-hidden"
            >
              <div className="w-full flex-1 flex flex-col items-center justify-center max-w-7xl mx-auto">
                {!selectedProject && (
                  <h2 className="text-4xl md:text-5xl font-black mb-12 text-white">
                    Featured <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Projects</span>
                  </h2>
                )}

                {loadingProjects ? (
                  <div className="py-12 w-full flex justify-center">
                    <Loader />
                  </div>
                ) : selectedProject ? (
                  // Detailed Project View (Second Design)
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full flex flex-col items-center"
                  >
                    <button
                      onClick={() => {
                        setSelectedProject(null);
                        setReadMore(false);
                      }}
                      className="mb-8 flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors"
                    >
                      <X size={20} />
                      Back to Gallery
                    </button>

                    <DetailCardWrapper className="w-full h-full md:max-w-xl mx-auto flex items-center justify-center">
                      <div className="card shadow-2xl w-[90%] md:w-[400px]">
                        <div className="card-info">
                          <div className="flex justify-between items-start mb-4">
                            <Github 
                              size={28} 
                              className="text-slate-400 hover:text-white cursor-pointer transition-colors" 
                              onClick={() => window.open('https://github.com/harish-jiji', '_blank')}
                            />
                            <div className="flex gap-3">
                              <Code2 size={24} className="text-cyan-500" />
                            </div>
                          </div>

                          <h3 className="text-slate-500 text-[10px] font-mono tracking-widest mb-1">REPOSITORY</h3>
                          <h3 className="title-magic">{selectedProject.repoName}</h3>
                          
                          <div className="mb-4">
                            <p className={`text-slate-400 text-sm leading-relaxed overflow-hidden transition-all ${!readMore ? 'max-h-24' : 'max-h-96 overflow-y-auto'}`}>
                              {selectedProject.description}
                            </p>
                            {selectedProject.description.length > 100 && (
                              <button 
                                onClick={() => setReadMore(!readMore)}
                                className="text-cyan-400 text-[11px] font-bold mt-2 hover:underline tracking-tighter"
                              >
                                {readMore ? 'SHOW LESS ▲' : 'READ COMPLETE DESCRIPTION ▼'}
                              </button>
                            )}
                          </div>

                          <div className="mb-8">
                            <h4 className="text-slate-500 text-[9px] uppercase tracking-wider mb-3">Tech Stack (Detected Languages)</h4>
                            <div className="flex flex-wrap gap-x-4 gap-y-3">
                              {selectedProject.tech.length > 0 ? (
                                selectedProject.tech.map((t, idx) => (
                                  <span key={idx} className="text-[12px] font-bold text-white flex items-center gap-1.5 bg-slate-800/80 px-2 py-1 rounded border border-slate-700">
                                    <span className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_#06b6d4]" />
                                    {t}
                                  </span>
                                ))
                              ) : (
                                <span className="text-[11px] text-slate-500 italic">No language data detected</span>
                              )}
                            </div>
                          </div>

                          <div className="mt-auto flex gap-3">
                            <ExploreButtonWrapper>
                              <button 
                                className="explore-btn"
                                onClick={() => window.open(selectedProject.github, '_blank')}
                              >
                                <svg className="svgIcon" viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
                                </svg>
                                Explore Code
                              </button>
                            </ExploreButtonWrapper>
                            {selectedProject.link ? (
                              <a 
                                href={selectedProject.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl text-xs font-bold text-center transition-all shadow-lg shadow-blue-500/20"
                              >
                                LIVE PREVIEW
                              </a>
                            ) : (
                              <div className="flex-1 py-3 bg-slate-900/50 text-slate-600 rounded-xl text-[10px] font-bold text-center border border-slate-800 flex items-center justify-center px-1">
                                PROJECT NOT YET LIVE
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </DetailCardWrapper>
                  </motion.div>
                ) : (
                  // Carousel View (First Design)
                  <CarouselWrapper className="w-full h-[500px] flex items-center justify-center">
                    <div 
                      className="wrapper"
                      onMouseDown={handleDragStart}
                      onMouseMove={handleDragMove}
                      onMouseUp={handleDragEnd}
                      onMouseLeave={handleDragEnd}
                      onTouchStart={handleDragStart}
                      onTouchMove={handleDragMove}
                      onTouchEnd={handleDragEnd}
                    >
                      <div 
                        className="card-3d-container" 
                        style={{ 
                          '--quantity': projects.length,
                          transform: `perspective(1000px) rotateY(${rotation}deg)` 
                        }}
                      >
                        {projects.map((project, i) => (
                          <div
                            key={i}
                            className="card-carousel"
                            style={{ 
                              '--index': i, 
                              '--colorCard': project.color,
                              '--quantity': projects.length 
                            }}
                            onClick={(e) => {
                              // If they dragged, prevent clicking the card
                              if (Math.abs(dragVelocity) > 2) return;
                              setSelectedProject(project);
                            }}
                            onMouseEnter={() => autoRotate && setAutoRotate(false)}
                            onMouseLeave={() => !isDragging && setAutoRotate(true)}
                          >
                            <div className="img-carousel">
                              <h3 className="text-[14px] md:text-[16px] font-black text-white uppercase tracking-tight line-clamp-2 px-1 mb-2">
                                {project.title}
                              </h3>
                              <div className="mt-1 flex flex-wrap justify-center gap-1">
                                {project.tech.slice(0, 3).map((t, idx) => (
                                  <span key={idx} className="text-[9px] px-2 py-0.5 bg-cyan-500/20 text-cyan-400 rounded-full border border-cyan-500/30">
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CarouselWrapper>
                )}

                {!loadingProjects && (projectError || projects.length === 0) && (
                  <div className="w-full flex-1 flex items-center justify-center -mx-4">
                    <NotFound />
                  </div>
                )}
                
                {!selectedProject && projects.length > 0 && !projectError && (
                   <p className="mt-12 text-slate-500 text-sm animate-bounce flex items-center gap-2">
                     <ArrowRight size={16} className="rotate-90" />
                     Click a card to see details
                   </p>
                )}
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

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                  {/* Contact Form Container */}
                  <ContactFormWrapper>
                    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-8 backdrop-blur h-full flex flex-col min-h-[450px]">
                      <AnimatePresence mode="wait">
                        {submitStatus === 'success' ? (
                          <motion.div
                            key="success"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="flex-1 flex flex-col items-center justify-center text-center space-y-6"
                          >
                            <div className="w-20 h-20 bg-cyan-500/10 rounded-full flex items-center justify-center text-cyan-400 border border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                              <CheckCircle2 size={48} />
                            </div>
                            <div className="space-y-2">
                              <h3 className="text-3xl font-black text-white">Thank You!</h3>
                              <p className="text-slate-400 max-w-[280px] mx-auto">Your message has been received. I'll get back to you soon.</p>
                            </div>
                            <button
                              onClick={() => setSubmitStatus(null)}
                              className="px-8 py-3 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 rounded-xl text-xs font-bold text-cyan-400 transition-all uppercase tracking-widest"
                            >
                              Send Another Message
                            </button>
                          </motion.div>
                        ) : (
                          <motion.form
                            key="form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onSubmit={handleSubmit}
                            className="flex-1 flex flex-col"
                          >
                            <h3 className="text-2xl font-bold text-white mb-8">Send a Message</h3>
                            
                            <div className="input-group">
                              <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Your Name"
                                required
                                className="input-field"
                              />
                              <User className="input-icon" size={20} />
                            </div>

                            <div className="input-group">
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Your Gmail Address"
                                required
                                className="input-field"
                              />
                              <Mail className="input-icon" size={20} />
                            </div>

                            <div className="input-group">
                              <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                placeholder="How can I help you?"
                                required
                                className="input-field textarea-field"
                              ></textarea>
                              <MessageSquare className="input-icon textarea-icon" size={20} />
                            </div>

                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="submit-btn group py-4 mt-auto"
                            >
                              {isSubmitting ? (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              ) : (
                                <>
                                  <span className="btn-text">Send Message</span>
                                  <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </>
                              )}
                            </button>
                          </motion.form>
                        )}
                      </AnimatePresence>
                    </div>
                  </ContactFormWrapper>

                  {/* Social Profiles */}
                  <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-8 backdrop-blur flex flex-col h-full">
                    <h3 className="text-2xl font-bold text-white mb-8">Quick Links</h3>
                    <div className="grid grid-cols-2 gap-4 flex-1">
                      {[
                        { icon: Github, label: 'GitHub', href: 'https://github.com/harish-jiji', color: 'hover:border-slate-400 hover:text-slate-100 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]' },
                        { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/harish-jiji/', color: 'hover:border-blue-400 hover:text-blue-400 hover:shadow-[0_0_15px_rgba(59,130,246,0.1)]' },
                        { icon: Mail, label: 'Email', href: 'mailto:harishjiji16@gmail.com', color: 'hover:border-red-400 hover:text-red-400 hover:shadow-[0_0_15px_rgba(239,68,68,0.1)]' },
                        { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/h___a__r___i__?igsh=MWVhOWNqbmh4bjlxMg==', color: 'hover:border-pink-500 hover:text-pink-500 hover:shadow-[0_0_15px_rgba(236,72,153,0.1)]' }
                      ].map((item, i) => (
                        <a
                          key={i}
                          href={item.href}
                          target={item.href.startsWith('mailto') ? "" : "_blank"}
                          rel={item.href.startsWith('mailto') ? "" : "noopener noreferrer"}
                          className={`flex flex-col items-center justify-center p-6 bg-slate-800/30 border border-slate-700/50 rounded-xl transition-all group ${item.color} cursor-pointer hover:bg-slate-800/60`}
                        >
                          <item.icon size={32} className="mb-3 text-slate-400 group-hover:scale-110 transition-transform" />
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
          )}
        </AnimatePresence>

        {/* Persistent Footer if needed, but active section handles content */}
        <footer className="w-full py-6 text-center text-slate-500 text-sm border-t border-slate-800/30">
          <p>© 2026 Harish Jiji · Full-Stack Developer</p>
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
