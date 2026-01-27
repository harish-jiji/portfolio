import React from 'react';

const Contact = () => {
    return (
        <section id="contact" className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-hidden transition-colors duration-300">
            <div className="layout-container flex h-full grow flex-col justify-end">
                <div className="px-4 sm:px-10 md:px-20 lg:px-40 flex flex-1 flex-col justify-center py-10 sm:py-20">
                    <div className="layout-content-container flex flex-col w-full max-w-[960px] mx-auto flex-1 gap-8">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2 opacity-60">
                                <span className="text-primary text-sm font-mono font-bold"># Let's connect</span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-display font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
                                <span className="text-primary">print</span><span className="text-gray-400">(</span><span className="text-code-purple">contact_info</span><span className="text-gray-400">)</span>
                            </h2>
                        </div>

                        {/* Terminal Card */}
                        <div className="w-full rounded-xl overflow-hidden shadow-2xl bg-code-bg border border-gray-800 ring-4 ring-black/20 transform transition-all hover:scale-[1.01] duration-500">
                            {/* Title Bar */}
                            <div className="flex items-center justify-between px-4 py-3 bg-[#2d2d2d] border-b border-gray-700">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 cursor-pointer"></div>
                                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffbd2e]/80 cursor-pointer"></div>
                                    <div className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#27c93f]/80 cursor-pointer"></div>
                                </div>
                                <div className="text-xs text-gray-400 font-mono select-none">harish — -zsh — 80x24</div>
                                <div className="w-10"></div>
                            </div>

                            {/* Body */}
                            <div className="p-6 sm:p-10 font-mono text-sm sm:text-base leading-relaxed text-gray-300 bg-code-bg min-h-[300px] flex flex-col">
                                <div className="mb-6">
                                    <span className="text-code-green font-bold">➜</span>
                                    <span className="text-code-blue font-bold">~</span>
                                    <span className="text-white"> python3 fetch_contact.py</span>
                                </div>

                                <div className="flex flex-col gap-4 animate-fade-in pl-2 border-l-2 border-gray-800 mb-8">
                                    <div className="group flex flex-wrap items-center gap-2">
                                        <span className="text-code-gray select-none">&gt;&gt;</span>
                                        <span className="text-code-purple font-semibold">Email:</span>
                                        <a className="text-code-green hover:text-code-green/80 hover:underline transition-all decoration-2 underline-offset-4 break-all" href="mailto:harishjiji16@gmail.com">
                                            'harishjiji16@gmail.com'
                                        </a>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="text-code-gray select-none">&gt;&gt;</span>
                                        <span className="text-code-purple font-semibold">Status:</span>
                                        <span className="text-code-orange font-semibold">True</span>
                                        <span className="text-gray-500 italic">(Open to Work)</span>
                                    </div>
                                    <div className="flex flex-col gap-3 mt-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-code-gray select-none">&gt;&gt;</span>
                                            <span className="text-code-purple font-semibold">Social_Links:</span>
                                            <span className="text-gray-500">[</span>
                                        </div>
                                        <div className="flex flex-wrap gap-4 pl-8">
                                            <a className="group/icon flex items-center gap-3 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300" href="#">
                                                <span aria-hidden="true" className="material-symbols-outlined text-white text-[24px]">code</span>
                                                <span className="text-gray-300 group-hover/icon:text-white font-medium">GitHub</span>
                                            </a>
                                            <a className="group/icon flex items-center gap-3 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300" href="#">
                                                <span aria-hidden="true" className="material-symbols-outlined text-white text-[24px]">connect_without_contact</span>
                                                <span className="text-gray-300 group-hover/icon:text-white font-medium">LinkedIn</span>
                                            </a>
                                        </div>
                                        <div className="pl-0">
                                            <span className="text-gray-500">]</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-auto pt-4 flex items-center gap-2 opacity-80">
                                    <span className="text-code-green font-bold">➜</span>
                                    <span className="text-code-blue font-bold">~</span>
                                    <span className="text-white">awaiting_input</span>
                                    <span className="w-2.5 h-5 bg-gray-400 animate-pulse"></span>
                                </div>
                            </div>
                        </div>

                        <footer className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-center sm:text-left opacity-60 hover:opacity-100 transition-opacity">
                            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                                Copyright © 2024 Harish.
                            </p>
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="material-symbols-outlined text-[16px]">terminal</span>
                                <span>Built with Python &amp; Love</span>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Contact;
