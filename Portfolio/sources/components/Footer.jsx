import React from 'react';

function Footer() {
  return (
    <footer>
      <div className="container">
        <p>Vlad Tarba {new Date().getFullYear()}, Game/Software developer and QA Tester</p>
        <p>
          <a href="https://github.com/ikbenvlad" target="_blank" rel="noopener noreferrer">GitHub</a> · Discord: ikbenvlad
        </p>
      </div>
    </footer>
  );
}

export default Footer;
