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
  const [formStatus, setFormStatus] = useState({ message: '', type: '' });

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
            <a href="https://drive.google.com/file/d/1Ev6Mbu3vqfClXH7uLL5MmTacZpeAJir9/view?usp=drive_link" target='blank'>My Resume</a>
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
              <p align="justify">I'm a Full Stack Developer who loves building websites and applications that are both useful and enjoyable to use. I work with technologies like Python, React, Next.js, and I’m always curious to learn new tools and frameworks. I enjoy solving problems, whether it’s through real-world projects or competitive programming. My aim is to create applications that are efficient, scalable, and make a real difference for people.</p>
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
                <a href="https://instagram.com/abhayx056" target="_blank" rel="noopener noreferrer" aria-label="Codeforces">
                  <img src="https://img.icons8.com/?size=100&id=BrU2BBoRXiWq&format=png&color=000000  "/>
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
                    <b>LeetCode</b>                          
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABKVBMVEUAAAD+/v7ro0C0srEuLi66uLcpKShsa2ryqELupUEAGCz//fzzqEJJQz/r6+saMEHroTqbmpnf3dxJSUmRkZEfGxleWUn89fDemTyCWSKxrqw0Iw3noD8iIiIZGRnu9PaEhISYlY0jJyozMzProDKueC9gQRhKMxRCLRIRERGpp6YOCAQfFAdeWFPw7uza3+N5eHmDf3lTWF1BNzWgn5qbnJ/CwsJWVVXR0dAdJSyfayOVZylbPRfQkDi6gDF4VjGzfDEsHgxzTx5iYWCHXSTHijYmGQnu4tZpQAD6zJi/gCTutHD10qrwu4D21rfsqVHdtpH/6NCpbhUAARKpr7dCSVJhaG8pMjrM0NZxeH9NRT1oYVkJIiPHwLgQFh2Mk5o9NCeAcmcNDy6uUNT0AAAKJUlEQVR4nO2de3vaNhTGLQgBD0rLpYMGOpykaRqSAU0bQpOSZc2lu3TdpVmbbGuy7ft/iEmyTYgtGbDOkTHz+0eLEzvW7zkXyZJ8MCpLi62KsWQstpYSwtgrIYy/EsL4axEJq6VSr/TQem4fLSLh2t7+bma/vWofLSKhsfdi92WptOCEq+nni0xYebh2r0IHpFwLSXhHCWH8lRDGXwlh/JUQxl8JYfwVNWGvXy6X0/uId4iWcL9IbA0eo90jUkKL3KqCdZMoCatjgKT1FdJdIiS8A0hIBuk20RF6AAlZx7lPZIQ+QGLh3CgqQj8gSePcKSJCASBWIEZDKAJcKBsKAUkP52ZREIoB80jDmggIxYCkjXQ7/YQSwCLW/bQTSgA7W1g31E0os+Ay2h01E8oAERuhl1AGiPVcwaSVMApArYQRuKihlVCWRfGSDJc+QpkF0boJR9oIZYB4U1COdBFGE4NMmgj1d/Qj6SGMKgaZtBBGaEE9hBLA7iv0OzNpIJQA1uoHm9i3ZsInlAE+eZAr1A8byHfXQCgDTD1IpVJmztzAZsQmDARkypkHqA3AJpQBPnABGWPqKWYTcAmnAaQqbCC2AZVwoouOzFjHi0ZMwqkBacox0RARCeXdhA+QmfE1UjPwCEvTxeCtGZHyDRqhDFDgoi4ijhWxCGcHxHJUJEIZoDgGR4gYjopDGMaCWLGIQhgAaHLptCIGoTSLFnLN4dHGxtEwlctJKOFjEYFQGoPDw9ED4euDekHMCO6o8IQywKGn6W/qOS2I4IQSwM43/lMPCjocFZpQBiic+H0tjsYCKCIwoQSw+FB8+mZKiAjqqLCEMkDptKEGRFBCGWDA2sSmxFHhpuEgCWWAgRc9k1gR7HkRkFAGOGGFV+yo5hlUs+AIZ45BVxLEZ0DtAiMMEYOunokGqrlDmHaBEcoAp1pdEsWieQzSLjDC0C5qa7PpQzSPINplQBEqr/D6Y9GEmkMFIQRYo294Y7HwSL1dXBCEICu8z7yO+q1yu2wBEFoSwBlXeO/GYg5svUad8EQ1Bl2NdxpmXbFVt1ImfCwBDLFXrdF0n4lz9W21Vo1JmbAMBmgYOxtsAidXaEIuKaoSvgRyUUeNRxvHG2/OlZrkkSLhC5AkgypFwoEQUMdGoKmlRpgVAqJvxptJaoSiNKNhM95MUiLcn/cYZFIiFEThfMUgkwrhsh8Qe0tzCKkQCgakaG9kh5cKod9JLbB2wUmBcLnjBSxPuOLxcmiF74EUCP2ZNNBHl612WkFtK+S73gqEvrmZQBNm0xkVwHQ6kwn3kqkCYX+WKLQU+ThjNUwzFQh9A5qAJ6YTAECKmNVL6E00QU4KwccQQySc8IRbXhP25efCmJAShgjF8IRfeQkDXlWuAhGmS5ESBtxdqZ8YV4gXvmNGuDL7DJUeLy1BEWq14VZ++kzTg8o0lk7CWXqLZSjCEM8umnp8iCENBQyRSkFHbUGdVRti1LYSZgIBcuQ9CDh5q6SMmGmHmkBQIPQvyQQ+32TbGSWthBmUGkqE695kGmhEdsFJNrRO1sNOcanMYvhnS5HKBClJhdC/9ttCqrmmIhXCdR8hKcKt+0EJekZ40mSUfikRiha4y/M26a22MlOMAaIaYU9AOG+OqrhCKlzFny9ERULR+hpFnKeMqrpTIQ2LuP369PAUthCB8m4T3+KFiqMe1gs5qjrUnjYmZcJ7QsJQiDvuWzRmAWwPNMSuL2E+DeOojbGNbTk4RICde5Lds7NasVG/s3MPahM0yO7LFQjE8/rd3ZfNHeV22QLZQQuAuOPdXlp4o94uLphd0DLEqWOxUffugs7N1S5oWbc4tRX9gHO3V9/IqCDu+AHnj1AF8Vv/uwhz+EaJ3FEnxqLARRkh1NgN8M2ukLEoBjSHUM2CfDsvlKOei1wU0ISghFLEAEdtiAHBekPot2RnjkWxi8K9MGOAv+k8YyxKAHNz9fTk0UxWlLwhC2lBhIoDkgHc2+/8p56KiyrAAsITyhC//8Hz2uvToRgQ1EUNlMofYsTaE/PsNkHuPBpKqpsAWxCneosY8ccHZiFXPz48PDw4qhdk1VvAAVEIxYjveClIk800yUvwwAPiEAoR3z2RYY3F4Cl8W5AqYQkQpyBEsCBeNTM/4k8TqmDBZ1FbaBXpfIgTAVEsiFlV0IP4fpKTIgEiEt5FrE0yIRYgJqHRvgXM/xxMaKKU2+NCrdBq1RzAtxOK7ZlNvMLXuFV2z3/5tVZ7+/7H4HKJqcIZVHkBgbBrQf/2hGqCAQsI/fyt0Ot5bw4lxfVGEXiEaEBDS9X5NwGMZuEMq7quKy3fjfD0SPgsQZ81jvFL62v6Bo/t0zNWLsF9qDDZM0bzCG5CLUAavyvo6enRsN5splLNZv3s+BTbO13p/t618wYV1OLnVIrg+w81KyGMvxLC+CshjL8SwvgrIYy/EsL4KyGMvxLC+CshjL8SwvgLhLAfUBLD0WXG/fSq2i+XB89lJ14MJN/2EVYQhF8Qcm/CKfdJ3mm4U6ivJtuu2CJfKjfojmAI81MTXhDSafd6e9LyATEm5Ea7IWQl+Mz5J6z0rOzD8QNezIISWtY+/Y+8HL/yhP7ec6VDuJW1evvKLWMCJry+5Kv2NsYHXv0kz4x2n33qUB8d30v7e5f/1E46a/zV9/xqkRPe8GAtT3KNaQRLuNYipFhu2RUyPtD/O+ygzG04KK9SA43l0I+EnUxss34izpWEEdJozZfZi+JfKzcOmLBLaqxN1AKrtIMgNeaCV6yCFCWkHz+MN/lVi5RfGLzMzdfsyg771R4nvLKLTn2if065cbCEu4T8wf7rM4+kB3+ygww7sHPpXyT/x+iqG9Kx16AuqcU/ur+5YIRd8pl+vN4r2n9CTaCEe8w7r1h0lU8oAfXOj+ygmHV7i3EbXrpJZ5fa94IzGdzMX9LT/jbW+I7xELW9vAIlvCArFgulQYUffL5ioTRgUA5hdyyVdsk/9offCTnvM7fmorn0X1LbZxmrE6rWpVfANmTpMHPP+NAd2OmQHRjdwbZDeENqo0pIly7UHRtS+724thMpTUo3nTnzUpodOyWGcEMbvctGL6xezRXJ77hjmtZtd7FHw5OrT39Gz7G/LoBG5zY1L+mfGDwbS8evUwtk5E1ch6MZkYFc8R6AHvxtcOyV0ZiGYTuheO1UXbrg6aRolzq3eBa+4v8a112egRUFQkgbOegP6PPCJ9YVZop2269ZV8gOmNlapNhnrWadYGcwKH62Pw76LadnIM6Vn50/2OmzIQBAlw9CeM0HJ8zrPl2OhjG0/+cHJM0+f7R/T3/Yd881du0xjR2O6/wg7yRPZ0wDUR4c6Ak4W6LiPVqlWuqNsknFKvWc0lHr1ZLjnkv0ZOeU3WppbBBLrxw1Zi1bqs7PuHS+lRDGXwlh/JUQxl8JYfyVEMZfCWH8lRDGXwlh/JUQxl8JYfz1fyCsLC22Kv8BaN/haPhx9mAAAAAASUVORK5CYII=" alt="CodeChef" />
                    <a href="https://leetcode.com/u/abhay5055" target="_blank" rel="noopener noreferrer">
                      <button>Show Profile</button>
                    </a>
                  </div>
                </div>
              </div>
              <div className="amlss">
                <h3>Machine Learning</h3>
                Amazon ML Summer School 2025                    
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUeLnMtZd99eMOHOwZBgeW2rU9gzUUkBI3_A&s" alt="Amazon ML Summer School" />
              </div>
              <div className='gssoc'>
                <h3>Open Souce Contribution</h3>
                Girl Script Summer of Code GSSoC 2025
                <img src="data:image/jpeg;base64,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" alt="Girl Script Summer Of Code" />
                <a href="https://github.com/Abhay056" target="_blank" rel="noopener noreferrer">
                  <button>See Contributions</button>
                </a>
              </div>
            </div>
          </section>
          <br/><br/>
          <section id="contact" className="section contact">
            <h2>Contact</h2>
            <form
              className="contact-form"
              onSubmit={async (e) => {
                e.preventDefault();
                setFormStatus({ message: 'Sending...', type: 'sending' });
                
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
                    setFormStatus({ message: '✅ Message sent successfully!', type: 'success' });
                    e.target.reset();
                  } else {
                    setFormStatus({ message: `❌ Failed to send: ${data.error || res.status}`, type: 'error' });
                  }
                } catch (err) {
                  console.error('Fetch error:', err);
                  setFormStatus({ message: '❌ Network error - please try again', type: 'error' });
                }
              }}
            >
              <input type="text" placeholder="Your Name"  style={{ fontFamily: 'monospace' }} required />
              <input type="email" placeholder="Your Email"  style={{ fontFamily: 'monospace' }} required />
              <textarea placeholder="Your Message" style={{ fontFamily: 'monospace' }} required /> 
              <button type="submit">Send Message</button>
              {formStatus.message && (
                <div 
                  className={`form-status ${formStatus.type}`}
                  style={{
                    marginTop: '1rem',
                    padding: '0.75rem',
                    borderRadius: '4px',
                    textAlign: 'center',
                    fontFamily: 'monospace',
                    backgroundColor: formStatus.type === 'success' ? '#d4edda' : formStatus.type === 'error' ? '#f8d7da' : '#d1ecf1',
                    color: formStatus.type === 'success' ? '#155724' : formStatus.type === 'error' ? '#721c24' : '#0c5460',
                    border: `1px solid ${formStatus.type === 'success' ? '#c3e6cb' : formStatus.type === 'error' ? '#f5c6cb' : '#bee5eb'}`
                  }}
                >
                  {formStatus.message}
                </div>
              )}
            </form>
            <h3 style={{ textAlign: 'center' }}>OR</h3>
            <h3>Contact me via WhatsApp<a href="https://wa.me/919458124662" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png" alt="WhatsApp" style={{ width: '40px', height: '40px', verticalAlign: 'middle', marginLeft: '10px' }} />
            </a></h3>
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
