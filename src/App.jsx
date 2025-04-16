import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

// Layouts
import DashboardLayout from './components/layout/DashboardLayout'

// Auth Pages
import LoginPage from './components/auth/LoginPage'
import RegisterPage from './components/auth/RegisterPage'

// Dashboard Pages
import DashboardPage from './components/dashboard/DashboardPage'
import ProjectsPage from './components/projects/ProjectsPage'
import ProjectDetail from './components/projects/ProjectDetail'
import ProjectForm from './components/projects/ProjectForm'
import TasksPage from './components/tasks/TasksPage'
import TaskDetail from './components/tasks/TaskDetail'
import TaskForm from './components/tasks/TaskForm'

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  return children
}

export default function App() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Dashboard Routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<DashboardPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="projects/new" element={<ProjectForm />} />
        <Route path="projects/:id" element={<ProjectDetail />} />
        <Route path="projects/:id/edit" element={<ProjectForm />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route path="tasks/:id" element={<TaskDetail />} />
        <Route path="projects/:projectId/tasks/new" element={<TaskForm />} />
        <Route path="tasks/:id/edit" element={<TaskForm />} />
      </Route>
      
      {/* Catch all - redirect to dashboard */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}