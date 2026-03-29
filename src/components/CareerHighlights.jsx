import { useInView } from "../hooks/useInView";
import { careerItems } from "../data/career";
import "./CareerHighlights.css";

const CareerHighlights = () => {
  const [ref, inView] = useInView({ threshold: 0.1, once: false });

  return (
    <section className="career-container" id="experience" aria-labelledby="career-heading" ref={ref}>
      <h2 id="career-heading">Career Highlights</h2>
      <div className="timeline">
        <div className="timeline-item-flex">
          {careerItems.map((item, i) => (
            <div className="timeline-item" key={item.id}>
              <div
                className={`timeline-content ${inView ? 'in-view' : ''}`}
                style={{ transitionDelay: `${i * 200}ms` }}
              >
                <h3>{item.title}</h3>
                <h4>{item.company} | {item.dateRange}</h4>
                <ul>
                  {item.bullets.map((bullet, j) => (
                    <li key={j}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerHighlights;
