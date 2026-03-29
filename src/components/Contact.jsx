import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('idle');
  const [ref, inView] = useInView({ threshold: 0.1 });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      setTimeout(() => setStatus('idle'), 4000);
    }, 1500);
  };

  return (
    <section className="contact-section" id="contact">
      <h2>Get In Touch</h2>
      <p className="contact-subtitle">
        Have a project in mind or want to collaborate? I&apos;d love to hear from you.
      </p>
      <div className={`contact-card animate-in ${inView ? 'in-view' : ''}`} ref={ref}>
        <div className="contact-info">
          <div className="contact-info-item">
            <i className="fab fa-linkedin"></i>
            <div>
              <h4>LinkedIn</h4>
              <a href="https://www.linkedin.com/in/biratgautam7/" target="_blank" rel="noopener noreferrer">
                /in/biratgautam7
              </a>
            </div>
          </div>
          <div className="contact-info-item">
            <i className="fab fa-github"></i>
            <div>
              <h4>GitHub</h4>
              <a href="https://github.com/ToniBirat7" target="_blank" rel="noopener noreferrer">
                @ToniBirat7
              </a>
            </div>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="What's this about?"
              value={formData.subject}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Your message..."
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-btn" disabled={status === 'sending'} aria-busy={status === 'sending'}>
            {status === 'idle' && (
              <><i className="fas fa-paper-plane"></i> Send Message</>
            )}
            {status === 'sending' && (
              <><i className="fas fa-spinner fa-spin"></i> Sending...</>
            )}
            {status === 'sent' && (
              <><i className="fas fa-check"></i> Message Sent!</>
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
