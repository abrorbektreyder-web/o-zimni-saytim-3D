export function Footer() {
    return (
        <footer className="border-t border-white/[0.04] py-8 px-6 relative z-10">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                <p className="text-zinc-600 text-xs tracking-wider">
                    © {new Date().getFullYear()} HOYR Web Studio. Barcha huquqlar himoyalangan.
                </p>
                <div className="flex items-center gap-2 text-zinc-600 text-xs">
                    <span>Manzil:</span>
                    <span className="text-amber-400 font-medium">Andijon sh, 1-chi kichik daha 42</span>
                </div>
            </div>
        </footer>
    );
}
