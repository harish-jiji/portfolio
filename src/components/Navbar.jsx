import React, { useState } from 'react';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-editor-line bg-background-dark/95 backdrop-blur supports-[backdrop-filter]:bg-background-dark/60">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
                        <span className="material-symbols-outlined text-primary-hero text-3xl">terminal</span>
                        <span className="font-mono text-lg font-bold text-white tracking-tight">&lt; Harish /&gt;</span>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-1 bg-[#2D2D2D] p-1 rounded-lg border border-[#3E3E42]">
                        <button onClick={() => scrollToSection('hero')} className="px-4 py-1.5 text-sm font-mono text-white bg-[#1E1E1E] rounded shadow-sm border border-[#3E3E42] flex items-center gap-2 hover:bg-[#3E3E42]/50 transition-colors">
                            <span className="w-2 h-2 rounded-full bg-primary-hero"></span>
                            main.py
                        </button>
                        <button onClick={() => scrollToSection('projects')} className="px-4 py-1.5 text-sm font-mono text-gray-400 hover:text-white hover:bg-[#3E3E42]/50 rounded transition-colors">
                            projects.py
                        </button>
                        <button onClick={() => scrollToSection('about')} className="px-4 py-1.5 text-sm font-mono text-gray-400 hover:text-white hover:bg-[#3E3E42]/50 rounded transition-colors">
                            about.py
                        </button>
                        <button onClick={() => scrollToSection('contact')} className="px-4 py-1.5 text-sm font-mono text-gray-400 hover:text-white hover:bg-[#3E3E42]/50 rounded transition-colors">
                            contact.py
                        </button>
                    </nav>

                    <div className="flex items-center gap-4">
                        <button className="hidden sm:flex items-center gap-2 bg-primary-hero hover:bg-yellow-400 text-background-dark px-4 py-2 rounded font-mono text-sm font-bold transition-transform active:scale-95">
                            <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                            Run Code
                        </button>
                        <button
                            className="md:hidden text-gray-300 hover:text-white"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-background-dark border-t border-editor-line p-4">
                    <div className="flex flex-col gap-2">
                        <button onClick={() => scrollToSection('hero')} className="text-left px-4 py-2 text-sm font-mono text-white hover:bg-[#3E3E42] rounded">main.py</button>
                        <button onClick={() => scrollToSection('projects')} className="text-left px-4 py-2 text-sm font-mono text-gray-400 hover:text-white hover:bg-[#3E3E42] rounded">projects.py</button>
                        <button onClick={() => scrollToSection('about')} className="text-left px-4 py-2 text-sm font-mono text-gray-400 hover:text-white hover:bg-[#3E3E42] rounded">about.py</button>
                        <button onClick={() => scrollToSection('contact')} className="text-left px-4 py-2 text-sm font-mono text-gray-400 hover:text-white hover:bg-[#3E3E42] rounded">contact.py</button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
