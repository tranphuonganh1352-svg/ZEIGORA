import { useEffect, useState } from "react";
import { supabase } from "../supabase";

function TodoList({ user, onStatsChange }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);

  // Lấy danh sách task của người dùng
  const loadTasks = async () => {
    if (!user?.id) return;

    setLoading(true);

    const { data, error } = await supabase
      .from("Tasks")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Lỗi tải task:", error);
      setLoading(false);
      return;
    }

    setTasks(data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadTasks();
  }, [user]);

  // Thêm task
  const addTask = async (e) => {
    e.preventDefault();

    if (!newTask.trim() || !user?.id) return;

    const { data, error } = await supabase
      .from("Tasks")
      .insert([
        {
          user_id: user.id,
          title: newTask.trim(),
          completed: false,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Lỗi thêm task:", error);
      return;
    }

    setTasks((prev) => [data, ...prev]);
    setNewTask("");
  };

  // Đánh dấu hoàn thành
  const toggleTask = async (task) => {
    const { error } = await supabase
      .from("Tasks")
      .update({
        completed: !task.completed,
      })
      .eq("id", task.id)
      .eq("user_id", user.id);

    if (error) {
      console.error("Lỗi cập nhật task:", error);
      return;
    }

    setTasks((prev) =>
      prev.map((item) =>
        item.id === task.id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  // Xóa task
  const deleteTask = async (id) => {
    const { error } = await supabase
      .from("Tasks")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      console.error("Lỗi xóa task:", error);
      return;
    }

    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const progress =
    tasks.length === 0
      ? 0
      : Math.round((completedTasks / tasks.length) * 100);
useEffect(() => {
  const completed = tasks.filter(
    (task) => task.completed
  ).length;

  const progress =
    tasks.length === 0
      ? 0
      : Math.round((completed / tasks.length) * 100);

  if (onStatsChange) {
    onStatsChange({
      total: tasks.length,
      completed,
      progress,
    });
  }
}, [tasks, onStatsChange]);
  if (loading) {
    return (
      <div className="hero-card">
        <p>Đang tải mục tiêu...</p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: "40px" }}>

      {/* Thêm mục tiêu */}
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
            onChange={(e) => setNewTask(e.target.value)}
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

      {/* Tiến độ */}
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

      {/* Danh sách */}
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
                  onChange={() => toggleTask(task)}
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
                onClick={() => deleteTask(task.id)}
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