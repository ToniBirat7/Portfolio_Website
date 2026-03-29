// AwardsAchievements.js

import "./Achievement.css";

const AwardsAchievements = () => {
  return (
    <section className="awards-section" id="awards" aria-labelledby="awards-heading">
      <h2 id="awards-heading">Achievements and Awards</h2>
      <article className="award-card">
        <div className="award-header">
          <img src="pp.jpg" alt="Birat Gautam" className="award-profile-image" width="50" height="50" />
          <div className="details">
            <h3>Birat Gautam</h3>
            <p>Computer Science Student</p>
          </div>
        </div>
        <div className="award-content">
          <p>Taking Flight to Success: Student of Year Award 🏆 ✈️ 💼 💰</p>
          <p>#UGSSAchieverAward2022 #UGSS #HighSchool </p>
          <img
            src="Award.jpg"
            alt="Birat Gautam receiving UGSS Student of the Year Award 2022"
            className="award-image"
            loading="lazy"
          />
        </div>
        <div className="award-footer">
          <div className="icon">
            <i className="fas fa-thumbs-up" aria-hidden="true"></i>
            <span>600</span>
          </div>
          <div className="icon">
            <i className="fas fa-comment" aria-hidden="true"></i>
            <span>70</span>
          </div>
          <div className="icon">
            <i className="fas fa-share" aria-hidden="true"></i>
            <span>75</span>
          </div>
        </div>
      </article>

      <article className="award-card">
        <div className="award-header">
          <img src="pp.jpg" alt="Birat Gautam" className="award-profile-image" width="50" height="50" />
          <div className="details">
            <h3>Birat Gautam</h3>
            <p>Computer Science Student</p>
          </div>
        </div>
        <div className="award-content">
          <p>Team Work: Innovation Fest 2023 🏆 </p>
          <p>#AMS_CV #Sunway #Attendees </p>
          <img
            src="AMS.png"
            alt="Attendance Management System demo at Innovation Fest 2023"
            className="award-image"
            loading="lazy"
          />
        </div>
        <div className="award-footer">
          <div className="icon">
            <i className="fas fa-thumbs-up" aria-hidden="true"></i>
            <span>200</span>
          </div>
          <div className="icon">
            <i className="fas fa-comment" aria-hidden="true"></i>
            <span>7</span>
          </div>
          <div className="icon">
            <i className="fas fa-share" aria-hidden="true"></i>
            <span>7</span>
          </div>
        </div>
      </article>

      <article className="award-card">
        <div className="award-header">
          <img src="pp.jpg" alt="Birat Gautam" className="award-profile-image" width="50" height="50" />
          <div className="details">
            <h3>Birat Gautam</h3>
            <p>Computer Science Student</p>
          </div>
        </div>
        <div className="award-content">
          <p>ICT Award 2024: Team Baali Bigyan 🏆 </p>
          <p>#YuwaYatra #BaaliBigyan #ICT_Top_5_Finalist_2024 </p>
          <img
            src="ICT_Top5.jpg"
            alt="Team Baali Bigyan as ICT Award 2024 Top 5 Finalist"
            className="award-image"
            loading="lazy"
          />
          <img
            src="YuwaYatra_Team.jpg"
            alt="Yuwa Yatra team members at ICT Award 2024"
            className="award-image"
            loading="lazy"
          />
          <img
            src="ICT_Pic.jpg"
            alt="Birat Gautam at ICT Award 2024 event"
            className="award-image"
            loading="lazy"
          />
        </div>
        <div className="award-footer">
          <div className="icon">
            <i className="fas fa-thumbs-up" aria-hidden="true"></i>
            <span>400</span>
          </div>
          <div className="icon">
            <i className="fas fa-comment" aria-hidden="true"></i>
            <span>20</span>
          </div>
          <div className="icon">
            <i className="fas fa-share" aria-hidden="true"></i>
            <span>8</span>
          </div>
        </div>
      </article>
    </section>
  );
};

export default AwardsAchievements;
