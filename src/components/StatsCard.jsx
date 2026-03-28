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
      {stats.map((item, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow"
        >
          <h4 className="text-sm text-gray-500">{item.title}</h4>
          <p className="text-2xl font-bold">{item.value}</p>
        </div>
      ))}
    </div>
  );
}