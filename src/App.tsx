import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Scene } from './components/canvas/Scene';
import { Hero } from './components/sections/Hero';
import { TrustBlock } from './components/sections/TrustBlock';
import { Advantages } from './components/sections/Advantages';
import { Portfolio } from './components/sections/Portfolio';
import { Pricing } from './components/sections/Pricing';
import { ContactCTA } from './components/sections/ContactCTA';

function App() {
  return (
    <div className="relative bg-[#050A14] text-white min-h-screen font-sans overflow-x-hidden">
      {/* Background grid */}
      <div className="fixed inset-0 bg-grid opacity-30 pointer-events-none z-[1]"></div>

      {/* 3D Globe Scene */}
      <Scene />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main className="relative z-10 w-full">
        <Hero />
        <TrustBlock />
        <Advantages />
        <Portfolio />
        <Pricing />
        <ContactCTA />
      </main>

      <Footer />
    </div>
  );
}

export default App;
