import { useEffect, useState } from "react";
import "./index.css";

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Overview from "./Pages/Overview";
import Research from "./Pages/Research";
import Achievements from "./Pages/Achievements";
import Survey from "./Pages/Survey";
import UpdatePassword from "./Pages/UpdatePassword";

import Navbar from "./components/Navbar";
import { supabase } from "./supabase";

function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
  
 const loadFocusStreak = async () => {
  if (!user?.id) return;

  const { data, error } = await supabase
    .from("pomodoro_sessions")
    .select("completed_at")
    .eq("user_id", user.id)
    .order("completed_at", { ascending: false });

  if (error) {
    console.error("Lỗi lấy chuỗi tập trung:", error);
    return;
  }

  const completedDays = new Set(
    (data || [])
      .filter((session) => session.completed_at)
      .map((session) => {
        const date = new Date(session.completed_at);

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

  // Hôm nay chưa làm → tính từ hôm qua
  let daysAgo = completedDays.has(todayKey) ? 0 : 1;

  while (true) {
    const checkDate = new Date(today);
    checkDate.setDate(today.getDate() - daysAgo);

    const dateKey = getDateKey(checkDate);

    if (!completedDays.has(dateKey)) {
      break;
    }

    streak++;
    daysAgo++;
  }

  setFocusStreak(streak);
};

  const loadPomodoroStats = async () => {
    if (!user?.id) return;

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const { data, error } = await supabase
      .from("pomodoro_sessions")
      .select("duration")
      .eq("user_id", user.id)
      .gte("completed_at", startOfDay.toISOString());

    if (error) {
      console.error("Lỗi lấy Pomodoro:", error);
      return;
    }

    const sessions = data?.length || 0;

    const minutes = (data || []).reduce(
      (total, session) =>
        total + Number(session.duration || 0),
      0
    );

    setPomodoroStats({
      sessions,
      minutes,
    });
  };

 useEffect(() => {
  if (!user?.id) return;

  loadPomodoroStats();
  loadFocusStreak();
}, [user]);

  // Kiểm tra trạng thái đăng nhập
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session?.user) {
        const currentUser = data.session.user;

        setUser({
          id: currentUser.id,
          email: currentUser.email,
          name:
            currentUser.user_metadata?.full_name ||
            "Bạn",
        });

        setPage("overview");
      }

      setLoading(false);
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          const currentUser = session.user;

          setUser({
            id: currentUser.id,
            email: currentUser.email,
            name:
              currentUser.user_metadata?.full_name ||
              "Bạn",
          });

          setPage("overview");
        } else {
          setUser(null);
          setPage("home");
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setPage("home");
  };

  if (loading) {
    return (
      <div
        className="app"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p style={{ color: "#b7d5e6" }}>
          Đang mở ZEIGORA...
        </p>
      </div>
    );
  }
// Đặt lại mật khẩu
if (window.location.pathname === "/update-password") {
  return <UpdatePassword />;
}

  // Đăng nhập
  if (page === "login") {
    return (
      <Login
        onRegister={() => setPage("register")}
        onLoginSuccess={(loggedInUser) => {
          setUser(loggedInUser);
          setPage("overview");
        }}
      />
    );
  }

  // Đăng ký
  if (page === "register") {
    return (
      <Register
        onLogin={() => setPage("login")}
      />
    );
  }

  // Trang chủ
  if (!user) {
    return (
      <div className="app">
        <header className="navbar">
          <div className="logo">
            <span className="logo-icon">Z</span>
            ZEIGORA
          </div>

          <button
            className="login-button"
            onClick={() => setPage("login")}
          >
            Đăng nhập
          </button>
        </header>

        <main className="hero">
          <div className="hero-content">
            <p className="label">
              NGHIÊN CỨU KHOA HỌC
            </p>

            <h1>
              Hoàn thành điều
              <br />
              <span>còn dang dở.</span>
            </h1>

            <p className="description">
              ZEIGORA là ứng dụng hỗ trợ học sinh THPT
              quản lí mục tiêu học tập dựa trên Hiệu ứng
              Zeigarnik, giúp duy trì sự tập trung và từng
              bước hoàn thành những mục tiêu còn dang dở.
            </p>

            <div className="buttons">
              <button
                className="primary-button"
                onClick={() => setPage("login")}
              >
                Bắt đầu sử dụng →
              </button>

              <button
                className="secondary-button"
                onClick={() => setPage("survey")}
              >
                Tham gia khảo sát
              </button>
            </div>

            <p className="author">
              Nghiên cứu của{" "}
              <strong>Trần Bình Phương Anh</strong>
            </p>
          </div>

          <div className="hero-card">
            <p>TIẾN ĐỘ HÔM NAY</p>

            <div className="circle">
              <strong>72%</strong>
              <span>hoàn thành</span>
            </div>

            <div className="stats">
              <div>
                <strong>8</strong>
                <span>Đã hoàn thành</span>
              </div>

              <div>
                <strong>3</strong>
                <span>Còn lại</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Các trang dành cho người dùng đã đăng nhập
  return (
    <div className="app">
      <Navbar
        user={user}
        currentPage={page}
        onNavigate={setPage}
        onLogout={handleLogout}
      />

      {page === "overview" && (
<Overview
  user={user}
  taskStats={taskStats}
  setTaskStats={setTaskStats}
  pomodoroStats={pomodoroStats}
  loadPomodoroStats={loadPomodoroStats}
  loadFocusStreak={loadFocusStreak}
  focusStreak={focusStreak}
  onNavigate={setPage}
/>
      )}

      {page === "research" && <Research />}

     {page === "achievements" && (
  <Achievements
    taskStats={taskStats}
    pomodoroStats={pomodoroStats}
    focusStreak={focusStreak}
  />
)}
      {page === "survey" && <Survey />}
    </div>
  );
}

export default App;