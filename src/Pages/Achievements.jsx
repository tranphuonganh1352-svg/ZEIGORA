function Achievements({
  pomodoroStats,
  taskStats,
  focusStreak,
}) {
  // =========================
  // TÍNH XP
  // =========================

  const xp =
    taskStats.completed * 20 +
    pomodoroStats.sessions * 30 +
    pomodoroStats.minutes;

  // Mỗi level cần 200 XP
  const level = Math.floor(xp / 200) + 1;

  const currentLevelXP = xp % 200;
  const nextLevelXP = 200;

  const xpProgress = Math.min(
    (currentLevelXP / nextLevelXP) * 100,
    100
  );

  // =========================
  // THÀNH TỰU
  // =========================

  const achievements = [
    {
      icon: "🎯",
      title: "Bước đầu tiên",
      description: "Hoàn thành mục tiêu đầu tiên",
      requirement: "1 mục tiêu",
      unlocked: taskStats.completed >= 1,
    },

    {
      icon: "🍅",
      title: "Phiên tập trung đầu tiên",
      description: "Hoàn thành phiên Pomodoro đầu tiên",
      requirement: "1 phiên",
      unlocked: pomodoroStats.sessions >= 1,
    },

    {
      icon: "🔥",
      title: "Giữ lửa",
      description: "Duy trì chuỗi tập trung",
      requirement: "3 ngày liên tiếp",
      unlocked: focusStreak >= 3,
    },

    {
      icon: "⚡",
      title: "Tập trung cao độ",
      description: "Hoàn thành 5 phiên Pomodoro",
      requirement: "5 phiên",
      unlocked: pomodoroStats.sessions >= 5,
    },

    {
      icon: "🏆",
      title: "Chiến binh mục tiêu",
      description: "Hoàn thành 10 mục tiêu",
      requirement: "10 mục tiêu",
      unlocked: taskStats.completed >= 10,
    },

    {
      icon: "⏱",
      title: "Giờ vàng",
      description: "Tích lũy 100 phút tập trung",
      requirement: "100 phút",
      unlocked: pomodoroStats.minutes >= 100,
    },

    {
      icon: "🔥",
      title: "Không thể dừng lại",
      description: "Duy trì chuỗi tập trung 7 ngày",
      requirement: "7 ngày",
      unlocked: focusStreak >= 7,
    },

    {
      icon: "👑",
      title: "Bậc thầy ZEIGORA",
      description: "Đạt cấp độ 5",
      requirement: "Level 5",
      unlocked: level >= 5,
    },
  ];

  const unlockedCount = achievements.filter(
    (achievement) => achievement.unlocked
  ).length;

  return (
    <main className="page-container achievements-page">

      {/* HEADER */}

      <div className="achievement-hero">

        <p className="label">HÀNH TRÌNH</p>

        <h1>
          Biến việc học thành
          <br />
          <span>một trò chơi.</span>
        </h1>

        <p className="description">
          Mỗi mục tiêu hoàn thành, mỗi phiên tập trung
          đều giúp bạn tiến gần hơn tới cấp độ tiếp theo.
        </p>

      </div>

      {/* LEVEL CARD */}

      <section className="level-card">

        <div className="level-top">

          <div className="level-badge">
            <span>LV</span>
            <strong>{level}</strong>
          </div>

          <div className="level-info">

            <p className="level-label">
              CẤP ĐỘ HIỆN TẠI
            </p>

            <h2>
              {level < 3
                ? "Người mới"
                : level < 5
                ? "Người tập trung"
                : level < 10
                ? "Chiến binh"
                : "Bậc thầy"}
            </h2>

            <p>
              {currentLevelXP} / {nextLevelXP} XP
            </p>

          </div>

          <div className="total-xp">
            <strong>{xp}</strong>
            <span>XP tổng</span>
          </div>

        </div>

        <div className="xp-bar">

          <div
            className="xp-bar-fill"
            style={{
              width: `${xpProgress}%`,
            }}
          />

        </div>

        <p className="xp-next">
          Còn{" "}
          <strong>
            {nextLevelXP - currentLevelXP} XP
          </strong>{" "}
          để lên Level {level + 1}
        </p>

      </section>

      {/* QUICK STATS */}

      <section className="game-stats">

        <div className="game-stat-card">
          <span>🔥</span>
          <strong>{focusStreak}</strong>
          <small>ngày liên tiếp</small>
        </div>

        <div className="game-stat-card">
          <span>🎯</span>
          <strong>{taskStats.completed}</strong>
          <small>mục tiêu hoàn thành</small>
        </div>

        <div className="game-stat-card">
          <span>🍅</span>
          <strong>{pomodoroStats.sessions}</strong>
          <small>phiên tập trung</small>
        </div>

        <div className="game-stat-card">
          <span>⏱</span>
          <strong>{pomodoroStats.minutes}</strong>
          <small>phút tập trung</small>
        </div>

      </section>

      {/* ACHIEVEMENTS */}

      <section className="badges-section">

        <div className="badges-heading">

          <div>
            <p className="label">THÀNH TỰU</p>

            <h2>
              Bộ sưu tập huy hiệu
            </h2>
          </div>

          <div className="badge-count">
            {unlockedCount}/{achievements.length}
            <span>đã mở khóa</span>
          </div>

        </div>

        <div className="badges-grid">

          {achievements.map(
            (achievement, index) => (
              <div
                key={index}
                className={`badge-card ${
                  achievement.unlocked
                    ? "unlocked"
                    : "locked"
                }`}
              >

                <div className="badge-icon">
                  {achievement.unlocked
                    ? achievement.icon
                    : "🔒"}
                </div>

                <div className="badge-content">

                  <div className="badge-title">
                    <h3>
                      {achievement.title}
                    </h3>

                    {achievement.unlocked && (
                      <span className="unlocked-tag">
                        ĐÃ MỞ KHÓA
                      </span>
                    )}
                  </div>

                  <p>
                    {achievement.description}
                  </p>

                  <small>
                    {achievement.unlocked
                      ? "✦ Hoàn thành"
                      : `Mục tiêu: ${achievement.requirement}`}
                  </small>

                </div>

              </div>
            )
          )}

        </div>

      </section>

      {/* MOTIVATION */}

      <section className="game-message">

        <div className="game-message-icon">
          ✦
        </div>

        <div>

          <p className="label">
            NHIỆM VỤ TIẾP THEO
          </p>

          <h2>
            {unlockedCount === achievements.length
              ? "Bạn đã mở khóa tất cả!"
              : "Tiếp tục hoàn thành điều còn dang dở."}
          </h2>

          <p>
            Mỗi phiên tập trung là một bước nhỏ.
            Nhưng những bước nhỏ được lặp lại sẽ
            tạo nên một hành trình lớn.
          </p>

        </div>

      </section>

    </main>
  );
}

export default Achievements;