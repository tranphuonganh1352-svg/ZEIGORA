import { useState } from "react";
import { supabase } from "../supabase";

function Register({ onRegisterSuccess, onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setMessage("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    if (password.length < 6) {
      setMessage("Mật khẩu cần có ít nhất 6 ký tự.");
      return;
    }

    setLoading(true);
    setMessage("");

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    if (data.user) {
      setMessage(
        "Tạo tài khoản thành công! Hãy kiểm tra email để xác nhận tài khoản."
      );

      setName("");
      setEmail("");
      setPassword("");
    }
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
              placeholder="Nhập email"
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

          {message && (
            <p style={{ marginTop: "10px" }}>
              {message}
            </p>
          )}

          <button
            type="submit"
            className="login-submit"
            disabled={loading}
          >
            {loading ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
          </button>

        </form>

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