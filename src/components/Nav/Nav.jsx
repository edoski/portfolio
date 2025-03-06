import {library} from '@fortawesome/fontawesome-svg-core';
import {faSun, faMoon, faTerminal} from '@fortawesome/free-solid-svg-icons';
import {faLinkedin, faGithub} from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './Nav.css';

library.add(faSun, faMoon, faTerminal, faLinkedin, faGithub);

function Nav() {
    return (
        <>
            <div className="nav-container">
                <nav>
                    <div className="logo">
                        <h1>
                            <a className="nav-link" href="#top">
                                <span><FontAwesomeIcon icon="terminal"/></span>
                                edo-portfolio<span>-v2</span>
                            </a>
                        </h1>
                    </div>
                    <div className="nav-links">
                        <a className="nav-link" href="#top">about</a>
                        <a className="nav-link" href="#projects">projects</a>
                        <a className="nav-link" href="#contact">contact</a>
                        <div className="vertical-line"></div>
                        <div className="nav-icons">
                            {/*<div className="theme-container">*/}
                            {/*  <FontAwesomeIcon icon="sun" />*/}
                            {/*  <FontAwesomeIcon icon="moon" />*/}
                            {/*</div>*/}
                            <a className="linkedin-icon" href="https://www.linkedin.com/in/edoardo-galli-5074321b9/"
                               target="_blank"
                               rel="noreferrer">
                                <FontAwesomeIcon icon={['fab', 'linkedin']} aria-hidden="true"/>
                                <span className="sr-only">LinkedIn</span>
                            </a>
                            <a className="github-icon" href="https://github.com/edoski" target="_blank"
                               rel="noreferrer">
                                <FontAwesomeIcon icon={['fab', 'github']} aria-hidden="true"/>
                                <span className="sr-only">GitHub</span>
                            </a>
                        </div>
                    </div>
                </nav>
                <hr className="nav-hr"/>
            </div>
        </>
    );
}

export default Nav;