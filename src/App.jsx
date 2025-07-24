import Nav from './components/Nav/Nav';
import Hero from './components/Hero/Hero';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

// Main App Component
function App() {
    return (
        <div id="top" className="min-h-screen bg-neutral-900 text-neutral-100">
            <Nav />
            <main className="container mx-auto py-8 space-y-12">
                <Hero />
                <Projects />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}

export default App;