import React, { useEffect } from 'react';
import gsap from 'gsap';

function Resume() {
  useEffect(() => {
    gsap.from('.resume-container', {
      scrollTrigger: { trigger: '.resume-container', start: 'top 80%' },
      opacity: 0,
      y: 30,
      duration: 0.8
    });
  }, []);

  const handleDownload = (filename, displayName) => {
    const link = document.createElement('a');
    link.href = `/Portfolio/${filename}`;
    link.download = displayName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="container resume-section">
      <h2 className="section-title">My Resume(s)</h2>
      <div className="resume-container">
        {/* CV PDF */}
        <div className="pdf-viewer glass">
          <h3>Nederlandse Versie</h3>
          <iframe
            src="/Portfolio/CV-Vlad.pdf"
            title="CV"
            className="pdf-frame"
          />
          <button 
            className="download-button"
            onClick={() => handleDownload('CV-Vlad.pdf', 'CV-Vlad.pdf')}
          >
            ⬇ Download
          </button>
        </div>

        {/* Resume PDF */}
        <div className="pdf-viewer glass">
          <h3>English Version</h3>
          <iframe
            src="/Portfolio/Resume_Vlad.pdf"
            title="Resume"
            className="pdf-frame"
          />
          <button 
            className="download-button"
            onClick={() => handleDownload('Resume_Vlad.pdf', 'Resume_Vlad.pdf')}
          >
            ⬇ Download
          </button>
        </div>
      </div>
    </section>
  );
}

export default Resume;
