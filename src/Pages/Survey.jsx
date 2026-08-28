function Survey() {
  const surveyUrl = "https://forms.gle/D9u2Wa5t4313HASs7";

  return (
    <main className="page-container survey-page">
      <p className="label">NGHIÊN CỨU</p>

      <h1>Tham gia khảo sát</h1>

      <p className="description">
        Ý kiến của bạn sẽ góp phần giúp chúng tôi đánh giá và hoàn thiện
        ZEIGORA trong quá trình nghiên cứu.
      </p>

      <section className="survey-card">
<div className="survey-icon">
  <span>✦</span>
</div>
        <h2>Khảo sát trải nghiệm học tập</h2>

        <p>
          Bài khảo sát được thực hiện nhằm thu thập dữ liệu phục vụ
          nghiên cứu về việc quản lý mục tiêu và duy trì sự tập trung
          trong học tập.
        </p>

        <div className="survey-info">
          <div>
            <strong>Thời gian:</strong>
            <span>Khoảng 3–5 phút</span>
          </div>

          <div>
            <strong>Mục đích:</strong>
            <span>Phục vụ nghiên cứu khoa học</span>
          </div>
        </div>

        <a
          href={surveyUrl}
          target="_blank"
          rel="noreferrer"
          className="primary-button survey-button"
        >
          Tham gia khảo sát →
        </a>
      </section>
    </main>
  );
}

export default Survey;