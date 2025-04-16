import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MainFeature from '../components/MainFeature'

const Home = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks')
    return savedTasks ? JSON.parse(savedTasks) : []
  })
  
  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])
  
  const addTask = (newTask) => {
    setTasks([...tasks, newTask])
  }
  
  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }
  
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }
  
  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ))
  }
  
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    if (filter === 'high') return task.priority === 'high'
    if (filter === 'medium') return task.priority === 'medium'
    if (filter === 'low') return task.priority === 'low'
    return true
  })
  
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt)
    if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt)
    if (sortBy === 'dueDate') {
      if (!a.dueDate) return 1
      if (!b.dueDate) return -1
      return new Date(a.dueDate) - new Date(b.dueDate)
    }
    if (sortBy === 'priority') {
      const priorityOrder = { high: 0, medium: 1, low: 2, undefined: 3 }
      return priorityOrder[a.priority] - priorityOrder[b.priority]
    }
    return 0
  })
  
  return (
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Organize Your Tasks
          </h1>
          <p className="text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
            Create, organize, and track your tasks with our intuitive interface. Stay productive and never miss a deadline.
          </p>
        </div>
        
        <MainFeature 
          tasks={sortedTasks} 
          addTask={addTask} 
          toggleComplete={toggleComplete}
          deleteTask={deleteTask}
          updateTask={updateTask}
          filter={filter}
          setFilter={setFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        
        <div className="mt-12 bg-surface-100 dark:bg-surface-800 rounded-2xl p-6 border border-surface-200 dark:border-surface-700">
          <h2 className="text-xl font-semibold mb-4">Task Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-surface-700 rounded-xl p-4 shadow-card">
              <p className="text-surface-500 dark:text-surface-400 text-sm">Total Tasks</p>
              <p className="text-2xl font-bold">{tasks.length}</p>
            </div>
            <div className="bg-white dark:bg-surface-700 rounded-xl p-4 shadow-card">
              <p className="text-surface-500 dark:text-surface-400 text-sm">Completed</p>
              <p className="text-2xl font-bold">{tasks.filter(t => t.completed).length}</p>
            </div>
            <div className="bg-white dark:bg-surface-700 rounded-xl p-4 shadow-card">
              <p className="text-surface-500 dark:text-surface-400 text-sm">Pending</p>
              <p className="text-2xl font-bold">{tasks.filter(t => !t.completed).length}</p>
            </div>
            <div className="bg-white dark:bg-surface-700 rounded-xl p-4 shadow-card">
              <p className="text-surface-500 dark:text-surface-400 text-sm">High Priority</p>
              <p className="text-2xl font-bold">{tasks.filter(t => t.priority === 'high').length}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Home