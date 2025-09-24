import { useEffect, useRef, useState } from 'react';
import SplashScreen from './SplashScreen';
import './App.css';


function MatrixBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // Set initial canvas size
    const setCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    setCanvasSize();

    const fontSize = Math.max(14, Math.min(18, width / 80)); // Responsive font size
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
      setCanvasSize();
      // Recalculate drops array for new width
      const newColumns = Math.floor(width / fontSize);
      if (newColumns !== columns) {
        drops.length = newColumns;
        for (let i = 0; i < newColumns; i++) {
          if (drops[i] === undefined) drops[i] = 1;
        }
      }
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
  // Check if device is PC (desktop) based on screen width
  const [navOpen, setNavOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth > 1024; // Open by default only on PC (>1024px)
    }
    return false;
  });
  const [showSplash, setShowSplash] = useState(true);
  const [formStatus, setFormStatus] = useState({ message: '', type: '' });

  // Handle window resize to auto-close navbar on smaller screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setNavOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
            <a href="https://drive.google.com/file/d/1Ev6Mbu3vqfClXH7uLL5MmTacZpeAJir9/view?usp=drive_link" target="_blank" rel="noopener noreferrer">My Resume</a>
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
          <section id="about" className="section about">
            <img 
              src="/dp.jpg" 
              alt="Profile" 
              className="about-photo"
            />
            <div className="about-content">
              <h2>About Me</h2>
              <p align="justify">I'm a Full Stack Developer who loves building websites and applications that are both useful and enjoyable to use. I work with technologies like Python, React, Next.js, and I’m always curious to learn new tools and frameworks. I enjoy solving problems, whether it’s through real-world projects or competitive programming. My aim is to create applications that are efficient, scalable, and make a real difference for people.</p>
<p align="justify">Feel free to explore my portfolio and reach out to collaborate!</p>
              <div className="social-links">
                <a href="https://www.linkedin.com/in/abhay-bahuguna" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <img src="https://icongr.am/devicon/linkedin-original.svg?size=128&color=currentColor" alt="LinkedIn"/>
                </a>
                <a href="mailto:abjun504@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Gmail">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 13.065l-11.985-8.065v16h23.97v-16l-11.985 8.065zm11.985-10.065h-23.97l11.985 8.065 11.985-8.065z"/></svg>
                </a>
                <a href="https://github.com/Abhay056" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <img src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png" alt="GitHub"/>
                </a>
                <a href="https://instagram.com/abhayx056" target="_blank" rel="noopener noreferrer" aria-label="Codeforces">
                  <img src="https://img.icons8.com/?size=100&id=BrU2BBoRXiWq&format=png&color=000000" alt="Instagram"/>
                </a>
              </div>  
            </div>
          </section>
          <br/><br/>
          <section id="skills" className="section skills">
            <h2>Technical Skills</h2>
            <br/>
            <ul className="skills-list">
              <li><span className="skill-icon"><img src="https://img.icons8.com/?size=128&id=YX03OUiHE3rz&format=png&color=000000" alt="Python" /><span className="skill-tooltip">Python</span></span></li>
              <li><span className="skill-icon"><img src="https://icongr.am/devicon/c-original.svg?size=128&color=currentColor" alt="C" /><span className="skill-tooltip">C</span></span></li>
              <li><span className="skill-icon"><img src="https://icongr.am/devicon/cplusplus-original.svg?size=128&color=currentColor" alt="C++" /><span className="skill-tooltip">C++</span></span></li>
              <li><span className="skill-icon"><img src="https://img.icons8.com/?size=128&id=lTKW3iI3wIT0&format=png&color=000000" alt="Java" /><span className="skill-tooltip">Java</span></span></li>
              <li><span className="skill-icon"><img src="https://icongr.am/devicon/javascript-original.svg?size=128&color=currentColor" alt="JavaScript" /><span className="skill-tooltip">JavaScript</span></span></li>
              <li><span className="skill-icon"><img src="https://icongr.am/devicon/react-original.svg?size=128&color=currentColor" alt="React" /><span className="skill-tooltip">React.js</span></span></li>
              <li><span className="skill-icon"><img src="https://icongr.am/devicon/typescript-original.svg?size=128&color=currentColor" alt="TypeScript" /><span className="skill-tooltip">TypeScript</span></span></li>
              <li><span className="skill-icon"><img src="https://icongr.am/devicon/nodejs-original.svg?size=128&color=currentColor" alt="Node.js" /><span className="skill-tooltip">Node.js</span></span></li>
              <li><span className="skill-icon"><img src="https://img.icons8.com/?size=128&id=MWiBjkuHeMVq&format=png&color=000000" alt="Next.js" /><span className="skill-tooltip">Next.js</span></span></li>
              <li><span className="skill-icon"><img src="https://icongr.am/devicon/express-original.svg?size=128&color=currentColor" alt="Express.js" /><span className="skill-tooltip">Express.js</span></span></li>
              <li><span className="skill-icon"><img src="https://icongr.am/devicon/html5-original.svg?size=128&color=currentColor" alt="HTML5" /><span className="skill-tooltip">HTML5</span></span></li>
              <li><span className="skill-icon"><img src="https://icongr.am/devicon/css3-original.svg?size=128&color=currentColor" alt="CSS3" /><span className="skill-tooltip">CSS3</span></span></li>
              <li><span className="skill-icon"><img src="https://img.icons8.com/?size=128&id=WoopfRcDj3RF&format=png&color=000000" alt="Tailwind CSS" /><span className="skill-tooltip">Tailwind CSS</span></span></li>
              <li><span className="skill-icon"><img src="https://icongr.am/devicon/mongodb-original.svg?size=128&color=currentColor" alt="MongoDB" /><span className="skill-tooltip">MongoDB</span></span></li>
              <li><span className="skill-icon"><img src="https://icongr.am/devicon/oracle-original.svg?size=128&color=currentColor" alt="Oracle" /><span className="skill-tooltip">Oracle</span></span></li>
              <li><span className="skill-icon"><img src="https://icongr.am/devicon/git-original.svg?size=128&color=currentColor" alt="Git" /><span className="skill-tooltip">Git</span></span></li>
              <li><span className="skill-icon"><img src="https://img.icons8.com/?size=128&id=39858&format=png&color=000000" alt="MySQL" /><span className="skill-tooltip">MySQL</span></span></li>
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
                <img src="/expense-tracker.png" alt="Expense Tracker App" />
                <p>
                  • Useful application for efficiently managing daily expenses with user authentication.
                </p>
                <p>
                  • Multiple features including monthly budgets, filters, and expense summary with charts.
                </p>
              </a>
              <a href='https://github.com/Abhay056/Nano-cc-compiler' target="_blank" rel="noopener noreferrer" className="project project-link">
                <h3>Nano C/C++ Compiler (Lex, YACC, GCC, React.js) [Apr '25- Jun '25]</h3>
                <img src="/compiler.png" alt="Nano C/C++ Compiler" />
                <p>
                  • Developed an interactive Nano compiler with basic error handling.
                </p>
                <p>
                  • Includes Lexical, Syntax and Semantic phase implementation.
                </p>
              </a>
                <a href='https://github.com/Abhay056/Human-detector-and-counter' target="_blank" rel="noopener noreferrer" className="project project-link">
                  <h3>Human Detector and Counter (Python, OpenCV, YOLOv8) [Aug '24- Sep '24]</h3>
                  <img src="/human.png" alt="Human Detector and Counter" />
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
          <section id="achievement" className="section achievement">
            <h2>Achievements</h2>
            <div className="achievement-item">
              <div className="cp">            
                <h3>Competitive Programming</h3>
                <div className="cp-card">
                  <div className='cp-card-cf'>
                    <b>Codeforces (Specialist)</b>
                    <img src="https://cdn.iconscout.com/icon/free/png-256/free-code-forces-3521352-2944796.png?f=webp" alt="Codeforces" />
                    <a href="https://codeforces.com/profile/Abhay5055" target="_blank" rel="noopener noreferrer">
                      <button>Show Profile</button>
                    </a>
                  </div>
                  <div className='cp-card-chef'> 
                    <b>CodeChef (3⭐)</b>               
                    <img src="https://cdn.codechef.com/images/cc-logo.svg" alt="CodeChef" />
                    <a href="https://codechef.com/users/abhay056" target="_blank" rel="noopener noreferrer">
                      <button>Show Profile</button>
                    </a>
                  </div>
                  <div className='cp-card-leet'>   
                    <b>LeetCode (Knight)</b>                          
                    <img src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png" alt="LeetCode" />
                    <a href="https://leetcode.com/u/abhay5055" target="_blank" rel="noopener noreferrer">
                      <button>Show Profile</button>
                    </a>
                  </div>
                </div>
              </div>
              <div className="am">
                <div className="amlss">
                  <h3>Machine Learning</h3>
                  Amazon ML Summer School 2025                    
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUeLnMtZd99eMOHOwZBgeW2rU9gzUUkBI3_A&s" alt="Amazon ML Summer School" />
                </div>
                <div className='gssoc'>
                  <h3>Open Source Contribution</h3>
                  Girl Script Summer of Code GSSoC 2025
                  <img src="https://media.licdn.com/dms/image/v2/C510BAQGSObrO0QPlMQ/company-logo_200_200/company-logo_200_200/0/1630597186826/girlscriptsoc_logo?e=2147483647&v=beta&t=hMIYqKIIlV3PFys0Ff4bQba_kZIMvychDesmF1_xmcU" alt="Girl Script Summer of Code"/>
                </div>
              </div>
            </div>
          </section>
          <br/><br/>
          <section id="contact" className="section contact">
            <div className="contact-container">
              <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}>Get In Touch</h2>
              <form
                className="contact-form"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.2rem'
                }}
                onSubmit={async (e) => {
                  e.preventDefault();
                  setFormStatus({ message: 'Sending...', type: 'sending' });
                  
                  const name = e.target[0].value;
                  const email = e.target[1].value;
                  const message = e.target[2].value;

                  try {
                    // Only log in development
                    if (process.env.NODE_ENV === 'development') {
                      console.log('Sending message...', { name, email: email.substring(0, 3) + '***' });
                    }
                    
                    const res = await fetch('/.netlify/functions/contact', {
                    // const res = await fetch('http://localhost:5000/api/contact', {  //For running server locally
                      method: 'POST',
                      headers: { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                      },
                      body: JSON.stringify({ name, email, message }),
                    });

                    if (process.env.NODE_ENV === 'development') { 
                      console.log('Response status:', res.status);
                    }
                    
                    let data = {};
                    try {
                      data = await res.json();
                    } catch (jsonError) {
                      if (process.env.NODE_ENV === 'development') {
                        console.error('JSON parse error:', jsonError);
                      }
                      data = { error: 'Invalid response format' };
                    }
                    
                    if (process.env.NODE_ENV === 'development') {
                      console.log('Response data:', data);
                    }

                    if (res.ok) {
                      setFormStatus({ message: '✅ Message sent successfully!', type: 'success' });
                      e.target.reset();
                    } else {
                      const errorMsg = data.error || `Server error: ${res.status}`;
                      setFormStatus({ message: `❌ Failed to send: ${errorMsg}`, type: 'error' });
                    }
                  } catch (err) {
                    if (process.env.NODE_ENV === 'development') {
                      console.error('Fetch error:', err);
                    }
                    setFormStatus({ message: '❌ Network error - please check your connection', type: 'error' });
                  }
                }}
              >
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  style={{ 
                    width: 'calc(100% - 2rem)',
                    maxWidth: '100%',
                    padding: '0.7rem 0.8rem',
                    fontFamily: 'monospace',
                    fontSize: '0.85rem',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '6px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    color: '#fff',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                    boxSizing: 'border-box'
                  }} 
                  required 
                />
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  style={{ 
                    width: 'calc(100% - 2rem)',
                    maxWidth: '100%',
                    padding: '0.7rem 0.8rem',
                    fontFamily: 'monospace',
                    fontSize: '0.85rem',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '6px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    color: '#fff',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                    boxSizing: 'border-box'
                  }} 
                  required 
                />
                <textarea 
                  placeholder="Your Message" 
                  rows="5"
                  style={{ 
                    width: 'calc(100% - 2rem)',
                    maxWidth: '100%',
                    padding: '0.8rem 1rem',
                    fontFamily: 'monospace',
                    fontSize: '0.9rem',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    color: '#fff',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                    resize: 'vertical',
                    minHeight: '120px',
                    boxSizing: 'border-box'
                  }} 
                  required 
                />
                <button type="submit">
                  <span>
                    Send Message
                  </span>
                </button>
                {formStatus.message && (
                  <div 
                    className={`form-status ${formStatus.type}`}
                    style={{
                      marginTop: '0.5rem',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      textAlign: 'center',
                      fontFamily: 'monospace',
                      fontSize: '0.9rem',
                      backgroundColor: formStatus.type === 'success' ? 'rgba(40, 167, 69, 0.15)' : formStatus.type === 'error' ? 'rgba(220, 53, 69, 0.15)' : 'rgba(23, 162, 184, 0.15)',
                      color: formStatus.type === 'success' ? '#28a745' : formStatus.type === 'error' ? '#dc3545' : '#17a2b8',
                      border: `1px solid ${formStatus.type === 'success' ? '#28a745' : formStatus.type === 'error' ? '#dc3545' : '#17a2b8'}`
                    }}
                  >
                    {formStatus.message}
                  </div>
                )}
              </form>
              
              <div className="contact-divider" style={{
                display: 'flex',
                alignItems: 'center',
                margin: '2rem 0',
                color: 'rgba(255, 255, 255, 0.6)'
              }}>
                <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.2)' }}></div>
                <span style={{ margin: '0 1rem', fontSize: '0.9rem', fontFamily: 'monospace' }}>OR</span>
                <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.2)' }}></div>
              </div>
              
              <div className="alternative-contact" style={{
                textAlign: 'center',
                padding: '1rem',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <p style={{ 
                  margin: '0 0 1rem 0', 
                  fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontFamily: 'monospace'
                }}>
                  Prefer instant messaging?
                </p>
                <a 
                  href="https://wa.me/919458124662" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="WhatsApp"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.6rem 1.2rem',
                    backgroundColor: '#25D366',
                    color: '#fff',
                    textDecoration: 'none',
                    borderRadius: '25px',
                    fontSize: '0.9rem',
                    fontFamily: 'monospace',
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#20b358';
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.boxShadow = '0px 0px 30px white';

                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = '#25D366';
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = '0px 0px 30px #25D366';
                  }}
                >
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png" 
                    alt="WhatsApp" 
                    style={{ 
                      width: '20px', 
                      height: '20px'
                    }} 
                  />
                  WhatsApp Me
                </a>
              </div>
            </div>
          </section>
          <br/><br/>
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
                <svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M8.75 19.25a3.25 3.25 0 1 1 6.5 0 3.25 3.25 0 0 1-6.5 0ZM15 4.75a3.25 3.25 0 1 1 6.5 0 3.25 3.25 0 0 1-6.5 0Zm-12.5 0a3.25 3.25 0 1 1 6.5 0 3.25 3.25 0 0 1-6.5 0ZM5.75 6.5a1.75 1.75 0 1 0-.001-3.501A1.75 1.75 0 0 0 5.75 6.5ZM12 21a1.75 1.75 0 1 0-.001-3.501A1.75 1.75 0 0 0 12 21Zm6.25-14.5a1.75 1.75 0 1 0-.001-3.501A1.75 1.75 0 0 0 18.25 6.5Z"></path><path d="M6.5 7.75v1A2.25 2.25 0 0 0 8.75 11h6.5a2.25 2.25 0 0 0 2.25-2.25v-1H19v1a3.75 3.75 0 0 1-3.75 3.75h-6.5A3.75 3.75 0 0 1 5 8.75v-1Z"></path><path d="M11.25 16.25v-5h1.5v5h-1.5Z"></path></svg>
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
                <svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
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
