import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('https://assignement-production.up.railway.app/api/tasks/all', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setTasks(res.data)).catch(() => {});
  }, []);

  const todo = tasks.filter(t => t.status === 'todo');
  const inProgress = tasks.filter(t => t.status === 'in-progress');
  const done = tasks.filter(t => t.status === 'done');
  const overdue = tasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'done');

  return (
    <div>
      <Navbar />
      <div style={{ padding: 24 }}>
        <h2>Dashboard</h2>
        <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
          <div style={{ padding: 16, background: '#e3f2fd', borderRadius: 8 }}>Todo: {todo.length}</div>
          <div style={{ padding: 16, background: '#fff9c4', borderRadius: 8 }}>In Progress: {inProgress.length}</div>
          <div style={{ padding: 16, background: '#e8f5e9', borderRadius: 8 }}>Done: {done.length}</div>
          <div style={{ padding: 16, background: '#ffebee', borderRadius: 8 }}>Overdue: {overdue.length}</div>
        </div>
        <h3>All Tasks</h3>
        {tasks.map(task => <TaskCard key={task._id} task={task} />)}
      </div>
    </div>
  );
}