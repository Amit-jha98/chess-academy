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
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';

const ChessHeroScene = lazy(() => import('./ChessHeroScene.jsx'));

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Courses', path: '/courses' },
  { label: 'Achievements', path: '/achievements' },
  { label: 'Trainers', path: '/trainers' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Contact', path: '/contact' },
  { label: 'Feedback', path: '/feedback' },
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
  achievements: {
    title: 'Achievements | Rituraj Chess Academy Ghaziabad',
    description:
      'Celebrating champions — National, State, and District level chess achievements by our students.',
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
  terms: {
    title: 'Terms & Conditions | Rituraj Chess Academy',
    description: 'Terms and Conditions for enrollment and use of Rituraj Chess Academy services.',
  },
  privacy: {
    title: 'Privacy Policy | Rituraj Chess Academy',
    description: 'Privacy Policy outlining how Rituraj Chess Academy collects, uses, and protects your data.',
  },
  refund: {
    title: 'Refund Policy | Rituraj Chess Academy',
    description: 'Refund and cancellation policy for Rituraj Chess Academy programs.',
  },
  feedback: {
    title: 'Submit Feedback | Rituraj Chess Academy',
    description: 'Share your feedback, reviews, and suggestions about our chess coaching programs and facilities.',
  },
};

const highlights = [
  { icon: Users, value: '1000+', label: 'Students Trained' },
  { icon: Trophy, value: '200+', label: 'Tournament Winners' },
  { icon: Star, value: '200+', label: 'Avg Rating Improvement' },
  { icon: Clock, value: '4+', label: 'Years of Excellence' },
];

const courses = [
  {
    title: 'Beginner Chess Program',
    level: 'Foundation',
    duration: '8 weeks',
    icon: BookOpen,
    image: '/Photos/about-page-training.webp',
    description:
      'Rules, piece movement, basic tactics, board vision, and confidence-building practice games.',
    points: ['Board basics', 'Checkmate patterns', 'Guided practice'],
  },
  {
    title: 'Intermediate Chess Program',
    level: 'Growth',
    duration: '12 weeks',
    icon: Target,
    image: '/Photos/training-moment-group.webp',
    description:
      'Structured calculation, opening principles, middlegame plans, and endgame fundamentals.',
    points: ['Tactical drills', 'Opening habits', 'Game reviews'],
  },
  {
    title: 'Advanced Chess Program',
    level: 'Mastery',
    duration: '16 weeks',
    icon: Crown,
    image: '/Photos/veidika-sapra-grand-slam.webp',
    description:
      'Deep analysis, positional play, tournament discipline, and personalized improvement maps.',
    points: ['Strategy labs', 'Endgame depth', 'Performance tracking'],
  },
  {
    title: 'Tournament Preparation Program',
    level: 'Competitive',
    duration: 'Ongoing',
    icon: ShieldCheck,
    image: '/Photos/championship-prep-academy.webp',
    description:
      'Mock rounds, time-control planning, notation review, and tournament psychology.',
    points: ['Match simulation', 'Clock handling', 'Opponent prep'],
  },
];

const trainers = [
  {
    name: 'Rituraj Singh',
    role: 'Head Coach',
    image: '/Photos/Rituraj Singh.webp',
    details: 'Experienced chess mentor focused on tactical clarity, game analysis, and tournament readiness.',
    stats: [
      'Selected for Asian and World Amateur Chess Championships (2024)',
      'International FIDE-rated Chess Player',
      'Winner of Below 1600 Category Prize in Delhi',
      'Participated in Delhi International Category-C Tournament (2017 & 2018)',
      'Bronze Medalist – North Zone University (2018, 2019, 2020, 2022)',
      'Winner of Below 1600 Category – Ankit Shakshi Tournament, Jaipur'
    ],
  },
  {
    name: 'Narayan Gaha',
    role: 'Senior Coach',
    image: '/Photos/Narayan Gaha.webp',
    details: 'Expert in competitive match play, opening theory, and building tournament resilience.',
    stats: [
      'World FIDE RATING 1753',
      'International FIDE rated chess player',
      'Represent INDIA in 2016 ASIAN JUNIOR CHAMPIONSHIP. (DELHI)',
      '13 times won Open district chess championship',
      'Won U19 CBSE NATIONAL INDIVIDUAL (2017-2018)',
      'Participate in ALL INDIA UNIVERSITY at Dindigul TAMIL NADU',
      'Won U.P state U19 (2015) & Represent U.P in U19 National (Tamil Nadu)',
      'Intercollegiate Chess tournament winner in 2019, 2021, 2022',
      'Participate in Delhi International open grandmaster chess tournament 2016, 2017',
      'Participate in Delhi International category C tournament 2016, 2017, 2018, and 2019',
      'Won 1st new Delhi open international rapid tournament below 1800 category in Thyagaraj Stadium 2025'
    ],
  },
];

const testimonials = [
  {
    name: 'Kavish Saxena',
    type: 'National Rank Holder',
    rank: 'National',
    quote:
      'Becoming a National Rank Holder and increasing my FIDE rating by 121+ points is my biggest achievement so far. The structured coaching here is amazing.',
    image: '/Photos/kavish-saxena-national-amateur.webp',
  },
  {
    name: 'Vivaan Varoon',
    type: 'State Level Player',
    rank: 'State',
    quote:
      'Winning at the UP State Chess Championship in both U-11 and U-13 categories shows how much my game has improved thanks to my coaches.',
    image: '/Photos/vivaan-varoon-up-state-u11.webp',
  },
  {
    name: 'Aadwan Gupta',
    type: 'U-13 Champion',
    rank: 'District',
    quote:
      'Securing 1st position in the G B Nagar District Chess Championship 2026 was a dream come true! Rituraj Chess Academy gave me the training and confidence to win.',
    image: '/Photos/aadwan-gupta-gb-nagar.webp',
  },
  {
    name: 'Vritti Jain',
    type: 'U-17 Champion',
    rank: 'District',
    quote:
      'Securing 1st Place in the Under-17 category at the Ghaziabad District championship was possible because of the regular tournament practice and expert feedback at the academy.',
    image: '/Photos/vritti-jain-ghaziabad-district.webp',
  },
];

const gallery = [
  { title: 'National Rank', tag: 'National', rank: 'National', image: '/Photos/kavish-saxena-under9-national.webp' },
  { title: 'Amateur Championship', tag: 'National', rank: 'National', image: '/Photos/kavish-saxena-national-amateur.webp' },
  { title: 'UP State U-11', tag: 'State', rank: 'State', image: '/Photos/vivaan-varoon-up-state-u11.webp' },
  { title: 'UP State U-13', tag: 'State', rank: 'State', image: '/Photos/vivaan-varoon-up-state-u13.webp' },
  { title: "Aadwan's Victory", tag: 'District', rank: 'District', image: '/Photos/aadwan-gupta-gb-nagar.webp' },
  { title: 'State Qualifiers', tag: 'District', rank: 'District', image: '/Photos/ghaziabad-district-winners-2024.webp' },
  { title: "Vivaan's Double Win", tag: 'District', rank: 'District', image: '/Photos/vivaan-ghaziabad-district.webp' },
  { title: "Vritti's U-17 Win", tag: 'District', rank: 'District', image: '/Photos/vritti-jain-ghaziabad-district.webp' },
  { title: "Veidika's Grand Slam", tag: 'Tournament', rank: 'Other', image: '/Photos/veidika-sapra-grand-slam.webp' },
  { title: 'Academy Event', tag: 'Academy', rank: 'Other', image: '/Photos/testimonial-aarav.webp' },
  { title: 'Training Focus', tag: 'Coaching', rank: 'Other', image: '/Photos/testimonial-neha.webp' },
  { title: 'Student Match', tag: 'Academy', rank: 'Other', image: '/Photos/about-page-training.webp' },
  { title: 'Championship Prep', tag: 'Academy', rank: 'Other', image: '/Photos/championship-prep-academy.webp' },
  { title: 'Group Session', tag: 'Coaching', rank: 'Other', image: '/Photos/training-moment-group.webp' },
];

const rankOrder = { National: 0, State: 1, District: 2, Other: 3 };

const achievements = [
  {
    title: 'Kavish Saxena won 1st runner up position in 13th National Amateur Chess Championship 2026',
    description: 'Rituraj Chess Academy proudly congratulates Kavish on his big achievement for becoming a National Rank Holder in the B-1700 Open category.',
    image: '/Photos/kavish-saxena-national-amateur.webp',
    rank: 'National',
  },
  {
    title: 'Kavish Saxena secured 20th position in Under 9 National Chess Championship 2025',
    description: 'Rituraj Chess Academy proudly congratulates Kavish on winning this position and increasing 121+ fide rating.',
    image: '/Photos/kavish-saxena-under9-national.webp',
    rank: 'National',
  },
  {
    title: 'Vivaan Varoon Secured 4th Place at UP State Chess Championship',
    description: 'Rituraj Chess Academy proudly congratulates Vivaan Varoon on securing 4th Position in the Under-11 category at the Uttar Pradesh State Chess Championship.',
    image: '/Photos/vivaan-varoon-up-state-u11.webp',
    rank: 'State',
  },
  {
    title: 'Vivaan Varoon Secured 3rd Place at UP State Chess Championship',
    description: 'Rituraj Chess Academy proudly congratulates Vivaan Varoon on securing 3rd Position in the Under-13 category at the Uttar Pradesh State Chess Championship.',
    image: '/Photos/vivaan-varoon-up-state-u13.webp',
    rank: 'State',
  },
  {
    title: 'Aadwan Gupta Secured 1st position in G B Nagar District Chess Championship 2026',
    description: 'Rituraj Chess Academy proudly congratulates Aadwan for this remarkable victory in u-13 category.',
    image: '/Photos/aadwan-gupta-gb-nagar.webp',
    rank: 'District',
  },
  {
    title: 'Ghaziabad District Chess Championship 2024 Winners & UP State Qualifiers',
    description: 'Kavish Saxena secured 3rd position, Reyansh Malik secured 4th position, Yuvaan Agarwal secured 5th position, Veidika Sapra secured 3rd position, and Arna Mall secured 4th position. Rituraj Chess Academy proudly congratulates all students for getting selected for UP State Chess Championship 2024.',
    image: '/Photos/ghaziabad-district-winners-2024.webp',
    rank: 'District',
  },
  {
    title: 'Vivaan Secured 1st & 2nd position at Ghaziabad District Championship',
    description: 'Rituraj Chess Academy proudly congratulates Vivaan on securing 1st position in the Under-13 category & 2nd position in Under 11 category in Ghaziabad District Chess Championship.',
    image: '/Photos/vivaan-ghaziabad-district.webp',
    rank: 'District',
  },
  {
    title: 'Vritti Jain Secured 1st Place at Ghaziabad District championship',
    description: 'Rituraj Chess Academy proudly congratulates Vritti Jain on securing 1st Position in the Under-17 category at the Ghaziabad District chess championship.',
    image: '/Photos/vritti-jain-ghaziabad-district.webp',
    rank: 'District',
  },
  {
    title: 'Veidika Sapra secured 1st runner up position in 1st Grand Slam Tournament',
    description: 'Rituraj Chess Academy proudly congratulates Veidika Sapra on securing this prestigious win.',
    image: '/Photos/veidika-sapra-grand-slam.webp',
    rank: 'Other',
  },
];

// Rising Chess Stars — using existing student data in hierarchy order
const risingStars = [
  {
    name: 'Kavish Saxena',
    rank: 'National',
    description: 'National Rank Holder — 1st Runner Up, 13th National Amateur Championship 2026',
    image: '/Photos/kavish-saxena-national-amateur.webp',
  },
  {
    name: 'Vivaan Varoon',
    rank: 'State',
    description: 'UP State Championship — 3rd (U-13) & 4th (U-11) Place',
    image: '/Photos/vivaan-varoon-up-state-u11.webp',
  },
  {
    name: 'Aadwan Gupta',
    rank: 'District',
    description: '1st Position — G B Nagar District Chess Championship 2026 (U-13)',
    image: '/Photos/aadwan-gupta-gb-nagar.webp',
  },
  {
    name: 'Vritti Jain',
    rank: 'District',
    description: '1st Place — Ghaziabad District Championship (U-17)',
    image: '/Photos/vritti-jain-ghaziabad-district.webp',
  },
  {
    name: 'Veidika Sapra',
    rank: 'Tournament',
    description: '1st Runner Up — Grand Slam Tournament',
    image: '/Photos/veidika-sapra-grand-slam.webp',
  },
];

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const currentPath = location.pathname;
  let activePage = 'home';
  if (currentPath === '/') activePage = 'home';
  else if (currentPath === '/about') activePage = 'about';
  else if (currentPath === '/courses') activePage = 'courses';
  else if (currentPath === '/achievements') activePage = 'achievements';
  else if (currentPath === '/trainers') activePage = 'trainers';
  else if (currentPath === '/gallery') activePage = 'gallery';
  else if (currentPath === '/testimonials') activePage = 'testimonials';
  else if (currentPath === '/contact') activePage = 'contact';
  else if (currentPath === '/terms') activePage = 'terms';
  else if (currentPath === '/privacy') activePage = 'privacy';
  else if (currentPath === '/refund') activePage = 'refund';

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
    () => navItems.find((item) => item.path === currentPath)?.label || 'Home',
    [currentPath],
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
    
    // Scroll to top on page change
    window.scrollTo(0, 0);
  }, [activePage]);

  const goTo = (id) => {
    setMenuOpen(false);
    if (id === 'home') navigate('/');
    else navigate(`/${id}`);
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

      if (!response.ok) {
        let errorMsg = 'Unable to submit inquiry.';
        try {
          const data = await response.json();
          errorMsg = data.error || errorMsg;
        } catch {
          // If the server returns a 502/504 proxy error, it won't be valid JSON.
          errorMsg = 'Backend server is not running or unreachable.';
        }
        throw new Error(errorMsg);
      }

      const data = await response.json();

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
        <Routes>
          <Route path="/" element={<HomePage goTo={goTo} />} />
          <Route path="/about" element={<AboutPage goTo={goTo} />} />
          <Route path="/courses" element={<CoursesPage goTo={goTo} />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/trainers" element={<TrainersPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/testimonials" element={<TestimonialsPage goTo={goTo} />} />
          <Route path="/contact" element={
            <ContactPage
              formState={formState}
              setFormState={setFormState}
              handleSubmit={handleSubmit}
              status={status}
              submitting={submitting}
            />
          } />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/refund" element={<RefundPage />} />
        </Routes>
      </main>

      <FloatingWhatsApp />
      <Footer />
    </div>
  );
}

function Header({ activePage, activeLabel, goTo, menuOpen, setMenuOpen }) {
  return (
    <header className="site-header">
      <Link className="brand" to="/">
        <span className="brand-mark">
          <img src="/logo.png" alt="Rituraj Chess Academy" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </span>
        <span>
          <strong>Rituraj Chess Academy</strong>
          <small>Where Champions Are Made</small>
        </span>
      </Link>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <Link
            className={activePage === (item.path === '/' ? 'home' : item.path.substring(1)) ? 'active' : ''}
            key={item.path}
            to={item.path}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="header-actions">
        <Link className="primary-button header-demo-btn" to="/contact" style={{ minHeight: '40px', fontSize: '0.85rem', padding: '0 16px' }}>
          <span className="hide-on-mobile">Book Free Demo</span> <Trophy size={16} />
        </Link>
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
            <Link
              className={activePage === (item.path === '/' ? 'home' : item.path.substring(1)) ? 'active' : ''}
              key={item.path}
              to={item.path}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
              <ChevronRight size={16} />
            </Link>
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
          <h1>
            RITURAJ<br />CHESS ACADEMY
            <span className="hero-subtitle">Where Champions Are Made</span>
          </h1>
          <p>
            We nurture young talents with expert guidance,
            structured training and a passion for excellence.
          </p>
          <div className="hero-features">
            <div className="hero-feature-badge">
              <ShieldCheck size={18} />
              FIDE Rated Coaching
            </div>
            <div className="hero-feature-badge">
              <Trophy size={18} />
              Tournament Preparation
            </div>
            <div className="hero-feature-badge">
              <Users size={18} />
              Online & Offline Classes
            </div>
          </div>
          <div className="hero-actions">
            <button className="primary-button" onClick={() => goTo('contact')} type="button">
              BOOK FREE DEMO CLASS
              <ChevronRight size={18} />
            </button>
            <button className="secondary-button" onClick={() => goTo('courses')} type="button">
              JOIN TOURNAMENT
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function RisingStarsSection({ goTo }) {
  return (
    <section className="rising-stars-section">
      <div className="section-wrap">
        <div className="rising-stars-header">
          <span className="section-kicker">
            <Star size={14} fill="currentColor" /> OUR RISING CHESS STARS <Star size={14} fill="currentColor" />
          </span>
          <h2>Rising Chess Stars</h2>
          <div className="decorative-line">Current Champions & Rank Holders</div>
        </div>
        <div className="stars-grid">
          {risingStars.map((star) => (
            <div className="star-card" key={star.name}>
              <img className="star-card-image" src={star.image} alt={star.name} loading="lazy" />
              <h3>{star.name}</h3>
              <div className="star-rank">{star.rank}</div>
              <div className="star-desc">{star.description}</div>
            </div>
          ))}
        </div>
        <div className="rising-stars-footer">
          <button className="ghost-button" onClick={() => goTo('achievements')} type="button">
            VIEW ALL ACHIEVEMENTS
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  return (
    <section className="stats-band">
      <div className="section-wrap stats-grid">
        {highlights.map(({ icon: Icon, value, label }) => (
          <article className="stat-card" key={label}>
            <Icon size={24} />
            <strong>{value}</strong>
            <span>{label}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function AboutCoachAchievements({ goTo }) {
  return (
    <section className="about-trio-section">
      <div className="section-wrap">
        <div className="about-trio-grid">
          {/* About */}
          <div className="about-trio-card">
            <h3><Award size={20} /> About Rituraj Academy</h3>
            <p>
              At Rituraj Academy, we believe every move shapes a champion. Our mission is to provide world-class chess training to students of all levels and help them achieve their dreams.
            </p>
            <ul>
              <li><CheckCircle2 size={16} /> Professional & FIDE Rated Coaching</li>
              <li><CheckCircle2 size={16} /> Personal Attention</li>
              <li><CheckCircle2 size={16} /> Regular Tournaments & Practice Sessions</li>
              <li><CheckCircle2 size={16} /> Proven Track Record of Success</li>
            </ul>
            <button className="text-button" onClick={() => goTo('about')} type="button" style={{ marginTop: '16px' }}>
              KNOW MORE ABOUT US <ChevronRight size={16} />
            </button>
          </div>

          {/* Coach */}
          <div className="about-trio-card">
            <h3><Users size={20} /> Meet Our Coach</h3>
            <div className="coach-image-container">
              <img src="/Photos/Rituraj Singh.webp" alt="Coach Rituraj Singh" loading="lazy" />
            </div>
            <span className="coach-name">Coach Rituraj</span>
            <ul>
              <li><CheckCircle2 size={16} /> Professional Chess Trainer</li>
              <li><CheckCircle2 size={16} /> FIDE Rated Coach</li>
              <li><CheckCircle2 size={16} /> Tournament Organizer</li>
              <li><CheckCircle2 size={16} /> Mentor of State & National Level Players</li>
            </ul>
          </div>

          {/* Achievements */}
          <div className="about-trio-card">
            <h3><Trophy size={20} /> Our Achievements</h3>
            <ul>
              <li><Trophy size={16} /> State Champions</li>
              <li><Trophy size={16} /> National Participants</li>
              <li><Trophy size={16} /> District Winners</li>
              <li><Trophy size={16} /> School Champions</li>
            </ul>
            <button className="text-button" onClick={() => goTo('achievements')} type="button" style={{ marginTop: '16px' }}>
              VIEW ALL ACHIEVEMENTS <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function TournamentSection() {
  return (
    <section className="tournament-section">
      <div className="section-wrap">
        <div className="tournament-card">
          <div>
            <span className="section-kicker">UPCOMING TOURNAMENT</span>
            <h2>CHESS MAHAYUDH<br />SERIES</h2>
            <div className="tournament-details">
              <div className="tournament-detail">
                <CalendarDays size={20} />
                <div>
                  <strong>Date</strong>
                  27th June 2026
                </div>
              </div>
              <div className="tournament-detail">
                <MapPin size={20} />
                <div>
                  <strong>Venue</strong>
                  HLM College, Ghaziabad
                </div>
              </div>
              <div className="tournament-detail">
                <Trophy size={20} />
                <div>
                  <strong>Event</strong>
                  2nd Mahayudh Chess Tournament
                </div>
              </div>
            </div>
          </div>
          <div className="tournament-cta">
            <div className="chess-icon-large">♞</div>
            <a
              className="primary-button"
              href="https://wa.me/918076940504?text=I%20want%20to%20register%20for%20the%202nd%20Mahayudh%20Chess%20Tournament"
              target="_blank"
              rel="noreferrer"
            >
              REGISTER NOW
              <ChevronRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function GalleryStrip({ goTo }) {
  const categories = [
    { label: 'Prize Distribution', items: gallery.filter(g => g.tag === 'National') },
    { label: 'Tournaments', items: gallery.filter(g => g.tag === 'State' || g.tag === 'District') },
    { label: 'Training Sessions', items: gallery.filter(g => g.tag === 'Coaching') },
    { label: 'Winners', items: gallery.filter(g => g.tag === 'Tournament') },
    { label: 'Events', items: gallery.filter(g => g.tag === 'Academy') },
  ];

  return (
    <section className="gallery-strip-section">
      <div className="section-wrap">
        <div className="gallery-strip-header">
          <div>
            <span className="section-kicker">Gallery</span>
            <h2>GALLERY</h2>
          </div>
        </div>
        <div className="gallery-scroll-container">
          <div className="gallery-scroll-track">
            {gallery.slice(0, 10).map((item, idx) => (
              <div className="gallery-strip-card" key={idx}>
                <img src={item.image} alt={item.title} loading="lazy" />
                <span>{item.title}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="gallery-strip-footer">
          <button className="ghost-button" onClick={() => goTo('gallery')} type="button">
            VIEW ALL PHOTOS
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}

function TrainingPrograms({ goTo }) {
  const programs = [
    {
      title: 'BEGINNER',
      range: '(0 - 800)',
      points: ['Rules & Fundamentals', 'Basic Tactics', 'Checkmate Patterns'],
    },
    {
      title: 'INTERMEDIATE',
      range: '(800 - 1400)',
      points: ['Opening Principles', 'Tactical Training', 'Game Analysis'],
    },
    {
      title: 'ADVANCED',
      range: '(1400+)',
      points: ['Tournament Preparation', 'Positional Play', 'Endgame Mastery'],
    },
  ];

  return (
    <section className="training-programs-section">
      <div className="section-wrap">
        <div className="training-header">
          <span className="section-kicker">Our Training Programs</span>
          <h2>OUR TRAINING PROGRAMS</h2>
        </div>
        <div className="training-grid">
          {programs.map((prog) => (
            <div className="training-card" key={prog.title}>
              <div className="training-card-header">
                <h3>{prog.title}</h3>
                <div className="rating-range">{prog.range}</div>
              </div>
              <ul>
                {prog.points.map((point) => (
                  <li key={point}>
                    <CheckCircle2 size={16} />
                    {point}
                  </li>
                ))}
              </ul>
              <button className="text-button" onClick={() => goTo('courses')} type="button" style={{ marginTop: '20px' }}>
                LEARN MORE <ChevronRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsPreview({ goTo }) {
  return (
    <section className="testimonial-band">
      <div className="section-wrap">
        <div className="section-heading light">
          <span className="section-kicker">What Parents & Students Say</span>
          <h2>WHAT PARENTS & STUDENTS SAY</h2>
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

function HierarchicalSection({ data, renderItem, gridClassName }) {
  const groups = { National: [], State: [], District: [], Other: [] };
  data.forEach(item => {
    if (groups[item.rank]) {
      groups[item.rank].push(item);
    } else {
      groups.Other.push(item);
    }
  });
  
  return (
    <div className="hierarchical-container">
      {Object.entries(groups).map(([rank, items]) => {
        if (items.length === 0) return null;
        return (
          <div key={rank} className="hierarchy-group">
            <h3 className="hierarchy-title">{rank} {rank !== 'Other' ? 'Level' : 'Events'}</h3>
            <div className={gridClassName}>
              {items.map((item, idx) => renderItem(item, idx))}
            </div>
          </div>
        );
      })}
    </div>
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
                <img loading="lazy" src="/Photos/whatsapp_logo.webp" alt="WhatsApp" style={{ width: '24px', height: '24px', marginRight: '8px', objectFit: 'contain' }} />
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
      <RisingStarsSection goTo={goTo} />
      <StatsBar />
      <AboutCoachAchievements goTo={goTo} />
      <TournamentSection />
      <GalleryStrip goTo={goTo} />
      <TrainingPrograms goTo={goTo} />
      <TestimonialsPreview goTo={goTo} />
      <section className="cta-section">
        <CtaBand goTo={goTo} />
      </section>
    </>
  );
}

function AboutPage({ goTo }) {
  return (
    <>
      <PageIntro
        icon={Award}
        title="About the Academy"
        text="A disciplined chess learning environment built around fundamentals, analysis, and competitive confidence."
        bgImage="/Photos/chess_bg_1.webp"
        image="/Photos/about-page-training.webp"
      >
        <button className="primary-button" onClick={() => goTo('contact')} type="button">
          Start Admission Inquiry
        </button>
      </PageIntro>
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
        <HierarchicalSection 
          data={achievements}
          gridClassName="achievement-grid"
          renderItem={(item, idx) => (
            <article className="achievement-card" key={idx}>
              <div className="achievement-image-wrap">
                <img loading="lazy" src={item.image} alt={item.title} />
                <span className={`rank-badge rank-${item.rank.toLowerCase()}`}>{item.rank}</span>
              </div>
              <div className="achievement-content">
                <h3><Trophy size={20} className="trophy-icon" /> {item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          )}
        />
      </section>
      <section className="section-wrap" style={{ paddingBottom: '88px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', paddingTop: '40px' }}>
          {[
            ['Clear curriculum', 'Every batch follows a visible learning path.'],
            ['Expert feedback', 'Games are reviewed with actionable improvement points.'],
            ['Tournament focus', 'Students learn clock handling and match temperament.'],
            ['Parent clarity', 'Progress is shared in simple, useful language.'],
          ].map(([title, text]) => (
            <article key={title} style={{ padding: '24px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px' }}>
              <h3 style={{ color: '#fff', fontFamily: 'var(--heading-font)', margin: '0 0 8px', fontSize: '1.2rem' }}>{title}</h3>
              <p style={{ color: 'var(--muted)', margin: 0, lineHeight: '1.6' }}>{text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function AchievementsPage() {
  return (
    <>
      <PageIntro
        icon={Trophy}
        title="Our Achievements"
        text="Celebrating the victories and growth of our students at National, State, and District level competitions."
        bgImage="/Photos/chess_bg_2.webp"
      />
      <section className="section-wrap achievements-section">
        <div className="achievements-header">
          <span className="section-kicker">Champions Gallery</span>
          <h2>Celebrating Our Champions.</h2>
        </div>
        <HierarchicalSection 
          data={achievements}
          gridClassName="achievement-grid"
          renderItem={(item, idx) => (
            <article className="achievement-card" key={idx}>
              <div className="achievement-image-wrap">
                <img loading="lazy" src={item.image} alt={item.title} />
                <span className={`rank-badge rank-${item.rank.toLowerCase()}`}>{item.rank}</span>
              </div>
              <div className="achievement-content">
                <h3><Trophy size={20} className="trophy-icon" /> {item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          )}
        />
      </section>
    </>
  );
}

function PageIntro({ icon: Icon, title, text, bgImage, image, children }) {
  const bgStyle = bgImage 
    ? { 
        background: `linear-gradient(90deg, rgba(10, 14, 22, 0.94), rgba(10, 14, 22, 0.7)), url("${bgImage}")`,
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }
    : {};

  return (
    <section className="page-intro" style={bgStyle}>
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
        {image && <img loading="lazy" src={image} alt={title} />}
      </div>
    </section>
  );
}

function FeaturedChampions({ goTo }) {
  const featured = achievements.slice(0, 3);
  return (
    <section className="featured-champions">
      <div className="section-wrap">
        <div className="section-heading">
          <span className="section-kicker">Our Champions</span>
          <h2>Recent victories that make us proud.</h2>
          <button className="text-button" onClick={() => goTo('achievements')} type="button">
            View all achievements <ChevronRight size={16} />
          </button>
        </div>
        <div className="champions-grid">
          {featured.map((item, idx) => (
            <article className={`champion-card ${idx === 0 ? 'champion-featured' : ''}`} key={idx}>
              <div className="champion-image-wrap">
                <img loading="lazy" src={item.image} alt={item.title} />
                <span className={`rank-badge rank-${item.rank.toLowerCase()}`}>{item.rank}</span>
              </div>
              <div className="champion-content">
                <h3><Trophy size={18} /> {item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
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
              <img loading="lazy" src={image} alt={title} />
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
          <Link to="/contact" className="ghost-button" style={{ marginTop: 'auto', alignSelf: 'stretch', display: 'flex', justifyContent: 'center' }}>
            Inquire Now
          </Link>
        </article>
      ))}
    </div>
  );
}

function TrainersPage() {
  return (
    <>
      <PageIntro
        icon={Users}
        title="Trainer Profiles"
        text="Profiles include qualifications, experience, and achievement focus areas so students can find the right training environment."
        bgImage="/Photos/chess_bg_3.webp"
      />
      <section className="section-wrap trainer-grid">
        {trainers.map((trainer) => (
          <article className="trainer-card" key={trainer.name}>
            <img loading="lazy" src={trainer.image} alt={`${trainer.name} chess coach`} />
            <div className="trainer-card-content">
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
      <PageIntro
        icon={Image}
        title="Gallery"
        text="A visual gallery prepared for academy photographs, event images, classroom snapshots, and tournament memories."
        bgImage="/Photos/chess_bg_4.webp"
      />
      <section className="section-wrap">
        <HierarchicalSection 
          data={gallery}
          gridClassName="gallery-grid"
          renderItem={(item) => (
            <article className="gallery-card" key={item.title}>
              <img loading="lazy" src={item.image} alt={item.title} />
              {item.rank && (
                <span className={`rank-badge gallery-rank-badge rank-${item.rank.toLowerCase()}`}>{item.rank}</span>
              )}
              <div>
                <span>{item.tag}</span>
                <h2>{item.title}</h2>
              </div>
            </article>
          )}
        />
      </section>
    </>
  );
}

function TestimonialsPage({ goTo }) {
  return (
    <>
      <PageIntro
        icon={Star}
        title="Student Stories"
        text="Read experiences from our students and parents. Real feedback on training methodology, improvement timelines, and tournament success."
        bgImage="/Photos/chess_abstract_bg.webp"
      />
      <section className="section-wrap">
        <HierarchicalSection
          data={testimonials}
          gridClassName="testimonial-grid"
          renderItem={(item) => (
            <TestimonialCard key={item.name} item={item} />
          )}
        />
      </section>
      <section className="cta-section">
        <CtaBand goTo={goTo} />
      </section>
    </>
  );
}

function TestimonialCard({ item }) {
  return (
    <article className="testimonial-card">
      {item.image && (
        <div className="testimonial-image-wrapper">
          <img loading="lazy" src={item.image} alt={`${item.name}'s experience`} />
          {item.rank && (
            <span className={`rank-badge rank-${item.rank.toLowerCase()}`}>{item.rank}</span>
          )}
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

function FeedbackPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    rating: '5',
    category: 'Coaching Quality',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const updateField = (field, value) => {
    setFormState((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        let errorMsg = 'Unable to submit feedback.';
        try {
          const data = await response.json();
          errorMsg = data.error || errorMsg;
        } catch {
          errorMsg = 'Backend server is not running or unreachable.';
        }
        throw new Error(errorMsg);
      }

      const data = await response.json();

      setStatus({ type: 'success', message: data.message });
      setFormState({
        name: '',
        email: '',
        phone: '',
        rating: '5',
        category: 'Coaching Quality',
        message: '',
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'The form is temporarily unavailable. Please try again later.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageIntro
        icon={MessageCircle}
        title="We Value Your Feedback."
        text="Share your experience, reviews, or suggestions to help us improve our chess academy and coaching services."
        bgImage="/Photos/chess_bg_1.webp"
      />
      <section className="section-wrap contact-grid">
        <div className="contact-info">
          <article>
            <MessageCircle size={22} />
            <div>
              <h2>Share Your Experience</h2>
              <p>Your feedback is crucial in helping us provide the best possible chess training environment.</p>
            </div>
          </article>
          <article>
            <Star size={22} />
            <div>
              <h2>Testimonials</h2>
              <p>Great feedback may be featured on our testimonials page.</p>
            </div>
          </article>
          <article>
            <Trophy size={22} />
            <div>
              <h2>Continuous Improvement</h2>
              <p>We use your suggestions to refine our curriculum.</p>
            </div>
          </article>
        </div>

        <form onSubmit={handleSubmit} className="inquiry-form">
          <label>
            Full Name *
            <input type="text" required value={formState.name} onChange={(e) => updateField('name', e.target.value)} placeholder="Your name" disabled={submitting} />
          </label>
          <label>
            Email Address *
            <input type="email" required value={formState.email} onChange={(e) => updateField('email', e.target.value)} placeholder="you@example.com" disabled={submitting} />
          </label>
          <label>
            Phone Number (Optional)
            <input type="tel" value={formState.phone} onChange={(e) => updateField('phone', e.target.value)} placeholder="+91" disabled={submitting} />
          </label>
          <label>
            Feedback Category *
            <select value={formState.category} onChange={(e) => updateField('category', e.target.value)} disabled={submitting}>
              <option value="Coaching Quality">Coaching Quality</option>
              <option value="Website Experience">Website Experience</option>
              <option value="Facilities">Facilities & Environment</option>
              <option value="General Suggestion">General Suggestion</option>
              <option value="Testimonial">Testimonial</option>
            </select>
          </label>
          <label>
            Rating (1-5) *
            <select value={formState.rating} onChange={(e) => updateField('rating', e.target.value)} disabled={submitting}>
              <option value="5">⭐⭐⭐⭐⭐ (5) Excellent</option>
              <option value="4">⭐⭐⭐⭐ (4) Good</option>
              <option value="3">⭐⭐⭐ (3) Average</option>
              <option value="2">⭐⭐ (2) Poor</option>
              <option value="1">⭐ (1) Terrible</option>
            </select>
          </label>
          <label className="full-field">
            Your Feedback *
            <textarea required rows={4} value={formState.message} onChange={(e) => updateField('message', e.target.value)} placeholder="Tell us about your experience..." disabled={submitting} />
          </label>
          <button type="submit" disabled={submitting} className="submit-btn">
            {submitting ? 'Submitting Feedback...' : 'Submit Feedback'}
          </button>
          {status.message && (
            <div className={`status-message ${status.type}`}>{status.message}</div>
          )}
        </form>
      </section>
    </>
  );
}

function ContactPage({ formState, setFormState, handleSubmit, status, submitting }) {
  const updateField = (field, value) => {
    setFormState((current) => ({ ...current, [field]: value }));
  };

  return (
    <>
      <PageIntro
        icon={Mail}
        title="Start a chess training inquiry."
        text="Share student details, preferred program, and your message. The form is configured to send inquiries by SMTP when server credentials are added."
        bgImage="/Photos/chess_bg_1.webp"
      />
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
            <input value={formState.name} onChange={(event) => updateField('name', event.target.value)} type="text" placeholder="Enter full name" required />
          </label>
          <label>
            Email Address
            <input value={formState.email} onChange={(event) => updateField('email', event.target.value)} type="email" placeholder="name@example.com" required />
          </label>
          <label>
            Phone Number
            <input value={formState.phone} onChange={(event) => updateField('phone', event.target.value)} type="tel" placeholder="+91" required />
          </label>
          <label>
            Program
            <select value={formState.program} onChange={(event) => updateField('program', event.target.value)} required>
              {courses.map((course) => (
                <option key={course.title}>{course.title}</option>
              ))}
            </select>
          </label>
          <label className="full-field">
            Message
            <textarea value={formState.message} onChange={(event) => updateField('message', event.target.value)} placeholder="Tell us about the student's age, level, and goals" required />
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
    <div className="section-wrap cta-band">
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
    </div>
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
      <img loading="lazy" src="/Photos/whatsapp_logo.webp" alt="WhatsApp" />
    </a>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="section-wrap footer-grid">
        <div>
          <Link className="brand footer-brand" to="/">
            <span className="brand-mark">
              <img src="/logo.png" alt="Rituraj Chess Academy Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </span>
            <span>
              <strong>Rituraj Chess Academy</strong>
              <small>Where Champions Are Made</small>
            </span>
          </Link>
          <p>
            Empowering young minds with the power of strategy, focus and confidence.
          </p>
          <div className="footer-social">
            <a href="https://wa.me/918076940504" target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle size={18} /></a>
            <a href="tel:+918076940504" aria-label="Phone"><Phone size={18} /></a>
            <a href="mailto:riturajchessacademy@gmail.com" aria-label="Email"><Mail size={18} /></a>
          </div>
        </div>
        <div>
          <h2>Quick Links</h2>
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}>
              {item.label}
            </Link>
          ))}
        </div>
        <div>
          <h2>Contact Us</h2>
          <a href="tel:+918076940504">+91 8076 940 504</a>
          <a href="mailto:riturajchessacademy@gmail.com">riturajchessacademy@gmail.com</a>
          <span>Rituraj Chess Academy, Ghaziabad, Uttar Pradesh, India</span>
          <a
            className="whatsapp-link"
            href="https://wa.me/918076940504"
            target="_blank"
            rel="noreferrer"
            style={{ display: 'inline-flex', marginTop: '12px', minHeight: '38px', fontSize: '0.85rem', borderRadius: '6px', gap: '8px', padding: '0 14px' }}
          >
            WHATSAPP US
          </a>
        </div>
        <div>
          <h2>Legal</h2>
          <Link to="/feedback">Submit Feedback</Link>
          <Link to="/terms">Terms & Conditions</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/refund">Refund Policy</Link>
        </div>
      </div>
      <div className="section-wrap footer-bottom">
        <span>© 2024 Rituraj Chess Academy. All Rights Reserved.</span>
        <span className="designed-with">
          Designed with ❤ for Future Champions
        </span>
        <a
          className="developed-by"
          href="https://www.nextgenix.in/"
          target="_blank"
          rel="noreferrer"
          style={{ margin: 0 }}
        >
          Developed by NextGenix
        </a>
      </div>
    </footer>
  );
}

function WelcomePopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    '/Photos/pop_up_image.webp', 
    '/Photos/pop_up_image2.webp', 
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
            <img loading="lazy" src="/Photos/whatsapp_logo.webp" alt="WhatsApp" style={{ width: '24px', height: '24px', marginRight: '8px', objectFit: 'contain' }} />
            Chat with us on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

function TermsPage() {
  return (
    <div className="section-wrap compact-intro">
      <div className="section-heading" style={{ gridTemplateColumns: '1fr', textAlign: 'center' }}>
        <h1>Terms & Conditions</h1>
        <p>Please read these terms carefully before enrolling.</p>
      </div>
      <div className="split-section" style={{ display: 'block' }}>
        <div className="split-copy" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left', padding: '0 20px' }}>
          <h2>1. Introduction</h2>
          <p>Welcome to Rituraj Chess Academy. By accessing our website or enrolling in our courses, you agree to be bound by these Terms and Conditions. Please review them carefully.</p>
          
          <h2 style={{ marginTop: '30px' }}>2. Enrollment and Fees</h2>
          <p>All program fees must be paid in advance. Your enrollment is only confirmed upon successful receipt of the payment. We reserve the right to modify our fees at any time, but changes will not affect already paid ongoing sessions.</p>
          
          <h2 style={{ marginTop: '30px' }}>3. Code of Conduct</h2>
          <p>Students must maintain discipline, respect their trainers and peers, and demonstrate good sportsmanship at all times. The academy reserves the right to terminate enrollment for any student exhibiting disruptive or disrespectful behavior.</p>
          
          <h2 style={{ marginTop: '30px' }}>4. Intellectual Property</h2>
          <p>All training materials, including puzzles, videos, study guides, and literature provided by the academy, remain the intellectual property of Rituraj Chess Academy and cannot be redistributed, sold, or shared publicly without express permission.</p>
          
          <h2 style={{ marginTop: '30px' }}>5. Limitation of Liability</h2>
          <p>Rituraj Chess Academy is not liable for any direct, indirect, incidental, or consequential damages resulting from the use of our services, or any tournament results. Chess is a competitive sport and results are dependent on the individual effort of the student.</p>
        </div>
      </div>
    </div>
  );
}

function PrivacyPage() {
  return (
    <div className="section-wrap compact-intro">
      <div className="section-heading" style={{ gridTemplateColumns: '1fr', textAlign: 'center' }}>
        <h1>Privacy Policy</h1>
        <p>How we collect and protect your data.</p>
      </div>
      <div className="split-section" style={{ display: 'block' }}>
        <div className="split-copy" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left', padding: '0 20px' }}>
          <h2>1. Information We Collect</h2>
          <p>We collect personal information such as the student's name, parent's name, email address, phone number, and age when you register for a class or submit an inquiry through our website.</p>
          
          <h2 style={{ marginTop: '30px' }}>2. How We Use Your Information</h2>
          <p>Your information is used strictly to process enrollments, communicate updates regarding classes and schedules, and provide customer support. We do not sell or rent your data to any third parties.</p>
          
          <h2 style={{ marginTop: '30px' }}>3. Data Protection</h2>
          <p>We implement appropriate technical and organizational measures to safeguard your personal data against unauthorized access, loss, or disclosure. Our site utilizes SSL encryption to protect any data sent through forms.</p>
          
          <h2 style={{ marginTop: '30px' }}>4. Third-Party Services</h2>
          <p>We may use third-party services (such as payment processors or email delivery systems) which have their own privacy policies in respect to the information we are required to provide to them for transactions.</p>
          
          <h2 style={{ marginTop: '30px' }}>5. Contact Us</h2>
          <p>If you have any questions or concerns about this Privacy Policy, or if you wish to have your data removed, please contact us at riturajchessacademy@gmail.com.</p>
        </div>
      </div>
    </div>
  );
}

function RefundPage() {
  return (
    <div className="section-wrap compact-intro">
      <div className="section-heading" style={{ gridTemplateColumns: '1fr', textAlign: 'center' }}>
        <h1>Refund & Cancellation Policy</h1>
        <p>Our policies regarding cancellations and fee refunds.</p>
      </div>
      <div className="split-section" style={{ display: 'block' }}>
        <div className="split-copy" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left', padding: '0 20px' }}>
          <h2>1. General Refund Policy</h2>
          <p>Fees once paid are generally non-refundable. We highly encourage parents and students to be certain of their commitment before completing enrollment and payment for a training block.</p>
          
          <h2 style={{ marginTop: '30px' }}>2. Cancellation Before Course Start</h2>
          <p>If a cancellation request is made at least 48 hours before the start of the first session of a new enrollment period, a refund may be issued minus a small administrative processing fee.</p>
          
          <h2 style={{ marginTop: '30px' }}>3. Mid-Course Cancellation</h2>
          <p>No refunds will be provided for mid-course cancellations or for classes missed by the student. In special circumstances (such as medical emergencies), we may offer class credits for future use at the discretion of the academy director.</p>
          
          <h2 style={{ marginTop: '30px' }}>4. Academy Cancellations</h2>
          <p>If Rituraj Chess Academy must cancel a class due to trainer illness or emergency, a make-up class will be scheduled. If a make-up class cannot be scheduled, a proportional credit will be applied to the next billing cycle.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
