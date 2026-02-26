import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const navLinks = [
    { label: 'PORTFOLIO', href: '#portfolio' },
    { label: 'XIZMATLAR', href: '#xizmatlar', active: true },
    { label: 'NARXLAR', href: '#narxlar' },
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-3",
                scrolled ? "bg-[#050A14]/90 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-3 group cursor-pointer">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center group-hover:bg-amber-500/20 transition-all duration-300">
                        <svg className="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                        </svg>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[13px] font-bold tracking-wider text-white leading-none">HOYR</span>
                        <span className="text-[9px] font-medium tracking-[0.3em] text-zinc-500 uppercase leading-tight">WEB STUDIO</span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className={cn(
                                "text-[11px] font-medium tracking-[0.2em] uppercase transition-colors duration-300",
                                link.active
                                    ? "text-amber-400"
                                    : "text-zinc-500 hover:text-amber-400"
                            )}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                {/* Contact Button */}
                <a
                    href="#contact"
                    className="hidden md:flex items-center gap-2 px-5 py-2 rounded-lg border border-white/10 bg-white/[0.03] text-[11px] font-medium tracking-[0.15em] uppercase text-zinc-400 hover:text-amber-400 hover:border-amber-500/30 transition-all duration-300"
                >
                    BOG'LANISH
                </a>

                {/* Mobile menu button */}
                <button className="md:hidden text-zinc-400 hover:text-amber-400 transition-colors">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </motion.header>
    );
}
