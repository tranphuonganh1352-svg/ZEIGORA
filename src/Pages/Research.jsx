function Research() {
  const researchItems = [
    {
      number: "01",
      title: "Hiệu ứng Zeigarnik",
      text: "Đây là hiện tượng tâm lý cho rằng con người có xu hướng ghi nhớ hoặc tiếp tục bị thu hút bởi những nhiệm vụ chưa hoàn thành.",
    },
    {
      number: "02",
      title: "Vấn đề nghiên cứu",
      text: "Trong quá trình học tập, nhiều mục tiêu bị bỏ dở hoặc trì hoãn. ZEIGORA hướng tới việc biến những mục tiêu còn dang dở thành động lực để người học tiếp tục hoàn thành.",
    },
    {
      number: "03",
      title: "Mục tiêu",
      text: "Hỗ trợ học sinh quản lý mục tiêu, duy trì sự tập trung và theo dõi tiến trình hoàn thành thông qua các công cụ như Todo List và Pomodoro.",
    },
    {
      number: "04",
      title: "Ý nghĩa",
      text: "ZEIGORA hướng tới việc kết hợp kiến thức tâm lý học với công nghệ để tạo ra một môi trường học tập có tính trực quan và dễ sử dụng.",
    },
  ];

  return (
    <main className="page-container research-page">
      <p className="label">NGHIÊN CỨU KHOA HỌC</p>

      <h1 className="research-title">
        Vì sao những điều còn dang dở
        <br />
        vẫn ở lại trong tâm trí?
      </h1>

      <p className="description research-intro">
        ZEIGORA được xây dựng dựa trên ý tưởng ứng dụng
        Hiệu ứng Zeigarnik vào việc quản lý mục tiêu học tập.
      </p>

      <section className="research-content">
        {researchItems.map((item) => (
          <article className="research-card" key={item.number}>
            <div className="research-number">
              {item.number}
            </div>

            <div className="research-card-content">
              <h2>{item.title}</h2>

              <p>{item.text}</p>
            </div>

            <div className="research-arrow">
              ↗
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default Research;