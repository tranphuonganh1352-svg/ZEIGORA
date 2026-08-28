import { useState } from "react";
import { supabase } from "../supabase";

function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setMessage("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    if (password.length < 6) {
      setMessage("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Mật khẩu xác nhận không khớp.");
      return;
    }

    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    setLoading(false);

    if (error) {
      console.error("Lỗi đổi mật khẩu:", error);
      setMessage("Không thể cập nhật mật khẩu. Vui lòng thử lại.");
      return;
    }

    setMessage("Đổi mật khẩu thành công! Bạn có thể đăng nhập lại.");
  };

  return (
    <div className="login-page">
      <div className="login-box">

        <div className="login-logo">
          <span className="logo-icon">Z</span>
          <span>ZEIGORA</span>
        </div>

        <h1>Đặt mật khẩu mới</h1>

        <p className="login-description">
          Tạo một mật khẩu mới để tiếp tục sử dụng ZEIGORA.
        </p>

        <form onSubmit={handleUpdatePassword}>

          <div className="input-group">
            <label>Mật khẩu mới</label>

            <input
              type="password"
              placeholder="Nhập mật khẩu mới"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Xác nhận mật khẩu</label>

            <input
              type="password"
              placeholder="Nhập lại mật khẩu"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
            />
          </div>

          <button
            type="submit"
            className="login-submit"
            disabled={loading}
          >
            {loading ? "Đang cập nhật..." : "Đổi mật khẩu"}
          </button>

        </form>

        {message && (
          <p
            className="login-message"
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

      </div>
    </div>
  );
}

export default UpdatePassword;