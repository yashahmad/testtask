"use client";
import React, { useEffect, useState } from 'react';

interface CountdownTimerProps {
  targetDate: Date | null;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    if (!targetDate) {
      setTimeLeft("No upcoming activation");
      return;
    }

    const calculateTimeLeft = () => {
      const now = new Date();
      const distance = targetDate.getTime() - now.getTime();

      if (distance <= 0) {
        setTimeLeft("Time's up!");
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    calculateTimeLeft(); // Initial calculation
    const interval = setInterval(calculateTimeLeft, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [targetDate]); // Re-run effect if targetDate changes

  return <span>{timeLeft}</span>;
};

export default CountdownTimer;
