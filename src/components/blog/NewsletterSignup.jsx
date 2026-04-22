import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { trackEvent } from '../../utils/analytics.js';
import './NewsletterSignup.css';

const NEWSLETTER_EMAIL = 'birat@biratcodes.dev';

const NewsletterSignup = ({ source, postSlug = '' }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    trackEvent('newsletter_view', {
      source,
      post_slug: postSlug || undefined,
    });
  }, [postSlug, source]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const normalized = email.trim().toLowerCase();
    if (!normalized || !normalized.includes('@')) {
      setStatus('invalid');
      return;
    }

    trackEvent('newsletter_submit_attempt', {
      source,
      post_slug: postSlug || undefined,
      email_domain: normalized.split('@')[1] || '',
    });

    const subject = encodeURIComponent('Newsletter Signup');
    const body = encodeURIComponent(
      `Please add this email to the newsletter list: ${normalized}\nSource: ${source}${postSlug ? `\nPost: ${postSlug}` : ''}`,
    );

    window.location.href = `mailto:${NEWSLETTER_EMAIL}?subject=${subject}&body=${body}`;
    setStatus('submitted');

    trackEvent('newsletter_submit', {
      source,
      post_slug: postSlug || undefined,
      method: 'mailto',
    });
  };

  return (
    <section className="newsletter-card" aria-label="Newsletter signup">
      <div className="newsletter-copy">
        <span className="newsletter-kicker">Newsletter</span>
        <h3>Get weekly AI systems notes</h3>
        <p>
          Actionable breakdowns on MCP, LLM infra, MLOps, and real deployments.
        </p>
      </div>

      <form className="newsletter-form" onSubmit={handleSubmit}>
        <label
          htmlFor={`newsletter-email-${source}`}
          className="newsletter-label"
        >
          Email address
        </label>
        <div className="newsletter-row">
          <input
            id={`newsletter-email-${source}`}
            type="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            required
          />
          <button type="submit">Join</button>
        </div>
        {status === 'invalid' && (
          <p className="newsletter-feedback">Enter a valid email address.</p>
        )}
        {status === 'submitted' && (
          <p className="newsletter-feedback">
            Opening your email client to confirm signup.
          </p>
        )}
      </form>
    </section>
  );
};

NewsletterSignup.propTypes = {
  source: PropTypes.string.isRequired,
  postSlug: PropTypes.string,
};

export default NewsletterSignup;
