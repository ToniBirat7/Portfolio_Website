import React, { useEffect, useState } from 'react';

const TypingText = ({ words, typingSpeed = 150, deletingSpeed = 100, pauseTime = 2000, loop = true }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];

    const handleTyping = () => {
      setDisplayedText((prev) => {
        if (isDeleting) {
          return currentWord.substring(0, prev.length - 1);
        } else {
          return currentWord.substring(0, prev.length + 1);
        }
      });

      if (!isDeleting && displayedText === currentWord) {
        if (!loop) return; // Stop if not looping
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && displayedText === '') {
        setIsDeleting(false);
        setWordIndex((prev) => prev + 1);
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime, loop]);

  return (
    <span className="typing-text">
      {displayedText}
      <span className="cursor">|</span>
    </span>
  );
};

export default TypingText;
