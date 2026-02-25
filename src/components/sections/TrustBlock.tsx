import { motion } from 'framer-motion';

const projectData = [
    { name: 'E-Commerce', status: 'Yakunlangan', natija: '+180%', holat: 'Muvaffaqiyatli' },
    { name: 'SaaS Platform', status: 'Jarayonda', natija: '+95%', holat: 'Rivojlanmoqda' },
    { name: 'Landing Page', status: 'Yakunlangan', natija: '+250%', holat: 'Muvaffaqiyatli' },
    { name: '3D Portfolio', status: 'Yakunlangan', natija: '+320%', holat: 'Muvaffaqiyatli' },
];

const featureCards = [
    {
        title: "Loyihalar Ko'rsatkichlari",
        subtitle: 'REAL NATIJALAR',
        description: "Mijozlar uchun yaratilgan saytlar konversiyani o'rtacha 200% ga oshirdi. Natijalar real loyihalar asosida.",
        type: 'table' as const,
    },
    {
        title: 'Texnologiya Sifati',
        subtitle: 'ZAMONAVIY STACK',
        description: "React, Three.js, WebGL, GSAP va eng zamonaviy texnologiyalar bilan yaratilgan premium darajadagi yechimlar.",
        type: 'metric' as const,
    },
    {
        title: 'Xizmat Turlari',
        subtitle: "TO'LIQ YECHIMLAR",
        description: "Oddiy landing sahifadan tortib, murakkab 3D interaktiv platformalargacha — har qanday biznes uchun mukammal web yechim.",
        type: 'wide' as const,
    },
];

export function TrustBlock() {
    return (
        <section className="py-24 px-6 relative z-10">
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
                        NIMA QILA OLAMAN
                    </div>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 tracking-tight">
                        Xizmatlar{' '}
                        <span className="gold-gradient-text">Paneli</span>
                    </h2>
                    <p className="text-zinc-500 max-w-xl text-[15px] leading-relaxed">
                        Biznesingiz uchun eng yuqori darajadagi web yechimlar — strategik yondashuv bilan.
                    </p>
                </motion.div>

                {/* Feature cards grid */}
                <div className="grid md:grid-cols-2 gap-5">
                    {featureCards.map((card, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.15, duration: 0.7 }}
                            className={`card-hover-glow glass-card rounded-2xl p-6 md:p-8 group hover:border-amber-500/20 transition-all duration-500 ${card.type === 'wide' ? 'md:col-span-2' : ''
                                }`}
                        >
                            {/* Card header */}
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-amber-400/70 block mb-2">
                                        {card.subtitle}
                                    </span>
                                    <h3 className="text-xl font-bold text-white tracking-tight">
                                        {card.title}
                                    </h3>
                                </div>
                                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center group-hover:bg-amber-500/20 transition-all duration-300">
                                    <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </div>
                            </div>

                            <p className="text-zinc-500 text-sm mb-6 leading-relaxed">
                                {card.description}
                            </p>

                            {/* Mockup data table for first card */}
                            {card.type === 'table' && (
                                <div className="rounded-xl bg-white/[0.02] border border-white/5 overflow-hidden">
                                    <div className="grid grid-cols-4 text-[10px] tracking-[0.15em] uppercase text-zinc-500 p-3 border-b border-white/5">
                                        <span>Loyiha</span>
                                        <span>Holat</span>
                                        <span>Konversiya</span>
                                        <span>Natija</span>
                                    </div>
                                    {projectData.map((row, i) => (
                                        <div key={i} className="grid grid-cols-4 text-sm p-3 border-b border-white/[0.03] last:border-0 items-center hover:bg-white/[0.02] transition-colors">
                                            <span className="text-white font-medium text-xs">{row.name}</span>
                                            <span className="text-zinc-300 text-xs">{row.status}</span>
                                            <span className="text-xs text-emerald-400">
                                                {row.natija}
                                            </span>
                                            <span className={`text-[10px] uppercase tracking-wider font-medium ${row.holat === 'Muvaffaqiyatli' ? 'text-emerald-400' :
                                                    'text-amber-400'
                                                }`}>
                                                {row.holat}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Metric display for second card */}
                            {card.type === 'metric' && (
                                <div className="grid grid-cols-3 gap-4">
                                    {[
                                        { label: 'React / Next.js', value: '★★★', color: 'text-amber-400' },
                                        { label: 'Three.js / WebGL', value: '★★★', color: 'text-amber-400' },
                                        { label: 'UI/UX Dizayn', value: '★★★', color: 'text-emerald-400' },
                                    ].map((m, i) => (
                                        <div key={i} className="text-center p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                            <div className={`text-2xl font-bold ${m.color} mb-1`}>{m.value}</div>
                                            <div className="text-[10px] uppercase tracking-[0.15em] text-zinc-500">{m.label}</div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Wide card - service types */}
                            {card.type === 'wide' && (
                                <div className="flex flex-wrap gap-4 items-center justify-between">
                                    {['3D Saytlar', 'Landing Page', 'E-Commerce', 'SaaS Platform', 'Portfolio', 'Web Ilovalar'].map((service, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] hover:border-amber-500/30 hover:bg-amber-500/5 transition-all duration-300 cursor-default"
                                        >
                                            <div className={`w-2 h-2 rounded-full ${i % 3 === 0 ? 'bg-amber-400' :
                                                    i % 3 === 1 ? 'bg-emerald-400' :
                                                        'bg-blue-400'
                                                }`}></div>
                                            <span className="text-xs font-medium text-zinc-300">{service}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
