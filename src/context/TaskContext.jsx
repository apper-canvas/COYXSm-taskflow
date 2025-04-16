import { createContext, useContext, useState, useEffect } from 'react'

const TaskContext = createContext(null)

// Sample task data
const initialTasks = [
  {
    id: '101',
    projectId: '1',
    title: 'Create wireframes',
    description: 'Create wireframes for homepage and product pages',
    status: 'completed',
    priority: 'high',
    assignedTo: 'Jane Doe',
    createdAt: '2023-05-15T10:00:00Z',
    dueDate: '2023-05-25T23:59:59Z'
  },
  {
    id: '102',
    projectId: '1',
    title: 'Develop frontend components',
    description: 'Implement React components based on design',
    status: 'in-progress',
    priority: 'high',
    assignedTo: 'John Smith',
    createdAt: '2023-05-26T14:30:00Z',
    dueDate: '2023-06-15T23:59:59Z'
  },
  {
    id: '103',
    projectId: '2',
    title: 'API specification',
    description: 'Define API endpoints and data structures',
    status: 'in-progress',
    priority: 'medium',
    assignedTo: 'Maria Garcia',
    createdAt: '2023-06-20T09:15:00Z',
    dueDate: '2023-07-05T23:59:59Z'
  },
  {
    id: '104',
    projectId: '3',
    title: 'Create social media content',
    description: 'Design social media posts for campaign',
    status: 'completed',
    priority: 'medium',
    assignedTo: 'Alex Johnson',
    createdAt: '2023-04-25T11:45:00Z',
    dueDate: '2023-05-10T23:59:59Z'
  }
]

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks')
    return savedTasks ? JSON.parse(savedTasks) : initialTasks
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const getTasks = (projectId = null) => {
    if (projectId) {
      return tasks.filter(task => task.projectId === projectId)
    }
    return tasks
  }

  const getTask = (id) => {
    return tasks.find(task => task.id === id) || null
  }

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    setTasks([...tasks, newTask])
    return newTask
  }

  const updateTask = (id, updatedData) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, ...updatedData } : task
    )
    setTasks(updatedTasks)
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const deleteProjectTasks = (projectId) => {
    setTasks(tasks.filter(task => task.projectId !== projectId))
  }

  const getTaskStats = () => {
    const total = tasks.length
    const completed = tasks.filter(task => task.status === 'completed').length
    const inProgress = tasks.filter(task => task.status === 'in-progress').length
    const pending = tasks.filter(task => task.status === 'pending').length
    
    return { total, completed, inProgress, pending }
  }

  const value = {
    tasks,
    isLoading,
    getTasks,
    getTask,
    addTask,
    updateTask,
    deleteTask,
    deleteProjectTasks,
    getTaskStats
  }

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  )
}

export const useTasks = () => {
  const context = useContext(TaskContext)
  if (context === null) {
    throw new Error('useTasks must be used within a TaskProvider')
  }
  return context
}