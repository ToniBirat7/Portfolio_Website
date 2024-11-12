import React, { useEffect, useState } from 'react';

const TypingText = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text.charAt(index));
        setIndex((prev) => prev + 1);
      }, 60); // Adjust speed as needed

      return () => clearTimeout(timer);
    }
  }, [index, text]);

  return <pre className="typing-text">{displayedText}</pre>;
};

export default TypingText;
