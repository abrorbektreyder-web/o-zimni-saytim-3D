import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';

interface FormData {
    name: string;
    phone: string;
    message: string;
    website: string; // honeypot
}

interface FormErrors {
    name?: string;
    phone?: string;
    message?: string;
}

export function ContactCTA() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        phone: '+998 ',
        message: '',
        website: '' // honeypot — ko'rinmas maydon
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [statusMessage, setStatusMessage] = useState('');
    const formRef = useRef<HTMLFormElement>(null);

    // Telefon raqamni formatlash
    const formatPhone = (value: string): string => {
        // Faqat raqam va + belgisini qoldirish
        let digits = value.replace(/[^\d+]/g, '');

        // +998 bilan boshlanishi kerak
        if (!digits.startsWith('+998')) {
            if (digits.startsWith('998')) digits = '+' + digits;
            else if (digits.startsWith('+')) digits = '+998' + digits.slice(1);
            else digits = '+998' + digits;
        }

        // Max 13 belgi (+998 XX XXX XX XX)
        if (digits.length > 13) digits = digits.slice(0, 13);

        // Formatlash: +998 XX XXX XX XX
        let formatted = '+998';
        const rest = digits.slice(4);
        if (rest.length > 0) formatted += ' ' + rest.slice(0, 2);
        if (rest.length > 2) formatted += ' ' + rest.slice(2, 5);
        if (rest.length > 5) formatted += ' ' + rest.slice(5, 7);
        if (rest.length > 7) formatted += ' ' + rest.slice(7, 9);

        return formatted;
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPhone(e.target.value);
        setFormData(prev => ({ ...prev, phone: formatted }));
        if (errors.phone) setErrors(prev => ({ ...prev, phone: undefined }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    // Validatsiya
    const validate = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim() || formData.name.trim().length < 2) {
            newErrors.name = 'Ism kamida 2 ta belgidan iborat bo\'lsin';
        }

        const phoneDigits = formData.phone.replace(/[\s\-\(\)]/g, '');
        if (!/^\+998\d{9}$/.test(phoneDigits)) {
            newErrors.phone = 'To\'liq telefon raqam kiriting (+998 XX XXX XX XX)';
        }

        if (!formData.message.trim() || formData.message.trim().length < 5) {
            newErrors.message = 'Izoh kamida 5 ta belgidan iborat bo\'lsin';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Forma yuborish
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            // Vercel Serverless Function — /api/contact
            // Lokal dev uchun ham proxy orqali ishlaydi
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name.trim(),
                    phone: formData.phone.replace(/[\s]/g, ''),
                    message: formData.message.trim(),
                    website: formData.website // honeypot
                })
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setSubmitStatus('success');
                setStatusMessage('So\'rovingiz muvaffaqiyatli qabul qilindi! ✅');
                // Formani tozalash
                setFormData({ name: '', phone: '+998 ', message: '', website: '' });
                setErrors({});
            } else {
                setSubmitStatus('error');
                setStatusMessage(result.message || 'Xatolik yuz berdi. Qaytadan urinib ko\'ring.');
            }
        } catch {
            setSubmitStatus('error');
            setStatusMessage('Server bilan bog\'lanib bo\'lmadi. Internet aloqangizni tekshiring.');
        } finally {
            setIsSubmitting(false);
            // 5 soniyadan keyin statusni yashirish
            setTimeout(() => {
                setSubmitStatus('idle');
                setStatusMessage('');
            }, 5000);
        }
    };

    return (
        <section id="contact" className="py-24 px-6 relative z-10">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative glass-card rounded-2xl p-8 md:p-16 overflow-hidden"
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
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4 tracking-tight text-center">
                            Loyihani Boshlashga{' '}
                            <span className="gold-gradient-text">Tayyormisiz?</span>
                        </h2>

                        <p className="text-zinc-500 text-[15px] max-w-lg mx-auto mb-10 leading-relaxed text-center">
                            Formani to'ldiring va men siz bilan tez orada aloqaga chiqaman.
                        </p>

                        {/* Kontakt Forma */}
                        <form
                            ref={formRef}
                            onSubmit={handleSubmit}
                            className="max-w-lg mx-auto space-y-5"
                            noValidate
                        >
                            {/* Honeypot — ko'rinmas maydon, faqat botlar to'ldiradi */}
                            <div className="absolute opacity-0 pointer-events-none -z-10" aria-hidden="true">
                                <input
                                    type="text"
                                    name="website"
                                    tabIndex={-1}
                                    autoComplete="off"
                                    value={formData.website}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Ism */}
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                <label htmlFor="contact-name" className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">
                                    ISM
                                </label>
                                <input
                                    id="contact-name"
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Ismingizni kiriting"
                                    required
                                    maxLength={100}
                                    className={`w-full px-5 py-3.5 rounded-xl bg-white/[0.03] border text-white text-sm placeholder-zinc-600 transition-all duration-300 focus:ring-0 ${errors.name
                                        ? 'border-red-500/60 focus:border-red-500/80'
                                        : 'border-white/10 focus:border-amber-500/50'
                                        }`}
                                />
                                <AnimatePresence>
                                    {errors.name && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -5 }}
                                            className="mt-1.5 text-xs text-red-400"
                                        >
                                            {errors.name}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </motion.div>

                            {/* Telefon raqam */}
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <label htmlFor="contact-phone" className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">
                                    TELEFON RAQAM
                                </label>
                                <input
                                    id="contact-phone"
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handlePhoneChange}
                                    placeholder="+998 XX XXX XX XX"
                                    required
                                    className={`w-full px-5 py-3.5 rounded-xl bg-white/[0.03] border text-white text-sm placeholder-zinc-600 transition-all duration-300 focus:ring-0 ${errors.phone
                                        ? 'border-red-500/60 focus:border-red-500/80'
                                        : 'border-white/10 focus:border-amber-500/50'
                                        }`}
                                />
                                <AnimatePresence>
                                    {errors.phone && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -5 }}
                                            className="mt-1.5 text-xs text-red-400"
                                        >
                                            {errors.phone}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </motion.div>

                            {/* Izoh / Muammo */}
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                <label htmlFor="contact-message" className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">
                                    IZOH / MUAMMO
                                </label>
                                <textarea
                                    id="contact-message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Loyihangiz haqida qisqacha yozing..."
                                    required
                                    rows={4}
                                    maxLength={1000}
                                    className={`w-full px-5 py-3.5 rounded-xl bg-white/[0.03] border text-white text-sm placeholder-zinc-600 transition-all duration-300 focus:ring-0 resize-none ${errors.message
                                        ? 'border-red-500/60 focus:border-red-500/80'
                                        : 'border-white/10 focus:border-amber-500/50'
                                        }`}
                                />
                                <div className="flex justify-between mt-1">
                                    <AnimatePresence>
                                        {errors.message && (
                                            <motion.p
                                                initial={{ opacity: 0, y: -5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -5 }}
                                                className="text-xs text-red-400"
                                            >
                                                {errors.message}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                    <span className="text-[10px] text-zinc-600 ml-auto">
                                        {formData.message.length}/1000
                                    </span>
                                </div>
                            </motion.div>

                            {/* Submit Button */}
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full py-4 rounded-xl font-bold text-sm tracking-wider transition-all duration-300 relative overflow-hidden group ${isSubmitting
                                        ? 'bg-amber-500/50 text-[#050A14]/60 cursor-not-allowed'
                                        : 'bg-amber-500 text-[#050A14] hover:bg-amber-400 hover:shadow-[0_0_40px_rgba(245,158,11,0.35)] active:scale-[0.98]'
                                        }`}
                                >
                                    {/* Shine effect */}
                                    {!isSubmitting && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                                    )}
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                YUBORILMOQDA...
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                                                </svg>
                                                TELEGRAM ORQALI
                                            </>
                                        )}
                                    </span>
                                </button>
                            </motion.div>

                            {/* Telefon orqali bog'lanish tugmasi */}
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                            >
                                <a
                                    href="tel:+998952645664"
                                    className="w-full py-4 rounded-xl font-bold text-sm tracking-wider transition-all duration-300 relative overflow-hidden group border border-amber-500/30 text-amber-400 hover:bg-amber-500/10 hover:border-amber-500/60 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] active:scale-[0.98] flex items-center justify-center gap-2"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                    TELEFON ORQALI
                                </a>
                            </motion.div>

                            {/* Status xabar */}
                            <AnimatePresence>
                                {submitStatus !== 'idle' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                        transition={{ duration: 0.4, ease: 'easeOut' }}
                                        className={`p-4 rounded-xl text-center text-sm font-medium backdrop-blur-sm ${submitStatus === 'success'
                                            ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                                            : 'bg-red-500/10 border border-red-500/20 text-red-400'
                                            }`}
                                    >
                                        {statusMessage}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </form>


                    </div>
                </motion.div>
            </div>
        </section>
    );
}
