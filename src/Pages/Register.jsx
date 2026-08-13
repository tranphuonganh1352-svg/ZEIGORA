import { useState } from "react";

function Register({ onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setMessage("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    const existingUser = localStorage.getItem("zeigoraUser");

    if (existingUser) {
      const user = JSON.parse(existingUser);

      if (user.email === email) {
        setMessage("Email này đã được đăng ký.");
        return;
      }
    }

    const newUser = {
      name,
      email,
      password,
    };

    localStorage.setItem("zeigoraUser", JSON.stringify(newUser));

    setMessage("Tạo tài khoản thành công! Hãy đăng nhập.");

    setTimeout(() => {
      onLogin();
    }, 1000);
  };

  return (
    <div className="login-page">
      <div className="login-box">

        <div className="logo">
          <span className="logo-icon">Z</span>
          ZEIGORA
        </div>

        <h1>Tạo tài khoản</h1>

        <p className="login-description">
          Tạo tài khoản để lưu lại mục tiêu và tiến trình học tập của bạn.
        </p>

        <form onSubmit={handleRegister}>

          <div className="input-group">
            <label>Họ và tên</label>

            <input
              type="text"
              placeholder="Nhập họ và tên"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Mật khẩu</label>

            <input
              type="password"
              placeholder="Tạo mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="login-submit"
          >
            Tạo tài khoản
          </button>

        </form>

        {message && (
          <p
            style={{
              marginTop: "15px",
              textAlign: "center",
              color: "#b7d5e6",
              fontSize: "13px",
            }}
          >
            {message}
          </p>
        )}

        <p className="register-text">
          Đã có tài khoản?{" "}

          <button
            type="button"
            className="text-button"
            onClick={onLogin}
          >
            Đăng nhập
          </button>
        </p>

      </div>
    </div>
  );
}

export default Register;