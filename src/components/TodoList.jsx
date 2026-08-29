import { useEffect, useState } from "react";

const STORAGE_KEY = "zeigora_tasks";

function TodoList({ onStatsChange }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);

  // =========================
  // LẤY TASK TỪ LOCAL STORAGE
  // =========================

  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem(STORAGE_KEY);

      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (error) {
      console.error("Lỗi tải mục tiêu:", error);
    }

    setLoading(false);
  }, []);

  // =========================
  // TỰ ĐỘNG LƯU TASK
  // =========================

  useEffect(() => {
    if (loading) return;

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(tasks)
    );
  }, [tasks, loading]);

  // =========================
  // TÍNH TIẾN ĐỘ
  // =========================

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const progress =
    tasks.length === 0
      ? 0
      : Math.round(
          (completedTasks / tasks.length) * 100
        );

  // =========================
  // GỬI STATS CHO OVERVIEW
  // =========================

  useEffect(() => {
    if (onStatsChange) {
      onStatsChange({
        total: tasks.length,
        completed: completedTasks,
        progress,
      });
    }
  }, [
    tasks,
    completedTasks,
    progress,
    onStatsChange,
  ]);

  // =========================
  // THÊM TASK
  // =========================

  const addTask = (e) => {
    e.preventDefault();

    if (!newTask.trim()) return;

    const task = {
      id: crypto.randomUUID(),
      title: newTask.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTasks((prev) => [task, ...prev]);
    setNewTask("");
  };

  // =========================
  // HOÀN THÀNH TASK
  // =========================

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  };

  // =========================
  // XÓA TASK
  // =========================

  const deleteTask = (id) => {
    setTasks((prev) =>
      prev.filter((task) => task.id !== id)
    );
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="hero-card">
        <p>Đang tải mục tiêu...</p>
      </div>
    );
  }

  // =========================
  // GIAO DIỆN
  // =========================

  return (
    <div style={{ marginTop: "40px" }}>

      {/* THÊM MỤC TIÊU */}

      <div className="hero-card">

        <p>MỤC TIÊU HỌC TẬP</p>

        <form
          onSubmit={addTask}
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "15px",
          }}
        >
          <input
            type="text"
            value={newTask}
            onChange={(e) =>
              setNewTask(e.target.value)
            }
            placeholder="Nhập mục tiêu của bạn..."
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #314654",
              background: "#111c24",
              color: "white",
            }}
          />

          <button
            type="submit"
            className="primary-button"
          >
            Thêm
          </button>
        </form>

      </div>

      {/* TIẾN ĐỘ */}

      <div
        className="hero-card"
        style={{ marginTop: "20px" }}
      >
        <p>TIẾN ĐỘ</p>

        <h2 style={{ fontSize: "35px" }}>
          {progress}%
        </h2>

        <span style={{ color: "#829aaa" }}>
          {completedTasks}/{tasks.length} mục tiêu đã hoàn thành
        </span>
      </div>

      {/* DANH SÁCH MỤC TIÊU */}

      <div style={{ marginTop: "20px" }}>

        {tasks.length === 0 ? (
          <div className="hero-card">
            <p>
              Chưa có mục tiêu nào. Hãy thêm mục tiêu đầu tiên!
            </p>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="hero-card"
              style={{
                marginBottom: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "15px",
              }}
            >

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >

                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() =>
                    toggleTask(task.id)
                  }
                />

                <span
                  style={{
                    textDecoration: task.completed
                      ? "line-through"
                      : "none",

                    color: task.completed
                      ? "#71818c"
                      : "#dce7ed",
                  }}
                >
                  {task.title}
                </span>

              </div>

              <button
                onClick={() =>
                  deleteTask(task.id)
                }
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#b7d5e6",
                  cursor: "pointer",
                }}
              >
                Xóa
              </button>

            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default TodoList;