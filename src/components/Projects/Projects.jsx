import { library } from '@fortawesome/fontawesome-svg-core';
import { fab, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
        <section className="px-4 py-8" id="projects">
            <h2 className="text-xl font-bold text-green-400 font-mono mb-4">projects</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projectList.map((project, index) => (
                    <a key={index} href={project.link} target="_blank" rel="noreferrer"
                       className="border border-neutral-700 rounded-lg p-4 hover:bg-neutral-800 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-white font-mono">{project.title}</h3>
                            <FontAwesomeIcon icon={[ 'fab', 'github' ]} className="text-green-400" />
                        </div>
                        <p className="text-neutral-300 text-sm mb-2">{project.description}</p>
                        <div className="flex flex-wrap gap-1">
                            {project.techStack.split(' ').map((tech, i) => (
                                <span key={i} className="bg-neutral-700 text-neutral-200 text-xs px-2 py-1 rounded">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
}

export default Projects;