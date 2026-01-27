import React from 'react';

const Skills = () => {
    const skills = [
        { name: 'Python', style: 'from-[#306998] to-[#FFD43B]', bg: '#1e1e1e', img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBM5oME9dKlgfReDQfxF7ss5BBHvVzEhc9XatXsyThnoLs_oZziSb9h3Ur2aaMzOkGK_Q8P1rZjkyjdGpDDS9kpCA87caiTsipp-7L7ElRAWAOyFhWcu_Ojqpgnw-xGzP9VH68JZbjjD3OktkAyoFHZhJibrL25aaW619hQHAVZ-kzYWgya8k7Vc0OSCXi_nM0QG2cOpAQT53TRcnDYwyFSgW1nDy48mHe20ciY03Q2I52oLtLj6q_M5sCWymQPaSdkbHlM2AHiLw0" },
        { name: 'Django', style: 'bg-[#092E20]', bg: '#092E20', img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZuW_QdoHn_zhSEevQ4Dn95vnbMLLMz8lotRvJDLRCoXfArHQFCt60PiYO3D7m7J3pxWzTboaPawvazwxfklj6dazZsSErORz_SjE9CbJ9X_MEDq-dmrW55v6ymMiatLrlynAKi1opuY4oEVHpoBQl_kmxYvbiJozKjhMz_jYnOBNo4BiUWY1Jr_hcIsd56-zQ49VKwNPC_LcupUx1bKsaMK248OzrWJ369XRm3KCraTO2EJuQBcPIU6jM1TCUdW00Eh1PjpBKJWw" },
        { name: 'React', style: 'bg-[#61DAFB]', bg: '#20232a', img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDq3nV5vkfeOw64wphVRB8o6gMTWC_-QRkQgjs_e9evKAJJdj0jTEKiz8KAWVFWH08caMJJ-FPzO8IcYdsB7LvgowDrU3qfpJ3HkG1AAZb19RaZgjTJBFWSjDzhMg0owg5gNKD4KJVgmrftWHJ0NKuYH3JA1pRsWO3hd1aLkiwLPtZ0CVyIVNG3xN0ZHZUhZ0uUVE_aA0uLm2kTgmWNdo14w_GCfTU3H7vH6Abn-85bxp0T8DkFXgJmlAJKMpX6TxkjZmYT5sSTp_4", textClass: "text-[#61DAFB]" },
        { name: 'HTML5', style: 'bg-[#E34F26]', bg: 'white', img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFkDB_97DCY7-lZdDoBgitKZ8sNA2ywHfxw_iOlrGijPlaZX3IN0M_-1VMQLlBT4L58jBGiNSrb9Yew10eWDIkewtYP9g6JTCGUP3GVV4b_zTOc1p9ZZwvC-9WCQFqCi5bFIbhCA1aaiS5rFBZ5rdtwOO6TvHiAQgdHpfT2Cn2ZC-CDTzyWSvgrIqMlp8W022J_Wv5_6c4l8OoEEI12H0C0fgCjEgDmidsmd4RVEozn-7EBojsN5f4PhaNkmadlWxsdbM723wnfiM", textClass: "text-black" },
        { name: 'CSS3', style: 'bg-[#1572B6]', bg: '#1572B6', img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBIoZA1necaevMdMoUn-RcupCKK4nR0L-_Yc_I1_3KyHKDRh0IOX7RBD0xw016bNaeqdQeFs1kURpdx9wxdHgzeAmTB8HhUhGmRQVbxrRDP0eycNdHQMUFDVBbv9NbvEl0sNep122RURsZTrDqUn-OzX2KKXNpakmzJ4PuR1VYnIA6SIEnn9PZ4tV6OFHWik8KxOrKZBxcXSt3XS1wyr01YBm_zHyvhMSV_k2X8xEkl_xwxxbQOOFzZ9mMUxENQ15csE91_eWMOt8I" },
        { name: 'Tailwind', style: 'from-cyan-500 to-blue-500', bg: 'slate-900', img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_zE_H-quTMPjErKzStARPME3MPvn084gYdtGlic2-wHPC7hGuOVxBjOQEqQamDgdRIuiGFDHGWnsE2UOlFNKxa6HHwkebP1dXW4xh2uNyKfe3qRYAlFy9hacBs2GQ2bdlpPHaWometkwSTUaO2tEI2Mc-sZTJv5UoCoHlkl0BFkWmbGKbYOM7emVVLpocX9HyYVbnTlZ5EDV6UVkArWvuz3GfiAhsNebXWiL2RyCopoZlLGA9MP6H8nzinlj-Apwke9P1vfs0efI", textClass: "text-cyan-400" },
        { name: 'Git', style: 'bg-[#F05032]', bg: '#F05032', img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGbCsW6x5_T3Hl822pnuA0jcFlpyBlAlFjXEdEHT4cn76tTs8YQjMTEtJYXzF_h5vSIYbWpmpJW1e75eiudu16da_VMOVIQB7TPGT7Ujoq5GVHvXtMawIbV1AzPeh3mo833O8zWFy7p9NAebrdejawXL_wo1qOZUkhZ2ks7_x6WN82dcGH_bjWJzxW1SHRVg8Pjy2RjOQXxUIlRCt-YWdsduDIevQxxtfufI12ZVI0FfL8bHV4LTMKC8LjUUES_rg7pHuFgL_F8F4" }
    ];

    return (
        <section className="relative flex flex-col justify-center py-20 bg-background-dark overflow-hidden">
            {/* Background Grid Overlay */}
            <div className="absolute inset-0 z-0 opacity-[0.07] bg-grid-pattern pointer-events-none"></div>
            {/* Gradient Mesh */}
            <div className="absolute top-0 right-0 p-12 opacity-20 pointer-events-none">
                <div className="w-64 h-64 bg-primary rounded-full blur-[100px]"></div>
            </div>
            <div className="absolute bottom-0 left-0 p-12 opacity-10 pointer-events-none">
                <div className="w-64 h-64 bg-syntax-purple rounded-full blur-[100px]"></div>
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col gap-12">
                {/* Code Header Section */}
                <div className="flex flex-col gap-1 pl-2 md:pl-0">
                    <div className="flex items-center gap-6 group">
                        <span className="w-8 text-right text-syntax-comment select-none text-sm font-mono opacity-50">10</span>
                        <div className="text-syntax-comment text-sm md:text-base font-medium font-mono flex items-center gap-2">
                            <span>#</span><span>Load core technology stack dependencies</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-6 group">
                        <span className="w-8 text-right text-syntax-comment select-none text-sm font-mono opacity-50">11</span>
                        <div className="text-syntax-yellow text-sm md:text-base font-medium font-mono">
                            @full_stack_developer
                        </div>
                    </div>
                    <div className="flex items-center gap-6 group py-2">
                        <span className="w-8 text-right text-syntax-comment select-none text-sm font-mono opacity-50">12</span>
                        <h1 className="text-2xl md:text-5xl font-bold tracking-tight flex flex-wrap gap-x-3 items-baseline">
                            <span className="text-primary">from</span>
                            <span className="text-white">harish.portfolio</span>
                            <span className="text-primary">import</span>
                            <span className="text-syntax-green border-b-2 border-dashed border-syntax-comment/30 pb-1">Skills</span>
                        </h1>
                    </div>
                    <div className="flex items-center gap-6 group h-6">
                        <span className="w-8 text-right text-syntax-comment select-none text-sm font-mono opacity-50">13</span>
                        <div className="w-2.5 h-5 bg-primary/70 animate-pulse"></div>
                    </div>
                </div>

                {/* Stickers Area */}
                <div className="w-full relative mt-4">
                    <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background-dark to-transparent z-20 pointer-events-none"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background-dark to-transparent z-20 pointer-events-none"></div>

                    <div className="flex overflow-x-auto no-scrollbar py-12 px-8 gap-8 md:gap-14 items-center">
                        {skills.map((skill, index) => {
                            const isGradient = skill.style.includes('from-');
                            return (
                                <div key={index} className={`flex-shrink-0 group relative transition-all duration-300 hover:z-30 hover:scale-110 ${index % 2 === 0 ? '-rotate-3' : 'rotate-2'} hover:rotate-0`}>
                                    <div className="absolute -inset-1 bg-white rounded-xl blur-sm opacity-20 group-hover:opacity-40 transition-opacity"></div>
                                    <div className={`relative p-[3px] rounded-xl shadow-xl ${isGradient ? 'bg-gradient-to-br ' + skill.style : skill.style}`}>
                                        <div className={`p-4 rounded-[9px] flex flex-col items-center gap-2 border-[3px] border-white/90 w-32 h-36 md:w-40 md:h-44 justify-center ${typeof skill.bg === 'string' && (skill.bg.startsWith('#') || skill.bg === 'white') ? '' : 'bg-' + skill.bg}`} style={typeof skill.bg === 'string' && (skill.bg.startsWith('#') || skill.bg === 'white') ? { backgroundColor: skill.bg } : {}}>
                                            <div className="w-16 h-16 bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url("${skill.img}")` }}></div>
                                            <span className={`${skill.textClass || 'text-white'} font-bold text-lg tracking-wide`}>{skill.name}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Editor Status Bar Helper */}
                <div className="border-t border-gray-800 pt-4 mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs font-mono text-gray-500 gap-4">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                            <span className="material-symbols-outlined text-[18px]">terminal</span>
                            <span>TERMINAL</span>
                        </div>
                        <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                            <span className="material-symbols-outlined text-[18px]">bug_report</span>
                            <span>DEBUG CONSOLE</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-syntax-blue">
                            <span className="material-symbols-outlined text-[16px] text-syntax-blue">code</span>
                            <span>Python 3.12.0</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Skills;
