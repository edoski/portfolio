import {library} from '@fortawesome/fontawesome-svg-core';
import {fab, faGithub} from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './Projects.css';

library.add(fab, faGithub);

function Projects() {
    const projectList = [
        {
            title: 'pub-sub',
            description: "(OS course project) a client-server, terminal-based, pub-sub application leveraging java's multithreading capabilities.",
            techStack: 'java client-server multithreading',
            link: 'https://github.com/edoski/pubsub/',
        },
        {
            title: 'web-chat',
            description: 'a web-based chat interface, where users can register themselves, and interact with other users either in a general chat, or individually.',
            techStack: 'javascript css html',
            link: 'https://github.com/edoski/web-chat/',
        },
        {
            title: 'fantasy-cards',
            description: '(university project) a javafx application, where users can save, load, and play a turn-based fantasy card game.',
            techStack: 'java javafx scenebuilder',
            link: 'https://github.com/edoski/fantasy-cards/',
        },
        {
            title: 'md-notes-app',
            description: 'a web-based note-taking application, where users can create, edit, and preview markdown notes, stored on firebase.',
            techStack: 'react firebase',
            link: 'https://github.com/edoski/mde-notes-app/',
        },
        {
            title: 'youtube-clone',
            description: 'a web-based application where users can authenticate via their google account, and upload or watch videos on the platform.',
            techStack: 'react typescript google-api',
            link: 'https://github.com/edoski/youtube-clone',
        },
        {
            title: 'portfolio',
            description: "the very website you're currently on; originally in vanilla js, now in react; everything you see here is freely available on my github.",
            techStack: 'javascript css html',
            link: 'https://github.com/edoski/portfolio',
        },
    ];

    return (
        <div className="projects-body">
            <hr className="nav-hr"/>
            <div className="hero-subtitle-container-flex">
                <div className="hero-subtitle-container">
                    <h1 className="hero-subtitle">...here&#39;s some of my projects.</h1>
                </div>
            </div>
            <div id="projects" className="projects-container">
                {projectList.map((project, index) => (
                    <div key={index} className="project-card">
                        <div className="project-content">
                            <a href={project.link} target="_blank" rel="noreferrer" className="project-link">
                                <div className="project-header">
                                    <h3>{project.title}</h3>
                                    <FontAwesomeIcon icon={['fab', 'github']}/>
                                </div>
                                <p>{project.description}</p>
                                <div className={"tech-stack-container"}>
                                    {project.techStack.split(' ').map((tech, i) => (
                                        <div className={"tech-bubble"}>
                                            <span key={i} className="tech-stack bold">{tech}</span>
                                        </div>
                                    ))}
                                </div>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Projects;