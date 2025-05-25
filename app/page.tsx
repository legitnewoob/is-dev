'use client';
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

function Section({ id, className, children }: { id?: string; className?: string; children: React.ReactNode }) {
  return (
    <section
      id={id}
      className={clsx(
        "section-padding opacity-0 translate-y-8 animate-fade-in-up",
        className
      )}
    >
      {children}
    </section>
  );
}

function ScrollProgressBar() {
  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / total) * 100;
      setScroll(progress);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[100]">
      <div
        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-200"
        style={{ width: `${scroll}%` }}
      />
    </div>
  );
}

export default function Home() {
  const [userData, setUserData] = useState<any>(null);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    import('./userData.json').then((mod) => setUserData(mod.default || mod));
  }, []);

  if (!userData) {
    return (
      <div className="flex min-h-screen items-center justify-center text-xl text-gray-500">Loading...</div>
    );
  }

  return (
    <>
      <ScrollProgressBar />
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          <span className="font-bold text-lg tracking-tight">Portfolio</span>
          <div className="flex gap-6">
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
      <main className="min-h-screen">
        {/* Hero Section */}
        <Section className="bg-gradient-to-b from-blue-100/60 via-white to-white dark:from-blue-900/60 dark:via-gray-900 dark:to-gray-800">
          <div className="container">
            <div className="flex flex-col items-center text-center">
              <div className="relative h-40 w-40 overflow-hidden rounded-full shadow-lg ring-4 ring-blue-200 dark:ring-blue-900">
                <Image
                  src="https://placehold.co/400x400.png"
                  alt="Profile"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <h1 className="mt-8 text-4xl font-bold md:text-6xl bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">{userData.name}</h1>
              <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
                {userData.role}
              </p>
              <p className="mt-6 max-w-2xl text-gray-600 dark:text-gray-300">
                {userData.about[0]}
              </p>
              <div className="mt-8 flex gap-4">
                <Link
                  href="#contact"
                  className="rounded-md bg-gradient-to-r from-blue-600 to-purple-500 px-6 py-3 text-white font-semibold shadow-lg transition hover:scale-105 hover:from-blue-700 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Contact Me
                </Link>
                <Link
                  href="#projects"
                  className="rounded-md border border-blue-600 px-6 py-3 text-blue-700 font-semibold transition hover:bg-blue-50 dark:border-blue-400 dark:text-blue-300 dark:hover:bg-blue-950"
                >
                  View Projects
                </Link>
              </div>
            </div>
          </div>
        </Section>
        {/* About Section */}
        <Section id="about" className="bg-white dark:bg-gray-800">
          <div className="container">
            <h2 className="text-center text-3xl font-bold md:text-4xl">About Me</h2>
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <div className="space-y-4">
                {userData.about.slice(1).map((line: string, i: number) => (
                  <p key={i} className="text-gray-600 dark:text-gray-300">{line}</p>
                ))}
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Education</h3>
                <div className="space-y-2">
                  <p className="font-medium">{userData.education.school}</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {userData.education.degree} ({userData.education.years})
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>
        {/* Skills Section */}
        <Section id="skills" className="bg-gray-50 dark:bg-gray-900">
          <div className="container">
            <h2 className="text-center text-3xl font-bold md:text-4xl">Skills</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {userData.skills.map((category: any) => (
                <div
                  key={category.title}
                  className="rounded-xl bg-white/80 dark:bg-gray-800/80 p-6 shadow-md border border-gray-100 dark:border-gray-800 hover:shadow-lg transition"
                >
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {category.skills.map((skill: string) => (
                      <li
                        key={skill}
                        className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 px-3 py-1 rounded text-sm font-medium"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Section>
        {/* Projects Section */}
        <Section id="projects" className="bg-white dark:bg-gray-800">
          <div className="container">
            <h2 className="text-center text-3xl font-bold md:text-4xl">Projects</h2>
            <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {userData.projects.map((project: any, idx: number) => (
                <div
                  key={project.title}
                  className={clsx(
                    "overflow-hidden rounded-xl bg-gray-50/80 dark:bg-gray-900/80 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-100 dark:border-gray-800 hover:border-blue-400 dark:hover:border-blue-500 group",
                    open === idx && "ring-2 ring-blue-400 dark:ring-blue-500"
                  )}
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={`https://placehold.co/800x400.png?text=${encodeURIComponent(project.title)}`}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold flex items-center justify-between">
                      {project.title}
                      <button
                        className="ml-2 text-xs text-blue-500 underline hover:text-blue-700 focus:outline-none"
                        onClick={() => setOpen(open === idx ? null : idx)}
                        aria-expanded={open === idx}
                        aria-controls={`project-details-${idx}`}
                      >
                        {open === idx ? 'Hide Details' : 'More Details'}
                      </button>
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {project.tech.map((tech: string) => (
                        <span
                          key={tech}
                          className="inline-block rounded bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 px-2 py-0.5 text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                      {project.description}
                    </p>
                    {open === idx && (
                      <div
                        id={`project-details-${idx}`}
                        className="mt-4 p-4 rounded bg-blue-50 dark:bg-blue-950 text-sm text-gray-700 dark:text-gray-200 border border-blue-200 dark:border-blue-800"
                      >
                        {project.details}
                      </div>
                    )}
                    <Link
                      href={project.link}
                      className="mt-4 inline-block text-blue-600 hover:text-blue-500 dark:text-blue-400"
                    >
                      View Project →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>
        {/* Contact Section */}
        <Section id="contact" className="bg-gray-50 dark:bg-gray-900">
          <div className="container">
            <h2 className="text-center text-3xl font-bold md:text-4xl">Get in Touch</h2>
            <div className="mx-auto mt-8 max-w-xl">
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-6">
                  <a
                    href={userData.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  >
                    GitHub
                  </a>
                  <a
                    href={userData.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={`mailto:${userData.contact.email}`}
                    className="text-gray-600 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  >
                    Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </main>
      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-6 mt-12">
        <div className="container text-center text-gray-500 dark:text-gray-400 text-sm">
          © {new Date().getFullYear()} {userData.name}. All rights reserved.
        </div>
      </footer>
    </>
  );
}
