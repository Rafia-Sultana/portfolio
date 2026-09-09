'use client'

import { FormEvent, useEffect, useState } from 'react'
import emailjs from '@emailjs/browser';
import {
  ArrowDown,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Code2,
  Database,
  ExternalLink,
  GitBranch,
  Globe2,
  Network,
  Mail,
  Menu,
  PenTool,
  Server,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react'
import { AnyARecord } from 'node:dns';

const navItems = [
  ['about', 'About'],
  ['skills', 'Skills'],
  ['experience', 'Experience'],
  ['projects', 'Projects'],
  ['education', 'Education'],
  ['contact', 'Contact'],
] as const

const skillGroups = [
  { title: 'Languages', icon: Code2, items: ['JavaScript ES6', 'TypeScript', 'SQL', 'C', 'C++'] },
  { title: 'Frontend', icon: Globe2, items: ['React', 'Next.js','TanStack Query', 'Redux Toolkit', 'Material UI', 'Tailwind CSS', 'D3.js'] },
  { title: 'Backend & data', icon: Database, items: ['Node.js', 'Express', 'REST API', 'Firebase', 'PostgreSQL', 'MongoDB'] },
  { title: 'Tools & maps', icon: PenTool, items: ['Git', 'Bitbucket', 'Docker', 'Mapbox GL', 'OpenLayers', 'Postman'] },
]

const experiences = [
  {
    company: 'Tiller',
    role: 'Software Engineer',
    date: 'Nov 2023 — Apr 2026',
    location: 'Bangladesh',
    description: 'Building data-rich web products and workflow tools that help teams make faster, clearer decisions.',
    points: [
      'Engineered core front-end modules of the National Sanitation Dashboard, a real-time data visualization platform, using React.js, D3.js, and Material UI — used by [stakeholders, e.g. government/NGO officials] to track sanitation metrics nationwide.',
      'Built and optimized 10+ interactive D3.js chart components (e.g. trend lines, geo-visualizations, nested hierarchies) that translated complex, multi-dimensional datasets into clear, decision-ready insights for non-technical stakeholders.',
      'Solved key performance and integration challenges — including large-dataset render lag and DOM conflicts between D3 and React\'s virtual DOM — by [briefly: e.g. "implementing custom lifecycle hooks to isolate D3\'s DOM manipulation"], improving chart load/responsiveness across devices and screen sizes.',
      'Designed and shipped a full Leave Management System end-to-end, streamlining approval workflows and reducing manual HR overhead for the organization.',
      'Collaborated cross-functionally with back-end engineers to design and integrate RESTful APIs, delivering responsive, production-grade dashboards recognized internally for improving data-driven decision-making.',
    ],
    stack: ['React.js', 'D3.js', 'Material UI'],
  },
  {
  company: 'Project Code',
  role: 'Full Stack Developer',
  date: 'May 2023 — Aug 2023',
  location: 'Bootcamp · Bangladesh',
  description: 'Built full-stack MERN applications from concept to deployment as part of an intensive software engineering training program.',
  points: [
    'Engineered Red-Hilfe, a full-stack MERN platform connecting elderly users possessing practical repair skills with bicycle owners seeking service — integrated a secure, JWT-authenticated payment system and an interactive Mapbox GL-powered route visualization feature.',
    'Built CareBotanica, a plant-care MERN app featuring a personalized 3-step onboarding flow (skill level, commitment, weather conditions), photo-based plant identification via a third-party Plant API, and an automated Smart Care Reminder system for watering schedules.',
    'Independently owned both projects end-to-end — architecture, API integration, UI implementation, and deployment — across React, Express, MongoDB, and JWT-based authentication.',
    'Strengthened core full-stack engineering skills (state management, RESTful API design, third-party API integration, responsive UI) through hands-on, project-based learning under mentorship.',
  ],
  stack: ['React', 'Express', 'MongoDB', 'JWT', 'Mapbox GL', 'Plant API'],
  }
];

const projects = [
  { title: 'National Sanitation Dashboard', category: 'Data visualization', year: '2024-2026', description: 'Interactive charts and dashboard views that make sanitation data easier to explore, compare, and use for informed decisions.', stack: ['React.js', 'D3.js', 'Material UI'], tone: 'project-blue', href: 'https://sanboard.gov.bd/' },
  { title: 'Leave Management System', category: 'Internal workflow tool', year: '2024', description: 'A calendar-driven leave management platform that lets employees request time off and managers approve it, with an analytics dashboard for tracking leave trends and team availability.', stack: ['React', 'Material UI', 'Redux Toolkit', 'FullCalendar', 'ApexCharts'], tone: 'project-amber', href: 'https://github.com/Rafia-Sultana/Leave-Mangement-System' },
  { title: 'Red-Hilfe', category: 'MERN mobile experience', year: '2023', description: 'A service marketplace connecting elderly people with handy skills and bicycle owners who need repair support, with payments and route mapping. Code available on request.', stack: ['React', 'Chakra UI', 'Mapbox GL', 'Express', 'MongoDB'], tone: 'project-sage', href: '' },
  { title: 'CareBotanica', category: 'Plant care companion', year: '2023', description: 'A plant-care app with personalized onboarding, plant identification from photos, care guidance, and smart watering reminders.', stack: ['React', 'Tailwind CSS', 'Plant API', 'Express', 'MongoDB'], tone: 'project-peach', href: 'https://github.com/Rafia-Sultana/Solo_Planta_Project' },
]

const services = [
  { icon: Database, title: 'Data engineering & ETL', text: 'Timezone-safe pipelines and scheduled workflows that turn scattered sources into analysis-ready data.' },
  { icon: Server, title: 'Backend & REST APIs', text: 'Scalable services with secure authentication, role-based access, and clear contracts.' },
  { icon: Globe2, title: 'Frontend development', text: 'Responsive interfaces that translate complex workflows into calm, intuitive product experiences.' },
  { icon: Sparkles, title: 'AI-powered applications', text: 'Practical RAG systems, summarizers, and prompt-engineered tools that reduce information overload.' },
]

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('about')
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);


  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActive(visible.target.id)
    }, { rootMargin: '-25% 0px -60% 0px', threshold: [0, 0.25, 0.5] })
    navItems.forEach(([id]) => { const element = document.getElementById(id); if (element) observer.observe(element) })
    return () => observer.disconnect()
  }, [])



const copyEmail = () => {
  navigator.clipboard.writeText("rafiasultana0097@gmail.com");
  setCopied(true);
  setTimeout(() => setCopied(false), 2000);
};


  const submitContact = async (e:any) => {
    e.preventDefault();
    setSending(true);
    setError(false);

    const formData = new FormData(e.target);

    try {
      await emailjs.send(
        'service_gzstju8',
        'template_hpvan45',
        {
          from_name: formData.get('name'),
          from_email: formData.get('email'),
          message: formData.get('message'),
        },
        '_D94-MBd9anvCdTCS'
      );
      setSent(true);
      e.target.reset();
    } catch (err) {
      setError(true);
    } finally {
      setSending(false);
    }
  }

  

  return (
    <main>
      <header className="site-header">
        <div className="container nav-wrap">
          <a href="#top" className="brand" aria-label="Rafia Sultana home"><span className="brand-mark">RS</span><span>Rafia Sultana</span></a>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
          <nav className={menuOpen ? 'nav-links is-open' : 'nav-links'} aria-label="Main navigation">
            {navItems.map(([id, label]) => <a key={id} href={`#${id}`} className={active === id ? 'active' : ''} onClick={() => setMenuOpen(false)}>{label}</a>)}
            <div className="nav-socials"><a href="https://github.com/Rafia-Sultana?tab=repositories" aria-label="GitHub"><GitBranch size={18} /></a><a href="https://linkedin.com/in/rafia-sultana/" aria-label="LinkedIn"><Network size={18} /></a></div>
          </nav>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="container hero-grid">
          <div className="hero-copy reveal"><p className="eyebrow">Software engineer / data & product builder</p><h1>Turning complexity<br /><em>into clarity.</em></h1><p className="hero-intro">I&apos;m Rafia, a software engineer building reliable data systems, thoughtful backend services, and interfaces that make complex work feel simple.</p><div className="hero-actions"><a className="button button-dark" href="#projects">View my projects <ArrowDown size={16} /></a><a className="button button-outline" href="#contact">Let&apos;s talk <ArrowUpRight size={16} /></a></div><div className="hero-links"><a href="https://github.com/Rafia-Sultana?tab=repositories"><GitBranch size={16} /> GitHub</a><a href="https://www.linkedin.com/in/rafia-sultana/"><Network size={16} /> LinkedIn</a><a className='cursor-pointer' onClick={copyEmail}><Mail size={16} /> {copied ? "Copied!" : "Email"}</a></div></div>
          <div className="hero-art reveal reveal-delay"><div className="portrait-card"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Sep%208%2C%202026%2C%2006_17_00%20PM-kBQWdc4C0tLB585B9BSXPME8OmtTEu.png" alt="Illustrated portrait of Rafia Sultana wearing a rust-colored hijab" /><div className="portrait-label">Rafia Sultana · Software Engineer</div></div><p className="art-caption">Curious by default. Practical by design.</p></div>
        </div>
        <a href="#about" className="scroll-cue" aria-label="Scroll to about"><span>Scroll to explore</span><ChevronDown size={17} /></a>
      </section>

      <section className="section about-section" id="about"><div className="container two-col"><div className="section-label reveal"><span>01</span><span>About me</span></div><div className="about-content reveal"><h2>I like making the complicated feel simple.</h2><p>I&apos;m Rafia Sultana, a Software Engineer at Tiller with a B.Sc. (Hons.) in Computer Science & Engineering from International University of Business Agriculture & Technology. I build data visualizations, responsive dashboards, REST APIs, and mobile-first products.</p><p>My approach is straightforward: understand the real problem, communicate clearly, and write maintainable code that gives the next person a good place to start.</p><div className="about-note"><span className="note-dot" /> Currently open to thoughtful teams and interesting problems.</div></div></div></section>

      <section className="section muted-section" id="skills"><div className="container"><div className="section-heading reveal"><div className="section-label"><span>02</span><span>Toolkit</span></div><h2>The tools I reach for.</h2></div><div className="skills-grid">{skillGroups.map(({ title, icon: Icon, items }, index) => <article className="skill-card reveal" style={{ animationDelay: `${index * 80}ms` }} key={title}><Icon size={21} strokeWidth={1.5} /><h3>{title}</h3><div className="tag-list">{items.map((item) => <span key={item}>{item}</span>)}</div></article>)}</div></div></section>

      <section className="section" id="experience"><div className="container"><div className="section-heading reveal"><div className="section-label"><span>03</span><span>Experience</span></div><h2>Work that moves things forward.</h2></div><div className="experience-list">{experiences.map((item, index) => <article className="experience-item reveal" key={item.company}><div className="experience-meta"><span className="timeline-dot" /><span>{item.date}</span></div><div className="experience-main"><div className="experience-title"><div><h3>{item.role}</h3><p>{item.company} · {item.location}</p></div><span className="experience-index">0{index + 1}</span></div><p>{item.description}</p><ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul><div className="stack-list">{item.stack.map((item) => <span key={item}>{item}</span>)}</div></div></article>)}</div></div></section>

      <section className="section project-section" id="projects"><div className="container"><div className="section-heading project-heading reveal"><div><div className="section-label"><span>04</span><span>Selected projects</span></div><h2>A few things I&apos;ve made.</h2></div><p>Real products, experiments, and exercises in making technology more useful.</p></div><div className="projects-grid">{projects.map((project, index) => <article className="project-card reveal" key={project.title}><div className={`project-visual ${project.tone}`}><div className="visual-chrome"><span>{project.category}</span><span>{project.year}</span></div><div className="visual-content"><div className="visual-mark">{index === 0 ? <Globe2 /> : index === 1 ? <BriefcaseBusiness /> : index === 2 ? <Sparkles /> : <ArrowUpRight />}</div><div className="visual-lines"><i /><i /><i /></div></div><div className="visual-footer">{project.title}</div></div><div className="project-info"><h3>{project.title}</h3><p>{project.description}</p><div className="project-bottom"><div className="stack-list">{project.stack.map((item) => <span key={item}>{item}</span>)}</div><a href={project.href} aria-label={`View ${project.title}`}><ExternalLink size={18} /></a></div></div></article>)}</div><a className="text-link reveal" href="#contact">Have a project in mind? Get in touch <ArrowUpRight size={16} /></a></div></section>

      <section className="section" id="services"><div className="container"><div className="section-heading reveal"><div className="section-label"><span>05</span><span>What I do</span></div><h2>Useful at every layer.</h2></div><div className="services-grid">{services.map(({ icon: Icon, title, text }) => <article className="service-card reveal" key={title}><Icon size={21} strokeWidth={1.5} /><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

      <section className="section education-section" id="education"><div className="container two-col"><div className="section-label reveal"><span>06</span><span>Education</span></div><div className="education-card reveal"><div><p className="eyebrow">Jan 2019 — Feb 2023</p><h2>B.Sc. (Hons.) Computer Science & Engineering</h2><p>International University of Business Agriculture & Technology · CGPA 3.66/4.00</p></div><span className="education-badge">BSc</span></div></div></section>

      <section className="section contact-section" id="contact"><div className="container contact-grid"><div className="contact-copy reveal"><div className="section-label"><span>07</span><span>Contact</span></div><h2>Let&apos;s make something<br /><em>worth making.</em></h2><p>Whether you&apos;re hiring, building, or just want to compare notes about the web, I&apos;d love to hear from you.</p></div><form className="contact-form reveal" onSubmit={submitContact}><label>Name<input name="name" required placeholder="Your name" /></label><label>Email<input name="email" type="email" required placeholder="you@company.com" /></label><label>Message<textarea name="message" required rows={5} placeholder="Tell me a little about what you&apos;re working on..." /></label><button className="button button-dark" type="submit" disabled={sending}>
            {sent ? <><Check size={16} /> Message sent</> : sending ? 'Sending...' : <>Send message <ArrowUpRight size={16} /></>}
          </button>
          {sent && <p className="form-success" role="status">Thanks — your message has been sent. I'll be in touch soon.</p>}
          {error && <p className="form-error" role="status">Something went wrong — please try again or email me directly.</p>}</form></div></section>

      <footer className="footer"><div className="container footer-wrap"><div><a href="#top" className="brand"><span className="brand-mark">TZ</span><span>Rafia Sultana</span></a><p>Software engineer building reliable systems and useful interfaces.</p></div><div className="footer-right"><div className="footer-links"><a href="https://github.com/Rafia-Sultana?tab=repositories"><GitBranch size={16} /> GitHub</a><a href="https://www.linkedin.com/in/rafia-sultana/"><Network size={16} /> LinkedIn</a><a className='cursor-pointer' onClick={copyEmail}><Mail size={16} /> {copied ? "Copied!" : "Email"}</a></div><p>© 2024 Rafia Sultana. Built with intention.</p></div></div></footer>
    </main>
  )
}
