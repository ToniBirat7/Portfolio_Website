import { useInView } from '../hooks/useInView';
import { achievements } from '../data/achievements';
import './Achievement.css';

const AwardsAchievements = () => {
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <section
      className="awards-section"
      id="awards"
      aria-labelledby="awards-heading"
      ref={ref}
    >
      <h2 id="awards-heading">Achievements and Awards</h2>
      {achievements.map((award, i) => (
        <article
          className={`award-card animate-in ${inView ? 'in-view' : ''}`}
          key={award.id}
          style={{ transitionDelay: `${i * 150}ms` }}
        >
          <div className="award-header">
            <img
              src="pp.jpg"
              alt={award.name}
              className="award-profile-image"
              width="50"
              height="50"
              loading="lazy"
              decoding="async"
            />
            <div className="details">
              <h3>{award.name}</h3>
              <p>{award.subtitle}</p>
            </div>
          </div>
          <div className="award-content">
            <p>{award.caption} </p>
            <p>{award.hashtags} </p>
            {award.images.map((img) => (
              <img
                key={img.src}
                src={img.src}
                alt={img.alt}
                className="award-image"
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
          <div className="award-footer">
            <div className="icon">
              <i className="fas fa-thumbs-up" aria-hidden="true"></i>
              <span>{award.stats.likes}</span>
            </div>
            <div className="icon">
              <i className="fas fa-comment" aria-hidden="true"></i>
              <span>{award.stats.comments}</span>
            </div>
            <div className="icon">
              <i className="fas fa-share" aria-hidden="true"></i>
              <span>{award.stats.shares}</span>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
};

export default AwardsAchievements;
