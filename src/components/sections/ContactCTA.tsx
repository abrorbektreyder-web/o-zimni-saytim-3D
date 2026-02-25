import { motion } from 'framer-motion';
import { useState } from 'react';

export function ContactCTA() {
    const [email, setEmail] = useState('');

    return (
        <section className="py-24 px-6 relative z-10">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative glass-card rounded-2xl p-8 md:p-16 text-center overflow-hidden"
                >
                    {/* Background accent glows */}
                    <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none"></div>
                    <div className="absolute bottom-0 right-1/4 w-[200px] h-[200px] bg-amber-500/5 blur-[80px] rounded-full pointer-events-none"></div>

                    {/* Top gradient line */}
                    <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent"></div>

                    <div className="relative z-10">
                        {/* Badge */}
                        <div className="badge-pill mb-6 mx-auto w-max">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                            LOYIHA MUHOKAMASI
                        </div>

                        {/* Heading */}
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4 tracking-tight">
                            Loyihani Boshlashga{' '}
                            <span className="gold-gradient-text">Tayyormisiz?</span>
                        </h2>

                        <p className="text-zinc-500 text-[15px] max-w-lg mx-auto mb-10 leading-relaxed">
                            Raqamli o'zgarishni bugundan boshlang. Elektron pochtangizni qoldiring, va men siz bilan tez orada aloqaga chiqaman.
                        </p>

                        {/* Email input + button */}
                        <div className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email manzilingiz"
                                className="flex-1 w-full px-5 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm placeholder-zinc-600 focus:border-amber-500/50 focus:ring-0 transition-all duration-300"
                            />
                            <a
                                href="https://t.me/Huzayfa12312022"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto px-8 py-3.5 bg-amber-500 text-[#050A14] font-bold text-sm tracking-wide rounded-xl hover:bg-amber-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] transition-all duration-300 whitespace-nowrap"
                            >
                                TELEGRAM ORQALI
                            </a>
                        </div>

                        {/* Trust signal */}
                        <div className="flex flex-wrap items-center justify-center gap-4 mt-8 text-[10px] tracking-[0.15em] uppercase text-zinc-600">
                            <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                                +998 95 264 56 64
                            </div>
                            <div className="w-px h-3 bg-white/10 hidden sm:block"></div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                                @Huzayfa12312022
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
