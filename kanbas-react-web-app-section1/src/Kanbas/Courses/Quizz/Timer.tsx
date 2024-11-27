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

  const hours = Math.floor(elapsedTimeS / 3600);
  const minutes = Math.floor((elapsedTimeS / 60) % 60);
  const seconds = elapsedTimeS % 60;

  const padTime = (t: number) => {
    return t >= 10 ? `${t}` : `0${t}`
  }
  return (
    <div>
      elapsed time from start:{" "}
      {hours > 0 ? `${hours}:` : ""}
      {padTime(minutes)}:
      {padTime(seconds)}
    </div>
  );
}
