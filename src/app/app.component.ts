import {
  Component,
  OnInit,
  AfterViewInit,
  HostListener,
  signal,
  computed,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser, NgClass, NgFor } from '@angular/common';

interface Skill {
  category: string;
  tags: string[];
}

interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  points: string[];
}

interface Project {
  num: string;
  name: string;
  tech: string[];
  points: string[];
}

interface Education {
  degree: string;
  school: string;
  year: string;
}

interface ContactLink {
  icon: string;
  label: string;
  href: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgClass, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, AfterViewInit {
  private platformId = inject(PLATFORM_ID);

  // Cursor state
  cursorX = signal(0);
  cursorY = signal(0);
  ringX = signal(0);
  ringY = signal(0);

  // Navbar scroll state
  navScrolled = signal(false);

  // Active section for nav highlight
  activeSection = signal('hero');

  // ── Data ──────────────────────────────────────────────────
  skills: Skill[] = [
    {
      category: 'Core Frontend',
      tags: ['HTML', 'CSS', 'Bootstrap', 'JavaScript', 'TypeScript', 'Angular'],
    },
    {
      category: 'UI Libraries & State',
      tags: ['Angular Material', 'RxJS', 'Reactive Forms', 'Angular Signals'],
    },
    {
      category: 'Backend (Basic)',
      tags: ['Node.js', 'Express.js', 'MongoDB'],
    },
    {
      category: 'Tools & Concepts',
      tags: ['Git', 'GitHub', 'VS Code', 'REST APIs', 'CRUD', 'Responsive Design'],
    },
    {
      category: 'Soft Skills',
      tags: ['Communication', 'Problem Solving', 'Team Collaboration'],
    },
  ];

  experience: Experience[] = [
    {
      role: 'Software Engineer',
      company: 'Doceree',
      location: 'Noida',
      period: 'JUL 2025 — MAY 2026',
      points: [
        'Developed reusable Angular UI components, improving performance and reducing code redundancy across the platform.',
        'Integrated REST APIs and implemented routing, services, and reactive forms for seamless data flow.',
        'Optimized application performance using OnPush change detection and trackBy functions.',
        'Improved reporting workflows, reducing processing time by 50% through smarter data handling.',
        'Worked on data-driven dashboards and analytics features serving healthcare marketing insights.',
      ],
    },
  ];

  projects: Project[] = [
    {
      num: '01',
      name: 'Healthcare Marketing Analytics Dashboard',
      tech: ['Angular', 'TypeScript', 'RxJS', 'Angular Material'],
      points: [
        'Built dynamic dashboard with filtering, sorting, and pagination.',
        'Integrated REST APIs and handled large datasets efficiently.',
        'Optimised performance using OnPush change detection strategy.',
      ],
    },
    {
      num: '02',
      name: 'Finance Management System',
      tech: ['Angular', 'TypeScript', 'RxJS', 'REST APIs'],
      points: [
        'Finance dashboard for tracking revenue, expenses, and reports.',
        'Implemented real-time data updates and financial reporting features.',
        'Used reactive forms, routing, and lifecycle hooks for scalable architecture.',
      ],
    },
    {
      num: '03',
      name: 'Clinical Intent Signal',
      tech: ['Angular', 'TypeScript', 'RxJS', 'REST APIs'],
      points: [
        'Developed Clinical Intent Signal component for managing segment rules.',
        'Implemented dynamic forms using Reactive Forms and FormArray.',
        'Used RxJS and Angular Signals for reactive data handling and live updates.',
      ],
    },
  ];

  education: Education[] = [
    {
      degree: 'B.Tech — Computer Science',
      school: 'BBD University · Lucknow, Uttar Pradesh',
      year: '2020 — 2024',
    },
    {
      degree: 'Intermediate (Class XII)',
      school: "Scholar's Academy · Anandnagar, Maharajganj",
      year: '2018 — 2019',
    },
    {
      degree: 'High School (Class X)',
      school: "Scholar's Academy · Anandnagar, Maharajganj",
      year: '2016 — 2017',
    },
  ];

  contacts: ContactLink[] = [
    {
      icon: '✉',
      label: 'pawankumargupta197@gmail.com',
      href: 'mailto:pawankumargupta197@gmail.com',
    },
    {
      icon: '⌥',
      label: 'github.com/pawan6390',
      href: 'https://github.com/pawan6390',
    },
    {
      icon: '↗',
      label: 'linkedin.com/in/pawankumargupta108',
      href: 'https://www.linkedin.com/in/pawankumargupta108',
    },
    { icon: '☎', label: '+91 63903 76567', href: 'tel:+916390376567' },
  ];

  // ── Lifecycle ─────────────────────────────────────────────
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.animateCursor();
      this.initRevealObserver();
    }
  }

  // ── Cursor animation ──────────────────────────────────────
  private targetRingX = 0;
  private targetRingY = 0;

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent): void {
    this.cursorX.set(e.clientX);
    this.cursorY.set(e.clientY);
    this.targetRingX = e.clientX;
    this.targetRingY = e.clientY;
  }

  private animateCursor(): void {
    const loop = () => {
      const rx = this.ringX() + (this.targetRingX - this.ringX()) * 0.12;
      const ry = this.ringY() + (this.targetRingY - this.ringY()) * 0.12;
      this.ringX.set(rx);
      this.ringY.set(ry);
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  // ── Scroll events ─────────────────────────────────────────
  @HostListener('window:scroll')
  onScroll(): void {
    this.navScrolled.set(window.scrollY > 40);
    this.updateActiveSection();
  }

  private updateActiveSection(): void {
    const sections = ['hero', 'skills', 'experience', 'projects', 'education', 'contact'];
    for (const id of [...sections].reverse()) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 120) {
        this.activeSection.set(id);
        return;
      }
    }
    this.activeSection.set('hero');
  }

  // ── Scroll-reveal observer ────────────────────────────────
  private initRevealObserver(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(
              () => entry.target.classList.add('visible'),
              i * 80
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
  }

  // ── Helpers ───────────────────────────────────────────────
  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  isActive(section: string): boolean {
    return this.activeSection() === section;
  }
}
