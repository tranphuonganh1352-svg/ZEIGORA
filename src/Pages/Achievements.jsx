function Achievements({ pomodoroStats, taskStats }) {
  return (
    <main className="page-container">
      <p className="label">THÀNH TỰU</p>

      <h1>Hành trình bạn đã hoàn thành</h1>

      <p className="description">
        Mỗi mục tiêu hoàn thành là một bước tiến nhỏ trên hành trình
        của bạn.
      </p>

      <section className="achievement-grid">
        <div className="achievement-card">
          <span>🎯</span>
          <strong>{taskStats.completed}</strong>
          <small>Mục tiêu hoàn thành</small>
        </div>

        <div className="achievement-card">
          <span>◷</span>
          <strong>{pomodoroStats.sessions}</strong>
          <small>Phiên Pomodoro</small>
        </div>

        <div className="achievement-card">
          <span>⌛</span>
          <strong>{pomodoroStats.minutes}</strong>
          <small>Phút tập trung</small>
        </div>

        <div className="achievement-card">
          <span>✦</span>
          <strong>{taskStats.progress}%</strong>
          <small>Tiến độ hiện tại</small>
        </div>
      </section>

      <section className="research-card achievement-message">
        <p className="label">TIẾN BỘ</p>
        <h2>Tiếp tục hoàn thành những điều còn dang dở.</h2>
        <p>
          Hãy duy trì từng bước nhỏ. Những phiên tập trung và mục tiêu
          được hoàn thành hôm nay sẽ tạo nên tiến bộ lớn theo thời gian.
        </p>
      </section>
    </main>
  );
}

export default Achievements;