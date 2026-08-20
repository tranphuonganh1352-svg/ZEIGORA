import { useEffect, useState } from "react";
import { supabase } from "../supabase";

function Pomodoro({ user, onPomodoroComplete }) {
  const WORK_TIME = 25 * 60;

  const [seconds, setSeconds] = useState(WORK_TIME);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;

    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [running]);

  useEffect(() => {
    if (seconds !== 0 || !running) return;

    const saveSession = async () => {
      setRunning(false);

      if (!user?.id) {
        alert("Không tìm thấy tài khoản.");
        return;
      }

      const { error } = await supabase
        .from("pomodoro_sessions")
        .insert({
          user_id: user.id,
          duration: 25,
        });

      if (error) {
        console.error("Lỗi lưu Pomodoro:", error);
        alert("Không thể lưu phiên Pomodoro.");
        return;
      }

      if (onPomodoroComplete) {
        onPomodoroComplete();
      }

      alert("Hoàn thành một phiên Pomodoro! 🎉");
    };

    saveSession();
  }, [seconds, running, user, onPomodoroComplete]);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formatTime = (value) =>
    String(value).padStart(2, "0");

  const resetTimer = () => {
    setRunning(false);
    setSeconds(WORK_TIME);
  };

  // Progress của vòng tròn
  const progress = seconds / WORK_TIME;

  const radius = 112;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);

  return (
    <div className={`pomodoro-card ${running ? "is-running" : ""}`}>
      {/* Header */}
      <div className="pomodoro-header">
        <div>
          <span className="pomodoro-eyebrow">POMODORO</span>
          <h3>Tập trung</h3>
        </div>

        <span className="pomodoro-session">
          PHIÊN 1 / 4
        </span>
      </div>

      {/* Timer */}
      <div className="pomodoro-timer-wrapper">
        <svg
          className="pomodoro-progress"
          viewBox="0 0 260 260"
        >
          {/* Background circle */}
          <circle
            className="progress-track"
            cx="130"
            cy="130"
            r={radius}
          />

          {/* Progress circle */}
          <circle
            className="progress-value"
            cx="130"
            cy="130"
            r={radius}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: offset,
            }}
          />
        </svg>

        <div className="pomodoro-timer-content">
          <div className="pomodoro-time">
            {formatTime(minutes)}:{formatTime(remainingSeconds)}
          </div>

          <span className="pomodoro-status">
            {running ? "ĐANG TẬP TRUNG" : "SẴN SÀNG"}
          </span>
        </div>
      </div>

      {/* Session dots */}
      <div className="pomodoro-dots">
        <span className="pomodoro-dot active" />
        <span className="pomodoro-dot" />
        <span className="pomodoro-dot" />
        <span className="pomodoro-dot" />
      </div>

      <p className="pomodoro-description">
        Tập trung 25 phút, nghỉ ngơi và tiếp tục.
      </p>

      {/* Buttons */}
      <div className="pomodoro-buttons">
        <button
          className="primary-button"
          onClick={() => setRunning(!running)}
        >
          <span className="button-icon">
            {running ? "Ⅱ" : "▶"}
          </span>

          {running ? "Tạm dừng" : "Bắt đầu"}
        </button>

        <button
          className="reset-button"
          onClick={resetTimer}
          aria-label="Đặt lại Pomodoro"
        >
          ↻
        </button>
      </div>
    </div>
  );
}

export default Pomodoro;