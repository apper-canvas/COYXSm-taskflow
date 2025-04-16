import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Card from '../common/Card'
import Button from '../common/Button'
import { useProjects } from '../../context/ProjectContext'

export default function ProjectForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { getProject, addProject, updateProject } = useProjects()
  const isEditMode = Boolean(id)
  
  const defaultFormData = {
    name: '',
    description: '',
    status: 'planning',
    priority: 'medium',
    dueDate: ''
  }
  
  const [formData, setFormData] = useState(defaultFormData)
  const [errors, setErrors] = useState({})
  
  useEffect(() => {
    if (isEditMode) {
      const project = getProject(id)
      if (project) {
        // Format date for input field
        const formattedDueDate = project.dueDate 
          ? new Date(project.dueDate).toISOString().split('T')[0] 
          : ''
        
        setFormData({
          ...project,
          dueDate: formattedDueDate
        })
      } else {
        navigate('/projects')
      }
    }
  }, [id, isEditMode, getProject, navigate])
  
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
    if (!formData.name.trim()) {
      newErrors.name = 'Project name is required'
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }
    if (!formData.status) {
      newErrors.status = 'Status is required'
    }
    if (!formData.priority) {
      newErrors.priority = 'Priority is required'
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
    
    const projectData = {
      ...formData,
      // Make sure dueDate is in ISO format if present
      dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null
    }
    
    if (isEditMode) {
      updateProject(id, projectData)
      navigate(`/projects/${id}`)
    } else {
      const newProject = addProject(projectData)
      navigate(`/projects/${newProject.id}`)
    }
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <Link to={isEditMode ? `/projects/${id}` : '/projects'} className="mr-4 text-gray-500 hover:text-gray-700">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEditMode ? 'Edit Project' : 'Create New Project'}
        </h1>
      </div>
      
      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Project Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.name ? 'border-red-300' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
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
                <option value="planning">Planning</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              {errors.status && (
                <p className="mt-1 text-sm text-red-600">{errors.status}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
              <select
                name="priority"
                id="priority"
                value={formData.priority}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.priority ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              {errors.priority && (
                <p className="mt-1 text-sm text-red-600">{errors.priority}</p>
              )}
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
            <Link to={isEditMode ? `/projects/${id}` : '/projects'}>
              <Button variant="secondary" type="button">
                Cancel
              </Button>
            </Link>
            <Button variant="primary" type="submit">
              {isEditMode ? 'Update Project' : 'Create Project'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}