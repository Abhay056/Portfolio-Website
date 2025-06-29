import { useEffect, useRef, useState } from 'react';
import './App.css'

function MatrixBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const fontSize = 18;
    const columns = Math.floor(width / fontSize);
    const drops = Array(columns).fill(1);
    const chars = '01010111111111111111000000000000000000000000000000000101010101010101010010001010101010100101011110001101010001010010010101010010010001010010';

    function draw() {
      ctx.fillStyle = 'rgba(18, 36, 107, 0.18)';
      ctx.fillRect(0, 0, width, height);
      ctx.font = fontSize + 'px monospace';
      ctx.fillStyle = '#00ffea';
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > height && Math.random() > 0.98) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationFrameId = requestAnimationFrame(draw);
    }

    draw();

    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="matrix-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}

function App() {
  const [navOpen, setNavOpen] = useState(true);

  return (
    <div className="app-root">
      <MatrixBackground />
      <div className={`vertical-navbar${navOpen ? ' open' : ''}`} style={{left: 0, right: 'auto'}}>
        <button className="nav-toggle" onClick={() => setNavOpen((v) => !v)} aria-label="Toggle navigation">
          {navOpen ? <span>&#10005;</span> : <span>&#9776;</span>}
        </button>
        {navOpen && (
          <nav className="nav-links">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#education">Education</a>
            <a href="#projects">Projects</a>
            <a href="https://drive.google.com/file/d/1Dk1JcmqaPOyFf-IckA5wwyNwDncaTgYL/view?usp=drive_link">Resume</a>
            <a href="#contact">Contact</a>
          </nav>
        )}
      </div>
      <div className="portfolio-center-wrapper">
        <div className="portfolio-container">
          <header className="header">
            <h1>Abhay Bahuguna</h1>
            <p className="subtitle">Full Stack Developer</p>
          </header>
          <section id="about" className="section about" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <img 
              src="/dp.jpg" 
              alt="Profile" 
              className="about-photo"
            />
            <div>
              <h2>About Me</h2>
              <p align="justify">I am a Full Stack Web Developer. I have created interactive and user-friendly web experiences, adding creativity with technical expertise.
With a keen interest in web development, I enjoy working with technologies like Python, React, Node.js. I am always eager to learn new frameworks and improve my problem-solving skills by building real-world projects.
Beyond coding, I love exploring competitive programming. My goal is to develop efficient and scalable web applications that make an impact.
</p>
<p align="justify">Feel free to explore my portfolio and reach out to collaborate!</p>
              <div className="social-links">
                <a href="https://www.linkedin.com/in/abhay-bahuguna" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.968v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.034 0 3.595 1.997 3.595 4.59v5.606z"/></svg>
                </a>
                <a href="mailto:abjun504@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Gmail">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 13.065l-11.985-8.065v16h23.97v-16l-11.985 8.065zm11.985-10.065h-23.97l11.985 8.065 11.985-8.065z"/></svg>
                </a>
                <a href="https://github.com/Abhay056">
                  <img src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png"/>
                </a>
                <a href="https://codeforces.com/profile/Abhay5055" target="_blank" rel="noopener noreferrer" aria-label="Codeforces">
                  <img src="https://art.npanuhin.me/SVG/Codeforces/Codeforces.colored.svg"/>
                </a>
              </div>
            </div>
          </section>
          <section id="skills" className="section skills">
            <h2>Technical Skills</h2>
            <ul className="skills-list">
              <li>JavaScript</li>
              <li>React.js</li>
              <li>Node.js</li>
              <li>HTML5 & CSS3</li>
              <li>Git & GitHub</li>
              <li>C++</li>
              <li>Python</li>
              <li>Java</li>
              <li>C</li>
              <li>SQL</li>
              <li>MongoDB</li>
              <li>Express.js</li>
            </ul>
          </section>
          <section id="education" className="section education">
            <h2>Education</h2>
            <div className="education-item">
              <div className='col'>
                <h3>B.Tech in Computer Science and Engineering</h3>
                <p>Graphic Era Hill University, Dehradun</p>
                <p>2022-2026</p>
                <p>CGPA 8.06</p>
              </div>
              <div className='col'>
                <h3>10+2 CBSE PCM</h3>
                <p>Sharda Public School, Almora</p>
                <p>2019-2021</p>
                <p>Scored 92%</p>
              </div>
            </div>
          </section>
          <section id="projects" className="section projects">
            <h2>Projects</h2>
            <div className="project-item">
              <div className="project">
                <h3>Plagiarism Detection System (KMP, Hash Table) [Mar ’24- Jun ’24] <a href='https://github.com/Abhay056/Plagiarism-detector' target="_blank" rel="noopener noreferrer">
                  <img src='https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png' alt="Plagiarism Detector Repo" />
                </a></h3>
                <p>
                • Developed a plagiarism detection system with advanced string-matching algorithms and hash tables.<br />
                • Created a system to handle large sets of documents efficiently using optimized data structures and smart comparison techniques.
                </p>
              </div>
              <div className="project">
                <h3>Human Detector and Counter (SVM, CNN) [Aug ’24- Sep ’24] <a href='https://github.com/Abhay056/Human-detector-and-counter' target="_blank" rel="noopener noreferrer">
                  <img src='https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png' alt="Human Detector Repo" />
                </a></h3>
                <p>
                  • Developed a system that accurately detects and counts the number of people within a defined area using computer vision algorithms.<br />
                  • Utilize machine learning models to identify and track individuals in real-time.
                </p>
              </div>
              <div className="project">
                <h3>Smart Health Vault (React Js, Node Js, MongoDB)  [Jan ’25- Mar ’25] <a href='https://github.com/Abhay056/Smart-health-vault' target="_blank" rel="noopener noreferrer">
                  <img src='https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png' alt="Smart Health Vault Repo" />
                </a></h3>
                <p>
                  • A digital solution for securely storing, managing, and maintaining health records.<br />
                  • Customizable Health Insights with personalized health tracking and analysis for better decision-making.
                </p>
              </div>
              <div className="project">
                <h3>Nano C/C++ Compiler (Lex, YACC, GCC, React.js) [Apr ’25- Jun ’25] <a href='https://github.com/Abhay056/Nano-cc-compiler' target="_blank" rel="noopener noreferrer">
                  <img src='https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png' alt="Nano Compiler Repo" />
                </a></h3>
                <p>
                  • Developed an interactive Nano compiler with basic error handling.<br />
                  • Includes Lexical, Syntax and Semantic phase implementation.
                </p>
              </div>
            </div>
          </section>
          <section id="contact" className="section contact">
            <h2>Contact</h2>
            <form className="contact-form">
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <textarea placeholder="Your Message" required></textarea>
              <button type="submit">Send Message</button>
            </form>
          </section>
          <footer className="footer">
            <p>
              &copy; {new Date().getFullYear()} Abhay Bahuguna. All rights reserved.
            </p>
            <div className="footer-github-buttons">
              <a
                rel="noreferrer"
                className="github-button github-fork"
                href="https://github.com/Abhay056/Portfolio-Website/fork"
                data-size="large"
                data-show-count="true"
                aria-label="Fork Abhay056/Portfolio-Website on GitHub"
                target="_blank"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M8.75 19.25a3.25 3.25 0 1 1 6.5 0 3.25 3.25 0 0 1-6.5 0ZM15 4.75a3.25 3.25 0 1 1 6.5 0 3.25 3.25 0 0 1-6.5 0Zm-12.5 0a3.25 3.25 0 1 1 6.5 0 3.25 3.25 0 0 1-6.5 0ZM5.75 6.5a1.75 1.75 0 1 0-.001-3.501A1.75 1.75 0 0 0 5.75 6.5ZM12 21a1.75 1.75 0 1 0-.001-3.501A1.75 1.75 0 0 0 12 21Zm6.25-14.5a1.75 1.75 0 1 0-.001-3.501A1.75 1.75 0 0 0 18.25 6.5Z"></path><path d="M6.5 7.75v1A2.25 2.25 0 0 0 8.75 11h6.5a2.25 2.25 0 0 0 2.25-2.25v-1H19v1a3.75 3.75 0 0 1-3.75 3.75h-6.5A3.75 3.75 0 0 1 5 8.75v-1Z"></path><path d="M11.25 16.25v-5h1.5v5h-1.5Z"></path></svg>
                Fork
              </a>
              <a
                rel="noreferrer"
                className="github-button github-star"
                href="https://github.com/Abhay056/Portfolio-Website"
                data-size="large"
                data-show-count="true"
                aria-label="Star Abhay056/Portfolio-Website on GitHub"
                target="_blank"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
                  <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"/>
                </svg>
                Star
              </a>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default App
