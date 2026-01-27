import forms from '@tailwindcss/forms';
import containerQueries from '@tailwindcss/container-queries';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                "primary": "#0d59f2",
                "primary-hero": "#f4d125",
                "accent-blue": "#4B8BBE",
                "background-light": "#f5f6f8",
                "background-dark": "#101622",
                "hero-bg-dark": "#1E1E1E",
                "editor-bg": "#252526",
                "editor-line": "#3E3E42",
                "ide-bg": "#1e1e1e",
                "ide-sidebar": "#252526",
                "ide-border": "#333333",
                "syntax-string": "#ce9178",
                "syntax-keyword": "#0d59f2",
                "syntax-comment": "#6a9955",
                "syntax-function": "#dcdcaa",
                "syntax-class": "#4ec9b0",
                "syntax-purple": "#c678dd",
                "syntax-yellow": "#e5c07b",
                "syntax-green": "#98c379",
                "syntax-blue": "#61afef",
                "code-bg": "#1e1e1e",
                "code-green": "#22c55e",
                "code-blue": "#60a5fa",
                "code-purple": "#c084fc",
                "code-orange": "#fb923c",
                "code-gray": "#9ca3af",
            },
            fontFamily: {
                "display": ["Space Grotesk", "sans-serif"],
                "display-hero": ["Inter", "sans-serif"],
                "mono": ["JetBrains Mono", "monospace"],
            },
            backgroundImage: {
                'grid-pattern': "linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)",
            }
        },
    },
    plugins: [
        forms,
        containerQueries,
    ],
}
