const ACCENT = {
  "Total Tasks": "var(--ink)",
  "Completed": "var(--teal)",
  "Pending": "var(--amber)",
};

export default function Stats({ tasks = [] }) {
  const total = tasks.length;

  const completed = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const pending = tasks.filter(
    (task) => task.status === "pending"
  ).length;

  const stats = [
    { title: "Total Tasks", value: total },
    { title: "Completed", value: completed },
    { title: "Pending", value: pending },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((item) => (
        <div
          key={item.title}
          className="p-5 rounded-xl"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <h4
            className="tf-mono text-[10px] font-semibold uppercase tracking-wide mb-2"
            style={{ color: "var(--ink-muted)" }}
          >
            {item.title}
          </h4>
          <p className="tf-display text-2xl font-semibold" style={{ color: ACCENT[item.title] }}>
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}