import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Card from '../common/Card'
import Button from '../common/Button'
import { useProjects } from '../../context/ProjectContext'
import { useTasks } from '../../context/TaskContext'

export default function TaskForm() {
  const navigate = useNavigate()
  const { id, projectId } = useParams()
  const { projects } = useProjects()
  const { getTask, addTask, updateTask } = useTasks()
  
  const isEditMode = Boolean(id)
  
  const defaultFormData = {
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    projectId: projectId || '',
    assignedTo: '',
    dueDate: ''
  }
  
  const [formData, setFormData] = useState(defaultFormData)
  const [errors, setErrors] = useState({})
  
  useEffect(() => {
    if (isEditMode) {
      const task = getTask(id)
      if (task) {
        // Format date for input field
        const formattedDueDate = task.dueDate 
          ? new Date(task.dueDate).toISOString().split('T')[0] 
          : ''
        
        setFormData({
          ...task,
          dueDate: formattedDueDate
        })
      } else {
        navigate('/tasks')
      }
    }
  }, [id, isEditMode, getTask, navigate])
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }
  
  const validate = () => {
    const newErrors = {}
    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required'
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }
    if (!formData.status) {
      newErrors.status = 'Status is required'
    }
    if (!formData.projectId) {
      newErrors.projectId = 'Project is required'
    }
    return newErrors
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validate()
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    const taskData = {
      ...formData,
      // Make sure dueDate is in ISO format if present
      dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null
    }
    
    if (isEditMode) {
      updateTask(id, taskData)
      navigate(`/tasks/${id}`)
    } else {
      const newTask = addTask(taskData)
      navigate(`/tasks/${newTask.id}`)
    }
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <Link 
          to={isEditMode ? `/tasks/${id}` : projectId ? `/projects/${projectId}` : '/tasks'} 
          className="mr-4 text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEditMode ? 'Edit Task' : 'Create New Task'}
        </h1>
      </div>
      
      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Task Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.title ? 'border-red-300' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              id="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.description ? 'border-red-300' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="projectId" className="block text-sm font-medium text-gray-700">Project</label>
              <select
                name="projectId"
                id="projectId"
                value={formData.projectId}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.projectId ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                disabled={projectId ? true : false}
              >
                <option value="">Select a project</option>
                {projects.map(project => (
                  <option key={project.id} value={project.id}>{project.name}</option>
                ))}
              </select>
              {errors.projectId && (
                <p className="mt-1 text-sm text-red-600">{errors.projectId}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
              <select
                name="status"
                id="status"
                value={formData.status}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.status ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              {errors.status && (
                <p className="mt-1 text-sm text-red-600">{errors.status}</p>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
              <select
                name="priority"
                id="priority"
                value={formData.priority}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700">Assigned To</label>
              <input
                type="text"
                name="assignedTo"
                id="assignedTo"
                value={formData.assignedTo}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter name"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Due Date (optional)</label>
            <input
              type="date"
              name="dueDate"
              id="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <Link to={isEditMode ? `/tasks/${id}` : projectId ? `/projects/${projectId}` : '/tasks'}>
              <Button variant="secondary" type="button">
                Cancel
              </Button>
            </Link>
            <Button variant="primary" type="submit">
              {isEditMode ? 'Update Task' : 'Create Task'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}