import React, { useState, useEffect, useRef } from 'react';

const MatrixReveal = ({ text, className = '' }) => {
    const [display, setDisplay] = useState(text);
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';

    useEffect(() => {
        let iterations = 0;
        const maxIterations = 20; // How many "scrambles" before locking
        const interval = setInterval(() => {
            setDisplay(prev => {
                const originalArray = text.split('');

                return originalArray
                    .map((char, index) => {
                        if (char === '\n' || char === ' ') return char; // Preserve layout

                        // Randomly decide if this char should be locked
                        // Earlier chars lock sooner, or random locking
                        if (index < iterations) {
                            return text[index];
                        }

                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('');
            });

            if (iterations >= text.length) {
                clearInterval(interval);
                setDisplay(text); // Ensure final state is clean
            }

            iterations += 1 / 2; // Speed control
        }, 50);

        return () => clearInterval(interval);
    }, [text]);

    return (
        <pre className={className}>
            {display}
        </pre>
    );
};

export default MatrixReveal;
