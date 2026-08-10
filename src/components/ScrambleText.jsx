import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useReducedMotion } from 'framer-motion';

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*';

const ScrambleText = ({ text = '', as: Tag = 'span', className = '', duration = 600 }) => {
  const prefersReducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(prefersReducedMotion ? text : '');
  const hasScrambledRef = useRef(false);
  const elementRef = useRef(null);
  const rafRef = useRef(null);
  const startTimeRef = useRef(0);

  const startScramble = useCallback(() => {
    if (hasScrambledRef.current || !text) return;
    hasScrambledRef.current = true;

    const textArray = text.split('');
    const totalSteps = Math.min(textArray.length, 20);
    const stepDuration = duration / totalSteps;
    let currentStep = 0;
    startTimeRef.current = 0;

    const tick = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const newStep = Math.floor(elapsed / stepDuration);

      if (newStep !== currentStep) {
        currentStep = newStep;
        const lockIndex = Math.floor((currentStep / totalSteps) * textArray.length);

        if (currentStep >= totalSteps) {
          setDisplay(text);
          rafRef.current = null;
          return;
        }

        setDisplay(
          textArray
            .map((char, index) => {
              if (char === ' ' || char === '\n' || char === '\t') return char;
              if (index < lockIndex) return textArray[index];
              return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
            })
            .join('')
        );
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [text, duration]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplay(text);
      return undefined;
    }

    if (!text) {
      setDisplay('');
      return undefined;
    }

    if (hasScrambledRef.current) {
      setDisplay(text);
      return undefined;
    }

    const node = elementRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          startScramble();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [text, prefersReducedMotion, startScramble]);

  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <Tag ref={elementRef} className={className}>
      {display}
    </Tag>
  );
};

export default ScrambleText;
