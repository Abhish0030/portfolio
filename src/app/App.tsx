import { ParallaxBackground } from './components/ParallaxBackground';
import { Navbar } from './components/Navbar';
import { ResumeAssistant } from './components/ResumeAssistant';
import { BentoCard } from './components/BentoCard';
import { ContactForm } from './components/ContactForm';
import { MagneticButton } from './components/MagneticButton';
import { CareerTimeline } from './components/CareerTimeline';
import { TechStackGrid } from './components/TechStackGrid';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { motion } from 'motion/react';
import { Code2, Github, Linkedin, Mail, ExternalLink, Database, Globe, Phone, FileText } from 'lucide-react';
import { useEffect, useState } from 'react';

// Mock data (PHP-ready structure - can be replaced with $variables)
const personalInfo = {
  name: 'Abhishek Singh',
  title: '2nd Year B.Tech CSE',
  university: 'SRM University, Andhra Pradesh',
  tagline: 'Full-Stack Developer & Tech Enthusiast',
  email: 'singhabhishak2005@gmail.com',
  phone: '+919559971192',
  github: 'https://github.com/Abhish0030',
  linkedin: 'https://www.linkedin.com/in/abhishek-singh-37b68637a/',
  resume: '/resume/abhishek-singh-resume.pdf',
};

const projects = [
  {
    title: 'AI-Powered Weather Forecasting Platform',
    description: 'A helpful platform for small-sector farmers that forecasts and predicts one-month weather reports to support better planning and decision-making.',
    techStack: ['Python', 'AI/ML', 'Weather Data', 'Forecasting'],
    color: 'from-violet-600/20 to-purple-600/20',
  },
  {
    title: 'Ilmify',
    description: 'A dedicated platform for aspirants, designed to support focused learning, preparation, and structured academic growth.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Education'],
    color: 'from-blue-600/20 to-cyan-600/20',
  },
  {
    title: 'Agricultural Advisory System',
    description: 'A smart advisory system that tests soil fertility, moisture, and humus, then suggests cropping style, crop type, seed type, and fertilizer quantity.',
    techStack: ['Python', 'Agriculture', 'Soil Analysis', 'Advisory'],
    color: 'from-pink-600/20 to-rose-600/20',
  },
  {
    title: 'Advanced Todo List',
    description: 'A productivity-focused task management app with clean organization, prioritization, and a modern user experience for daily workflow management.',
    techStack: ['React', 'TypeScript', 'UI/UX', 'Productivity'],
    color: 'from-green-600/20 to-emerald-600/20',
  },
  {
    title: 'Student Management System for Campus',
    description: 'A campus-focused management system built to organize student records, academic workflows, and administrative operations efficiently.',
    techStack: ['React', 'Node.js', 'Database', 'Management'],
    color: 'from-amber-500/20 to-orange-500/20',
  },
];

const primarySkills = [
  { name: 'Frontend Development', icon: Code2, level: 90 },
  { name: 'Backend Development', icon: Database, level: 80 },
  { name: 'Cloud & DevOps', icon: Globe, level: 45 },
];

const techStackRows = [
  [{ name: 'C', icon: '©️' }],
  [
    { name: 'C++', icon: '⚙️' },
    { name: 'Python', icon: '🐍' },
  ],
  [
    { name: 'HTML', icon: '🌐' },
    { name: 'CSS', icon: '🎨' },
    { name: 'JavaScript', icon: '📜' },
  ],
  [
    { name: 'TypeScript', icon: '📘' },
    { name: 'Git', icon: '📦' },
    { name: 'GitHub', icon: '😺' },
    { name: 'VS Code', icon: '💙' },
  ],
  [
    { name: 'React', icon: '⚛️' },
    { name: 'Next.js', icon: '▲' },
    { name: 'Tailwind', icon: '🌊' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'Django', icon: '🎸' },
  ],
  [
    { name: 'FastAPI', icon: '⚡' },
    { name: 'MySQL', icon: '🐬' },
    { name: 'PostgreSQL', icon: '🐘' },
    { name: 'MongoDB', icon: '🍃' },
    { name: 'Docker', icon: '🐳' },
    { name: 'AWS', icon: '☁️' },
  ],
  [
    { name: 'Jupyter', icon: '📓' },
    { name: 'Matplotlib', icon: '📈' },
    { name: 'Figma', icon: '🎨' },
    { name: 'Photoshop', icon: '🖼️' },
    { name: 'Hugging Face', icon: '🤗' },
    { name: 'MS Office', icon: '📊' },
  ],
];

const stats = [
  { label: 'Projects Completed', value: '6+' },
  { label: 'GitHub Contributions', value: '8+' },
  { label: 'Code Commits', value: '200+' },
  { label: 'DSA Submission', value: '500+' },
];

const heroHighlights = ['AI/ML Learner', 'Modern Web Builder', 'Problem Solver'];
const quickGlanceHighlights = ['Clean Interfaces', 'Practical Engineering', 'AI + Web Learning'];
const portraitFrames = [
  {
    src: '/profile/abhishek-portrait.jpeg',
    alt: 'Portrait of Abhishek Singh in a formal suit',
  },
  {
    src: '/profile/abhishek-portrait-2.jpeg',
    alt: 'Second portrait of Abhishek Singh',
  },
  {
    src: '/profile/abhishek-portrait-3.jpg',
    alt: 'Third portrait of Abhishek Singh',
  },
];

const careerPath = [
  {
    year: 'NOW',
    role: 'Advancing in AI/ML & Web Development',
    type: 'Current Learning Journey',
    description: 'Currently deepening my knowledge in AI/ML while continuing to sharpen my web development skills through consistent practice, hands-on builds, and real-world problem solving.',
    color: 'rgba(168, 85, 247, 0.8)', // purple-500
  },
  {
    year: '2025',
    role: 'Started Exploring AI/ML',
    type: 'Focused Skill Expansion',
    description: 'Began learning artificial intelligence and machine learning concepts, building a stronger foundation in data-driven thinking while continuing to grow in modern web technologies.',
    color: 'rgba(124, 58, 237, 0.8)', // violet-600
  },
  {
    year: '2024',
    role: 'Built My Core Programming Foundation',
    type: 'Learning Fundamentals',
    description: 'Started with programming basics and developed hands-on skills in C, C++, DSA, Python, and web technologies, creating the technical base for my current software and AI learning journey.',
    color: 'rgba(217, 70, 239, 0.8)', // fuchsia-500
  },
];

export default function App() {
  const [activePortrait, setActivePortrait] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActivePortrait((current) => (current + 1) % portraitFrames.length);
    }, 3200);

    return () => window.clearInterval(interval);
  }, []);

  const contactLinks = [
    {
      label: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      icon: Mail,
      external: false,
    },
    {
      label: personalInfo.phone,
      href: `tel:${personalInfo.phone}`,
      icon: Phone,
      external: false,
    },
    {
      label: 'github.com/Abhish0030',
      href: personalInfo.github,
      icon: Github,
      external: true,
    },
    {
      label: 'linkedin.com/in/abhishek-singh-37b68637a',
      href: personalInfo.linkedin,
      icon: Linkedin,
      external: true,
    },
  ];

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <ParallaxBackground />
      <Navbar />

      {/* Hero Section */}
      <section id="about" className="min-h-screen flex items-center justify-center px-4 md:px-6 pt-32 pb-20">
        <div className="max-w-7xl w-full">
          <div className="grid grid-cols-12 gap-4 md:gap-6">
            {/* Main Hero Card */}
            <BentoCard span={8} delay={0.2} className="min-h-[500px] md:min-h-[600px] flex flex-col justify-between">
              <div>
                <div className="hero-badge inline-flex items-center gap-3 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 mb-6">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-emerald-400/70" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300" />
                  </span>
                  <span className="text-xs md:text-sm tracking-[0.16em] uppercase text-violet-200">Open to internships and collaborations</span>
                </div>

                <div className="mb-8 flex flex-wrap gap-3">
                  {heroHighlights.map((item, index) => (
                    <span
                      key={item}
                      className="animate-float-soft rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs uppercase tracking-[0.18em] text-white/60"
                      style={{ animationDelay: `${index * 0.7}s` }}
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <h1 className="display-heading aurora-text text-5xl md:text-7xl lg:text-[6.5rem] mb-5 max-w-4xl">
                  Building intelligent digital experiences with code and curiosity.
                </h1>

                <p className="text-lg md:text-2xl text-white/75 mb-2">
                  Hello, I&apos;m {personalInfo.name} - a 2nd Year B.Tech CSE student passionate about building and learning.
                </p>
                <p className="text-base md:text-lg uppercase tracking-[0.22em] text-white/35 mb-8">{personalInfo.university}</p>

                <p className="text-base md:text-lg text-white/70 max-w-3xl mb-12 leading-8">
                  {personalInfo.tagline}. I focus on clean interfaces, thoughtful interaction,
                  and practical engineering across AI/ML and modern web technology.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <MagneticButton
                    onClick={() => scrollToSection('contact')}
                    className="rounded-2xl bg-gradient-to-r from-violet-600 via-purple-500 to-sky-500 px-6 md:px-8 py-3 md:py-4 text-white shadow-[0_18px_60px_rgba(109,40,217,0.35)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(124,58,237,0.5)]"
                  >
                    Let&apos;s Work Together
                  </MagneticButton>
                  
                  <MagneticButton
                    onClick={() => window.open(personalInfo.resume, '_blank', 'noopener,noreferrer')}
                    className="rounded-2xl border border-white/10 bg-white/5 px-6 md:px-8 py-3 md:py-4 text-white transition-all duration-300 hover:bg-white/10"
                  >
                    <span className="inline-flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      View Resume
                    </span>
                  </MagneticButton>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-card hover-shift flex items-center gap-3 rounded-2xl border border-white/10 px-4 py-3 transition-all duration-300 group"
                >
                  <Github className="w-4 h-4 md:w-5 md:h-5 text-white/60 group-hover:text-white transition-colors" />
                  <span className="text-sm text-white/65 group-hover:text-white">GitHub</span>
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-card hover-shift flex items-center gap-3 rounded-2xl border border-white/10 px-4 py-3 transition-all duration-300 group"
                >
                  <Linkedin className="w-4 h-4 md:w-5 md:h-5 text-white/60 group-hover:text-white transition-colors" />
                  <span className="text-sm text-white/65 group-hover:text-white">LinkedIn</span>
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="glass-card hover-shift flex items-center gap-3 rounded-2xl border border-white/10 px-4 py-3 transition-all duration-300 group"
                >
                  <Mail className="w-4 h-4 md:w-5 md:h-5 text-white/60 group-hover:text-white transition-colors" />
                  <span className="text-sm text-white/65 group-hover:text-white">Email</span>
                </a>
              </div>
            </BentoCard>

            {/* Resume Assistant Card */}
            <BentoCard span={4} delay={0.4} className="min-h-[500px] md:min-h-[600px]">
              <ResumeAssistant />
            </BentoCard>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-12 gap-4 md:gap-6 mt-4 md:mt-6">
            {stats.map((stat, index) => (
              <BentoCard key={stat.label} span={4} delay={0.6 + index * 0.1}>
                <div className="text-center py-4">
                  <div className="display-heading text-3xl md:text-4xl mb-2 bg-gradient-to-r from-violet-300 via-sky-300 to-purple-300 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-[11px] md:text-sm uppercase tracking-[0.22em] text-white/45">{stat.label}</div>
                </div>
              </BentoCard>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="section-eyebrow mb-5">Selected Work</span>
            <h2 className="display-heading text-4xl md:text-6xl mb-4">Featured Projects</h2>
            <p className="max-w-2xl text-white/60 text-lg">Concepts, experiments, and product builds shaped around performance, clarity, and practical impact.</p>
          </div>

          <div className="grid grid-cols-12 gap-4 md:gap-6">
            {projects.map((project, index) => (
              <BentoCard key={project.title} span={6} delay={index * 0.2}>
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-50`}
                />
                
                <div className="relative z-10">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-white/55">
                      Featured Build
                    </span>
                    <ExternalLink className="h-4 w-4 text-white/40" />
                  </div>

                  <h3 className="text-2xl md:text-3xl mb-3">{project.title}</h3>
                  <p className="text-white/60 mb-6 leading-7">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm text-white/80"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => scrollToSection('contact')}
                    className="flex items-center gap-2 text-violet-300 hover:text-violet-200 transition-colors group"
                  >
                    Discuss this kind of project
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </div>
              </BentoCard>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="section-eyebrow mb-5">Capabilities</span>
            <h2 className="display-heading text-4xl md:text-6xl mb-4">Tech Stack</h2>
            <p className="text-white/60 text-lg">A visual progression of how I grew from programming fundamentals to full-stack, cloud, and AI-focused tooling.</p>
          </div>

          <div className="grid grid-cols-12 gap-4 md:gap-6 mb-4 md:mb-6">
            {primarySkills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <BentoCard key={skill.name} span={4} delay={index * 0.15}>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-violet-600/20 to-purple-600/20 border border-violet-500/30">
                      <Icon className="w-6 h-6 text-violet-400" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl mb-4">{skill.name}</h3>
                      
                      <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-violet-500 via-purple-500 to-sky-400 shadow-[0_0_22px_rgba(124,58,237,0.45)]"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                      
                      <div className="mt-2 text-sm text-white/50">{skill.level}% Proficiency</div>
                    </div>
                  </div>
                </BentoCard>
              );
            })}
          </div>

          {/* Tech Stack Grid */}
          <BentoCard span={12} delay={0.6}>
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h3 className="text-xl md:text-2xl mb-2 text-white/85">Full Technology Stack</h3>
                <p className="text-sm md:text-base text-white/55">From beginner foundations at the top to more advanced tools and workflows at the base.</p>
              </div>
              <span className="text-xs uppercase tracking-[0.22em] text-violet-200/80">Beginner to Advanced</span>
            </div>
            <TechStackGrid technologies={techStackRows} />
          </BentoCard>
        </div>
      </section>

      {/* Career & Experience Section */}
      <section id="experience" className="py-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="section-eyebrow mb-5">Growth Timeline</span>
            <h2 className="display-heading text-4xl md:text-6xl mb-4">
              My career &{' '}
              <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                experience
              </span>
            </h2>
            <p className="text-white/60 text-lg">A journey of continuous growth and learning</p>
          </div>

          <CareerTimeline items={careerPath} />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-4 md:gap-6">
            <BentoCard span={6} delay={0.2}>
              <span className="section-eyebrow mb-5">Contact</span>
              <h2 className="display-heading text-4xl md:text-6xl mb-6">Let&apos;s Connect</h2>
              <p className="text-white/60 text-base md:text-lg mb-8 leading-8">
                Have a project in mind or want to collaborate? I'm always open to 
                discussing new opportunities and innovative ideas.
              </p>
              
              <div className="space-y-3">
                {contactLinks.map(({ label, href, icon: Icon, external }) => (
                  <a
                    key={label}
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noreferrer' : undefined}
                    className="hover-shift flex items-center gap-3 rounded-2xl border border-transparent bg-white/[0.02] px-4 py-4 text-white/70 transition-all duration-300 hover:border-violet-500/30 hover:bg-white/5 hover:text-white"
                  >
                    <Icon className="h-5 w-5 shrink-0 text-violet-400" />
                    <span className="break-all">{label}</span>
                  </a>
                ))}
              </div>

              <div className="mt-12 rounded-[24px] border border-violet-500/20 bg-gradient-to-br from-violet-600/10 to-purple-600/10 p-6">
                <p className="text-sm text-white/60">
                  <span className="text-violet-400">// Pro Tip:</span> This portfolio is built 
                  with React, TypeScript, and TailwindCSS. The component architecture is 
                  PHP-ready for easy deployment on Hostinger.
                </p>
              </div>
            </BentoCard>

            <BentoCard span={6} delay={0.4}>
              <span className="section-eyebrow mb-5">Start A Conversation</span>
              <h3 className="display-heading text-3xl md:text-5xl mb-6">Send a Message</h3>
              <ContactForm />
            </BentoCard>
          </div>
        </div>
      </section>

      {/* Quick Glance Section */}
      <section className="py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-10 items-center">
            <div className="col-span-12 lg:col-span-6">
              <span className="section-eyebrow mb-5">A Quick Glance</span>
              <h2 className="display-heading text-4xl md:text-6xl lg:text-7xl mb-8 max-w-3xl text-white">
                Building the bridge between ideas and{' '}
                <span className="bg-gradient-to-r from-violet-300 via-purple-300 to-sky-300 bg-clip-text text-transparent italic">
                  experiences
                </span>
              </h2>

              <p className="max-w-2xl text-white/68 text-base md:text-lg leading-8 mb-6">
                I&apos;m {personalInfo.name}, a second-year B.Tech CSE student who enjoys turning curiosity
                into meaningful digital work. My journey started with programming fundamentals and is now
                expanding into AI/ML, modern web development, and problem-driven product thinking.
              </p>

              <p className="max-w-2xl text-white/68 text-base md:text-lg leading-8 mb-6">
                I care about building clean, responsive, and reliable experiences. Whether I&apos;m working on
                frontend structure, backend logic, or learning new tools, I focus on creating solutions that
                are practical, scalable, and genuinely useful.
              </p>

              <p className="max-w-2xl text-white/68 text-base md:text-lg leading-8 mb-8">
                My goal is simple: keep learning, keep building, and keep improving until every project reflects
                stronger thinking, better execution, and a sharper engineering mindset.
              </p>

              <div className="mb-8 flex flex-wrap gap-3">
                {quickGlanceHighlights.map((item, index) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.45, delay: index * 0.1 }}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs uppercase tracking-[0.18em] text-white/65"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/45 transition-colors hover:text-white"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/45 transition-colors hover:text-white"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-white/45 transition-colors hover:text-white"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-6">
              <div className="relative mx-auto h-[520px] max-w-[460px]">
                <div className="absolute right-2 top-8 h-40 w-40 rounded-full bg-violet-500/18 blur-3xl" />
                <div className="absolute left-0 top-28 h-36 w-36 rounded-full bg-sky-500/16 blur-3xl" />

                {portraitFrames.map((portrait, index) => {
                  const relativeIndex = (index - activePortrait + portraitFrames.length) % portraitFrames.length;
                  const isFront = relativeIndex === 0;
                  const isRight = relativeIndex === 1;

                  const animateState = isFront
                    ? {
                        x: '-50%',
                        y: 0,
                        top: 24,
                        left: '50%',
                        width: 270,
                        height: 405,
                        rotate: 0,
                        scale: 1,
                        opacity: 1,
                        zIndex: 3,
                      }
                    : isRight
                      ? {
                          x: 0,
                          y: 0,
                          top: 40,
                          left: 228,
                          width: 240,
                          height: 360,
                          rotate: -8,
                          scale: 0.94,
                          opacity: 0.64,
                          zIndex: 1,
                        }
                      : {
                          x: 0,
                          y: 0,
                          top: 96,
                          left: 8,
                          width: 220,
                          height: 320,
                          rotate: 6,
                          scale: 0.94,
                          opacity: 0.72,
                          zIndex: 2,
                        };

                  return (
                    <motion.div
                      key={portrait.src}
                      initial={
                        index === 0
                          ? { opacity: 0, y: 50, scale: 0.94 }
                          : { opacity: 0, x: -30, rotate: 8 }
                      }
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{
                        duration: 0.8,
                        delay: index === 0 ? 0.15 : 0.1,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      animate={animateState}
                      whileHover={isFront ? { y: -8 } : undefined}
                      className={`absolute overflow-hidden rounded-[28px] border bg-[#0b0b11] ${
                        isFront
                          ? 'panel-glow border-white/12 shadow-[0_24px_90px_rgba(0,0,0,0.4)]'
                          : 'border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.28)]'
                      }`}
                      style={{ transformOrigin: 'center center' }}
                    >
                      <div className="relative h-full w-full">
                        <ImageWithFallback
                          src={portrait.src}
                          alt={portrait.alt}
                          className={`h-full w-full object-cover object-top transition-opacity duration-500 ${
                            isFront ? 'opacity-100' : 'opacity-70'
                          }`}
                        />
                        <div
                          className={`absolute inset-0 ${
                            isFront
                              ? 'bg-gradient-to-t from-[#0b0b11]/40 via-transparent to-transparent'
                              : isRight
                                ? 'bg-gradient-to-t from-[#0b0b11]/75 via-transparent to-violet-500/10'
                                : 'bg-gradient-to-t from-[#0b0b11]/75 via-transparent to-sky-500/10'
                          }`}
                        />
                      </div>
                    </motion.div>
                  );
                })}

                <div className="pointer-events-none absolute inset-x-0 bottom-[92px] z-10 flex items-center justify-center">
                  <div className="portrait-loader flex items-center gap-2 rounded-full border border-white/10 bg-black/35 px-3 py-2 backdrop-blur-md">
                    {portraitFrames.map((portrait, index) => (
                      <span
                        key={portrait.src}
                        className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                          index === activePortrait ? 'bg-white/80' : 'bg-white/35'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">
              © 2026 Abhishek Singh. Crafted with precision and passion.
            </p>
            
            <div className="flex items-center gap-4 text-white/40 text-sm">
              <span>Built with React + TypeScript + Motion</span>
              <span>•</span>
              <span>Deployed on Hostinger</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
