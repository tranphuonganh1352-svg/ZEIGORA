import { useState } from "react";
import { supabase } from "../supabase";

function Login({ onRegister, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // ĐĂNG NHẬP
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Vui lòng nhập email và mật khẩu.");
      return;
    }

    setLoading(true);
    setMessage("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      if (error.message.includes("Email not confirmed")) {
        setMessage(
          "Email chưa được xác nhận. Hãy kiểm tra hộp thư của bạn."
        );
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

  // QUÊN MẬT KHẨU
  const handleForgotPassword = async () => {
    if (!email) {
      setMessage("Vui lòng nhập email trước khi đặt lại mật khẩu.");
      return;
    }

    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });

    setLoading(false);

    if (error) {
      console.error("Lỗi gửi email reset:", error);
      setMessage("Không thể gửi email đặt lại mật khẩu. Vui lòng thử lại.");
      return;
    }

    setMessage(
      "Email đặt lại mật khẩu đã được gửi. Hãy kiểm tra hộp thư của bạn."
    );
  };

  return (
    <div className="login-page">
      <div className="login-box">

        {/* LOGO */}
        <div className="login-logo">
          <span className="logo-icon">Z</span>
          <span>ZEIGORA</span>
        </div>

        <h1>Chào mừng trở lại</h1>

        <p className="login-description">
          Đăng nhập để tiếp tục theo dõi mục tiêu và tiến trình học tập
          của bạn.
        </p>

        <form onSubmit={handleLogin}>

          {/* EMAIL */}
          <div className="input-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* MẬT KHẨU */}
          <div className="input-group">
            <label>Mật khẩu</label>

            <input
              type="password"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* QUÊN MẬT KHẨU */}
          <button
            type="button"
            className="forgot-password"
            onClick={handleForgotPassword}
            disabled={loading}
          >
            Quên mật khẩu?
          </button>

          {/* ĐĂNG NHẬP */}
          <button
            type="submit"
            className="login-submit"
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : "Đăng nhập"}
          </button>

        </form>

        {/* MESSAGE */}
        {message && (
          <p
            className="login-message"
            style={{
              marginTop: "15px",
              textAlign: "center",
              color: "#b7d5e6",
              fontSize: "13px",
              lineHeight: "1.5",
            }}
          >
            {message}
          </p>
        )}

        {/* ĐĂNG KÝ */}
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