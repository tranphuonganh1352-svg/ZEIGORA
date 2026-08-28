import { useEffect, useState } from "react";
import { supabase } from "../supabase";

function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const checkRecoverySession = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session) {
        setReady(true);
      } else {
        setMessage(
          "Liên kết đặt lại mật khẩu không hợp lệ hoặc đã hết hạn."
        );
      }
    };

    checkRecoverySession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" && session) {
        setReady(true);
        setMessage("");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

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
      password,
    });

    setLoading(false);

    if (error) {
      console.error("UPDATE PASSWORD ERROR:", error);
      setMessage(
        "Không thể đổi mật khẩu. Liên kết có thể đã hết hạn."
      );
      return;
    }

    setMessage("Đổi mật khẩu thành công!");

    setPassword("");
    setConfirmPassword("");
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
          Tạo mật khẩu mới để tiếp tục sử dụng ZEIGORA.
        </p>

        {!ready ? (
          <p
            style={{
              textAlign: "center",
              color: "#b7d5e6",
              marginTop: "25px",
            }}
          >
            {message || "Đang xác nhận liên kết..."}
          </p>
        ) : (
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
        )}

        {message && ready && (
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

      </div>
    </div>
  );
}

export default UpdatePassword;