import './Hero.css';

// Hero Component
function Hero() {
    const skills = [
        { category: "Programming Languages", items: [
                { name: "Java", level: "Advanced" },
                { name: "SQL", level: "Intermediate" },
                { name: "Python", level: "Beginner" },
            ]},
        { category: "Databases", items: [
                { name: "MySQL", level: "Intermediate" },
                { name: "MongoDB", level: "Beginner" },
                { name: "Firebase", level: "Beginner" },
            ]},
        { category: "Web Technologies", items: [
                { name: "JavaScript", level: "Intermediate" },
                { name: "TypeScript", level: "Intermediate" },
                { name: "PHP", level: "Intermediate" },
                { name: "HTML", level: "Intermediate" },
                { name: "CSS", level: "Intermediate" },
            ]},
        { category: "Frameworks & Libraries", items: [
                { name: "React", level: "Intermediate" },
                { name: "Tailwind CSS", level: "Beginner" },
                { name: "Bootstrap", level: "Beginner" },
            ]},
    ];

    return (
        <div className="hero-container">
            <p className="hero-text-top">hi, i&#39;m</p>
            <h1 className="hero-title">edo.</h1>
            <p className="hero-text">
                an <span className="bold">ambitious</span>, 21-year-old, <span className="bold">software engineer</span>;<br/>
                currently studying <span className="bold">computer science</span> at the <span className="bold">university of bologna</span>.
            </p>
            <div className="about-me-container">
                <div className="skills-container">
                    {skills.map((skillCategory, index) => (
                        <div key={index} className="skill-category">
                            <h3>{skillCategory.category}</h3>
                            <div className="skill-bubbles">
                                {skillCategory.items.map((skill, skillIndex) => (
                                    <div key={skillIndex} className="skill-bubble">
                                        <span className="skill-name">{skill.name}</span>
                                        {skill.level && <span className="skill-level">{skill.level}</span>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Hero;