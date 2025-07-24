import { library } from '@fortawesome/fontawesome-svg-core';
import { faTerminal } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faTerminal, faLinkedin, faGithub);

function Nav() {
  return (
    <header className="border-b border-neutral-700 bg-neutral-900 text-neutral-100">
      <nav className="container mx-auto flex items-center justify-between px-4 py-2 font-mono">
        <a href="#top" className="flex items-center gap-2 text-green-400">
          <FontAwesomeIcon icon="terminal" />
          <span className="font-bold">edo@portfolio</span>
        </a>
        <div className="flex items-center gap-4">
          <a href="#top" className="hover:text-green-400">about</a>
          <a href="#projects" className="hover:text-green-400">projects</a>
          <a href="#contact" className="hover:text-green-400">contact</a>
          <a
            href="https://www.linkedin.com/in/edoardo-galli-5074321b9/"
            target="_blank" rel="noreferrer" className="hover:text-green-400"
          >
            <FontAwesomeIcon icon={[ 'fab', 'linkedin' ]} />
          </a>
          <a
            href="https://github.com/edoski"
            target="_blank" rel="noreferrer" className="hover:text-green-400"
          >
            <FontAwesomeIcon icon={[ 'fab', 'github' ]} />
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Nav;