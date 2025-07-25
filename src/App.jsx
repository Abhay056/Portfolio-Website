import { useEffect, useRef, useState } from 'react';
import SplashScreen from './SplashScreen';
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
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div className="app-root">
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
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
            <a href="https://drive.google.com/file/d/1Ev6Mbu3vqfClXH7uLL5MmTacZpeAJir9/view?usp=sharing" target='blank'>My Resume</a>
            <a href="#contact">Contact</a>
          </nav>
        )}
      </div>
      <div className="portfolio-center-wrapper">
        <div className="portfolio-container">
          <header className="header">
            <h1>Abhay Bahuguna</h1>
            <p className="subtitle">Full Stack  Developer</p>
          </header>
          <section id="about" className="section about" style={{ display: 'flex', alignItems: 'center', gap: '2rem', position: 'relative' }}>
            <img 
              src="/dp.jpg" 
              alt="Profile" 
              className="about-photo"
            />
            <div>
              <h2>About Me</h2>
              <p align="justify">I am a Full Stack Developer. I have created interactive and user-friendly web experiences, adding creativity with technical expertise.
With a keen interest in web development, I enjoy working with technologies like Python, React, Node.js. I am always eager to learn new frameworks and improve my problem-solving skills by building real-world projects.
Beyond coding, I love exploring competitive programming. My goal is to develop efficient and scalable web applications that make an impact.
</p>
<p align="justify">Feel free to explore my portfolio and reach out to collaborate!</p>
              <div className="social-links">
                <a href="https://www.linkedin.com/in/abhay-bahuguna" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <img src="https://icongr.am/devicon/linkedin-original.svg?size=128&color=currentColor"/>
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
          <br/><br/>
          <section id="skills" className="section skills">
            <h2>Technical Skills</h2>
            <ul className="skills-list">
              <li><span className="skill-icon"><img src="https://icongr.am/devicon/javascript-original.svg?size=128&color=currentColor" alt="JavaScript" /><span className="skill-tooltip">JavaScript</span></span></li>
              <li><span className="skill-icon"><img src="https://icongr.am/devicon/react-original.svg?size=128&color=currentColor" alt="React" /><span className="skill-tooltip">React</span></span></li>
              <li><span className="skill-icon"><img src="https://icongr.am/devicon/python-original.svg?size=128&color=currentColor" alt="Python" /><span className="skill-tooltip">Python</span></span></li>
              <li><span className="skill-icon"><img src="https://icongr.am/devicon/c-original.svg?size=128&color=currentColor" alt="C" /><span className="skill-tooltip">C</span></span></li>
              <li><span className="skill-icon"><img src="https://icongr.am/devicon/cplusplus-original.svg?size=128&color=currentColor" alt="C++" /><span className="skill-tooltip">C++</span></span></li>
              <li><span className="skill-icon"><img src="https://icongr.am/devicon/mongodb-original.svg?size=128&color=currentColor" alt="MongoDB" /><span className="skill-tooltip">MongoDB</span></span></li>
              <li><span className="skill-icon"><img src="https://icongr.am/devicon/typescript-original.svg?size=128&color=currentColor" alt="TypeScript" /><span className="skill-tooltip">TypeScript</span></span></li>
              <li><span className="skill-icon"><img src="https://icongr.am/devicon/html5-original.svg?size=128&color=currentColor" alt="HTML5" /><span className="skill-tooltip">HTML5</span></span></li>
              <li><span className="skill-icon"><img src="https://icongr.am/devicon/css3-original.svg?size=128&color=currentColor" alt="CSS3" /><span className="skill-tooltip">CSS3</span></span></li>
              <li><span className="skill-icon"><img src="https://icongr.am/devicon/oracle-original.svg?size=128&color=currentColor" alt="Oracle" /><span className="skill-tooltip">Oracle</span></span></li>
              <li><span className="skill-icon"><img src="https://icongr.am/devicon/php-original.svg?size=128&color=currentColor" alt="PHP" /><span className="skill-tooltip">PHP</span></span></li>
              <li><span className="skill-icon"><img src="https://icongr.am/devicon/git-original.svg?size=128&color=currentColor" alt="Git" /><span className="skill-tooltip">Git</span></span></li>
              <li><span className="skill-icon"><img src="https://icongr.am/devicon/java-original.svg?size=128&color=currentColor" alt="Java" /><span className="skill-tooltip">Java</span></span></li>
              <li><span className="skill-icon"><img src="https://icongr.am/devicon/nodejs-original.svg?size=128&color=currentColor" alt="Node.js" /><span className="skill-tooltip">Node.js</span></span></li>
              <li><span className="skill-icon"><img src="https://icongr.am/devicon/mysql-original-wordmark.svg?size=128&color=currentColor" alt="MySQL" /><span className="skill-tooltip">MySQL</span></span></li>
              <li><span className='skill-icon'><img src="https://icongr.am/devicon/android-original.svg?size=128&color=currentColor" alt="Android" /><span className="skill-tooltip">Android</span></span></li>
            </ul>
          </section>
          <br/><br/>
          <section id="education" className="section education">
            <h2>Education</h2>
            <div className="education-item">
              <div className='col'>
                <h3>B.Tech in Computer Science and Engineering</h3>
                <p>Graphic Era Hill University, Dehradun</p>
                <p>2022-2026</p>
              </div>
              <div className='col'>
                <h3>10+2 CBSE PCM</h3>
                <p>Sharda Public School, Almora</p>
                <p>2019-2021</p>
              </div>
            </div>
          </section>
          <br/><br/>
          <section id="projects" className="section projects">
            <h2>Projects</h2>
            <div className="project-item">
              <a href='https://github.com/Abhay056/expense-tracker-app' target="_blank" rel="noopener noreferrer" className="project project-link">
                <h3>Expense Tracker App (React.js, Next.js, Supabase )  [Jun '25- Jul '25]</h3>
                <p>
                  • Useful application for efficiently managing daily expenses with user authentication.
                </p>
                <p>
                  • Multiple features including monthly budgets, filters, and expense summary with charts.
                </p>
              </a>
              <a href='https://github.com/Abhay056/Nano-cc-compiler' target="_blank" rel="noopener noreferrer" className="project project-link">
                <h3>Nano C/C++ Compiler (Lex, YACC, GCC, React.js) [Apr '25- Jun '25]</h3>
                <p>
                  • Developed an interactive Nano compiler with basic error handling.
                </p>
                <p>
                  • Includes Lexical, Syntax and Semantic phase implementation.
                </p>
              </a>
                <a href='https://github.com/Abhay056/Human-detector-and-counter' target="_blank" rel="noopener noreferrer" className="project project-link">
                <h3>Human Detector and Counter (Python, OpenCV, YOLOv8) [Aug '24- Sep '24]</h3>
                <p>
                  •  Implemented a system that accurately detects and counts humans in real-time video streams or images.
                </p>
                <p>
                  •  Efficient solution for various applications requiring human presence monitoring.
                </p>
              </a>
              <a href='https://github.com/Abhay056/Plagiarism-detector' target="_blank" rel="noopener noreferrer" className="project project-link">
                <h3>Plagiarism Detection System (KMP, Hash Table) [May '24- Jun '24]</h3>
                <p>
                  • Developed a plagiarism detection system with advanced string-matching algorithms and hash tables.
                </p>
                <p>
                  • Created a system to handle large sets of documents efficiently using optimized data structures and smart comparison techniques.
                </p>
              </a>
            </div>
          </section>
          <br/><br/>
          <section id="contact" className="section contact">
            <h2>Contact</h2>
            <form
              className="contact-form"
              onSubmit={async (e) => {
                e.preventDefault();
                const name = e.target[0].value;
                const email = e.target[1].value;
                const message = e.target[2].value;

                try {
                  const res = await fetch('/.netlify/functions/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, message }),
                  });

                  const data = await res.json().catch(() => ({}));
                  if (res.ok) {
                    alert('✅ Message sent: ' + data.message);
                    e.target.reset();
                  } else {
                    alert('❌ Failed to send: ' + (data.error || res.status));
                  }
                } catch (err) {
                  console.error('Fetch error:', err);
                  alert('❌ Network error — check console');
                }
              }}
            >
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <textarea placeholder="Your message" required /> 
              <button type="submit">Send Message</button>
            </form>
          </section>
          <footer className="footer">
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
            <p>
              <br/>
              &copy; {new Date().getFullYear()} Abhay Bahuguna. All rights reserved.
            </p>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default App
