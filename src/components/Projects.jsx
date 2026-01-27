import React from 'react';

const Projects = () => {
    const projects = [
        {
            id: '#001',
            title: 'Movie Collection App',
            description: '"""A React-based library for cinephiles to curate their watchlist."""',
            stack: ["'React'", "'TMDB API'", "'Tailwind'"],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAjg4WrPQBTqsqN-onYs8bxvA2wEoFFJMFQSpaE2Pij1rH7g6mbwRxNY0Lj42xBZa7Vd-vOdyNm9vFi3irQnlibkRpIYk8WoRcyDIJJnuiXe9zPASaxIetPFcht4IA-LyC5Aj-_ksdBklXvpb-5NUZBQdHiaLhU6cm6I2qNPVq2dCzMJsLbcaKnZ4D0YSgZxtG06El9ZPdPoRNaR2T74IZFqzZr7nFWrK_jE4PK-HrF4Azogno84F5f1gSC31gipGLAkBO4gi5z_n8"
        },
        {
            id: '#002',
            title: 'Rental House Portal',
            description: '"""Real-estate aggregator with geolocation and 3D tours."""',
            stack: ["'Next.js'", "'Mapbox'", "'PostgreSQL'"],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCl02as54KCqRY8Ij7XLOVNIsZlvRuonO-LbP_AYuYArtXcXwGUWWhZYPou6_I4msY6ihLR_giapp2v1HHERzIT0MX-_FZAPDiH2QG-x3quo9c9_fEIf8jLfUY4RwM6j_kXCdDHd-IycykAwHSIee84iPY8NZYaq_2k6Lu56oYgW9Ma5rAeF1gNlunaLn6BC660AzeLU-TcBFLA4cctRz733lb1PTUyP5cB3aVQd9WHXPjrsQOrI2gEN6RdsnVOsMRxLet3q5qhCBo"
        },
        {
            id: '#003',
            title: "Chef's Cafe Branding",
            description: '"""Visual identity, logo design, and responsive web presence."""',
            stack: ["'Figma'", "'Adobe XD'", "'Webflow'"],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhBsN8_wrP2AQGYfLYJO5vq_KTQeK4KdSJKZR-V_0XGBUU7IsnIsKqa11HWDoplK2vsprAaqMSPRYxbVqyoHI_wQh6L09XjXIGZgrDyGeuClQuWDjZLPPE42IfQx5-nFQmHo2zNwrR6x9ZYbqgRh76s_aYd831dTXKfjn0p2fecNoS8NoUvxLJfWJM_Vgg-5t9ktDmQiXuG3hlta9z1eLS9xJdRr4UVBNwKUNjrHPTaS8xg2SBkDJ9t-HYguaYYqF6b9TJ9KIDIJ8"
        }
    ];

    return (
        <section id="projects" className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white overflow-hidden min-h-screen flex flex-col py-8 px-4 md:px-6">
            <main className="flex-1 w-full max-w-[1200px] mx-auto flex gap-6">
                {/* Gutter */}
                <div className="hidden md:flex flex-col items-end gap-[2px] text-slate-600 font-mono text-sm select-none w-12 pt-2 opacity-50 border-r border-[#282e39] pr-4">
                    {Array.from({ length: 30 }, (_, i) => <span key={i}>{22 + i}</span>)}
                </div>

                <div className="flex-1 flex flex-col gap-10">
                    {/* Header */}
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-white">
                            <span className="text-syntax-keyword">def</span> <span className="text-yellow-400">My_Work</span>():
                        </h1>
                        <p className="text-syntax-comment pl-4 md:pl-8 text-lg font-mono">
                            # Selected projects demonstrating full-stack capabilities
                        </p>
                    </div>

                    {/* Project Stack */}
                    <div className="flex flex-col gap-8 border-l border-[#282e39] ml-4 md:ml-8 pl-4 md:pl-8 relative pb-10">
                        {projects.map((project, index) => (
                            <article key={index} className="group relative bg-[#1b1f27] border border-[#282e39] rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 shadow-lg">
                                <div className="flex flex-col lg:flex-row">
                                    <div className="w-full lg:w-2/5 relative h-64 lg:h-auto overflow-hidden">
                                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url("${project.image}")` }}></div>
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#1b1f27]/80 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#1b1f27]"></div>
                                    </div>
                                    <div className="flex-1 p-6 flex flex-col gap-4 justify-between">
                                        <div>
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">{project.title}</h3>
                                                <span className="text-slate-500 text-xs font-mono">ID: {project.id}</span>
                                            </div>
                                            <p className="text-syntax-string font-mono text-sm md:text-base mb-4 block">
                                                {project.description}
                                            </p>
                                            <div className="font-mono text-sm text-slate-400 bg-[#111318] p-3 rounded-lg border border-[#282e39]">
                                                <span className="text-primary">stack</span> = [<span className="text-syntax-string">{project.stack.map((tech, i) => (
                                                    <span key={i}>{tech}{i < project.stack.length - 1 ? ', ' : ''}</span>
                                                ))}</span>]
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-4 mt-2">
                                            <button className="flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-[0_0_15px_rgba(13,89,242,0.3)] hover:shadow-[0_0_20px_rgba(13,89,242,0.5)]">
                                                <span className="material-symbols-outlined text-[20px]">play_arrow</span>
                                                Live Demo
                                            </button>
                                            <button className="flex items-center justify-center gap-2 border border-[#282e39] hover:border-slate-500 text-slate-300 hover:text-white bg-transparent px-5 py-2.5 rounded-lg text-sm font-medium transition-all">
                                                <span className="material-symbols-outlined text-[20px]">code</span>
                                                View Source
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}

                        <div className="flex items-center gap-2 text-syntax-keyword font-mono mt-4">
                            <span>return</span>
                            <span className="text-white">projects</span>
                        </div>
                    </div>
                </div>
            </main>
        </section>
    );
};
export default Projects;
