import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const plans = [
    {
        name: 'Standard Biznes',
        price: 'Boshlanish: $20',
        period: '',
        description: 'Kichik va o\'rta biznes uchun professional, zamonaviy tashrif qog\'ozi sayti.',
        features: [
            'Individual dizayn (Shablonlarsiz)',
            'Barcha qurilmalarga moslashuvchan',
            'Soddalashtirilgan UI/UX',
            'Asosiy SEO optimizatsiya',
            'Standart animatsiyalar',
        ],
        cta: "Ma'lumot Olish",
        highlighted: false,
    },
    {
        name: 'Premium 3D Experience',
        price: 'Boshlanish: $100',
        period: '',
        description: 'Raqobatchilarni ortda qoldiradigan, wow effektga ega 3D web platforma.',
        features: [
            'WebGL / Three.js 3D modellar',
            'Premium shaxsiy dizayn tizimi',
            'Maxsus mikro-animatsiyalar (GSAP)',
            'Cheksiz smooth scroll effektlar',
            'To\'liq chuqurlashtirilgan SEO',
            "1 yil tekin texnik yordam",
            "Maksimal yuklanish tezligi",
        ],
        cta: 'Loyihani Boshlash',
        highlighted: true,
        badge: 'TAVSIYA ETILADI',
    },
];

export function Pricing() {
    return (
        <section id="narxlar" className="py-24 px-6 relative z-10">
            <div className="max-w-6xl mx-auto">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <div className="badge-pill mb-6 mx-auto w-max">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                        INVESTITSIYA
                    </div>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 tracking-tight">
                        Xizmat{' '}
                        <span className="gold-gradient-text">Paketlari</span>
                    </h2>
                    <p className="text-zinc-500 max-w-lg mx-auto text-[15px]">
                        Loyiha ko'lami, texnologiya darajasi va talablaringizga moslashtirilgan narxlar.
                    </p>
                </motion.div>

                {/* Pricing cards */}
                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {plans.map((plan, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.15, duration: 0.7 }}
                            className={`card-hover-glow relative rounded-2xl p-5 md:p-6 flex flex-col group hover:border-amber-500/20 transition-all duration-500 ${plan.highlighted
                                ? 'glass-card border-amber-500/20'
                                : 'glass-card'
                                }`}
                        >
                            {/* Highlighted card glow */}
                            {plan.highlighted && (
                                <>
                                    <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent rounded-2xl pointer-events-none"></div>
                                    <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
                                </>
                            )}

                            <div className="relative z-10 flex flex-col h-full">
                                {/* Badge */}
                                {plan.badge && (
                                    <div className="text-[9px] font-bold tracking-[0.2em] uppercase text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 w-max mb-3">
                                        {plan.badge}
                                    </div>
                                )}

                                {/* Plan header */}
                                <h3 className="text-xl font-bold text-white mb-1 tracking-tight">{plan.name}</h3>
                                <p className="text-zinc-500 text-sm mb-4">{plan.description}</p>

                                {/* Price */}
                                <div className="mb-5">
                                    <span className="text-3xl font-bold text-white tracking-tight">{plan.price}</span>
                                    <span className="text-zinc-500 text-sm ml-1">{plan.period}</span>
                                </div>

                                {/* Features */}
                                <ul className="flex flex-col gap-2 mb-6 flex-1">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm text-zinc-400">
                                            <span className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${plan.highlighted
                                                ? 'bg-amber-500/10 border border-amber-500/20'
                                                : 'bg-white/[0.03] border border-white/10'
                                                }`}>
                                                <Check className={`w-3 h-3 ${plan.highlighted ? 'text-amber-400' : 'text-zinc-500'
                                                    }`} />
                                            </span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA button */}
                                <a
                                    href="https://t.me/Huzayfa12312022"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-full py-3 rounded-xl text-center font-semibold text-sm tracking-wide transition-all duration-300 block ${plan.highlighted
                                        ? 'bg-amber-500 text-[#050A14] hover:bg-amber-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]'
                                        : 'border border-white/10 text-zinc-300 hover:border-amber-500/30 hover:text-amber-400 hover:bg-white/[0.03]'
                                        }`}
                                >
                                    {plan.cta}
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
