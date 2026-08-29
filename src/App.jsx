import { useEffect, useState } from "react";
import "./index.css";

import Overview from "./Pages/Overview";
import Research from "./Pages/Research";
import Achievements from "./Pages/Achievements";
import Survey from "./Pages/Survey";

import Navbar from "./components/Navbar";

function App() {
  const [page, setPage] = useState("overview");

  const [taskStats, setTaskStats] = useState({
    total: 0,
    completed: 0,
    progress: 0,
  });

  const [pomodoroStats, setPomodoroStats] = useState({
    sessions: 0,
    minutes: 0,
  });

  const [focusStreak, setFocusStreak] = useState(0);

  // =========================
  // POMODORO STATS
  // =========================

  const loadPomodoroStats = () => {
    const saved = localStorage.getItem(
      "zeigora_pomodoro"
    );

    if (!saved) {
      setPomodoroStats({
        sessions: 0,
        minutes: 0,
      });
      return;
    }

    try {
      const data = JSON.parse(saved);

      const today = new Date()
        .toISOString()
        .split("T")[0];

      const todaySessions = (
        data.sessions || []
      ).filter(
        (session) => session.date === today
      );

      const sessions = todaySessions.length;

      const minutes = todaySessions.reduce(
        (total, session) =>
          total + Number(session.duration || 0),
        0
      );

      setPomodoroStats({
        sessions,
        minutes,
      });
    } catch (error) {
      console.error(
        "Lỗi đọc Pomodoro:",
        error
      );

      setPomodoroStats({
        sessions: 0,
        minutes: 0,
      });
    }
  };

  // =========================
  // FOCUS STREAK
  // =========================

  const loadFocusStreak = () => {
    const saved = localStorage.getItem(
      "zeigora_pomodoro"
    );

    if (!saved) {
      setFocusStreak(0);
      return;
    }

    try {
      const data = JSON.parse(saved);

      const sessions = data.sessions || [];

      const completedDays = new Set(
        sessions
          .filter(
            (session) => session.completedAt
          )
          .map((session) => {
            const date = new Date(
              session.completedAt
            );

            return `${date.getFullYear()}-${String(
              date.getMonth() + 1
            ).padStart(2, "0")}-${String(
              date.getDate()
            ).padStart(2, "0")}`;
          })
      );

      const getDateKey = (date) => {
        return `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, "0")}-${String(
          date.getDate()
        ).padStart(2, "0")}`;
      };

      const today = new Date();
      const todayKey = getDateKey(today);

      let streak = 0;

      // Hôm nay chưa tập trung
      // → vẫn giữ chuỗi của hôm qua
      let daysAgo = completedDays.has(
        todayKey
      )
        ? 0
        : 1;

      while (true) {
        const checkDate = new Date(today);

        checkDate.setDate(
          today.getDate() - daysAgo
        );

        const dateKey =
          getDateKey(checkDate);

        if (
          !completedDays.has(dateKey)
        ) {
          break;
        }

        streak++;
        daysAgo++;
      }

      setFocusStreak(streak);
    } catch (error) {
      console.error(
        "Lỗi đọc chuỗi tập trung:",
        error
      );

      setFocusStreak(0);
    }
  };

  // =========================
  // LOAD DỮ LIỆU
  // =========================

  useEffect(() => {
    loadPomodoroStats();
    loadFocusStreak();
  }, []);

  // =========================
  // TẢI LẠI KHI QUAY LẠI TAB
  // =========================

  useEffect(() => {
    const handleStorageChange = () => {
      loadPomodoroStats();
      loadFocusStreak();
    };

    window.addEventListener(
      "storage",
      handleStorageChange
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorageChange
      );
    };
  }, []);

  // =========================
  // NAVBAR
  // =========================

  const fakeUser = {
    name: "Bạn",
  };

  return (
    <div className="app">

      <Navbar
        user={fakeUser}
        currentPage={page}
        onNavigate={setPage}
        onLogout={() => {
          // Không còn đăng nhập
          // nên nút logout không làm gì
        }}
      />

      {/* =========================
          OVERVIEW
      ========================= */}

      {page === "overview" && (
        <Overview
          user={fakeUser}

          taskStats={taskStats}
          setTaskStats={setTaskStats}

          pomodoroStats={pomodoroStats}

          loadPomodoroStats={
            loadPomodoroStats
          }

          loadFocusStreak={
            loadFocusStreak
          }

          focusStreak={focusStreak}

          onNavigate={setPage}
        />
      )}

      {/* =========================
          RESEARCH
      ========================= */}

      {page === "research" && (
        <Research />
      )}

      {/* =========================
          ACHIEVEMENTS
      ========================= */}

      {page === "achievements" && (
        <Achievements
          taskStats={taskStats}
          pomodoroStats={pomodoroStats}
          focusStreak={focusStreak}
        />
      )}

      {/* =========================
          SURVEY
      ========================= */}

      {page === "survey" && (
        <Survey />
      )}

    </div>
  );
}

export default App;