import { motion } from 'framer-motion';

const steps = [
    {
        number: '01',
        title: 'Tahlil',
        subtitle: 'TUSHUNISH',
        description: "Biznesingiz, maqsadlaringiz va auditoriyangizni chuqur o'rganaman. Raqobatchilarni tahlil qilaman va eng samarali strategiyani ishlab chiqaman.",
        features: ['Biznes tahlili', 'Raqobat tadqiqoti', 'UX strategiya'],
        icon: (
            <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        ),
    },
    {
        number: '02',
        title: 'Yaratish',
        subtitle: 'DIZAYN VA KOD',
        description: "Premium darajadagi UI/UX dizayn va 3D elementlar bilan saytni yarataman. Har bir piksel mukammal, har bir animatsiya silliq bo'ladi.",
        features: ['3D dizayn', 'WebGL animatsiya', 'Responsive kod'],
        icon: (
            <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
        ),
    },
    {
        number: '03',
        title: 'Natija',
        subtitle: 'TOPSHIRISH',
        description: "To'liq sinovdan o'tgan, tezkor yuklanadigan va SEO optimallashtirilgan saytni topshiraman. Doimiy texnik qo'llab-quvvatlash bilan.",
        features: ['SEO optimizatsiya', 'Tez yuklanish', "Doimiy qo'llab-quvvatlash"],
        icon: (
            <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
];

export function Advantages() {
    return (
        <section id="xizmatlar" className="py-24 px-6 relative z-10">
            <div className="max-w-7xl mx-auto">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-20 text-center"
                >
                    <div className="badge-pill mb-6 mx-auto w-max">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                        QANDAY ISHLAYDI
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4 tracking-tight">
                        Ish{' '}
                        <span className="gold-gradient-text">Jarayoni</span>
                    </h2>
                    <p className="text-zinc-500 max-w-xl mx-auto text-[15px]">
                        G'oyadan tayyor mahsulotgacha — uch bosqichli professional yondashuv.
                    </p>
                </motion.div>

                {/* Workflow steps */}
                <div className="grid md:grid-cols-3 gap-6 relative">

                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2, duration: 0.7 }}
                            className="group relative"
                        >
                            <div className="card-hover-glow glass-card rounded-2xl p-6 md:p-8 hover:border-amber-500/20 transition-all duration-500 h-full flex flex-col">
                                {/* Step number and icon */}
                                <div className="flex items-center justify-between mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center group-hover:bg-amber-500/20 group-hover:scale-110 transition-all duration-500">
                                        {step.icon}
                                    </div>
                                    <span className="text-5xl font-bold text-white/[0.04] font-display tracking-tighter">
                                        {step.number}
                                    </span>
                                </div>

                                {/* Content */}
                                <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-amber-400/70 block mb-2">
                                    {step.subtitle}
                                </span>
                                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                                    {step.title}
                                </h3>
                                <p className="text-zinc-500 text-sm leading-relaxed mb-6 flex-1">
                                    {step.description}
                                </p>

                                {/* Feature tags */}
                                <div className="flex flex-wrap gap-2">
                                    {step.features.map((feature, i) => (
                                        <span
                                            key={i}
                                            className="text-[10px] tracking-wider uppercase px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-zinc-500 hover:text-amber-400 hover:border-amber-500/20 transition-colors duration-300"
                                        >
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
