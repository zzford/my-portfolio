import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowLeft, X, ExternalLink, Mail, Plus, Music, BookOpen, Terminal, Mic2, Sparkles, Disc } from 'lucide-react';

// --- DATA ---
const PROJECTS = [
  {
    id: '01',
    title: 'IDEAS Capstone: Ethical Analysis of AI Usage',
    category: 'Research / Ethical Frameworks',
    year: '2026',
    description: 'A browser-based visualizer and simulation of the Raft consensus algorithm, compiled from Rust to WebAssembly for near-native performance.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1600&h=900',
    details: 'Built for my senior distributed systems seminar. Users can inject network partitions, kill leader nodes in real time, and inspect log replication states across clusters without server-side compute.'
  },
  {
    id: '02',
    title: 'Picture-Based Ordering Menu',
    category: 'AAC Device / Community-Partner / Square API',
    year: '2025',
    description: 'Real-time polyphonic pitch detection and intonation analyzer designed for collegiate vocal ensembles and bassists.',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=1600&h=900',
    details: 'Combines Fast Fourier Transforms (FFT) with autocorrelation in an AudioWorklet thread to achieve sub-15ms latency directly in the browser.'
  },
  {
    id: '03',
    title: 'Basic Chat Platform',
    category: 'Team-Based Development / Full-Stack Application',
    year: '2025',
    description: 'An interactive web environment for constructing and verifying natural deduction proofs in propositional and first-order logic.',
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1600&h=900',
    details: 'Bridging my love for philosophy and computer science. Includes instant countermodel generation when a student attempts an invalid inference step.'
  },
  {
    id: '04',
    title: 'Gender-Centric Analysis of Lehigh’s Architecture',
    category: 'Social Impact / Spatial Design / Archival Research',
    year: '2025',
    description: 'Real-time polyphonic pitch detection and intonation analyzer designed for collegiate vocal ensembles and bassists.',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=1600&h=900',
    details: 'Combines Fast Fourier Transforms (FFT) with autocorrelation in an AudioWorklet thread to achieve sub-15ms latency directly in the browser.'
  },
  {
    id: '05',
    title: 'Microbiology Lab Technical Research Intern',
    category: 'Machine Learning / Study Abroad / Database Navigation',
    year: '2025',
    description: 'An interactive web environment for constructing and verifying natural deduction proofs in propositional and first-order logic.',
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1600&h=900',
    details: 'Bridging my love for philosophy and computer science. Includes instant countermodel generation when a student attempts an invalid inference step.'
  },
  {
    id: '06',
    title: 'Mock Medical Device Interface',
    category: 'Cloud Computing / Team Project',
    year: '2025',
    description: 'An interactive web environment for constructing and verifying natural deduction proofs in propositional and first-order logic.',
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1600&h=900',
    details: 'Bridging my love for philosophy and computer science. Includes instant countermodel generation when a student attempts an invalid inference step.'
  }
];

// Interactive items held in portrait
// Each collage item has x (%), y (%), w (px), rotate (deg), and z (layer order)
const INTEREST_ITEMS = [
  {
    id: 'bass',
    label: 'Bass Guitar',
    tag: '01 / Low End & Groove',
    icon: Music,
    // Coordinates (%) on the portrait container—easy to tweak once you drop in your real photo!
    x: 28,
    y: 58,
    headline: 'Holding down the pocket in jazz combos & indie bands.',
    story: 'Playing bass taught me how foundational architecture works: nobody notices when it’s running smoothly, but the entire structure collapses if the timing drifts. I’ve spent the last four years playing everything from Motown lines to odd-meter math rock on campus.',
    highlights: ['4-String Fender Precision', 'Campus Jazz Collective', 'Audio Signal Processing'],
    collage: [
      {
        id: 'bass-1',
        type: 'polaroid',
        title: 'Battle of the Bands',
        year: '2023',
        image: 'https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?auto=format&fit=crop&q=80&w=800',
        caption: 'My very first live college gig playing in a crowded basement venue. Borrowed a Fender Rumble 100 amp that barely fit in the trunk.',
        x: 6,
        y: 8,
        w: 240,
        rotate: -4,
        z: 10
      },
      {
        id: 'bass-2',
        type: 'cassette',
        title: 'ESSENTIAL GROOVES',
        year: 'Spotify',
        subtitle: 'Jamerson • Palladino • Thundercat',
        caption: 'The tracks I put on whenever I need to lock into a pocket or practice ghost notes and syncopation.',
        link: 'https://open.spotify.com',
        x: 42,
        y: 12,
        w: 255,
        rotate: 3,
        z: 12
      },
      {
        id: 'bass-3',
        type: 'photostrip',
        title: 'Spring Jazz Quintet',
        year: '2025',
        images: [
          'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=500',
          'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=500',
          'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&q=80&w=500'
        ],
        caption: 'Soundcheck and backstage moments from our 12-minute arrangement of Herbie Hancock’s "Chameleon".',
        x: 68,
        y: 26,
        w: 135,
        rotate: 5,
        z: 14
      },
      {
        id: 'bass-4',
        type: 'scrap',
        title: 'Setlist — Late Night Session',
        year: '2024',
        handwriting: '1. Chameleon (Bb)\n2. What’s Going On\n3. Dean Town (85% tempo!)\n4. Redbone',
        caption: 'Hand-scrawled setlist taped to my pedalboard during our sophomore year charity showcase.',
        x: 24,
        y: 50,
        w: 230,
        rotate: -2,
        z: 11
      }
    ]
  },
  {
    id: 'choir',
    label: 'Choir Binder',
    tag: '02 / Ensemble & Voice',
    icon: Mic2,
    x: 68,
    y: 42,
    headline: 'Four years of collegiate chamber choir & sight-singing.',
    story: 'There is nothing quite like locking into a pure acoustic overtone with forty other singers. Choir is my counterbalance to screen time—it requires radical listening, breath control, and blending individual ego into a collective sound.',
    highlights: ['Soprano Section', 'Renaissance Polyphony', 'Annual Tour'],
    collage: [
      {
        id: 'choir-1',
        type: 'polaroid',
        title: 'Candlelight Vespers',
        year: '2024',
        image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&q=80&w=800',
        caption: 'Singing Lauridsen’s "O Magnum Mysterium" in the university chapel—still my favorite acoustic space on campus.',
        x: 12,
        y: 12,
        w: 260,
        rotate: -3,
        z: 11
      },
      {
        id: 'choir-2',
        type: 'cassette',
        title: 'POLYPHONY & OVERTONES',
        year: 'Spotify',
        subtitle: 'Whitacre • Tallis • Caroline Shaw',
        caption: 'Pieces with lush cluster chords and tight vocal harmonies that inspired my audio pitch-tracking project.',
        link: 'https://open.spotify.com',
        x: 48,
        y: 22,
        w: 255,
        rotate: 4,
        z: 13
      },
      {
        id: 'choir-3',
        type: 'scrap',
        title: 'Program Stub — Spring Tour',
        year: '2025',
        handwriting: 'Boston → Montreal\n3 chapels, 40 singers,\nzero microphones.',
        caption: 'Kept the printed program from our Northeast spring tour tucked inside my black binder.',
        x: 28,
        y: 52,
        w: 235,
        rotate: 2,
        z: 12
      }
    ]
  },
  {
    id: 'philosophy',
    label: 'Philosophy Textbooks',
    tag: '03 / Epistemology & Ethics',
    icon: BookOpen,
    x: 36,
    y: 34,
    headline: 'Asking "should we build this?" alongside "can we build this?"',
    story: 'My philosophy coursework focuses on philosophy of mind, formal logic, and technology ethics. Studying Wittgenstein and phenomenology completely changed how I design human-computer interfaces and think about machine intelligence.',
    highlights: ['Philosophy of Mind', 'Symbolic Logic', 'AI & Moral Agency'],
    collage: [
      {
        id: 'phil-1',
        type: 'scrap',
        title: 'Junior Seminar Thesis',
        year: '2025',
        handwriting: '“Syntax is not sufficient\nfor semantics.”\n— Notes on Searle & LLMs',
        caption: 'A 20-page exploration of the Chinese Room argument and why formal symbol manipulation isn’t the whole story of understanding.',
        x: 10,
        y: 14,
        w: 255,
        rotate: -3,
        z: 12
      },
      {
        id: 'phil-2',
        type: 'polaroid',
        title: 'Wittgenstein Margin Notes',
        year: '2024',
        image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800',
        caption: 'My heavily marked-up copy of Philosophical Investigations after a semester-long reading group.',
        x: 46,
        y: 20,
        w: 260,
        rotate: 3,
        z: 11
      },
      {
        id: 'phil-3',
        type: 'scrap',
        title: 'Favorite Quote',
        year: 'Reading List',
        handwriting: 'The limits of my language\nmean the limits of my world.\n— Tractatus 5.6',
        caption: 'A reminder that the abstractions we choose in code shape what problems we can even imagine solving.',
        x: 26,
        y: 54,
        w: 245,
        rotate: -1,
        z: 13
      }
    ]
  },
  {
    id: 'keyboard',
    label: 'Custom Mechanical Keyboard',
    tag: '04 / Systems & Craft',
    icon: Terminal,
    x: 64,
    y: 68,
    headline: 'Tactile switches, custom firmware, and low-level code.',
    story: 'As a CS senior, my keyboard is my primary instrument. I love building software where engineering rigor meets thoughtful aesthetics—whether that’s writing memory-safe systems code or crafting fluid web interactions like this site.',
    highlights: ['Senior CS Undergrad', 'QMK Firmware', 'Human-Centered Computing'],
    collage: [
      {
        id: 'kb-1',
        type: 'polaroid',
        title: '65% Gasket Mount Build',
        year: '2024',
        image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=800',
        caption: 'Hand-lubed Boba U4T tactile switches with custom QMK keymap layers configured specifically for Vim and terminal navigation.',
        x: 12,
        y: 12,
        w: 265,
        rotate: -2,
        z: 12
      },
      {
        id: 'kb-2',
        type: 'scrap',
        title: 'Hackathon Winner — 36 Hrs',
        year: '2025',
        handwriting: '1st Place Systems Track:\nPeer-to-peer local file\nsharing CLI in Rust.',
        caption: 'Built in 36 hours on four pots of coffee with two friends from my operating systems class.',
        x: 48,
        y: 24,
        w: 240,
        rotate: 4,
        z: 11
      },
      {
        id: 'kb-3',
        type: 'cassette',
        title: 'DEEP FOCUS / COMPILE TIME',
        year: 'Spotify',
        subtitle: 'Boards of Canada • Four Tet • Nils Frahm',
        caption: 'Ambient electronic and modern classical tracks for late-night debugging sessions.',
        link: 'https://open.spotify.com',
        x: 25,
        y: 53,
        w: 255,
        rotate: -3,
        z: 13
      }
    ]
  }
];

// --- UTILITY COMPONENTS ---

const useScrollReveal = (options = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.12, ...options });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options]);

  return [ref, isVisible];
};

const Reveal = ({ children, delay = 0, className = '' }) => {
  const [ref, isVisible] = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- MAIN APPLICATION ---
export default function Portfolio() {
  const [activeProject, setActiveProject] = useState(null);
  const [selectedInterest, setSelectedInterest] = useState(null);
  const [activeCollageItem, setActiveCollageItem] = useState(null);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const cursorRef = useRef(null);

  // Load clean, modern editorial fonts + Caveat handwriting font for scrapbook notes
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Caveat:wght@500;600&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const handleSelectInterest = (interest) => {
    setSelectedInterest(interest);
    setActiveCollageItem(interest?.collage?.[0] || null);
  };

  // Subtle, refined cursor follower
  useEffect(() => {
    let mouseX = -100;
    let mouseY = -100;
    let cursorX = -100;
    let cursorY = -100;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const render = () => {
      cursorX += (mouseX - cursorX) * 0.18;
      cursorY += (mouseY - cursorY) * 0.18;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
      }
      requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove);
    const animId = requestAnimationFrame(render);

    const handleMouseOver = (e) => {
      if (e.target.closest('button, a, .clickable')) setIsHoveringClickable(true);
    };
    const handleMouseOut = (e) => {
      if (e.target.closest('button, a, .clickable')) setIsHoveringClickable(false);
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  // Lock background scroll when modal or side drawer is open
  useEffect(() => {
    document.body.style.overflow = (activeProject || selectedInterest) ? 'hidden' : 'unset';
  }, [activeProject, selectedInterest]);

  return (
    <div 
      className="bg-[#4b3240] text-[#adb886] min-h-screen selection:bg-[#adb886] selection:text-[#4b3240] overflow-x-hidden"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <style>{`
        .font-editorial { font-family: 'Instrument Serif', serif; }
        .font-sans-clean { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-code { font-family: 'JetBrains Mono', monospace; }
        .font-handwriting { font-family: 'Caveat', cursive; }
        
        @keyframes pulseRing {
          0% { transform: scale(0.95); opacity: 0.7; }
          70% { transform: scale(1.6); opacity: 0; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        .hotspot-pulse {
          animation: pulseRing 2.5s cubic-bezier(0.24, 0, 0.38, 1) infinite;
        }
        @keyframes popArtifact {
          from { opacity: 0; scale: 0.92; }
          to { opacity: 1; scale: 1; }
        }
        .animate-artifact {
          animation: popArtifact 0.45s cubic-bezier(0.16, 1, 0.3, 1) backwards;
        }
      `}</style>

      {/* Subtle Glass Cursor */}
      <div 
        ref={cursorRef}
        className={`fixed top-0 left-0 w-9 h-9 rounded-full border border-[#adb886]/60 pointer-events-none z-[100] transition-all duration-300 ease-out hidden md:block ${
          isHoveringClickable ? 'scale-150 bg-[#adb886]/15 border-[#adb886]' : 'scale-100'
        }`}
      />

      {/* Minimalist Sticky Header */}
      <nav className="fixed top-0 left-0 w-full px-6 md:px-14 py-6 flex justify-between items-center z-40 bg-[#4b3240]/85 backdrop-blur-md border-b border-[#adb886]/15">
        <a href="#" className="font-code text-xs md:text-sm tracking-widest uppercase text-[#adb886] hover:opacity-75 transition-opacity">
          Zoe Ford — ’27
        </a>
        <div className="flex gap-8 text-xs md:text-sm font-medium tracking-wide">
          <a href="#work" className="hover:text-[#dce5be] transition-colors">Projects</a>
          <a href="#about" className="hover:text-[#dce5be] transition-colors">About & Interests</a>
          <a href="#contact" className="hover:text-[#dce5be] transition-colors">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="min-h-[92vh] flex flex-col justify-between px-6 md:px-14 pt-36 pb-16 max-w-7xl mx-auto">
        <div className="my-auto">
          <Reveal delay={50}>
            <p className="font-code text-xs md:text-sm uppercase tracking-[0.2em] text-[#adb886]/75 mb-6">
              Lehigh University Undergrad • Computer Science • Philosophy/Ethics
            </p>
          </Reveal>
          
          <Reveal delay={150}>
            <h1 className="text-5xl sm:text-7xl md:text-[5.75rem] font-semibold tracking-tight leading-[1.03] text-[#dce5be]">
              Engineering thoughtful software with{' '}
              <span className="font-editorial italic font-normal text-[#adb886] text-6xl sm:text-8xl md:text-[6.75rem]">
                human curiosity.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={250}>
            <div className="mt-12 md:mt-16 flex flex-col md:flex-row md:items-end justify-between gap-8 pt-8 border-t border-[#adb886]/20">
              <p className="text-base md:text-lg text-[#adb886]/85 max-w-xl leading-relaxed">
                I’m a senior studying Computer Science, interested in systems programming, audio tech, and the philosophical questions behind how we build.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#work" 
                  className="inline-flex items-center gap-3 bg-[#adb886] text-[#4b3240] px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-[#dce5be] transition-colors clickable"
                >
                  Selected Work <ArrowRight className="w-4 h-4" />
                </a>
                <a 
                  href="#about" 
                  className="inline-flex items-center gap-3 border border-[#adb886]/40 text-[#dce5be] px-6 py-3.5 rounded-full text-sm font-medium hover:border-[#adb886] transition-colors clickable"
                >
                  Interactive About Me
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </header>

      {/* Selected Projects Section */}
      <main id="work" className="py-24 px-6 md:px-14 max-w-7xl mx-auto border-t border-[#adb886]/20">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <span className="font-code text-xs uppercase tracking-widest text-[#adb886]/70">01 / Selected Index</span>
              <h2 className="font-editorial text-5xl md:text-6xl text-[#dce5be] mt-2">Featured Projects</h2>
            </div>
            <p className="text-sm text-[#adb886]/75 max-w-sm">
              Click any project card to inspect the architecture, technical tradeoffs, and implementation details.
            </p>
          </div>
        </Reveal>

        <div className="space-y-12">
          {PROJECTS.map((project, index) => (
            <Reveal key={project.id} delay={index * 100}>
              <article 
                onClick={() => setActiveProject(project)}
                className="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 md:p-8 rounded-3xl bg-[#3f2935]/70 border border-[#adb886]/15 hover:border-[#adb886]/50 hover:bg-[#3a2531] transition-all duration-500 cursor-pointer clickable"
              >
                {/* Project Image */}
                <div className="lg:col-span-6 overflow-hidden rounded-2xl aspect-[16/10] bg-[#2e1d27]">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700"
                  />
                </div>

                {/* Project Meta & Summary */}
                <div className="lg:col-span-6 flex flex-col justify-between lg:pl-4">
                  <div>
                    <div className="flex items-center justify-between font-code text-xs text-[#adb886]/70 mb-4">
                      <span>{project.id} — {project.category}</span>
                      <span>{project.year}</span>
                    </div>
                    <h3 className="text-2xl md:text-4xl font-semibold text-[#dce5be] tracking-tight mb-4 group-hover:text-[#adb886] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-[#adb886]/80 text-base leading-relaxed mb-8">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-sm font-semibold text-[#dce5be] group-hover:translate-x-1 transition-transform">
                    <span>Read Case Study</span>
                    <ArrowRight className="w-4 h-4 text-[#adb886]" />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </main>

      {/* Interactive "About Me" Portrait Section */}
      <section id="about" className="py-28 px-6 md:px-14 bg-[#3d2733] border-t border-[#adb886]/20">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="max-w-2xl mb-14">
              <span className="font-code text-xs uppercase tracking-widest text-[#adb886]/70">02 / Interactive Portrait</span>
              <h2 className="font-editorial text-5xl md:text-6xl text-[#dce5be] mt-2 mb-4">
                The things I carry.
              </h2>
              <p className="text-base md:text-lg text-[#adb886]/85 leading-relaxed">
                Computer science is only one piece of the picture. Click on any of the items I’m holding in the portrait to open a tactile scrapbook of memories, playlists, and notes about that interest.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Interactive Portrait Container */}
            <div className="lg:col-span-7">
              <Reveal delay={100}>
                <div className="relative rounded-3xl overflow-hidden border border-[#adb886]/25 bg-[#2e1d27] aspect-[4/3] shadow-2xl">
                  {/* Replace this placeholder src with your actual photo holding your items! */}
                  <img 
                    src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=1400" 
                    alt="Interactive portrait holding bass guitar, choir binder, philosophy books, and keyboard"
                    className="w-full h-full object-cover opacity-80"
                  />
                  
                  {/* Subtle gradient for pin contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2e1d27]/80 via-transparent to-[#2e1d27]/20 pointer-events-none" />

                  {/* Interactive Hotspot Pins */}
                  {INTEREST_ITEMS.map((item) => {
                    const isSelected = selectedInterest?.id === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelectInterest(item)}
                        style={{ left: `${item.x}%`, top: `${item.y}%` }}
                        aria-label={`Explore ${item.label}`}
                        className="group absolute -translate-x-1/2 -translate-y-1/2 z-20 flex items-center gap-2.5 clickable focus:outline-none"
                      >
                        {/* Pulsing Radar Ring */}
                        <span className="relative flex h-10 w-10 items-center justify-center">
                          <span className="hotspot-pulse absolute inline-flex h-full w-full rounded-full bg-[#adb886]" />
                          <span 
                            className={`relative inline-flex items-center justify-center rounded-full h-9 w-9 border transition-all duration-300 ${
                              isSelected 
                                ? 'bg-[#dce5be] text-[#4b3240] border-[#dce5be] scale-110' 
                                : 'bg-[#4b3240]/90 text-[#dce5be] border-[#adb886] group-hover:bg-[#adb886] group-hover:text-[#4b3240]'
                            }`}
                          >
                            <Plus className={`w-4 h-4 transition-transform duration-300 ${isSelected ? 'rotate-45' : ''}`} />
                          </span>
                        </span>

                        {/* Floating Pill Label */}
                        <span className="hidden sm:inline-block px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#4b3240]/90 backdrop-blur-md text-[#dce5be] border border-[#adb886]/30 shadow-lg group-hover:border-[#adb886] transition-all whitespace-nowrap">
                          {item.label}
                        </span>
                      </button>
                    );
                  })}

                  {/* Helper Caption inside bottom of photo */}
                  <div className="absolute bottom-4 left-5 right-5 flex justify-between items-center text-xs font-code text-[#adb886]/80 pointer-events-none">
                    <span>[ Select a pin to inspect ]</span>
                    <span>4 items</span>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Quick Directory / Bio Side Column */}
            <div className="lg:col-span-5 space-y-6">
              <Reveal delay={200}>
                <h3 className="font-editorial text-3xl text-[#dce5be]">
                  A little more context
                </h3>
                <p className="text-[#adb886]/85 leading-relaxed mt-3">
                  I’m currently finishing my B.S. in Computer Science (Class of 2027). Whether I’m debugging a race condition, singing soprano harmonies, or reading philosophy of mind, I’m drawn to patterns that connect technical rigor with human expression.
                </p>

                <div className="pt-6 border-t border-[#adb886]/20 space-y-3">
                  <p className="font-code text-xs uppercase tracking-widest text-[#adb886]/60 mb-3">
                    Or jump directly to an item:
                  </p>
                  {INTEREST_ITEMS.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelectInterest(item)}
                        className="w-full flex items-center justify-between p-4 rounded-2xl bg-[#4b3240]/60 border border-[#adb886]/15 hover:border-[#adb886]/50 hover:bg-[#4b3240] transition-all text-left clickable group"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="p-2 rounded-xl bg-[#adb886]/10 text-[#adb886]">
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-[#dce5be]">{item.label}</div>
                            <div className="font-code text-xs text-[#adb886]/70">{item.tag}</div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#adb886]/60 group-hover:text-[#dce5be] group-hover:translate-x-1 transition-all" />
                      </button>
                    );
                  })}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer id="contact" className="py-20 px-6 md:px-14 max-w-7xl mx-auto border-t border-[#adb886]/20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          <div>
            <span className="font-code text-xs uppercase tracking-widest text-[#adb886]/70">03 / Get in Touch</span>
            <h2 className="font-editorial text-5xl md:text-7xl text-[#dce5be] mt-2">
              Let’s start a conversation.
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <a href="mailto:zoezford@gmail.com" aria-label="Email" className="p-3.5 border border-[#adb886]/30 rounded-full hover:bg-[#adb886] hover:text-[#4b3240] transition-colors clickable">
              <Mail className="w-5 h-5" />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" className="p-3.5 border border-[#adb886]/30 rounded-full hover:bg-[#adb886] hover:text-[#4b3240] transition-colors clickable">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[#adb886]/15 flex flex-col sm:flex-row justify-between text-xs font-code text-[#adb886]/60 gap-4">
          <span>© 2026 Zoe Ford</span>
          <span>Built from scratch with React & Tailwind CSS</span>
        </div>
      </footer>

      {/* --- LEFT OVERVIEW DRAWER + RIGHT TACTILE SCRAPBOOK COLLAGE --- */}
      {selectedInterest && (
        <div className="fixed inset-0 z-50 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden">
          
          {/* 1. LEFT SIDEBAR: Overview & Story */}
          <aside className="w-full lg:w-[440px] xl:w-[480px] shrink-0 bg-[#3a2531] border-b lg:border-b-0 lg:border-r border-[#adb886]/25 shadow-2xl flex flex-col justify-between p-8 md:p-10 lg:h-full lg:overflow-y-auto z-30">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#adb886]/15">
                <span className="font-code text-xs uppercase tracking-widest text-[#adb886]">
                  {selectedInterest.tag}
                </span>
                <button 
                  onClick={() => handleSelectInterest(null)}
                  className="p-2 rounded-full border border-[#adb886]/30 text-[#dce5be] hover:bg-[#adb886] hover:text-[#4b3240] transition-colors clickable"
                  aria-label="Close side panel"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#adb886]/15 text-[#adb886] text-xs font-medium mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{selectedInterest.label}</span>
                </div>

                <h3 className="font-editorial text-4xl text-[#dce5be] leading-tight mb-6">
                  {selectedInterest.headline}
                </h3>

                <p className="text-[#adb886]/90 text-base leading-relaxed mb-8">
                  {selectedInterest.story}
                </p>

                <div className="pt-6 border-t border-[#adb886]/15">
                  <h4 className="font-code text-xs uppercase tracking-widest text-[#adb886]/60 mb-4">
                    Related Highlights
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedInterest.highlights.map((tag) => (
                      <span 
                        key={tag} 
                        className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#4b3240] text-[#dce5be] border border-[#adb886]/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Next / Previous Item Switcher inside Side Drawer */}
            <div className="pt-8 mt-8 border-t border-[#adb886]/15 flex justify-between items-center">
              <span className="font-code text-xs text-[#adb886]/60">Explore other items</span>
              <div className="flex gap-2">
                {INTEREST_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelectInterest(item)}
                    className={`h-2.5 rounded-full transition-all clickable ${
                      selectedInterest.id === item.id ? 'bg-[#dce5be] w-6' : 'w-2.5 bg-[#adb886]/30 hover:bg-[#adb886]/60'
                    }`}
                    aria-label={`Switch to ${item.label}`}
                  />
                ))}
              </div>
            </div>
          </aside>

          {/* 2. RIGHT BLURRED BACKDROP: Freeform Tactile Scrapbook Collage */}
          <div 
            onClick={() => handleSelectInterest(null)}
            className="relative flex-1 bg-[#1b1016]/85 backdrop-blur-xl p-6 sm:p-10 flex flex-col justify-between min-h-[680px] lg:h-full overflow-hidden"
          >
            {/* Top Subtle Instruction */}
            <div 
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-between text-xs font-code text-[#adb886]/70 z-20"
            >
              <span>[ Scrapbook Archive — Click any overlapping piece to bring forward ]</span>
              <button 
                onClick={() => handleSelectInterest(null)}
                className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#adb886]/25 text-[#dce5be] hover:bg-[#adb886] hover:text-[#3a2531] transition-colors clickable"
              >
                ESC / Close
              </button>
            </div>

            {/* Overlapping Scrapbook Canvas (Desktop: Freeform Layered; Mobile: Stacked) */}
            <div 
              onClick={(e) => e.stopPropagation()}
              className="relative flex-1 w-full max-w-4xl mx-auto my-4 flex flex-col md:block gap-6 overflow-y-auto md:overflow-visible py-4 md:py-0"
            >
              {selectedInterest.collage?.map((item, idx) => {
                const isActive = activeCollageItem?.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveCollageItem(item)}
                    style={{
                      '--x': `${item.x}%`,
                      '--y': `${item.y}%`,
                      '--w': `${item.w}px`,
                      '--rot': isActive ? '0deg' : `${item.rotate}deg`,
                      zIndex: isActive ? 40 : item.z,
                      animationDelay: `${idx * 75}ms`
                    }}
                    className={`animate-artifact md:absolute md:left-[var(--x)] md:top-[var(--y)] md:w-[var(--w)] mx-auto w-full max-w-[280px] cursor-pointer transition-all duration-300 ease-out clickable select-none ${
                      isActive ? 'scale-[1.06] drop-shadow-[0_28px_40px_rgba(0,0,0,0.75)]' : 'hover:scale-[1.02] drop-shadow-[0_14px_24px_rgba(0,0,0,0.55)]'
                    }`}
                  >
                    <div 
                      style={{ transform: `rotate(var(--rot))` }}
                      className="transition-transform duration-300 relative"
                    >
                      {/* ARTIFACT TYPE 1: Taped Polaroid Photo */}
                      {item.type === 'polaroid' && (
                        <div className={`bg-[#f4efe6] p-3 pb-4 rounded-[3px] text-[#2b1d24] border transition-colors ${isActive ? 'ring-2 ring-[#adb886]' : 'border-black/10'}`}>
                          {/* Translucent Masking Tape at Top */}
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-[#e6dec8]/80 backdrop-blur-[1px] rotate-[-2deg] shadow-sm border-x border-black/5" />
                          
                          <div className="aspect-[4/3] w-full overflow-hidden bg-[#1e141a] mb-2.5">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex items-baseline justify-between px-0.5">
                            <span className="font-handwriting text-xl font-semibold leading-none text-[#2b1d24]">
                              {item.title}
                            </span>
                            <span className="font-code text-[10px] text-[#2b1d24]/60">{item.year}</span>
                          </div>
                        </div>
                      )}

                      {/* ARTIFACT TYPE 2: Retro Cassette Tape (Spotify Link) */}
                      {item.type === 'cassette' && (
                        <div className={`bg-[#231f20] p-3 rounded-lg border-2 text-[#f4efe6] shadow-inner ${isActive ? 'border-[#adb886]' : 'border-[#3d3638]'}`}>
                          {/* Cassette Label Sticker */}
                          <div className="bg-[#f2ead3] text-[#2b1d24] rounded-[4px] p-2.5 relative overflow-hidden">
                            {/* Top Colored Stripe */}
                            <div className="h-2 -mx-2.5 -mt-2.5 mb-2 bg-[#adb886]" />
                            <div className="flex justify-between items-center text-[9px] font-code uppercase tracking-wider text-[#2b1d24]/70 mb-0.5">
                              <span>SIDE A • 90 MIN</span>
                              <span>SPOTIFY MIX</span>
                            </div>
                            <div className="font-code text-xs font-bold tracking-tight truncate text-[#2b1d24]">
                              {item.title}
                            </div>
                            <div className="font-handwriting text-base leading-tight text-[#4b3240] truncate">
                              {item.subtitle}
                            </div>

                            {/* Tape Reels Window */}
                            <div className="mt-2 bg-[#2b2627] rounded-full py-1.5 px-4 flex items-center justify-between border border-black/30">
                              <Disc className={`w-5 h-5 text-[#f2ead3]/80 ${isActive ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
                              <div className="h-2.5 w-12 bg-[#141112] rounded-sm border border-white/10" />
                              <Disc className={`w-5 h-5 text-[#f2ead3]/80 ${isActive ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
                            </div>
                          </div>
                          {/* Bottom Trapezoid */}
                          <div className="mt-2 mx-auto w-3/4 h-2.5 bg-[#171415] rounded-t-sm border-t border-white/10" />
                        </div>
                      )}

                      {/* ARTIFACT TYPE 3: Vertical Photobooth Strip */}
                      {item.type === 'photostrip' && (
                        <div className={`bg-[#8b322c] p-2.5 rounded-[2px] shadow-md border ${isActive ? 'ring-2 ring-[#adb886]' : 'border-black/20'}`}>
                          {/* Small circular sticker dot */}
                          <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#adb886] shadow-sm border border-black/10" />
                          <div className="space-y-2">
                            {item.images.map((src, i) => (
                              <div key={i} className="aspect-[4/3] w-full overflow-hidden bg-black">
                                <img src={src} alt="" className="w-full h-full object-cover grayscale contrast-125" />
                              </div>
                            ))}
                          </div>
                          <div className="mt-2 text-center font-code text-[9px] tracking-widest text-[#f4efe6]/80 uppercase">
                            {item.year}
                          </div>
                        </div>
                      )}

                      {/* ARTIFACT TYPE 4: Torn / Lined Paper Scrap */}
                      {item.type === 'scrap' && (
                        <div 
                          className={`bg-[#f5f0e1] p-4 pt-5 rounded-[2px] text-[#2b1d24] relative border ${isActive ? 'ring-2 ring-[#adb886]' : 'border-black/10'}`}
                          style={{
                            backgroundImage: 'repeating-linear-gradient(transparent, transparent 23px, rgba(75, 50, 64, 0.14) 24px)'
                          }}
                        >
                          {/* Colored Washi Tape */}
                          <div className="absolute -top-2.5 left-6 w-12 h-5 bg-[#adb886]/85 rotate-[3deg] shadow-sm" />
                          
                          <div className="font-code text-[10px] uppercase tracking-wider text-[#4b3240]/70 mb-1.5">
                            {item.title}
                          </div>
                          <p className="font-handwriting text-2xl leading-[24px] text-[#2b1d24] whitespace-pre-line">
                            {item.handwriting}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Floating Story Caption Card */}
            <div 
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl mx-auto w-full z-40"
            >
              {activeCollageItem && (
                <div className="p-5 rounded-2xl bg-[#3a2531]/95 border border-[#adb886]/35 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xl">
                  <div>
                    <div className="flex items-center gap-2 font-code text-xs text-[#adb886] mb-1">
                      <span className="font-semibold text-[#dce5be]">{activeCollageItem.title}</span>
                      <span>•</span>
                      <span>{activeCollageItem.year}</span>
                    </div>
                    <p className="text-sm text-[#dce5be]/90 leading-relaxed">
                      {activeCollageItem.caption}
                    </p>
                  </div>

                  {activeCollageItem.link && (
                    <a 
                      href={activeCollageItem.link} 
                      target="_blank" 
                      rel="noreferrer"
                      className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#adb886] text-[#3a2531] text-xs font-semibold hover:bg-[#dce5be] transition-colors clickable"
                    >
                      Listen on Spotify <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- FULL-SCREEN CASE STUDY OVERLAY --- */}
      <div 
        className={`fixed inset-0 z-50 bg-[#3a2531] text-[#adb886] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col overflow-y-auto ${
          activeProject ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {activeProject && (
          <div className="min-h-screen flex flex-col relative pb-24">
            <div className="sticky top-0 px-6 md:px-14 py-6 flex justify-between items-center z-30 bg-[#3a2531]/90 backdrop-blur-md border-b border-[#adb886]/15 w-full">
              <button 
                onClick={() => setActiveProject(null)}
                className="flex items-center gap-2.5 text-sm font-medium text-[#dce5be] hover:-translate-x-1 transition-transform clickable"
              >
                <ArrowLeft className="w-4 h-4 text-[#adb886]" /> Back to Portfolio
              </button>
              <button 
                onClick={() => setActiveProject(null)}
                className="p-2 border border-[#adb886]/30 rounded-full text-[#dce5be] hover:bg-[#adb886] hover:text-[#3a2531] transition-colors clickable"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-w-5xl mx-auto w-full px-6 md:px-14 pt-12">
              <div className="font-code text-xs uppercase tracking-widest text-[#adb886]/75 mb-3">
                {activeProject.id} // {activeProject.category} • {activeProject.year}
              </div>
              
              <h1 className="font-editorial text-5xl md:text-7xl text-[#dce5be] leading-tight mb-10">
                {activeProject.title}
              </h1>

              <div className="w-full aspect-[16/9] rounded-3xl overflow-hidden border border-[#adb886]/20 mb-14 bg-[#2e1d27]">
                <img 
                  src={activeProject.image} 
                  alt={activeProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className="md:col-span-4 space-y-6">
                  <div className="border-t border-[#adb886]/20 pt-4">
                    <h3 className="font-code text-xs uppercase tracking-widest text-[#adb886]/60 mb-1">Context</h3>
                    <p className="text-sm font-medium text-[#dce5be]">Undergraduate CS Project</p>
                  </div>
                  <div className="border-t border-[#adb886]/20 pt-4">
                    <h3 className="font-code text-xs uppercase tracking-widest text-[#adb886]/60 mb-1">Technologies</h3>
                    <p className="text-sm font-medium text-[#dce5be]">{activeProject.category}</p>
                  </div>
                  <div className="pt-4">
                    <button className="flex items-center justify-center gap-2.5 bg-[#adb886] text-[#3a2531] px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-[#dce5be] transition-colors clickable w-full">
                      View Source / Live Demo <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="md:col-span-8 space-y-6">
                  <h2 className="text-2xl md:text-3xl font-medium text-[#dce5be] leading-snug">
                    {activeProject.description}
                  </h2>
                  <p className="text-[#adb886]/85 text-base md:text-lg leading-relaxed">
                    {activeProject.details}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}