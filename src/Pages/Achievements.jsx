function Achievements({ pomodoroStats, taskStats }) {
  return (
    <main className="page-container achievements-page">
      <p className="label">THÀNH TỰU</p>

      <h1>Hành trình bạn đã hoàn thành</h1>

      <p className="description">
        Mỗi mục tiêu hoàn thành là một bước tiến nhỏ trên hành trình
        của bạn.
      </p>

      <section className="achievement-grid">
        <div className="achievement-card">
          <div className="achievement-icon">🎯</div>

          <div className="achievement-content">
            <strong>{taskStats.completed}</strong>
            <small>Mục tiêu hoàn thành</small>
          </div>
        </div>

        <div className="achievement-card">
          <div className="achievement-icon">◷</div>

          <div className="achievement-content">
            <strong>{pomodoroStats.sessions}</strong>
            <small>Phiên Pomodoro</small>
          </div>
        </div>

        <div className="achievement-card">
          <div className="achievement-icon">⌛</div>

          <div className="achievement-content">
            <strong>{pomodoroStats.minutes}</strong>
            <small>Phút tập trung</small>
          </div>
        </div>

        <div className="achievement-card">
          <div className="achievement-icon">✦</div>

          <div className="achievement-content">
            <strong>{taskStats.progress}%</strong>
            <small>Tiến độ hiện tại</small>
          </div>
        </div>
      </section>

      <section className="achievement-message">
        <p className="label">TIẾN BỘ</p>

        <h2>
          Tiếp tục hoàn thành những điều còn dang dở.
        </h2>

        <p>
          Hãy duy trì từng bước nhỏ. Những phiên tập trung và mục tiêu
          được hoàn thành hôm nay sẽ tạo nên tiến bộ lớn theo thời gian.
        </p>
      </section>
    </main>
  );
}

export default Achievements;