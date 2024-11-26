import { useEffect, useState } from "react";

export default function Timer({ startTime }: { startTime: number }) {
  const [elapsedTimeS, setElapsedTimeS] = useState(0);

  const updateTimer = async () => {
    setElapsedTimeS(Math.floor((new Date().getTime() - startTime) / 1000));
    setTimeout(updateTimer, 250);
  };

  useEffect(() => {
    updateTimer();
  }, []);

  return (
    <div>
      elapsed time from start: {Math.floor(elapsedTimeS / 60)}:
      {elapsedTimeS % 60}
    </div>
  );
}
