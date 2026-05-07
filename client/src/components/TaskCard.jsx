export default function TaskCard({ task, onUpdateStatus, onDelete }) {
  const colors = { todo: '#e3f2fd', 'in-progress': '#fff9c4', done: '#e8f5e9' };

  return (
    <div style={{ background: colors[task.status], padding: 12, marginBottom: 8, borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <strong>{task.title}</strong>
        {task.description && <p style={{ margin: '4px 0', fontSize: 13 }}>{task.description}</p>}
        {task.dueDate && <span style={{ fontSize: 12, marginRight: 8 }}>Due: {new Date(task.dueDate).toLocaleDateString()}</span>}
        {task.assignedTo && <span style={{ fontSize: 12 }}>👤 {task.assignedTo.name}</span>}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <select value={task.status}
          onChange={e => onUpdateStatus(task._id, e.target.value)}
          style={{ padding: '4px 8px', borderRadius: 4 }}>
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        {onDelete && (
          <button onClick={() => onDelete(task._id)}
            style={{ padding: '4px 10px', background: '#d32f2f', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
}