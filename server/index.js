import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from project root
dotenv.config({ path: resolve(__dirname, '..', '.env') });

const app = express();
const PORT = process.env.PORT || 3001;

// CORS — faqat frontend domendan ruxsat
app.use(cors({
    origin: process.env.ALLOWED_ORIGIN || 'http://localhost:5173',
    methods: ['POST'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json({ limit: '10kb' }));

// ============ SPAM HIMOYA ============
// Rate limiting — IP bo'yicha
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 daqiqa
const RATE_LIMIT_MAX = 3; // 1 daqiqada max 3 ta so'rov

function rateLimit(req, res, next) {
    const ip = req.ip || req.connection.remoteAddress;
    const now = Date.now();

    if (!rateLimitMap.has(ip)) {
        rateLimitMap.set(ip, []);
    }

    const timestamps = rateLimitMap.get(ip).filter(t => now - t < RATE_LIMIT_WINDOW);

    if (timestamps.length >= RATE_LIMIT_MAX) {
        return res.status(429).json({
            success: false,
            message: 'Juda ko\'p so\'rov. Iltimos, 1 daqiqa kuting.'
        });
    }

    timestamps.push(now);
    rateLimitMap.set(ip, timestamps);
    next();
}

// Honeypot & basic validation
function validateRequest(req, res, next) {
    const { name, phone, message, website } = req.body;

    // Honeypot field — bot bu maydonni to'ldiradi
    if (website) {
        return res.status(400).json({ success: false, message: 'Spam aniqlandi.' });
    }

    // Required fields check
    if (!name || !phone || !message) {
        return res.status(400).json({
            success: false,
            message: 'Barcha maydonlarni to\'ldiring.'
        });
    }

    // Name validation — min 2 belgi, max 100
    if (typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 100) {
        return res.status(400).json({
            success: false,
            message: 'Ism kamida 2 ta belgidan iborat bo\'lsin.'
        });
    }

    // Phone validation — +998 XX XXX XX XX format
    const phoneClean = phone.replace(/[\s\-\(\)]/g, '');
    const phoneRegex = /^\+998\d{9}$/;
    if (!phoneRegex.test(phoneClean)) {
        return res.status(400).json({
            success: false,
            message: 'Telefon raqam +998XXXXXXXXX formatida bo\'lsin.'
        });
    }

    // Message validation — min 5 belgi, max 1000
    if (typeof message !== 'string' || message.trim().length < 5 || message.trim().length > 1000) {
        return res.status(400).json({
            success: false,
            message: 'Izoh kamida 5 ta belgidan iborat bo\'lsin.'
        });
    }

    // Sanitize
    req.body.name = name.trim();
    req.body.phone = phoneClean;
    req.body.message = message.trim();

    next();
}

// ============ TELEGRAM ENDPOINT ============
app.post('/api/contact', rateLimit, validateRequest, async (req, res) => {
    const { name, phone, message } = req.body;

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
        console.error('❌ TELEGRAM_BOT_TOKEN yoki TELEGRAM_CHAT_ID .env faylida topilmadi!');
        return res.status(500).json({
            success: false,
            message: 'Server xatosi. Iltimos, keyinroq urinib ko\'ring.'
        });
    }

    const text = `🆕 Yangi lead

👤 Ism: ${name}
📞 Telefon: ${phone}
📝 Izoh: ${message}`;

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
            console.error('❌ Telegram API xatosi:', result);
            return res.status(500).json({
                success: false,
                message: 'Xabar yuborishda xatolik. Iltimos, keyinroq urinib ko\'ring.'
            });
        }

        console.log(`✅ Lead qabul qilindi: ${name} — ${phone}`);
        return res.status(200).json({
            success: true,
            message: 'So\'rovingiz muvaffaqiyatli qabul qilindi!'
        });

    } catch (error) {
        console.error('❌ Server xatosi:', error);
        return res.status(500).json({
            success: false,
            message: 'Server xatosi. Iltimos, keyinroq urinib ko\'ring.'
        });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`🚀 Server ishga tushdi: http://localhost:${PORT}`);
    console.log(`📡 Telegram bot API tayyor`);
});
