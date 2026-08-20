function Navbar({ user, onNavigate, onLogout, currentPage }) {
  const navItems = [
    { id: "overview", label: "Tổng quan" },
    { id: "research", label: "Nghiên cứu" },
    { id: "achievements", label: "Thành tựu" },
    { id: "survey", label: "Khảo sát" },
  ];

  return (
    <header className="navbar">
      <button
        className="logo"
        onClick={() => onNavigate("overview")}
      >
        <span className="logo-icon">Z</span>
        ZEIGORA
      </button>

      <nav className="nav-links">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-link ${
              currentPage === item.id ? "active" : ""
            }`}
            onClick={() => onNavigate(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="navbar-user">
        <span>Xin chào, {user?.name}</span>

        <button
          className="login-button"
          onClick={onLogout}
        >
          Đăng xuất
        </button>
      </div>
    </header>
  );
}

export default Navbar;