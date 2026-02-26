// Vercel Serverless Function — Telegram orqali xabar yuborish
// Bu funksiya Vercel platformasida avtomatik ishlaydi

// ============ SPAM HIMOYA ============
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 daqiqa
const RATE_LIMIT_MAX = 3; // 1 daqiqada max 3 ta so'rov

function checkRateLimit(ip) {
    const now = Date.now();

    if (!rateLimitMap.has(ip)) {
        rateLimitMap.set(ip, []);
    }

    const timestamps = rateLimitMap.get(ip).filter(t => now - t < RATE_LIMIT_WINDOW);

    if (timestamps.length >= RATE_LIMIT_MAX) {
        return false;
    }

    timestamps.push(now);
    rateLimitMap.set(ip, timestamps);
    return true;
}

export default async function handler(req, res) {
    // CORS headers
    const allowedOrigins = [
        'http://localhost:5173',
        'http://localhost:4173',
        process.env.ALLOWED_ORIGIN,
    ].filter(Boolean);

    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin) || !origin) {
        res.setHeader('Access-Control-Allow-Origin', origin || '*');
    }
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // OPTIONS (preflight)
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Faqat POST
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Faqat POST metodi qo\'llaniladi.' });
    }

    // Rate limiting
    const ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown';
    if (!checkRateLimit(ip)) {
        return res.status(429).json({
            success: false,
            message: 'Juda ko\'p so\'rov. Iltimos, 1 daqiqa kuting.'
        });
    }

    const { name, phone, message, website } = req.body || {};

    // Honeypot — bot bu maydonni to'ldiradi
    if (website) {
        return res.status(400).json({ success: false, message: 'Spam aniqlandi.' });
    }

    // Required fields
    if (!name || !phone || !message) {
        return res.status(400).json({
            success: false,
            message: 'Barcha maydonlarni to\'ldiring.'
        });
    }

    // Name validation
    if (typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 100) {
        return res.status(400).json({
            success: false,
            message: 'Ism kamida 2 ta belgidan iborat bo\'lsin.'
        });
    }

    // Phone validation
    const phoneClean = phone.replace(/[\s\-\(\)]/g, '');
    const phoneRegex = /^\+998\d{9}$/;
    if (!phoneRegex.test(phoneClean)) {
        return res.status(400).json({
            success: false,
            message: 'Telefon raqam +998XXXXXXXXX formatida bo\'lsin.'
        });
    }

    // Message validation
    if (typeof message !== 'string' || message.trim().length < 5 || message.trim().length > 1000) {
        return res.status(400).json({
            success: false,
            message: 'Izoh kamida 5 ta belgidan iborat bo\'lsin.'
        });
    }

    // ============ TELEGRAM GA YUBORISH ============
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
        console.error('❌ TELEGRAM_BOT_TOKEN yoki TELEGRAM_CHAT_ID environment variable topilmadi!');
        return res.status(500).json({
            success: false,
            message: 'Server xatosi. Iltimos, keyinroq urinib ko\'ring.'
        });
    }

    const text = `🆕 Yangi lead

👤 Ism: ${name.trim()}
📞 Telefon: ${phoneClean}
📝 Izoh: ${message.trim()}`;

    try {
        const telegramResponse = await fetch(
            `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: text,
                    parse_mode: 'HTML'
                })
            }
        );

        const result = await telegramResponse.json();

        if (!result.ok) {
            console.error('❌ Telegram API xatosi:', JSON.stringify(result));
            return res.status(500).json({
                success: false,
                message: 'Xabar yuborishda xatolik. Iltimos, keyinroq urinib ko\'ring.'
            });
        }

        console.log(`✅ Lead qabul qilindi: ${name.trim()} — ${phoneClean}`);
        return res.status(200).json({
            success: true,
            message: 'So\'rovingiz muvaffaqiyatli qabul qilindi!'
        });

    } catch (error) {
        console.error('❌ Telegram API bilan bog\'lanishda xatolik:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Server xatosi. Iltimos, keyinroq urinib ko\'ring.'
        });
    }
}
