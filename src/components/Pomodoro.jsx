import { useEffect, useState } from "react";

const WORK_TIME = 25 * 60;
const DEFAULT_SHORT_BREAK = 5;
const DEFAULT_LONG_BREAK = 15;

function Pomodoro({ onPomodoroComplete }) {
  const [mode, setMode] = useState("work");
  const [seconds, setSeconds] = useState(WORK_TIME);
  const [running, setRunning] = useState(false);

  const [completedSessions, setCompletedSessions] = useState(() => {
    const saved = localStorage.getItem("zeigora_pomodoro");

    if (!saved) return 0;

    try {
      const data = JSON.parse(saved);
      const today = new Date().toISOString().split("T")[0];

      return (data.sessions || []).filter(
        (session) => session.date === today
      ).length;
    } catch {
      return 0;
    }
  });

  const [shortBreak, setShortBreak] = useState(
    DEFAULT_SHORT_BREAK
  );

  const [longBreak, setLongBreak] = useState(
    DEFAULT_LONG_BREAK
  );

  const [showSettings, setShowSettings] = useState(false);

  // =========================
  // TIMER
  // =========================

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

  // =========================
  // KHI TIMER KẾT THÚC
  // =========================

  useEffect(() => {
    if (seconds !== 0 || !running) return;

    handleTimerComplete();
  }, [seconds, running]);

  const handleTimerComplete = () => {
    setRunning(false);

    // =========================
    // HOÀN THÀNH PHIÊN TẬP TRUNG
    // =========================

    if (mode === "work") {
      const today = new Date()
        .toISOString()
        .split("T")[0];

      const newSession = {
        date: today,
        duration: 25,
        completedAt: new Date().toISOString(),
      };

      let savedData = {
        sessions: [],
      };

      try {
        const saved = localStorage.getItem(
          "zeigora_pomodoro"
        );

        if (saved) {
          savedData = JSON.parse(saved);
        }
      } catch {
        savedData = {
          sessions: [],
        };
      }

      if (!Array.isArray(savedData.sessions)) {
        savedData.sessions = [];
      }

      savedData.sessions.push(newSession);

      localStorage.setItem(
        "zeigora_pomodoro",
        JSON.stringify(savedData)
      );

      const newSessionCount =
        completedSessions + 1;

      setCompletedSessions(newSessionCount);

      // Cập nhật Overview
      if (onPomodoroComplete) {
        onPomodoroComplete();
      }

      // =========================
      // SAU 4 PHIÊN → NGHỈ DÀI
      // =========================

      if (newSessionCount % 4 === 0) {
        setMode("long-break");
        setSeconds(longBreak * 60);
      } else {
        setMode("short-break");
        setSeconds(shortBreak * 60);
      }

      return;
    }

    // =========================
    // KẾT THÚC NGHỈ
    // =========================

    setMode("work");
    setSeconds(WORK_TIME);
  };

  // =========================
  // START / PAUSE
  // =========================

  const toggleTimer = () => {
    setRunning((prev) => !prev);
  };

  // =========================
  // RESET
  // =========================

  const resetTimer = () => {
    setRunning(false);

    if (mode === "work") {
      setSeconds(WORK_TIME);
    }

    if (mode === "short-break") {
      setSeconds(shortBreak * 60);
    }

    if (mode === "long-break") {
      setSeconds(longBreak * 60);
    }
  };

  // =========================
  // NGHỈ NGAY
  // =========================

  const startBreak = () => {
    setRunning(false);

    setMode("short-break");
    setSeconds(shortBreak * 60);
  };

  // =========================
  // BỎ QUA NGHỈ
  // =========================

  const skipBreak = () => {
    setRunning(false);

    setMode("work");
    setSeconds(WORK_TIME);
  };

  // =========================
  // FORMAT TIME
  // =========================

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedTime = `${String(minutes).padStart(
    2,
    "0"
  )}:${String(remainingSeconds).padStart(2, "0")}`;

  const modeTitle =
    mode === "work"
      ? "TẬP TRUNG"
      : mode === "short-break"
      ? "NGHỈ NGẮN"
      : "NGHỈ DÀI";

  const modeDescription =
    mode === "work"
      ? "Tập trung vào mục tiêu hiện tại"
      : mode === "short-break"
      ? "Đã đến lúc nghỉ ngơi một chút"
      : "Bạn đã hoàn thành 4 phiên. Nghỉ ngơi thật tốt";

  return (
    <div className="pomodoro-card">

      {/* HEADER */}

      <div className="pomodoro-header">
        <div>
          <p className="label">POMODORO</p>

          <h2>{modeTitle}</h2>

          <span>{modeDescription}</span>
        </div>

        <button
          className="pomodoro-settings-button"
          onClick={() =>
            setShowSettings((prev) => !prev)
          }
        >
          ⚙
        </button>
      </div>

      {/* TIMER */}

      <div className="pomodoro-timer-wrapper">
        <div className="pomodoro-timer">
          <strong>{formattedTime}</strong>

          <span>
            {mode === "work"
              ? "tập trung"
              : "nghỉ ngơi"}
          </span>
        </div>
      </div>

      {/* CONTROLS */}

      <div className="pomodoro-controls">
        <button
          className="primary-button"
          onClick={toggleTimer}
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

      {/* BREAK CONTROLS */}

      {mode === "work" && (
        <button
          className="pomodoro-break-button"
          onClick={startBreak}
        >
          ☕ Nghỉ một chút
        </button>
      )}

      {(mode === "short-break" ||
        mode === "long-break") && (
        <button
          className="pomodoro-break-button"
          onClick={skipBreak}
        >
          Tiếp tục tập trung →
        </button>
      )}

      {/* SESSION COUNT */}

      <div className="pomodoro-session-count">
        <span>Phiên hôm nay</span>

        <strong>
          {completedSessions}
        </strong>
      </div>

      {/* SETTINGS */}

      {showSettings && (
        <div className="pomodoro-settings">
          <h3>Thời gian nghỉ</h3>

          <div className="break-setting">
            <label>Nghỉ ngắn</label>

            <div className="break-input">
              <button
                onClick={() =>
                  setShortBreak(
                    Math.max(1, shortBreak - 1)
                  )
                }
              >
                −
              </button>

              <strong>{shortBreak}</strong>

              <button
                onClick={() =>
                  setShortBreak(
                    Math.min(30, shortBreak + 1)
                  )
                }
              >
                +
              </button>

              <span>phút</span>
            </div>
          </div>

          <div className="break-setting">
            <label>Nghỉ dài</label>

            <div className="break-input">
              <button
                onClick={() =>
                  setLongBreak(
                    Math.max(5, longBreak - 5)
                  )
                }
              >
                −
              </button>

              <strong>{longBreak}</strong>

              <button
                onClick={() =>
                  setLongBreak(
                    Math.min(60, longBreak + 5)
                  )
                }
              >
                +
              </button>

              <span>phút</span>
            </div>
          </div>

          <p className="pomodoro-settings-note">
            Sau 4 phiên tập trung, ZEIGORA sẽ
            tự động chuyển sang nghỉ dài.
          </p>
        </div>
      )}
    </div>
  );
}

export default Pomodoro;