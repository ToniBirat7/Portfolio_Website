import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const TypingText = ({
  words,
  typingSpeed = 150,
  deletingSpeed = 100,
  pauseTime = 2000,
  loop = true,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener?.('change', sync);
    return () => media.removeEventListener?.('change', sync);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setDisplayedText(words[0] || '');
      return undefined;
    }

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

    const timer = setTimeout(
      handleTyping,
      isDeleting ? deletingSpeed : typingSpeed,
    );

    return () => clearTimeout(timer);
  }, [
    reduceMotion,
    displayedText,
    isDeleting,
    wordIndex,
    words,
    typingSpeed,
    deletingSpeed,
    pauseTime,
    loop,
  ]);

  return (
    <span
      className="typing-text"
      aria-live="polite"
      aria-atomic="true"
      role="status"
    >
      {reduceMotion ? words[0] : displayedText}
      {!reduceMotion && (
        <span className="cursor" aria-hidden="true">
          |
        </span>
      )}
    </span>
  );
};

TypingText.propTypes = {
  words: PropTypes.arrayOf(PropTypes.string).isRequired,
  typingSpeed: PropTypes.number,
  deletingSpeed: PropTypes.number,
  pauseTime: PropTypes.number,
  loop: PropTypes.bool,
};

export default TypingText;
