import React, { useState } from 'react';

const About = () => {
    const [activeTab, setActiveTab] = useState('BCA_Graduate.py');

    return (
        <section id="about" className="relative w-full max-w-[1400px] mx-auto flex flex-col justify-center min-h-screen p-4 md:p-8 lg:p-12">
            {/* Section Header */}
            <div className="mb-8 md:mb-12 flex flex-col items-start gap-2">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
                    <span className="text-primary font-mono">class</span> About_Me:
                </h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-xl text-lg">
                    Initializing developer profile...
                </p>
            </div>

            {/* IDE Container */}
            <div className="w-full bg-ide-bg rounded-xl shadow-2xl overflow-hidden border border-ide-border flex flex-col h-[600px] md:h-[700px] transition-all duration-500 hover:shadow-primary/10 hover:border-primary/30 group/ide">
                {/* IDE Title Bar */}
                <div className="bg-[#2d2d2d] w-full h-10 flex items-center px-4 justify-between select-none border-b border-ide-border">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 transition-colors"></div>
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffbd2e]/80 transition-colors"></div>
                        <div className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#27c93f]/80 transition-colors"></div>
                    </div>
                    <div className="text-gray-400 text-xs font-medium tracking-wide flex items-center gap-1 opacity-70">
                        <span className="material-symbols-outlined text-sm">lock</span>
                        harish_portfolio — about_me.py
                    </div>
                    <div className="w-14"></div>
                </div>

                {/* IDE Body */}
                <div className="flex flex-1 overflow-hidden">
                    {/* Sidebar (Explorer) */}
                    <div className="hidden md:flex w-64 bg-ide-sidebar border-r border-ide-border flex-col text-[#cccccc] flex-shrink-0">
                        <div className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-[#6f7072] flex justify-between items-center group-hover/ide:text-[#9ca6ba] transition-colors">
                            <span>Explorer</span>
                            <span className="material-symbols-outlined text-sm cursor-pointer hover:text-white">more_horiz</span>
                        </div>
                        <div className="flex flex-col text-sm font-medium">
                            {/* Project Root */}
                            <div className="px-2 py-1 flex items-center gap-1 cursor-pointer bg-[#37373d]/50 text-white">
                                <span className="material-symbols-outlined text-lg">expand_more</span>
                                <span className="font-bold tracking-tight">HARISH_PORTFOLIO</span>
                            </div>
                            {/* Tree Content */}
                            <div className="flex flex-col mt-1">
                                <div className="px-2 py-1 pl-6 flex items-center gap-1.5 cursor-pointer hover:bg-[#2a2d2e] transition-colors text-gray-400">
                                    <span className="material-symbols-outlined text-lg text-[#9ca6ba]">folder</span>
                                    <span>assets</span>
                                </div>
                                <div className="px-2 py-1 pl-6 flex items-center gap-1.5 cursor-pointer hover:bg-[#2a2d2e] transition-colors text-white group/folder">
                                    <span className="material-symbols-outlined text-lg text-primary group-hover/folder:text-primary/80">folder_open</span>
                                    <span>education</span>
                                </div>
                                <div className={`px-2 py-1 pl-10 flex items-center gap-1.5 cursor-pointer transition-colors text-white ${activeTab === 'BCA_Graduate.py' ? 'bg-[#37373d] border-l-2 border-primary' : 'hover:bg-[#2a2d2e]'}`} onClick={() => setActiveTab('BCA_Graduate.py')}>
                                    <span className="material-symbols-outlined text-lg text-[#519aba]">description</span>
                                    <span>BCA_Graduate.py</span>
                                </div>
                                <div className="px-2 py-1 pl-6 flex items-center gap-1.5 cursor-pointer hover:bg-[#2a2d2e] transition-colors text-gray-300 group/folder">
                                    <span className="material-symbols-outlined text-lg text-[#dcb67a]">folder</span>
                                    <span>interests</span>
                                </div>
                                <div className={`px-2 py-1 pl-10 flex items-center gap-1.5 cursor-pointer transition-colors hover:text-gray-200 ${activeTab === 'AI_Agents.json' ? 'bg-[#37373d] border-l-2 border-primary text-white' : 'text-gray-400 hover:bg-[#2a2d2e]'}`} onClick={() => setActiveTab('AI_Agents.json')}>
                                    <span className="material-symbols-outlined text-lg text-syntax-string">data_object</span>
                                    <span>AI_Agents.json</span>
                                </div>
                                <div className="px-2 py-1 pl-6 flex items-center gap-1.5 cursor-pointer hover:bg-[#2a2d2e] transition-colors text-gray-400 hover:text-gray-200">
                                    <span className="material-symbols-outlined text-lg text-gray-500">info</span>
                                    <span>README.md</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Code Editor */}
                    <div className="flex-1 flex flex-col bg-ide-bg relative overflow-hidden">
                        {/* Tabs */}
                        <div className="flex bg-[#252526] h-9 border-b border-ide-border overflow-x-auto hide-scrollbar">
                            <div className={`flex items-center gap-2 px-3 min-w-[140px] text-xs cursor-pointer select-none ${activeTab === 'BCA_Graduate.py' ? 'bg-ide-bg border-t-2 border-primary text-[#ffffff]' : 'text-[#969696] hover:bg-[#2d2d2d] border-r border-[#333]'}`} onClick={() => setActiveTab('BCA_Graduate.py')}>
                                <span className="material-symbols-outlined text-base text-[#519aba]">description</span>
                                <span>BCA_Graduate.py</span>
                                {activeTab === 'BCA_Graduate.py' && <span className="material-symbols-outlined text-sm ml-auto opacity-50 hover:opacity-100 rounded-sm hover:bg-gray-700">close</span>}
                            </div>
                            <div className={`flex items-center gap-2 px-3 min-w-[140px] text-xs cursor-pointer select-none ${activeTab === 'AI_Agents.json' ? 'bg-ide-bg border-t-2 border-primary text-[#ffffff]' : 'text-[#969696] hover:bg-[#2d2d2d] border-r border-[#333]'}`} onClick={() => setActiveTab('AI_Agents.json')}>
                                <span className="material-symbols-outlined text-base text-syntax-string">data_object</span>
                                <span>AI_Agents.json</span>
                                {activeTab === 'AI_Agents.json' && <span className="material-symbols-outlined text-sm ml-auto opacity-50 hover:opacity-100 rounded-sm hover:bg-gray-700">close</span>}
                            </div>
                        </div>

                        {/* Editor Content */}
                        <div className="flex-1 overflow-auto p-4 md:p-6 ide-scrollbar font-mono text-sm md:text-base leading-relaxed">
                            <div className="text-[#d4d4d4] counter-reset-line">
                                {/* Import */}
                                <div className="syntax-line"><span className="text-syntax-keyword">import</span> <span className="text-white">sys</span></div>
                                <div className="syntax-line"><span className="text-syntax-keyword">from</span> <span className="text-white">skills</span> <span className="text-syntax-keyword">import</span> <span className="text-white">ProblemSolver</span></div>
                                <div className="syntax-line">&nbsp;</div>

                                {/* Class Def */}
                                <div className="syntax-line"><span className="text-syntax-keyword">class</span> <span className="text-syntax-class">About_Me</span>(<span className="text-syntax-class">Developer</span>, <span className="text-syntax-class">ProblemSolver</span>):</div>
                                {/* Docstring */}
                                <div className="syntax-line pl-4 md:pl-8"><span className="text-syntax-comment">"""</span></div>
                                <div className="syntax-line pl-4 md:pl-8"><span className="text-syntax-comment">A passionate Full Stack Developer with a knack for building</span></div>
                                <div className="syntax-line pl-4 md:pl-8"><span className="text-syntax-comment">scalable applications and exploring AI frontiers.</span></div>
                                <div className="syntax-line pl-4 md:pl-8"><span className="text-syntax-comment">"""</span></div>
                                <div className="syntax-line">&nbsp;</div>

                                {/* Init Method */}
                                <div className="syntax-line pl-4 md:pl-8"><span className="text-syntax-keyword">def</span> <span className="text-syntax-function">__init__</span>(<span className="text-syntax-keyword">self</span>):</div>
                                {/* Variables */}
                                <div className="syntax-line pl-8 md:pl-16">
                                    <span className="text-syntax-keyword">self</span>.name = <span className="text-syntax-string">'Harish'</span>
                                </div>
                                <div className="syntax-line pl-8 md:pl-16">
                                    <span className="text-syntax-keyword">self</span>.education = <span className="text-syntax-string">'BCA Graduate'</span>
                                </div>
                                <div className="syntax-line pl-8 md:pl-16">
                                    <span className="text-syntax-keyword">self</span>.role = <span className="text-syntax-string">'Full Stack Developer'</span>
                                </div>
                                <div className="syntax-line pl-8 md:pl-16">
                                    <span className="text-syntax-keyword">self</span>.email = <span className="text-syntax-string">'contact@harish.dev'</span>
                                </div>
                                <div className="syntax-line">&nbsp;</div>
                                {/* List/Complex Data */}
                                <div className="syntax-line pl-8 md:pl-16">
                                    <span className="text-syntax-comment"># Current areas of focus</span>
                                </div>
                                <div className="syntax-line pl-8 md:pl-16">
                                    <span className="text-syntax-keyword">self</span>.interests = [
                                </div>
                                <div className="syntax-line pl-12 md:pl-24">
                                    <span className="text-syntax-string">'AI Agents'</span>,
                                </div>
                                <div className="syntax-line pl-12 md:pl-24">
                                    <span className="text-syntax-string">'System Architecture'</span>,
                                </div>
                                <div className="syntax-line pl-12 md:pl-24">
                                    <span className="text-syntax-string">'Open Source'</span>
                                </div>
                                <div className="syntax-line pl-8 md:pl-16">
                                    ]
                                </div>
                                <div className="syntax-line">&nbsp;</div>
                                {/* Method Call */}
                                <div className="syntax-line pl-4 md:pl-8"><span className="text-syntax-keyword">def</span> <span className="text-syntax-function">get_status</span>(<span className="text-syntax-keyword">self</span>):</div>
                                <div className="syntax-line pl-8 md:pl-16">
                                    <span className="text-syntax-keyword">return</span> <span className="text-syntax-string">"Ready to collaborate!"</span> <span className="inline-block w-2.5 h-5 bg-white align-middle animate-pulse ml-1"></span>
                                </div>
                            </div>
                        </div>
                        {/* Status Bar */}
                        <div className="h-6 bg-primary text-white flex items-center justify-between px-3 text-[10px] md:text-xs select-none">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-xs">code_off</span>
                                    <span>master*</span>
                                </div>
                                <div className="flex items-center gap-1 hidden sm:flex">
                                    <span className="material-symbols-outlined text-xs">sync</span>
                                    <span>0↓ 1↑</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="hidden sm:inline">Ln 22, Col 45</span>
                                <span>UTF-8</span>
                                <span className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-xs">javascript</span>
                                    Python 3.11
                                </span>
                                <span className="material-symbols-outlined text-sm">notifications</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Background Gradient Element */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-primary/5 via-transparent to-primary/5 blur-3xl opacity-50 pointer-events-none rounded-full"></div>
        </section>
    );
};
export default About;
