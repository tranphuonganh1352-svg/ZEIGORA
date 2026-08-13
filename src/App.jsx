import { useEffect, useState } from "react";
import "./index.css";

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import TodoList from "./components/TodoList";
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

  // Kiểm tra trạng thái đăng nhập khi mở web
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session?.user) {
        const currentUser = data.session.user;

        setUser({
          id: currentUser.id,
          email: currentUser.email,
          name: currentUser.user_metadata?.full_name || "Bạn",
        });

        setPage("dashboard");
      }

      setLoading(false);
    };

    getSession();

    // Theo dõi đăng nhập / đăng xuất
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const currentUser = session.user;

        setUser({
          id: currentUser.id,
          email: currentUser.email,
          name: currentUser.user_metadata?.full_name || "Bạn",
        });

        setPage("dashboard");
      } else {
        setUser(null);
        setPage("home");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Hiển thị trong lúc kiểm tra đăng nhập
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

  // Đăng nhập
  if (page === "login") {
    return (
      <Login
        onRegister={() => setPage("register")}
        onLoginSuccess={(loggedInUser) => {
          setUser(loggedInUser);
          setPage("dashboard");
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

  // Đăng xuất
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setPage("home");
  };

  // Dashboard
  if (page === "dashboard") {
    return (
      <div className="app">
        <header className="navbar">

          <div className="logo">
            <span className="logo-icon">Z</span>
            ZEIGORA
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <span
              style={{
                color: "#a7b8c5",
                fontSize: "14px",
              }}
            >
              Xin chào, {user?.name}
            </span>

            <button
              className="login-button"
              onClick={handleLogout}
            >
              Đăng xuất
            </button>
          </div>

        </header>

        <main
          style={{
            maxWidth: "1100px",
            margin: "auto",
            padding: "70px 25px",
          }}
        >
          <p className="label">
            KHÔNG GIAN CÁ NHÂN
          </p>

          <h1
            style={{
              fontSize: "48px",
              marginBottom: "15px",
            }}
          >
            Chào mừng,{" "}
            <span style={{ color: "#91b9d2" }}>
              {user?.name}
            </span>
          </h1>

          <p className="description">
            Đây là không gian quản lý mục tiêu học tập của bạn.
            Hãy bắt đầu hoàn thành những điều còn dang dở.
          </p>

          <div
            style={{
              marginTop: "40px",
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
            }}
          >
            <div className="hero-card">
              <p>MỤC TIÊU</p>

              <h2 style={{ fontSize: "35px" }}>
  {taskStats.total}
</h2>

              <span style={{ color: "#829aaa" }}>
                mục tiêu hôm nay
              </span>
            </div>

            <div className="hero-card">
              <p>TIẾN ĐỘ</p>

             <h2 style={{ fontSize: "35px" }}>
  {taskStats.progress}%
</h2>

              <span style={{ color: "#829aaa" }}>
                đã hoàn thành
              </span>
            </div>

            <div className="hero-card">
              <p>POMODORO</p>

              <h2 style={{ fontSize: "35px" }}>
                25:00
              </h2>

              <span style={{ color: "#829aaa" }}>
                thời gian tập trung
              </span>
            </div>
          </div>

          <TodoList
  user={user}
  onStatsChange={setTaskStats}
/>
        </main>
      </div>
    );
  }
  // Trang chủ
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
            ZEIGORA là ứng dụng hỗ trợ học sinh THPT quản lí mục tiêu
            học tập dựa trên Hiệu ứng Zeigarnik, giúp duy trì sự tập trung
            và từng bước hoàn thành những mục tiêu còn dang dở.
          </p>

          <div className="buttons">

            <button
              className="primary-button"
              onClick={() => setPage("login")}
            >
              Bắt đầu sử dụng →
            </button>

            <button className="secondary-button">
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

export default App;