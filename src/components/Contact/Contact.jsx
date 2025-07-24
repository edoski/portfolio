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
        <section id="contact" className="px-4 py-8">
            <div className="border border-neutral-700 rounded-lg p-6 flex flex-col items-center gap-4 bg-neutral-900">
                <h2 className="text-green-400 font-mono text-xl">reach out</h2>
                <p className="text-neutral-300 text-center">for any inquiries or collaboration.</p>
                <button onClick={handleContactClick} className="flex items-center gap-2 bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded">
                    <EmailIcon />
                    <span>Contact</span>
                </button>
            </div>
        </section>
    );
}

export default Contact;