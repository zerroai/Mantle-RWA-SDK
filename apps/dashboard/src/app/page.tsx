import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { Stats } from '@/components/landing/Stats';
import { Footer } from '@/components/landing/Footer';

export default function Home() {
    return (
        <main className="min-h-screen bg-white selection:bg-gray-900 selection:text-white">
            <Hero />
            <Features />
            <Stats />
            <Footer />
        </main>
    );
}
