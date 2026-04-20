import { useEffect, useState, lazy, Suspense } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import CareerHighlights from './components/CareerHighlights';
import HeroSection from './components/HeroPage';
import NavBar from './components/NavBar';
import Project from './components/Project.jsx';
import AwardsAchievements from './components/Achievements.jsx';
import Profile from './components/Profile.jsx';
import Research from './components/Research.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import Contact from './components/Contact.jsx';
import { initializeAnalytics, trackPageView } from './utils/analytics.js';
import { getPosts } from './utils/blogLoader.js';

const BlogHome = lazy(() => import('./components/blog/BlogHome.jsx'));
const BlogPost = lazy(() => import('./components/blog/BlogPost.jsx'));
const Page = lazy(() => import('./components/Page.jsx'));
const AnalyticsDebugPanel = lazy(
  () => import('./components/AnalyticsDebugPanel.jsx'),
);

function AnalyticsBridge() {
  const location = useLocation();

  useEffect(() => {
    initializeAnalytics();

    // Load icon font only for portfolio routes where icon-heavy cards are used.
    const shouldLoadFontAwesome = !location.pathname.startsWith('/blog');
    const existing = document.querySelector('link[data-fontawesome="true"]');

    if (shouldLoadFontAwesome && !existing) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href =
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css';
      link.crossOrigin = 'anonymous';
      link.setAttribute('data-fontawesome', 'true');
      document.head.appendChild(link);
    }

    const timer = window.setTimeout(() => {
      trackPageView(`${location.pathname}${location.search}`, document.title);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [location.pathname, location.search]);

  return null;
}

function BlogSpotlight() {
  const [featuredPost, setFeaturedPost] = useState(null);

  useEffect(() => {
    let active = true;

    const loadFeaturedPost = async () => {
      const posts = await getPosts();
      const latestPost = posts[0] || null;

      if (active) {
        setFeaturedPost(latestPost);
      }
    };

    loadFeaturedPost();

    return () => {
      active = false;
    };
  }, []);

  if (!featuredPost) return null;

  return (
    <section className="blog-spotlight" aria-label="Latest blog post">
      <div className="blog-spotlight-inner">
        <div>
          <p className="blog-spotlight-kicker">Latest deep dive</p>
          <h2>{featuredPost.title}</h2>
          <p>{featuredPost.excerpt}</p>
        </div>
        <Link to={`/blog/${featuredPost.slug}`} className="blog-spotlight-link">
          Read the post
        </Link>
      </div>
    </section>
  );
}

function Portfolio() {
  return (
    <>
      <ScrollProgress />
      <NavBar />
      <main>
        <HeroSection />
        <BlogSpotlight />
        <Profile />
        <CareerHighlights />
        <Research />
        <Project />
        <AwardsAchievements />
        <Contact />
      </main>
      <footer className="site-footer">
        <p>
          &copy; {new Date().getFullYear()} Birat Gautam. All rights reserved.
        </p>
      </footer>
    </>
  );
}

function App() {
  return (
    <>
      <AnalyticsBridge />
      <Suspense fallback={null}>
        <AnalyticsDebugPanel />
      </Suspense>
      <Suspense
        fallback={
          <div className="blog-loading">
            <div className="blog-spinner"></div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/blog" element={<BlogHome />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route
            path="/privacy-policy"
            element={<Page filename="privacy-policy" title="Privacy Policy" />}
          />
          <Route
            path="/terms"
            element={<Page filename="terms" title="Terms of Service" />}
          />
          <Route
            path="/about"
            element={<Page filename="about" title="About" />}
          />
          <Route
            path="/contact"
            element={<Page filename="contact" title="Contact" />}
          />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
