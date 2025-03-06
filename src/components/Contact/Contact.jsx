import './Contact.css';

// Contact Component
function Contact() {
    const EmailIcon = () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"
                fill="currentColor"
            />
        </svg>
    );

    const handleContactClick = () => {
        window.location.href = 'mailto:edoxtreme@gmail.com';
    };

    return (
        <div id="contact" className="contact-banner-container">
            <div className="contact-banner">
                <div className="gradient-line"></div>
                <div className="content">
                    <h2>reach out.</h2>
                    <p>for any inquiries, or collaboration.</p>
                </div>
                <button onClick={handleContactClick} className="contact-button">
                    <EmailIcon/>
                    <span>Contact</span>
                </button>
            </div>
        </div>
    );
}

export default Contact;