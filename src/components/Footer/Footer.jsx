import { library } from '@fortawesome/fontawesome-svg-core';
import { faSun, faMoon, faTerminal, faCode } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Footer.css';

library.add(faSun, faMoon, faTerminal, faCode, faLinkedin, faGithub);

// Footer Component
function Footer() {
    return (
        <>
            <hr className="footer-hr"/>
            <div className="footer-container">
                <footer>
                    <div className="footer-logo">
                        <a className="footer-logo-text" href="#top">
                            <h2>edo <FontAwesomeIcon icon="code" /> dev</h2>
                        </a>
                    </div>
                    <div className="vertical-line"></div>
                    <div className="footer-icons">
                        <a className="linkedin-icon" href="https://www.linkedin.com/in/edoardo-galli-5074321b9/" target="_blank" rel="noreferrer">
                            <FontAwesomeIcon icon={['fab', 'linkedin']} aria-hidden="true" />
                            <span className="sr-only">LinkedIn</span>
                        </a>
                        <a className="github-icon" href="https://github.com/edoski" target="_blank" rel="noreferrer">
                            <FontAwesomeIcon icon={['fab', 'github']} aria-hidden="true" />
                            <span className="sr-only">GitHub</span>
                        </a>
                    </div>
                </footer>
                <div className="footer-text">
                    <p><small>&copy; 2024 - All rights reserved.</small></p>
                </div>
            </div>
        </>
    );
}

export default Footer;