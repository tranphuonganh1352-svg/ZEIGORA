import TodoList from "../components/TodoList";
import Pomodoro from "../components/Pomodoro";

function Overview({
  user,
  taskStats,
  setTaskStats,
  pomodoroStats,
  loadPomodoroStats,
  loadFocusStreak,
  focusStreak,
  onNavigate,
}) {
  return (
    <main className="page-container">
      <p className="label">TỔNG QUAN</p>

      <h1>
        Chào mừng,{" "}
        <span style={{ color: "#91b9d2" }}>
          {user?.name}
        </span>
      </h1>

      <p className="description">
        Không gian quản lý mục tiêu học tập và theo dõi
        hành trình tập trung của bạn.
      </p>

      <section className="overview-grid">
        <div className="hero-card">
          <p>MỤC TIÊU</p>
          <h2>{taskStats.total}</h2>
          <span>mục tiêu hôm nay</span>
        </div>

        <div className="hero-card">
          <p>TIẾN ĐỘ</p>
          <h2>{taskStats.progress}%</h2>
          <span>đã hoàn thành</span>
        </div>

        <div className="hero-card">
          <p>POMODORO</p>
          <h2>{pomodoroStats.sessions}</h2>
          <span>phiên hôm nay</span>
        </div>
      </section>

     <div className="hero-card focus-streak-card">
  <p>CHUỖI TẬP TRUNG</p>

  <div className="streak-number">
    <span>🔥</span>
    <strong>{focusStreak}</strong>
  </div>

  <span>ngày liên tiếp</span>
</div>

      <section className="quick-access">
        <div className="section-heading">
          <p className="label">KHÁM PHÁ ZEIGORA</p>
          <h2>Truy cập nhanh</h2>
        </div>

        <div className="quick-grid">
          <button
            className="quick-card"
            onClick={() => onNavigate("research")}
          >
            <span className="quick-icon">◈</span>
            <h3>Nghiên cứu</h3>
            <p>
              Tìm hiểu về cơ sở khoa học và Hiệu ứng Zeigarnik.
            </p>
            <span className="quick-arrow">Mở trang →</span>
          </button>

          <button
            className="quick-card"
            onClick={() => onNavigate("achievements")}
          >
            <span className="quick-icon">✦</span>
            <h3>Thành tựu</h3>
            <p>
              Theo dõi những cột mốc bạn đã đạt được.
            </p>
            <span className="quick-arrow">Xem thành tựu →</span>
          </button>

          <button
            className="quick-card"
            onClick={() => onNavigate("survey")}
          >
<span className="quick-icon survey-icon">
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="4" y="3" width="16" height="18" rx="3" />
    <path d="M8 8h8" />
    <path d="M8 12h3" />
    <path d="m14 13 1.5 1.5L18 12" />
    <path d="M8 16h3" />
  </svg>
</span>
           <h3>Khảo sát</h3>
            <p>
              Đóng góp ý kiến cho nghiên cứu của ZEIGORA.
            </p>
            <span className="quick-arrow">Tham gia →</span>
          </button>
        </div>
      </section>

      <section className="pomodoro-section">
       <Pomodoro
  user={user}
  onPomodoroComplete={() => {
    loadPomodoroStats();
    loadFocusStreak();
  }}
/>

        <div className="pomodoro-stat">
          <span>{pomodoroStats.minutes}</span>
          <small>phút tập trung hôm nay</small>
        </div>
      </section>

      <TodoList
        user={user}
        onStatsChange={setTaskStats}
      />

      <div
        className="hero-card"
        style={{
          marginTop: "30px",
          textAlign: "center",
        }}
      >
        <p>TIẾN ĐỘ MỤC TIÊU</p>

        <div
          className="progress-circle"
          style={{
            background: `conic-gradient(
              #91b9d2 ${taskStats.progress * 3.6}deg,
              rgba(255, 255, 255, 0.08) ${taskStats.progress * 3.6}deg
            )`,
          }}
        >
          <div className="progress-circle-inner">
            <strong>{taskStats.progress}%</strong>
            <span>hoàn thành</span>
          </div>
        </div>

        <p style={{ color: "#829aaa", marginTop: "15px" }}>
          {taskStats.completed}/{taskStats.total} mục tiêu đã hoàn thành
        </p>
      </div>
    </main>
  );
}

export default Overview;
