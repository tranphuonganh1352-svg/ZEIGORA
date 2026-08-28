import { useState } from "react";
import { supabase } from "../supabase";

function Login({ onRegister, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Vui lòng nhập email và mật khẩu.");
      return;
    }

    setLoading(true);
    setMessage("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    setLoading(false);

    if (error) {
      if (error.message.includes("Email not confirmed")) {
        setMessage("Email chưa được xác nhận. Hãy kiểm tra hộp thư của bạn.");
      } else {
        setMessage("Email hoặc mật khẩu không chính xác.");
      }
      return;
    }

    if (data.user) {
      setMessage("Đăng nhập thành công!");

      const user = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.full_name || "",
      };

      setTimeout(() => {
        onLoginSuccess(user);
      }, 500);
    }
  };

const handleForgotPassword = async () => {
  if (!email) {
    setMessage("Vui lòng nhập email trước.");
    return;
  }

  setLoading(true);
  setMessage("");

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "https://zeigora.vercel.app/update-password",
  });

  setLoading(false);

  if (error) {
    setMessage("Không thể gửi email đặt lại mật khẩu.");
    return;
  }

  setMessage("Đã gửi email đặt lại mật khẩu. Hãy kiểm tra hộp thư.");
};

  return (
    <div className="login-page">
      <div className="login-box">

       <div className="logo login-logo">
  <span className="logo-icon">Z</span>
  <span className="login-logo-text">ZEIGORA</span>
</div>

        <h1>Chào mừng trở lại</h1>

        <p className="login-description">
          Đăng nhập để tiếp tục theo dõi mục tiêu và tiến trình học tập của bạn.
        </p>

        <form onSubmit={handleLogin}>

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
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
  type="button"
  className="forgot-password"
  onClick={handleForgotPassword}
>
  Quên mật khẩu?
</button>

          <button
            type="submit"
            className="login-submit"
            disabled={loading}
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
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
          Chưa có tài khoản?{" "}

          <button
            type="button"
            className="text-button"
            onClick={onRegister}
          >
            Đăng ký ngay
          </button>
        </p>

      </div>
    </div>
  );
}

export default Login;