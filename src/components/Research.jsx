import "./Research.css";

const Research = () => {
  return (
    <div className="research-section" id="research">
      <h2>Research &amp; Publications</h2>
      <div className="research-cards">
        <div className="research-card">
          <div className="research-badge">
            <i className="fas fa-scroll"></i>
            <span>Published</span>
          </div>
          <div className="research-content">
            <h3>Automated Nuclei Detection in Microscopy Images</h3>
            <p className="research-journal">
              <i className="fas fa-book-open"></i>
              International Journal on Engineering Technology (InJET) &mdash; May 2025
            </p>
            <p className="research-description">
              Developed a U-Net-based deep learning model for nuclei detection in
              microscopy images (2018 Data Science Bowl dataset), achieving IoU 0.88.
              The approach automates segmentation, improves accuracy over manual
              annotation, and enhances diagnostic capabilities in resource-constrained
              medical environments.
            </p>
            <div className="research-links">
              <a
                href="https://doi.org/10.3126/injet.v2i2.78595"
                target="_blank"
                rel="noopener noreferrer"
                className="research-link doi"
              >
                <i className="fas fa-external-link-alt"></i> DOI: 10.3126/injet.v2i2.78595
              </a>
              <a
                href="https://github.com/ToniBirat7/Nuclei_Segmentation_U-Net_VGG_x_RFC"
                target="_blank"
                rel="noopener noreferrer"
                className="research-link github"
              >
                <i className="fab fa-github"></i> Source Code
              </a>
            </div>
            <div className="tech-stack">
              <span>U-Net</span>
              <span>TensorFlow</span>
              <span>CNN</span>
              <span>OpenCV</span>
              <span>Deep Learning</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Research;
