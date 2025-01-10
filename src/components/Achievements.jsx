// AwardsAchievements.js
import React from 'react';
import './Achievement.css';

const AwardsAchievements = () => {
  return (
    <div className="awards-section" id="awards">
      <h2>Achievements and Awards</h2>
      <div className="award-card">
        <div className="award-header">
          <img
            src="../src/assets/NewPP.jpg" // Replace with the profile image URL if available
            alt="Profile"
            className="profile-image"
          />
          <div className="details">
            <h3>Birat Gautam</h3>
            <p>Computer Science Student</p>
          </div>
        </div>
        <div className="award-content">
          <p>Taking Flight to Success: Student of Year Award 🏆 ✈️ 💼 💰</p>
          <p>#UGSSAchieverAward2022 #UGSS #HighSchool </p>
          <img
            src="../src/assets/Award.jpg"
            alt="Award Achievement"
            className="award-image"
          />
        </div>
        <div className="award-footer">
          <div className="icon">
            <i className="fas fa-thumbs-up"></i>
            <span>600</span>
          </div>
          <div className="icon">
            <i className="fas fa-comment"></i>
            <span>70</span>
          </div>
          <div className="icon">
            <i className="fas fa-share"></i>
            <span>75</span>
          </div>
        </div>
      </div>

      <div className="award-card">
        <div className="award-header">
          <img
            src="../src/assets/NewPP.jpg" // Replace with the profile image URL if available
            alt="Profile"
            className="profile-image"
          />
          <div className="details">
            <h3>Birat Gautam</h3>
            <p>Computer Science Student</p>
          </div>
        </div>
        <div className="award-content">
          <p>Team Work: Innovation Fest 2023 🏆 </p>
          <p>#AMS_CV #Sunway #Attendees </p>
          <img
            src="../src/assets/AMS.png"
            alt="Award Achievement"
            className="award-image"
          />
        </div>
        <div className="award-footer">
          <div className="icon">
            <i className="fas fa-thumbs-up"></i>
            <span>200</span>
          </div>
          <div className="icon">
            <i className="fas fa-comment"></i>
            <span>7</span>
          </div>
          <div className="icon">
            <i className="fas fa-share"></i>
            <span>7</span>
          </div>
        </div>
      </div>

      <div className="award-card">
        <div className="award-header">
          <img
            src="../src/assets/NewPP.jpg" // Replace with the profile image URL if available
            alt="Profile"
            className="profile-image"
          />
          <div className="details">
            <h3>Birat Gautam</h3>
            <p>Computer Science Student</p>
          </div>
        </div>
        <div className="award-content">
          <p>ICT Award 2024: Team Baali Bigyan 🏆 </p>
          <p>#YuwaYatra #BaaliBigyan #ICT_Top_5_Finalist_2024 </p>
          <img
            src="../src/assets/ICT_Top5.jpg"
            alt="Award Achievement"
            className="award-image"
          />
          <img
            src="../src/assets/YuwaYatra_Team.jpg"
            alt="Award Achievement"
            className="award-image"
          />
          <img
            src="../src/assets/ICT_Pic.jpg"
            alt="Award Achievement"
            className="award-image"
          />
        </div>
        <div className="award-footer">
          <div className="icon">
            <i className="fas fa-thumbs-up"></i>
            <span>400</span>
          </div>
          <div className="icon">
            <i className="fas fa-comment"></i>
            <span>20</span>
          </div>
          <div className="icon">
            <i className="fas fa-share"></i>
            <span>8</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AwardsAchievements;
