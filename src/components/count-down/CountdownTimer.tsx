// components/CountdownTimer.js
"use client";
import { useState, useEffect } from "react";

const CountdownTimer = ({ targetDate }: any) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<any>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-lg text-center max-w-md mx-auto ">
      <h2 className="text-2xl font-bold mb-4">Countdown Timer</h2>
      <div className="flex justify-center space-x-4">
        {Object.keys(timeLeft).map((interval) => (
          <div key={interval} className="flex flex-col items-center">
            <span className="text-4xl font-bold">{timeLeft[interval]}</span>
            <span className="text-sm uppercase">{interval}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
