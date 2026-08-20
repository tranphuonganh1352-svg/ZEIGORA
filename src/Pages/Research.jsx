function Research() {
  return (
    <main className="page-container">
      <p className="label">NGHIÊN CỨU KHOA HỌC</p>

      <h1>Vì sao những điều còn dang dở vẫn ở lại trong tâm trí?</h1>

      <p className="description">
        ZEIGORA được xây dựng dựa trên ý tưởng ứng dụng
        Hiệu ứng Zeigarnik vào việc quản lý mục tiêu học tập.
      </p>

      <section className="research-content">
        <div className="research-card">
          <span className="quick-icon">01</span>
          <h2>Hiệu ứng Zeigarnik</h2>
          <p>
            Đây là hiện tượng tâm lý cho rằng con người có xu hướng
            ghi nhớ hoặc tiếp tục bị thu hút bởi những nhiệm vụ chưa
            hoàn thành.
          </p>
        </div>

        <div className="research-card">
          <span className="quick-icon">02</span>
          <h2>Vấn đề nghiên cứu</h2>
          <p>
            Trong quá trình học tập, nhiều mục tiêu bị bỏ dở hoặc
            trì hoãn. ZEIGORA hướng tới việc biến những mục tiêu
            còn dang dở thành động lực để người học tiếp tục hoàn thành.
          </p>
        </div>

        <div className="research-card">
          <span className="quick-icon">03</span>
          <h2>Mục tiêu</h2>
          <p>
            Hỗ trợ học sinh quản lý mục tiêu, duy trì sự tập trung
            và theo dõi tiến trình hoàn thành thông qua các công cụ
            như Todo List và Pomodoro.
          </p>
        </div>

        <div className="research-card">
          <span className="quick-icon">04</span>
          <h2>Ý nghĩa</h2>
          <p>
            ZEIGORA hướng tới việc kết hợp kiến thức tâm lý học
            với công nghệ để tạo ra một môi trường học tập có tính
            trực quan và dễ sử dụng.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Research;