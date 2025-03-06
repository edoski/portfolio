import Nav from './components/Nav/Nav';
import Hero from './components/Hero/Hero';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import './App.css';

// Main App Component
function App() {
    return (
        <div id="top" className="bottom-shine-container">
            <Nav />
            <main>
                <Hero />
                <Projects />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}

export default App;