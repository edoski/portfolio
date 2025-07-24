// Hero Component styled as a terminal welcome message
function Hero() {
  return (
    <section className="p-8 space-y-4">
      <pre className="text-green-400 font-mono">$ echo {"\"Hello, I'm Edo\""}</pre>
      <h1 className="text-5xl font-bold text-white font-mono">Edo Galli</h1>
      <p className="text-neutral-300 font-mono max-w-xl">
        an <span className="text-white">ambitious</span> 21-year-old software engineer;<br />
        currently studying computer science at the University of Bologna.
      </p>
    </section>
  );
}

export default Hero;