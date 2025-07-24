import { library } from '@fortawesome/fontawesome-svg-core';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faCode, faLinkedin, faGithub);

// Footer Component
function Footer() {
    return (
        <footer className="mt-8 border-t border-neutral-700 py-4 text-neutral-400 font-mono text-sm">
            <div className="container mx-auto flex flex-col items-center gap-4">
                <a href="#top" className="text-neutral-300 hover:text-green-400 flex items-center gap-1">
                    <span>edo dev</span>
                    <FontAwesomeIcon icon="code" />
                </a>
                <div className="flex gap-4 text-xl">
                    <a href="https://www.linkedin.com/in/edoardo-galli-5074321b9/" target="_blank" rel="noreferrer" className="hover:text-green-400">
                        <FontAwesomeIcon icon={[ 'fab', 'linkedin' ]} />
                    </a>
                    <a href="https://github.com/edoski" target="_blank" rel="noreferrer" className="hover:text-green-400">
                        <FontAwesomeIcon icon={[ 'fab', 'github' ]} />
                    </a>
                </div>
                <p className="text-xs">&copy; 2024 - All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;