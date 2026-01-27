import React from 'react';

const Hero = () => {
    return (
        <section id="hero" className="relative min-h-[calc(100vh-64px)] w-full flex flex-col justify-center overflow-hidden bg-background-dark">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-grid-pattern pointer-events-none z-0"></div>

            {/* Radical Gradient Glow */}
            <div className="absolute top-1/4 -left-64 w-96 h-96 bg-primary-hero/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-accent-blue/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 lg:py-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                    {/* Left Column: Code Editor Style Text */}
                    <div className="flex flex-col gap-6 order-2 lg:order-1">
                        {/* Fake Window Header */}
                        <div className="w-full max-w-xl bg-editor-bg border border-editor-line rounded-lg overflow-hidden shadow-2xl">
                            <div className="flex items-center justify-between px-4 py-2 bg-[#333333] border-b border-editor-line">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                                    <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                                </div>
                                <div className="text-xs text-gray-400 font-mono">portfolio_v1.py</div>
                                <div className="w-10"></div>
                            </div>

                            {/* Code Content */}
                            <div className="p-6 md:p-8 font-mono text-sm md:text-base lg:text-lg leading-relaxed overflow-x-auto">
                                <div className="flex">
                                    <div className="flex flex-col text-right text-gray-600 select-none pr-4 border-r border-editor-line mr-4 min-w-[2rem]">
                                        <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
                                        <span>6</span><span>7</span><span>8</span><span>9</span>
                                    </div>
                                    <div className="w-full">
                                        <div className="block">
                                            <span className="text-syntax-keyword text-[#569CD6]">import</span> <span className="text-white">skills</span>
                                        </div>
                                        <div className="block h-4"></div>
                                        <div className="block">
                                            <span className="text-syntax-keyword text-[#569CD6]">class</span> <span className="text-syntax-function text-[#DCDCAA]">Developer</span>:
                                        </div>
                                        <div className="block pl-8">
                                            <span className="text-syntax-keyword text-[#569CD6]">def</span> <span className="text-syntax-function text-[#DCDCAA]">__init__</span>(<span className="text-syntax-blue text-[#9CDCFE]">self</span>):
                                        </div>
                                        <div className="block pl-16">
                                            <span className="text-syntax-blue text-[#9CDCFE]">self</span>.name = <span className="text-syntax-string text-[#CE9178]">"Harish"</span>
                                        </div>
                                        <div className="block pl-16">
                                            <span className="text-syntax-blue text-[#9CDCFE]">self</span>.role = <span className="text-syntax-string text-[#CE9178]">"Python Full-Stack Dev"</span>
                                        </div>
                                        <div className="block pl-16">
                                            <span className="text-syntax-blue text-[#9CDCFE]">self</span>.degree = <span className="text-syntax-string text-[#CE9178]">"BCA Graduate"</span>
                                        </div>
                                        <div className="block h-4"></div>
                                        <div className="block">
                                            <span className="text-syntax-comment text-[#6A9955]"># Start the introduction</span>
                                        </div>
                                        <div className="block">
                                            <span className="text-primary-hero font-bold">print</span>(<span className="text-syntax-string text-[#CE9178]">"Hello, I'm Harish"</span>)<span className="text-white cursor-blink">|</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Intro Text outside editor */}
                        <div className="mt-4 max-w-xl">
                            <p className="text-gray-400 font-display text-lg mb-6">
                                Crafting scalable backend systems and responsive front-end interfaces. Passionate about clean code and efficient algorithms.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <button className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-primary-hero px-8 py-3 font-mono font-bold text-background-dark transition-all duration-300 hover:bg-white hover:text-background-dark focus:outline-none focus:ring-2 focus:ring-primary-hero focus:ring-offset-2 focus:ring-offset-background-dark">
                                    <span className="mr-2">def</span>
                                    <span>view_work():</span>
                                    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                                </button>
                                <button className="inline-flex items-center justify-center rounded-lg border border-gray-600 bg-transparent px-8 py-3 font-mono font-medium text-white transition-all hover:border-primary-hero hover:text-primary-hero focus:outline-none">
                                    <span>contact_me()</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Avatar/Visual */}
                    <div className="relative flex justify-center lg:justify-end order-1 lg:order-2">
                        <div className="absolute top-10 right-10 w-64 h-64 bg-primary-hero/20 rounded-full blur-2xl -z-10 animate-pulse"></div>
                        <div className="relative group">
                            {/* Floaties */}
                            <div className="absolute -top-6 -left-6 z-20 bg-[#2D2D2D] p-3 rounded-lg border border-gray-700 shadow-xl transform -rotate-6 transition-transform group-hover:rotate-0 hidden sm:block">
                                <span className="material-symbols-outlined text-primary-hero text-2xl">code</span>
                            </div>
                            <div className="absolute bottom-10 -right-6 z-20 bg-[#2D2D2D] p-3 rounded-lg border border-gray-700 shadow-xl transform rotate-3 transition-transform group-hover:rotate-0 hidden sm:block">
                                <span className="material-symbols-outlined text-[#4B8BBE] text-2xl">data_object</span>
                            </div>

                            {/* Main Image */}
                            <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-2xl overflow-hidden border-2 border-editor-line shadow-2xl bg-[#252526]">
                                <img
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrFa6-vP8JydAzX2J372ZA4fMVLNf2WrMesYo_ur6jJ8OsfDhBg2MFfhomZrcXNQZqaOrzPCxztofFy6iwVahpwa5NjL-R7tt2rHRXUC88rtqE0CxKk_LKnWY9k9qeGaR4Wc6hEcd_gxBL2qw5sYOVHIu3eQFVHvnXLq3H8TpSNvSmzzLRNp_YI54VWddV0MUZQOvqJ-M8SxJfyxpbN_9IP8vqwFGH-hgytW43N8cpgQWCrKeo7Pk7LaKo1qfaoTKfFYlw8pJAafw"
                                    alt="Harish"
                                    className="w-full h-full object-cover filter grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
                                />
                                <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none mix-blend-overlay"></div>
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                                    <div className="flex items-center gap-2 text-primary-hero font-mono text-sm">
                                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                        Open to Work
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Down */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 animate-bounce cursor-pointer">
                <span className="font-mono text-xs">scroll_down()</span>
                <span className="material-symbols-outlined">keyboard_arrow_down</span>
            </div>
        </section>
    );
};
export default Hero;
