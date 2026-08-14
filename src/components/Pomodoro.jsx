import { useEffect, useState } from "react";

function Pomodoro() {
  const WORK_TIME = 25 * 60;

  const [seconds, setSeconds] = useState(WORK_TIME);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;

    if (seconds === 0) {
      setRunning(false);
      alert("Hoàn thành một phiên Pomodoro! 🎉");
      return;
    }

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [running, seconds]);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formatTime = (value) =>
    String(value).padStart(2, "0");

  const resetTimer = () => {
    setRunning(false);
    setSeconds(WORK_TIME);
  };

  return (
    <div className="pomodoro-card">
      <p className="pomodoro-label">
        POMODORO
      </p>

      <div className="pomodoro-time">
        {formatTime(minutes)}:{formatTime(remainingSeconds)}
      </div>

      <p className="pomodoro-description">
        Tập trung 25 phút, nghỉ ngơi và tiếp tục.
      </p>

      <div className="pomodoro-buttons">
        <button
          className="primary-button"
          onClick={() => setRunning(!running)}
        >
          {running ? "Tạm dừng" : "Bắt đầu"}
        </button>

        <button
          className="secondary-button"
          onClick={resetTimer}
        >
          Đặt lại
        </button>
      </div>
    </div>
  );
}

export default Pomodoro;