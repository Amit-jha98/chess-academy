import {
  Award,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock,
  Crown,
  GraduationCap,
  Image,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Trophy,
  Users,
  X,
} from 'lucide-react';
import { Suspense, lazy, useEffect, useMemo, useState } from 'react';

const ChessHeroScene = lazy(() => import('./ChessHeroScene.jsx'));

const navItems = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Courses', id: 'courses' },
  { label: 'Trainers', id: 'trainers' },
  { label: 'Gallery', id: 'gallery' },
  { label: 'Testimonials', id: 'testimonials' },
  { label: 'Contact', id: 'contact' },
];

const pageMeta = {
  home: {
    title: 'Rituraj Chess Academy | Chess Coaching in Ghaziabad',
    description:
      'Premium chess coaching in Ghaziabad with beginner, intermediate, advanced, and tournament preparation programs.',
  },
  about: {
    title: 'About Rituraj Chess Academy | Mission, Vision and Achievements',
    description:
      'Learn about Rituraj Chess Academy, its coaching mission, student achievements, and structured chess training approach.',
  },
  courses: {
    title: 'Chess Courses in Ghaziabad | Rituraj Chess Academy',
    description:
      'Explore beginner, intermediate, advanced, and tournament preparation chess programs at Rituraj Chess Academy.',
  },
  trainers: {
    title: 'Chess Trainers | Rituraj Chess Academy Ghaziabad',
    description:
      'Meet experienced chess coaches focused on tactics, strategy, tournament preparation, and student progress.',
  },
  gallery: {
    title: 'Chess Academy Gallery | Tournaments and Training Sessions',
    description:
      'View chess tournament photos, event images, training session visuals, and student match moments.',
  },
  testimonials: {
    title: 'Student and Parent Testimonials | Rituraj Chess Academy',
    description:
      'Read student reviews, parent feedback, and success stories from Rituraj Chess Academy learners.',
  },
  contact: {
    title: 'Contact Rituraj Chess Academy | Chess Admission Inquiry',
    description:
      'Contact Rituraj Chess Academy in Ghaziabad for chess classes, program schedules, and admission inquiries.',
  },
};

const highlights = [
  { icon: Trophy, value: '120+', label: 'Tournament medals' },
  { icon: Users, value: '900+', label: 'Students coached' },
  { icon: Clock, value: '12+', label: 'Years of training' },
  { icon: Star, value: '4.9/5', label: 'Parent rating' },
];

const courses = [
  {
    title: 'Beginner Chess Program',
    level: 'Foundation',
    duration: '8 weeks',
    icon: BookOpen,
    image: '/Photos/about-page-training.jpeg',
    description:
      'Rules, piece movement, basic tactics, board vision, and confidence-building practice games.',
    points: ['Board basics', 'Checkmate patterns', 'Guided practice'],
  },
  {
    title: 'Intermediate Chess Program',
    level: 'Growth',
    duration: '12 weeks',
    icon: Target,
    image: '/Photos/training-moment-group.jpeg',
    description:
      'Structured calculation, opening principles, middlegame plans, and endgame fundamentals.',
    points: ['Tactical drills', 'Opening habits', 'Game reviews'],
  },
  {
    title: 'Advanced Chess Program',
    level: 'Mastery',
    duration: '16 weeks',
    icon: Crown,
    image: '/Photos/veidika-sapra-grand-slam.jpeg',
    description:
      'Deep analysis, positional play, tournament discipline, and personalized improvement maps.',
    points: ['Strategy labs', 'Endgame depth', 'Performance tracking'],
  },
  {
    title: 'Tournament Preparation Program',
    level: 'Competitive',
    duration: 'Ongoing',
    icon: ShieldCheck,
    image: '/Photos/championship-prep-academy.jpeg',
    description:
      'Mock rounds, time-control planning, notation review, and tournament psychology.',
    points: ['Match simulation', 'Clock handling', 'Opponent prep'],
  },
];

const trainers = [
  {
    name: 'Rituraj Singh',
    role: 'Head Coach',
    image:
      'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=900&q=80',
    details:
      'Experienced chess mentor focused on tactical clarity, game analysis, and tournament readiness.',
    stats: ['FIDE-style training', 'Junior tournament mentor', '12+ years coaching'],
  },
  {
    name: 'Ananya Sharma',
    role: 'Junior Program Coach',
    image:
      'https://images.unsplash.com/photo-1611195974226-a6a9be9dd763?auto=format&fit=crop&w=900&q=80',
    details:
      'Builds strong fundamentals for young learners through drills, puzzles, and friendly match play.',
    stats: ['Beginner specialist', 'Puzzle curriculum', 'Parent progress reports'],
  },
  {
    name: 'Vikram Chauhan',
    role: 'Tournament Coach',
    image:
      'https://images.unsplash.com/photo-1585229252003-92dd11db4e31?auto=format&fit=crop&w=900&q=80',
    details:
      'Helps students prepare for rated events with notation review, opening plans, and calm execution.',
    stats: ['Advanced batches', 'Game analysis', 'Time-control coaching'],
  },
];

const testimonials = [
  {
    name: 'Aadwan Gupta',
    type: 'U-13 Champion',
    quote:
      'Securing 1st position in the G B Nagar District Chess Championship 2026 was a dream come true! Rituraj Chess Academy gave me the training and confidence to win.',
    image: '/Photos/aadwan-gupta-gb-nagar.jpeg',
  },
  {
    name: 'Kavish Saxena',
    type: 'National Rank Holder',
    quote:
      'Becoming a National Rank Holder and increasing my FIDE rating by 121+ points is my biggest achievement so far. The structured coaching here is amazing.',
    image: '/Photos/kavish-saxena-national-amateur.png',
  },
  {
    name: 'Vivaan Varoon',
    type: 'State Level Player',
    quote:
      'Winning at the UP State Chess Championship in both U-11 and U-13 categories shows how much my game has improved thanks to my coaches.',
    image: '/Photos/vivaan-varoon-up-state-u11.jpeg',
  },
  {
    name: 'Vritti Jain',
    type: 'U-17 Champion',
    quote:
      'Securing 1st Place in the Under-17 category at the Ghaziabad District championship was possible because of the regular tournament practice and expert feedback at the academy.',
    image: '/Photos/vritti-jain-ghaziabad-district.jpeg',
  },
];

const gallery = [
  {
    title: "Aadwan's Victory",
    tag: 'Tournament',
    image: '/Photos/aadwan-gupta-gb-nagar.jpeg',
  },
  {
    title: 'State Qualifiers',
    tag: 'Championship',
    image: '/Photos/ghaziabad-district-winners-2024.jpeg',
  },
  {
    title: 'National Rank',
    tag: 'National',
    image: '/Photos/kavish-saxena-under9-national.jpeg',
  },
  {
    title: "Vivaan's Double Win",
    tag: 'Tournament',
    image: '/Photos/vivaan-ghaziabad-district.jpeg',
  },
  {
    title: "Veidika's Grand Slam",
    tag: 'Tournament',
    image: '/Photos/veidika-sapra-grand-slam.jpeg',
  },
  {
    title: 'UP State U-11',
    tag: 'State Level',
    image: '/Photos/vivaan-varoon-up-state-u11.jpeg',
  },
  {
    title: 'UP State U-13',
    tag: 'State Level',
    image: '/Photos/vivaan-varoon-up-state-u13.jpeg',
  },
  {
    title: "Vritti's U-17 Win",
    tag: 'Tournament',
    image: '/Photos/vritti-jain-ghaziabad-district.jpeg',
  },
  {
    title: "Amateur Championship",
    tag: 'National',
    image: '/Photos/kavish-saxena-national-amateur.png',
  },
  {
    title: 'Academy Event',
    tag: 'Events',
    image: '/Photos/testimonial-aarav.jpeg',
  },
  {
    title: 'Training Focus',
    tag: 'Coaching',
    image: '/Photos/testimonial-neha.jpeg',
  },
  {
    title: 'Student Match',
    tag: 'Learning',
    image: '/Photos/about-page-training.jpeg',
  },
  {
    title: 'Championship Prep',
    tag: 'Academy',
    image: '/Photos/championship-prep-academy.jpeg',
  },
  {
    title: 'Group Session',
    tag: 'Coaching',
    image: '/Photos/training-moment-group.jpeg',
  },
];

const achievements = [
  {
    title: 'Aadwan Gupta Secured 1st position in G B Nagar District Chess Championship 2026',
    description: 'Rituraj Chess Academy proudly congratulates Aadwan for this remarkable victory in u-13 category.',
    image: '/Photos/aadwan-gupta-gb-nagar.jpeg',
  },
  {
    title: 'Ghaziabad District Chess Championship 2024 Winners & UP State Qualifiers',
    description: 'Kavish Saxena secured 3rd position, Reyansh Malik secured 4th position, Yuvaan Agarwal secured 5th position, Veidika Sapra secured 3rd position, and Arna Mall secured 4th position. Rituraj Chess Academy proudly congratulates all students for getting selected for UP State Chess Championship 2024.',
    image: '/Photos/ghaziabad-district-winners-2024.jpeg',
  },
  {
    title: 'Kavish Saxena secured 20th position in Under 9 National Chess Championship 2025',
    description: 'Rituraj Chess Academy proudly congratulates Kavish on winning this position and increasing 121+ fide rating.',
    image: '/Photos/kavish-saxena-under9-national.jpeg',
  },
  {
    title: 'Vivaan Secured 1st & 2nd position at Ghaziabad District Championship',
    description: 'Rituraj Chess Academy proudly congratulates Vivaan on securing 1st position in the Under-13 category & 2nd position in Under 11 category in Ghaziabad District Chess Championship.',
    image: '/Photos/vivaan-ghaziabad-district.jpeg',
  },
  {
    title: 'Veidika Sapra secured 1st runner up position in 1st Grand Slam Tournament',
    description: 'Rituraj Chess Academy proudly congratulates Veidika Sapra on securing this prestigious win.',
    image: '/Photos/veidika-sapra-grand-slam.jpeg',
  },
  {
    title: 'Vivaan Varoon Secured 4th Place at UP State Chess Championship',
    description: 'Rituraj Chess Academy proudly congratulates Vivaan Varoon on securing 4th Position in the Under-11 category at the Uttar Pradesh State Chess Championship.',
    image: '/Photos/vivaan-varoon-up-state-u11.jpeg',
  },
  {
    title: 'Vivaan Varoon Secured 3rd Place at UP State Chess Championship',
    description: 'Rituraj Chess Academy proudly congratulates Vivaan Varoon on securing 3rd Position in the Under-13 category at the Uttar Pradesh State Chess Championship.',
    image: '/Photos/vivaan-varoon-up-state-u13.jpeg',
  },
  {
    title: 'Vritti Jain Secured 1st Place at Ghaziabad District championship',
    description: 'Rituraj Chess Academy proudly congratulates Vritti Jain on securing 1st Position in the Under-17 category at the Ghaziabad District chess championship.',
    image: '/Photos/vritti-jain-ghaziabad-district.jpeg',
  },
  {
    title: 'Kavish Saxena won 1st runner up position in 13th National Amateur Chess Championship 2026',
    description: 'Rituraj Chess Academy proudly congratulates Kavish on his big achievement for becoming a National Rank Holder in the B-1700 Open category.',
    image: '/Photos/kavish-saxena-national-amateur.png',
  },
];

function App() {
  const [activePage, setActivePage] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    program: 'Beginner Chess Program',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const activeLabel = useMemo(
    () => navItems.find((item) => item.id === activePage)?.label || 'Home',
    [activePage],
  );

  useEffect(() => {
    const meta = pageMeta[activePage] || pageMeta.home;
    document.title = meta.title;

    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute('content', meta.description);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', meta.title);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', meta.description);
    }
  }, [activePage]);

  const goTo = (id) => {
    setActivePage(id);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Unable to submit inquiry.');
      }

      setStatus({ type: 'success', message: data.message });
      setFormState({
        name: '',
        email: '',
        phone: '',
        program: 'Beginner Chess Program',
        message: '',
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message:
          error.message ||
          'The form is temporarily unavailable. Please call or WhatsApp us.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="site-shell">
      <WelcomePopup />
      <Header
        activePage={activePage}
        activeLabel={activeLabel}
        goTo={goTo}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      <main>
        {activePage === 'home' && <HomePage goTo={goTo} />}
        {activePage === 'about' && <AboutPage goTo={goTo} />}
        {activePage === 'courses' && <CoursesPage goTo={goTo} />}
        {activePage === 'trainers' && <TrainersPage />}
        {activePage === 'gallery' && <GalleryPage />}
        {activePage === 'testimonials' && <TestimonialsPage goTo={goTo} />}
        {activePage === 'contact' && (
          <ContactPage
            formState={formState}
            setFormState={setFormState}
            handleSubmit={handleSubmit}
            status={status}
            submitting={submitting}
          />
        )}
      </main>

      <FloatingWhatsApp />
      <Footer goTo={goTo} />
    </div>
  );
}

function Header({ activePage, activeLabel, goTo, menuOpen, setMenuOpen }) {
  return (
    <header className="site-header">
      <button className="brand" onClick={() => goTo('home')} type="button">
        <span className="brand-mark">
          <Crown size={24} />
        </span>
        <span>
          <strong>Rituraj Chess Academy</strong>
          <small>Ghaziabad</small>
        </span>
      </button>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <button
            className={activePage === item.id ? 'active' : ''}
            key={item.id}
            onClick={() => goTo(item.id)}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="header-actions">
        <button className="ghost-button" onClick={() => goTo('contact')} type="button">
          Enquire
        </button>
        <button
          className="menu-button"
          onClick={() => setMenuOpen((value) => !value)}
          type="button"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="mobile-nav">
          <span>{activeLabel}</span>
          {navItems.map((item) => (
            <button
              className={activePage === item.id ? 'active' : ''}
              key={item.id}
              onClick={() => goTo(item.id)}
              type="button"
            >
              {item.label}
              <ChevronRight size={16} />
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

function Hero({ goTo }) {
  return (
    <section className="hero-section">
      <Suspense fallback={<div className="hero-scene hero-scene-fallback" aria-hidden="true" />}>
        <ChessHeroScene />
      </Suspense>
      <div className="hero-overlay" />
      <div className="hero-content section-wrap">
        <div className="hero-copy">
          <span className="eyebrow">
            <Sparkles size={16} />
            Premium chess coaching in Ghaziabad
          </span>
          <h1>Rituraj Chess Academy</h1>
          <p>
            A focused training academy for young players who want stronger
            calculation, smarter strategy, and real tournament confidence.
          </p>
          <div className="hero-actions">
            <button className="primary-button" onClick={() => goTo('courses')} type="button">
              Explore Programs
              <ChevronRight size={18} />
            </button>
            <button className="secondary-button" onClick={() => goTo('contact')} type="button">
              Book Inquiry
            </button>
          </div>
          <div className="hero-trust-row" aria-label="Academy highlights">
            <span>Age 6+</span>
            <span>Offline and online guidance</span>
            <span>Tournament readiness</span>
          </div>
        </div>
        <div className="hero-panel">
          <span>Next batch focus</span>
          <strong>Tactics, tournament discipline, and guided game review</strong>
          <div className="mini-metrics">
            <b>4</b>
            <small>Program levels</small>
          </div>
        </div>
      </div>
    </section>
  );
}

function AnnouncementMarquee() {
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  return (
    <>
      <div className="announcement-marquee-container">
        <div className="announcement-marquee-track">
          {[...achievements, ...achievements].map((item, idx) => (
            <button 
              key={idx} 
              className="marquee-item" 
              onClick={() => setSelectedAchievement(item)}
              type="button"
            >
              <strong>🏆 {item.title}</strong>
            </button>
          ))}
        </div>
      </div>
      
      {selectedAchievement && (
        <div className="popup-overlay" onClick={() => setSelectedAchievement(null)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={() => setSelectedAchievement(null)} type="button" aria-label="Close popup">
              <X size={20} />
            </button>
            <div className="popup-slideshow" style={{ gridTemplateRows: '1fr', maxHeight: '50vh' }}>
              <img 
                src={selectedAchievement.image} 
                alt={selectedAchievement.title} 
                className="popup-slide active" 
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="popup-actions" style={{ textAlign: 'left' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{selectedAchievement.title}</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--muted)' }}>{selectedAchievement.description}</p>
              <a
                className="primary-button popup-btn"
                href="https://wa.me/918076940504"
                target="_blank"
                rel="noreferrer"
                style={{ marginTop: '20px' }}
              >
                <img src="/Photos/whatsapp_logo.png" alt="WhatsApp" style={{ width: '24px', height: '24px', marginRight: '8px', objectFit: 'contain' }} />
                Congratulate on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function HomePage({ goTo }) {
  return (
    <>
      <AnnouncementMarquee />
      <Hero goTo={goTo} />
      <section className="section-wrap stats-grid">
        {highlights.map(({ icon: Icon, value, label }) => (
          <article className="stat-card" key={label}>
            <Icon size={24} />
            <strong>{value}</strong>
            <span>{label}</span>
          </article>
        ))}
      </section>
      <section className="section-wrap split-section">
        <div>
          <span className="section-kicker">Academy Introduction</span>
          <h2>Training that turns good moves into good habits.</h2>
        </div>
        <div className="rich-text">
          <p>
            Rituraj Chess Academy offers structured chess coaching for students
            at every stage, from first-time learners to tournament-ready players.
            Each program combines concepts, puzzles, practice games, and
            analysis so students learn how to think under pressure.
          </p>
          <button className="text-button" onClick={() => goTo('about')} type="button">
            Know the academy <ChevronRight size={16} />
          </button>
        </div>
      </section>
      <CoursesPreview goTo={goTo} />
      <TestimonialsPreview goTo={goTo} />
      <CtaBand goTo={goTo} />
    </>
  );
}

function AboutPage({ goTo }) {
  return (
    <PageIntro
      icon={Award}
      title="About the Academy"
      text="A disciplined chess learning environment built around fundamentals, analysis, and competitive confidence."
    >
      <button className="primary-button" onClick={() => goTo('contact')} type="button">
        Start Admission Inquiry
      </button>
    </PageIntro>
  );
}

function PageIntro({ icon: Icon, title, text, children }) {
  return (
    <>
      <section className="page-intro">
        <div className="section-wrap page-intro-grid">
          <div>
            <span className="eyebrow">
              <Icon size={16} />
              Rituraj Chess Academy
            </span>
            <h1>{title}</h1>
            <p>{text}</p>
            <div className="intro-actions">{children}</div>
          </div>
          <img
            src="/Photos/about-page-training.jpeg"
            alt="Rituraj Chess Academy students"
          />
        </div>
      </section>
      <section className="section-wrap mission-grid">
        <article>
          <GraduationCap size={26} />
          <h2>Mission</h2>
          <p>
            To make chess learning structured, enjoyable, and performance-ready
            for students across Ghaziabad and nearby regions.
          </p>
        </article>
        <article>
          <Target size={26} />
          <h2>Vision</h2>
          <p>
            To develop confident players who think clearly, compete respectfully,
            and carry strategic discipline beyond the board.
          </p>
        </article>
      </section>
      <section className="section-wrap achievements-section">
        <div className="achievements-header">
          <span className="section-kicker">Achievements</span>
          <h2>Celebrating Our Champions.</h2>
        </div>
        <div className="achievement-grid">
          {achievements.map((item, idx) => (
            <article className="achievement-card" key={idx}>
              <img src={item.image} alt={item.title} />
              <div className="achievement-content">
                <h3><Trophy size={20} className="trophy-icon" /> {item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="section-wrap why-grid">
        {[
          ['Clear curriculum', 'Every batch follows a visible learning path.'],
          ['Expert feedback', 'Games are reviewed with actionable improvement points.'],
          ['Tournament focus', 'Students learn clock handling and match temperament.'],
          ['Parent clarity', 'Progress is shared in simple, useful language.'],
        ].map(([title, text]) => (
          <article key={title}>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </section>
    </>
  );
}

function CoursesPreview({ goTo }) {
  return (
    <section className="section-wrap">
      <div className="section-heading">
        <span className="section-kicker">Coaching Programs</span>
        <h2>Choose the right level of training.</h2>
        <button className="text-button" onClick={() => goTo('courses')} type="button">
          View all courses <ChevronRight size={16} />
        </button>
      </div>
      <CourseGrid compact />
    </section>
  );
}

function CoursesPage({ goTo }) {
  return (
    <>
      <section className="page-intro compact-intro">
        <div className="section-wrap">
          <span className="eyebrow">
            <BookOpen size={16} />
            Courses and Training Programs
          </span>
          <h1>Programs for every chess stage.</h1>
          <p>
            Each course includes concept lessons, practice games, feedback, and
            improvement tasks suitable for the student's current level.
          </p>
        </div>
      </section>
      <section className="section-wrap">
        <CourseGrid />
      </section>
      <section className="section-wrap course-info-band">
        <div>
          <h2>Course Information Display</h2>
          <p>
            Batches can be arranged for school students, tournament players, and
            focused one-on-one mentoring after an initial skill assessment.
          </p>
        </div>
        <button className="primary-button" onClick={() => goTo('contact')} type="button">
          Ask for Schedule
        </button>
      </section>
    </>
  );
}

function CourseGrid({ compact = false }) {
  return (
    <div className={`course-grid ${compact ? 'compact' : ''}`}>
      {courses.map(({ title, level, duration, icon: Icon, image, description, points }) => (
        <article className="course-card" key={title}>
          {image && (
            <div className="course-image-wrapper">
              <img src={image} alt={title} />
            </div>
          )}
          <div className="card-top">
            <span className="icon-tile">
              <Icon size={24} />
            </span>
            <span>{level}</span>
          </div>
          <h3>{title}</h3>
          <p>{description}</p>
          <div className="duration">
            <CalendarDays size={16} />
            {duration}
          </div>
          <ul>
            {points.map((point) => (
              <li key={point}>
                <CheckCircle2 size={16} />
                {point}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

function TrainersPage() {
  return (
    <>
      <section className="page-intro compact-intro">
        <div className="section-wrap">
          <span className="eyebrow">
            <Users size={16} />
            Trainer Profiles
          </span>
          <h1>Coaches who teach the thinking behind each move.</h1>
          <p>
            Profiles include qualifications, experience, and achievement focus
            areas so students can find the right training environment.
          </p>
        </div>
      </section>
      <section className="section-wrap trainer-grid">
        {trainers.map((trainer) => (
          <article className="trainer-card" key={trainer.name}>
            <img src={trainer.image} alt={`${trainer.name} chess coach`} />
            <div>
              <span>{trainer.role}</span>
              <h2>{trainer.name}</h2>
              <p>{trainer.details}</p>
              <ul>
                {trainer.stats.map((stat) => (
                  <li key={stat}>{stat}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}

function GalleryPage() {
  return (
    <>
      <section className="page-intro compact-intro">
        <div className="section-wrap">
          <span className="eyebrow">
            <Image size={16} />
            Gallery
          </span>
          <h1>Tournaments, events, and training sessions.</h1>
          <p>
            A visual gallery prepared for academy photographs, event images,
            classroom snapshots, and tournament memories.
          </p>
        </div>
      </section>
      <section className="section-wrap gallery-grid">
        {gallery.map((item) => (
          <article className="gallery-card" key={item.title}>
            <img src={item.image} alt={item.title} />
            <div>
              <span>{item.tag}</span>
              <h2>{item.title}</h2>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}

function TestimonialsPreview({ goTo }) {
  return (
    <section className="testimonial-band">
      <div className="section-wrap">
        <div className="section-heading light">
          <span className="section-kicker">Testimonials Preview</span>
          <h2>Parents and students notice the discipline.</h2>
          <button className="text-button light" onClick={() => goTo('testimonials')} type="button">
            Read more stories <ChevronRight size={16} />
          </button>
        </div>
        <div className="testimonial-grid preview">
          {testimonials.slice(0, 3).map((item) => (
            <TestimonialCard key={item.name} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsPage({ goTo }) {
  return (
    <>
      <section className="page-intro compact-intro">
        <div className="section-wrap">
          <span className="eyebrow">
            <MessageCircle size={16} />
            Testimonials
          </span>
          <h1>Student reviews, parent feedback, and success stories.</h1>
          <p>
            Feedback from learners who improved their confidence, calculation,
            patience, and tournament readiness.
          </p>
        </div>
      </section>
      <section className="section-wrap testimonial-grid">
        {testimonials.map((item) => (
          <TestimonialCard key={item.name} item={item} />
        ))}
      </section>
      <CtaBand goTo={goTo} />
    </>
  );
}

function TestimonialCard({ item }) {
  return (
    <article className="testimonial-card">
      {item.image && (
        <div className="testimonial-image-wrapper">
          <img src={item.image} alt={`${item.name}'s experience`} />
        </div>
      )}
      <div className="stars" aria-label="Five star rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} size={16} fill="currentColor" />
        ))}
      </div>
      <p>"{item.quote}"</p>
      <strong>{item.name}</strong>
      <span>{item.type}</span>
    </article>
  );
}

function ContactPage({ formState, setFormState, handleSubmit, status, submitting }) {
  const updateField = (field, value) => {
    setFormState((current) => ({ ...current, [field]: value }));
  };

  return (
    <>
      <section className="page-intro compact-intro">
        <div className="section-wrap">
          <span className="eyebrow">
            <Mail size={16} />
            Contact Us
          </span>
          <h1>Start a chess training inquiry.</h1>
          <p>
            Share student details, preferred program, and your message. The form
            is configured to send inquiries by SMTP when server credentials are added.
          </p>
        </div>
      </section>
      <section className="section-wrap contact-grid">
        <div className="contact-info">
          <article>
            <MapPin size={22} />
            <div>
              <h2>Academy Location</h2>
              <p>Rajnagar Extension, Ghaziabad</p>
            </div>
          </article>
          <article>
            <Phone size={22} />
            <div>
              <h2>Phone</h2>
              <a href="tel:+918076940504">+91 8076 940 504</a>
            </div>
          </article>
          <article>
            <Mail size={22} />
            <div>
              <h2>Email</h2>
              <a href="mailto:riturajchessacademy@gmail.com">riturajchessacademy@gmail.com</a>
            </div>
          </article>
          <a
            className="whatsapp-link"
            href="https://wa.me/918076940504"
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={20} />
            Chat on WhatsApp
          </a>
          <iframe
            title="Rituraj Chess Academy location"
            loading="lazy"
            src="https://www.google.com/maps?q=Rajnagar%20Extension%20Ghaziabad&output=embed"
          />
        </div>
        <form className="inquiry-form" onSubmit={handleSubmit}>
          <label>
            Student or Parent Name
            <input
              value={formState.name}
              onChange={(event) => updateField('name', event.target.value)}
              type="text"
              placeholder="Enter full name"
              required
            />
          </label>
          <label>
            Email Address
            <input
              value={formState.email}
              onChange={(event) => updateField('email', event.target.value)}
              type="email"
              placeholder="name@example.com"
              required
            />
          </label>
          <label>
            Phone Number
            <input
              value={formState.phone}
              onChange={(event) => updateField('phone', event.target.value)}
              type="tel"
              placeholder="+91"
              required
            />
          </label>
          <label>
            Program
            <select
              value={formState.program}
              onChange={(event) => updateField('program', event.target.value)}
              required
            >
              {courses.map((course) => (
                <option key={course.title}>{course.title}</option>
              ))}
            </select>
          </label>
          <label className="full-field">
            Message
            <textarea
              value={formState.message}
              onChange={(event) => updateField('message', event.target.value)}
              placeholder="Tell us about the student's age, level, and goals"
              required
            />
          </label>
          {status.message && <p className={`form-status ${status.type}`}>{status.message}</p>}
          <button className="primary-button full-field" disabled={submitting} type="submit">
            {submitting ? 'Sending...' : 'Send Inquiry'}
          </button>
        </form>
      </section>
    </>
  );
}

function CtaBand({ goTo }) {
  return (
    <section className="section-wrap cta-band">
      <div>
        <span className="section-kicker">Call to Action</span>
        <h2>Ready to help a student think sharper on the board?</h2>
        <p>
          Book an inquiry and the academy team will suggest a suitable program
          based on the student's current level and goals.
        </p>
      </div>
      <button className="primary-button" onClick={() => goTo('contact')} type="button">
        Contact Academy
      </button>
    </section>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      className="floating-whatsapp"
      href="https://wa.me/918076940504"
      target="_blank"
      rel="noreferrer"
      aria-label="Contact on WhatsApp"
    >
      <img src="/Photos/whatsapp_logo.png" alt="WhatsApp" />
    </a>
  );
}

function Footer({ goTo }) {
  return (
    <footer className="site-footer">
      <div className="section-wrap footer-grid">
        <div>
          <button className="brand footer-brand" onClick={() => goTo('home')} type="button">
            <span className="brand-mark">
              <Crown size={22} />
            </span>
            <span>
              <strong>Rituraj Chess Academy</strong>
              <small>Think better. Play stronger.</small>
            </span>
          </button>
          <p>
            Premium chess coaching, tournament preparation, and structured
            training programs in Ghaziabad.
          </p>
        </div>
        <div>
          <h2>Pages</h2>
          {navItems.map((item) => (
            <button key={item.id} onClick={() => goTo(item.id)} type="button">
              {item.label}
            </button>
          ))}
        </div>
        <div>
          <h2>Contact</h2>
          <a href="mailto:riturajchessacademy@gmail.com">riturajchessacademy@gmail.com</a>
          <a href="tel:+918076940504">+91 8076 940 504</a>
          <span>Rajnagar Extension, Ghaziabad</span>
          <a
            className="developed-by"
            href="https://www.nextgenix.in/"
            target="_blank"
            rel="noreferrer"
          >
            Developed by NextGenix
          </a>
        </div>
      </div>
    </footer>
  );
}

function WelcomePopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    'Photos/ghaziabad-district-winners-2024.jpeg', 
    'Photos/about-page-training.jpeg', 
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isVisible, images.length]);

  if (!isVisible) return null;

  return (
    <div className="popup-overlay" onClick={() => setIsVisible(false)}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={() => setIsVisible(false)} type="button" aria-label="Close popup">
          <X size={20} />
        </button>
        <div className="popup-slideshow">
          {images.map((img, index) => (
            <img 
              key={index} 
              src={img} 
              alt={`Slide ${index + 1}`} 
              className={`popup-slide ${index === currentSlide ? 'active' : ''}`}
            />
          ))}
          <div className="popup-dots">
            {images.map((_, index) => (
              <button 
                key={index} 
                className={`popup-dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                type="button"
              />
            ))}
          </div>
        </div>
        <div className="popup-actions">
          <h3>Welcome to Rituraj Chess Academy!</h3>
          <p>Ready to master the board? Let's talk!</p>
          <a
            className="primary-button popup-btn"
            href="https://wa.me/918076940504"
            target="_blank"
            rel="noreferrer"
          >
            <img src="/Photos/whatsapp_logo.png" alt="WhatsApp" style={{ width: '24px', height: '24px', marginRight: '8px', objectFit: 'contain' }} />
            Chat with us on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
