import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    // Set up the countdown timer
    const timer = setTimeout(() => {
      setTimeRemaining(prevTime => {
        // Check if timeRemaining is 0 and handle accordingly
        if (prevTime <= 1) {
          setTimeRemaining(10); // Reset timer to 10 seconds
          onAnswered(false);   // Call onAnswered with false
          return 10;           // Return the reset value for consistency
        }
        return prevTime - 1;   // Decrease the time remaining
      });
    }, 1000); // Run this every second

    // Cleanup function to clear timeout on component unmount or before the next effect runs
    return () => clearTimeout(timer);
  }, [timeRemaining, onAnswered]);

  function handleAnswer(isCorrect) {
    setTimeRemaining(10); // Reset the timer when an answer is selected
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;