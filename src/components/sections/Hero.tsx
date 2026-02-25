import { motion } from 'framer-motion';

const stats = [
    { value: '50+', label: 'LOYIHALAR', desc: 'Yakunlangan ishlar' },
    { value: '3D', label: 'WEBGL', desc: 'Interaktiv texnologiya' },
    { value: '100%', label: 'SIFAT', desc: 'Kafolatlangan natija' },
    { value: '24/7', label: "QO'LLAB-QUVVATLASH", desc: 'Doimiy aloqa' },
];

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center px-6 pt-24 pb-16 overflow-hidden">
            {/* Background grid */}
            <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none"></div>

            {/* Ambient glows */}
            <div className="absolute top-20 left-10 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto w-full relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
                    {/* Left content */}
                    <div className="flex flex-col items-start">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="badge-pill mb-8"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                            PREMIUM 3D WEB ISHLAB CHIQISH
                        </motion.div>

                        {/* Main heading */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold tracking-tight text-white mb-6 leading-[0.95]"
                        >
                            Raqamli{' '}
                            <span className="gold-gradient-text">
                                Mukammallik.
                            </span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex items-start gap-4 mb-12"
                        >
                            <div className="w-0.5 h-16 bg-gradient-to-b from-amber-400 to-transparent flex-shrink-0 mt-1"></div>
                            <p className="text-[15px] leading-relaxed text-zinc-400 max-w-md">
                                Oddiy saytlar emas — mijozlaringizni hayratda qoldiradigan, ishonch uyg'otadigan va sotuvlarni oshiradigan 3D WebGL platformalar yarataman.
                            </p>
                        </motion.div>

                        {/* Stats row */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full"
                        >
                            {stats.map((stat, idx) => (
                                <div key={idx} className="stat-item group cursor-default py-3">
                                    <div className="text-2xl md:text-3xl font-bold text-white mb-1 tracking-tight">
                                        {stat.value}
                                    </div>
                                    <div className="text-[10px] font-medium tracking-[0.2em] uppercase text-zinc-500 mb-1">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right side - globe space (occupied by the 3D scene behind) */}
                    <div className="hidden lg:block" />
                </div>
            </div>
        </section>
    );
}
