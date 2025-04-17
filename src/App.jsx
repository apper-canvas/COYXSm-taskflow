import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

// Layouts
import DashboardLayout from './components/layout/DashboardLayout'

// Dashboard Pages
import DashboardPage from './components/dashboard/DashboardPage'
import ProjectsPage from './components/projects/ProjectsPage'
import ProjectDetail from './components/projects/ProjectDetail'
import ProjectForm from './components/projects/ProjectForm'
import TasksPage from './components/tasks/TasksPage'
import TaskDetail from './components/tasks/TaskDetail'
import TaskForm from './components/tasks/TaskForm'
import SettingsPage from './components/settings/SettingsPage'

export default function App() {
  return (
    <Routes>
      {/* Dashboard Routes */}
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="projects/new" element={<ProjectForm />} />
        <Route path="projects/:id" element={<ProjectDetail />} />
        <Route path="projects/:id/edit" element={<ProjectForm />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route path="tasks/:id" element={<TaskDetail />} />
        <Route path="projects/:projectId/tasks/new" element={<TaskForm />} />
        <Route path="tasks/:id/edit" element={<TaskForm />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      
      {/* Catch all - redirect to dashboard */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}