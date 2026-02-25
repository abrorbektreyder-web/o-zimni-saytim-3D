import { motion } from 'framer-motion';

const capabilities = [
    {
        title: '3D WebGL Saytlar',
        desc: "Foydalanuvchilarni interaktiv tajriba bilan hayratda qoldiradigan, Three.js va WebGL texnologiyalariga asoslangan immersiv platformalar.",
        stat: '3D',
        statLabel: 'Interaktivlik',
    },
    {
        title: 'Premium Landing Page',
        desc: "Konversiyani maksimal darajaga ko'taruvchi, brendning o'ziga xosligini ochib beruvchi modern dizayn va smooth animatsiyalar.",
        stat: '2.5x',
        statLabel: 'Konversiya Uchrashuv',
    },
    {
        title: 'Korporativ Platformalar',
        desc: "Katta ma'lumotlar bilan ishlashga qodir, xavfsiz, tezkor va kelajakda kengaytirish oson bo'lgan murakkab web ilovalar.",
        stat: '100%',
        statLabel: 'Moslashuvchanlik',
    },
];

export function Portfolio() {
    return (
        <section id="portfolio" className="py-24 px-6 relative z-10">
            <div className="max-w-7xl mx-auto">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <div className="badge-pill mb-6 w-max">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                        IMKONIYATLAR
                    </div>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 tracking-tight">
                        Asosiy{' '}
                        <span className="gold-gradient-text">Yo'nalishlar</span>
                    </h2>
                    <p className="text-zinc-500 max-w-xl text-[15px] leading-relaxed">
                        Zamonaviy biznes talablariga javob beradigan yuqori texnologik web yechimlar.
                    </p>
                </motion.div>

                {/* Capability cards */}
                <div className="grid md:grid-cols-3 gap-5">
                    {capabilities.map((cap, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.15, duration: 0.7 }}
                            className="group"
                        >
                            <div className="card-hover-glow glass-card rounded-2xl p-6 md:p-8 hover:border-amber-500/20 transition-all duration-500 h-full flex flex-col">
                                {/* Stat badge */}
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex flex-col">
                                        <span className="text-3xl font-bold text-amber-400 tracking-tight">{cap.stat}</span>
                                        <span className="text-[10px] tracking-[0.2em] uppercase text-zinc-500 mt-1">{cap.statLabel}</span>
                                    </div>
                                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center group-hover:bg-amber-500/20 transition-all duration-300">
                                        <svg className="w-5 h-5 text-amber-400 group-hover:rotate-45 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{cap.title}</h3>
                                <p className="text-zinc-500 text-sm leading-relaxed flex-1">{cap.desc}</p>

                                {/* Bottom accent line */}
                                <div className="mt-6 pt-4 border-t border-white/[0.04]">
                                    <div className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-zinc-600 group-hover:text-amber-400/70 transition-colors duration-300">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                                        FAOL
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Technical specs bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="mt-8 glass-card rounded-2xl p-6 flex flex-wrap items-center justify-between gap-6"
                >
                    {[
                        { label: 'Unumdorlik', value: '99/100' },
                        { label: 'SEO Optimizatsiya', value: '100/100' },
                        { label: 'Yuklanish Vaqti', value: '< 1 soniya' },
                        { label: 'Xavfsizlik', value: 'A+ Daraja' },
                    ].map((spec, i) => (
                        <div key={i} className="flex flex-col items-center text-center flex-1 min-w-[120px]">
                            <span className="text-lg font-bold text-white tracking-tight">{spec.value}</span>
                            <span className="text-[10px] tracking-[0.15em] uppercase text-zinc-500 mt-1">{spec.label}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
