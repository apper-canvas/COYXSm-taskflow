import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Check, X, Trash2, Edit, Calendar, Clock, 
  AlertTriangle, Plus, Filter, ChevronDown, 
  ArrowUpDown, Flag, CheckCircle2, Circle
} from 'lucide-react'
import { format } from 'date-fns'

const MainFeature = ({ 
  tasks, 
  addTask, 
  toggleComplete, 
  deleteTask, 
  updateTask,
  filter,
  setFilter,
  sortBy,
  setSortBy
}) => {
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium'
  })
  
  const [editingTask, setEditingTask] = useState(null)
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false)
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false)
  const [showForm, setShowForm] = useState(false)
  
  const filterMenuRef = useRef(null)
  const sortMenuRef = useRef(null)
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterMenuRef.current && !filterMenuRef.current.contains(event.target)) {
        setIsFilterMenuOpen(false)
      }
      if (sortMenuRef.current && !sortMenuRef.current.contains(event.target)) {
        setIsSortMenuOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  
  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (editingTask) {
      setEditingTask({
        ...editingTask,
        [name]: value
      })
    } else {
      setNewTask({
        ...newTask,
        [name]: value
      })
    }
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (editingTask) {
      updateTask({
        ...editingTask,
        updatedAt: new Date().toISOString()
      })
      setEditingTask(null)
    } else {
      if (newTask.title.trim() === '') return
      
      const task = {
        id: Date.now().toString(),
        title: newTask.title,
        description: newTask.description,
        dueDate: newTask.dueDate,
        priority: newTask.priority,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      
      addTask(task)
      setNewTask({
        title: '',
        description: '',
        dueDate: '',
        priority: 'medium'
      })
      setShowForm(false)
    }
  }
  
  const handleEdit = (task) => {
    setEditingTask(task)
    setShowForm(true)
  }
  
  const cancelEdit = () => {
    setEditingTask(null)
    setShowForm(false)
  }
  
  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return <Flag size={16} className="text-rose-500" />
      case 'medium':
        return <Flag size={16} className="text-amber-500" />
      case 'low':
        return <Flag size={16} className="text-emerald-500" />
      default:
        return null
    }
  }
  
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high': return 'priority-high'
      case 'medium': return 'priority-medium'
      case 'low': return 'priority-low'
      default: return ''
    }
  }
  
  const taskVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -10, transition: { duration: 0.2 } }
  }
  
  const formVariants = {
    hidden: { opacity: 0, height: 0, overflow: 'hidden' },
    visible: { 
      opacity: 1, 
      height: 'auto',
      transition: { 
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      height: 0,
      transition: { 
        duration: 0.3,
        when: "afterChildren"
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  }
  
  return (
    <div className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card border border-surface-200 dark:border-surface-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-surface-800 dark:text-surface-100">My Tasks</h2>
        
        <div className="flex flex-wrap gap-3">
          <div className="relative" ref={filterMenuRef}>
            <button
              onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
              className="btn btn-outline flex items-center gap-2"
            >
              <Filter size={16} />
              Filter
              <ChevronDown size={16} className={`transition-transform duration-200 ${isFilterMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {isFilterMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-surface-800 rounded-xl shadow-dropdown border border-surface-200 dark:border-surface-700 z-10"
                >
                  <div className="p-2">
                    <button
                      onClick={() => { setFilter('all'); setIsFilterMenuOpen(false) }}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${filter === 'all' ? 'bg-primary/10 text-primary' : 'hover:bg-surface-100 dark:hover:bg-surface-700'}`}
                    >
                      All Tasks
                    </button>
                    <button
                      onClick={() => { setFilter('active'); setIsFilterMenuOpen(false) }}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${filter === 'active' ? 'bg-primary/10 text-primary' : 'hover:bg-surface-100 dark:hover:bg-surface-700'}`}
                    >
                      Active
                    </button>
                    <button
                      onClick={() => { setFilter('completed'); setIsFilterMenuOpen(false) }}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${filter === 'completed' ? 'bg-primary/10 text-primary' : 'hover:bg-surface-100 dark:hover:bg-surface-700'}`}
                    >
                      Completed
                    </button>
                    <div className="border-t border-surface-200 dark:border-surface-700 my-1"></div>
                    <button
                      onClick={() => { setFilter('high'); setIsFilterMenuOpen(false) }}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${filter === 'high' ? 'bg-primary/10 text-primary' : 'hover:bg-surface-100 dark:hover:bg-surface-700'}`}
                    >
                      High Priority
                    </button>
                    <button
                      onClick={() => { setFilter('medium'); setIsFilterMenuOpen(false) }}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${filter === 'medium' ? 'bg-primary/10 text-primary' : 'hover:bg-surface-100 dark:hover:bg-surface-700'}`}
                    >
                      Medium Priority
                    </button>
                    <button
                      onClick={() => { setFilter('low'); setIsFilterMenuOpen(false) }}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${filter === 'low' ? 'bg-primary/10 text-primary' : 'hover:bg-surface-100 dark:hover:bg-surface-700'}`}
                    >
                      Low Priority
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="relative" ref={sortMenuRef}>
            <button
              onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
              className="btn btn-outline flex items-center gap-2"
            >
              <ArrowUpDown size={16} />
              Sort
              <ChevronDown size={16} className={`transition-transform duration-200 ${isSortMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {isSortMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-surface-800 rounded-xl shadow-dropdown border border-surface-200 dark:border-surface-700 z-10"
                >
                  <div className="p-2">
                    <button
                      onClick={() => { setSortBy('newest'); setIsSortMenuOpen(false) }}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${sortBy === 'newest' ? 'bg-primary/10 text-primary' : 'hover:bg-surface-100 dark:hover:bg-surface-700'}`}
                    >
                      Newest First
                    </button>
                    <button
                      onClick={() => { setSortBy('oldest'); setIsSortMenuOpen(false) }}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${sortBy === 'oldest' ? 'bg-primary/10 text-primary' : 'hover:bg-surface-100 dark:hover:bg-surface-700'}`}
                    >
                      Oldest First
                    </button>
                    <button
                      onClick={() => { setSortBy('dueDate'); setIsSortMenuOpen(false) }}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${sortBy === 'dueDate' ? 'bg-primary/10 text-primary' : 'hover:bg-surface-100 dark:hover:bg-surface-700'}`}
                    >
                      Due Date
                    </button>
                    <button
                      onClick={() => { setSortBy('priority'); setIsSortMenuOpen(false) }}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${sortBy === 'priority' ? 'bg-primary/10 text-primary' : 'hover:bg-surface-100 dark:hover:bg-surface-700'}`}
                    >
                      Priority
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowForm(!showForm)}
            className="btn btn-primary flex items-center gap-2"
          >
            <Plus size={18} />
            {showForm ? 'Cancel' : 'New Task'}
          </motion.button>
        </div>
      </div>
      
      <AnimatePresence mode="wait">
        {showForm && (
          <motion.div
            key="form"
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mb-6"
          >
            <form onSubmit={handleSubmit} className="bg-surface-50 dark:bg-surface-700 rounded-xl p-5 border border-surface-200 dark:border-surface-600 shadow-inner-soft">
              <h3 className="text-lg font-semibold mb-4 text-surface-800 dark:text-surface-100">
                {editingTask ? 'Edit Task' : 'Create New Task'}
              </h3>
              
              <div className="space-y-4">
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium mb-1.5 text-surface-700 dark:text-surface-300">Task Title</label>
                  <input
                    type="text"
                    name="title"
                    value={editingTask ? editingTask.title : newTask.title}
                    onChange={handleInputChange}
                    placeholder="What needs to be done?"
                    className="input-field"
                    required
                  />
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium mb-1.5 text-surface-700 dark:text-surface-300">Description (Optional)</label>
                  <textarea
                    name="description"
                    value={editingTask ? editingTask.description : newTask.description}
                    onChange={handleInputChange}
                    placeholder="Add details about this task..."
                    className="input-field min-h-[80px]"
                  />
                </motion.div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium mb-1.5 text-surface-700 dark:text-surface-300">Due Date (Optional)</label>
                    <input
                      type="date"
                      name="dueDate"
                      value={editingTask ? editingTask.dueDate : newTask.dueDate}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium mb-1.5 text-surface-700 dark:text-surface-300">Priority</label>
                    <select
                      name="priority"
                      value={editingTask ? editingTask.priority : newTask.priority}
                      onChange={handleInputChange}
                      className="input-field"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </motion.div>
                </div>
                
                <motion.div variants={itemVariants} className="flex justify-end gap-3 pt-2">
                  {editingTask && (
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="btn btn-outline"
                    >
                      Cancel
                    </button>
                  )}
                  
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    {editingTask ? 'Update Task' : 'Add Task'}
                  </button>
                </motion.div>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      
      {tasks.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="mb-4 text-surface-400">
            <CheckCircle2 size={48} className="mx-auto" />
          </div>
          <h3 className="text-xl font-medium mb-2 text-surface-700 dark:text-surface-200">No tasks yet</h3>
          <p className="text-surface-500 dark:text-surface-400 mb-6">
            Create your first task to get started
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowForm(true)}
            className="btn btn-primary inline-flex items-center gap-2"
          >
            <Plus size={18} />
            Create Task
          </motion.button>
        </motion.div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {tasks.map(task => (
              <motion.div
                key={task.id}
                variants={taskVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                className={`task-card group hover:shadow-card ${task.completed ? 'bg-surface-50/50 dark:bg-surface-800/50' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggleComplete(task.id)}
                    className="mt-1 flex-shrink-0 h-5 w-5 rounded-full border-2 border-surface-300 dark:border-surface-600 flex items-center justify-center group-hover:border-primary dark:group-hover:border-primary-light transition-colors"
                  >
                    {task.completed && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="h-3 w-3 rounded-full bg-primary dark:bg-primary-light"
                      />
                    )}
                  </button>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-lg font-medium break-words ${task.completed ? 'task-complete' : 'text-surface-800 dark:text-surface-200'}`}>
                      {task.title}
                    </h3>
                    
                    {task.description && (
                      <p className={`mt-1 text-surface-600 dark:text-surface-400 break-words ${task.completed ? 'task-complete' : ''}`}>
                        {task.description}
                      </p>
                    )}
                    
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                      {task.dueDate && (
                        <div className={`flex items-center gap-1 ${task.completed ? 'text-surface-400 dark:text-surface-500' : 'text-surface-600 dark:text-surface-400'}`}>
                          <Calendar size={14} />
                          <span>{format(new Date(task.dueDate), 'MMM d, yyyy')}</span>
                        </div>
                      )}
                      
                      {task.priority && (
                        <div className={`flex items-center gap-1 ${getPriorityClass(task.priority)}`}>
                          {getPriorityIcon(task.priority)}
                          <span className="capitalize">{task.priority}</span>
                        </div>
                      )}
                      
                      <div className="text-surface-500 dark:text-surface-500 flex items-center gap-1">
                        <Clock size={14} />
                        <span>
                          {format(new Date(task.createdAt), 'MMM d')}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleEdit(task)}
                      className="p-1.5 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200 transition-colors"
                    >
                      <Edit size={16} />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => deleteTask(task.id)}
                      className="p-1.5 rounded-full hover:bg-rose-100 dark:hover:bg-rose-900/30 text-surface-500 hover:text-rose-600 dark:text-surface-400 dark:hover:text-rose-400 transition-colors"
                    >
                      <Trash2 size={16} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}

export default MainFeature