import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { 
  Edit, 
  PlusCircle, 
  Calendar, 
  Clock,
  CheckCircle,
  ArrowLeft,
  Trash2,
  Search
} from 'lucide-react'
import Card from '../common/Card'
import Badge from '../common/Badge'
import Button from '../common/Button'
import { useProjects } from '../../context/ProjectContext'
import { useTasks } from '../../context/TaskContext'

export default function ProjectDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getProject, deleteProject } = useProjects()
  const { getTasks, deleteTask, deleteProjectTasks } = useTasks()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  
  const project = getProject(id)
  const tasks = getTasks(id)
  
  if (!project) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-medium text-gray-900">Project not found</h2>
        <p className="text-gray-500 mt-2">The project you're looking for doesn't exist or has been removed.</p>
        <Link to="/projects" className="mt-4 inline-block">
          <Button variant="primary">Return to Projects</Button>
        </Link>
      </div>
    )
  }
  
  const handleDeleteProject = () => {
    if (window.confirm('Are you sure you want to delete this project? All associated tasks will also be deleted.')) {
      deleteProject(id)
      deleteProjectTasks(id)
      navigate('/projects')
    }
  }
  
  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(taskId)
    }
  }
  
  const filteredTasks = tasks
    .filter(task => task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                   task.description.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(task => statusFilter === 'all' ? true : task.status === statusFilter)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  
  const getBadgeVariant = (status) => {
    switch (status) {
      case 'completed': return 'success'
      case 'in-progress': return 'primary'
      case 'pending': return 'warning'
      default: return 'default'
    }
  }
  
  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(task => task.status === 'completed').length,
    inProgress: tasks.filter(task => task.status === 'in-progress').length,
    pending: tasks.filter(task => task.status === 'pending').length
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex items-center mb-4 sm:mb-0">
          <Link to="/projects" className="mr-4 text-gray-500 hover:text-gray-700">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
            <div className="flex items-center mt-1">
              <Badge variant={getBadgeVariant(project.status)} className="mr-2">
                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </Badge>
              <span className="text-gray-500 text-sm">
                Created on {format(new Date(project.createdAt), 'MMM dd, yyyy')}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Link to={`/projects/${id}/edit`}>
            <Button variant="secondary" className="flex items-center">
              <Edit size={16} className="mr-2" />
              Edit
            </Button>
          </Link>
          <Button 
            variant="danger" 
            className="flex items-center"
            onClick={handleDeleteProject}
          >
            <Trash2 size={16} className="mr-2" />
            Delete
          </Button>
        </div>
      </div>
      
      <Card className="mb-6">
        <h2 className="text-lg font-medium text-gray-900 mb-2">Project Details</h2>
        <p className="text-gray-700 mb-4">{project.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="flex items-center text-gray-700">
            <Calendar size={18} className="mr-2 text-gray-500" />
            <div>
              <div className="text-sm text-gray-500">Due Date</div>
              <div>{project.dueDate ? format(new Date(project.dueDate), 'MMM dd, yyyy') : 'No due date'}</div>
            </div>
          </div>
          
          <div className="flex items-center text-gray-700">
            <Clock size={18} className="mr-2 text-gray-500" />
            <div>
              <div className="text-sm text-gray-500">Priority</div>
              <div className="capitalize">{project.priority || 'Not set'}</div>
            </div>
          </div>
        </div>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <CheckCircle size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Total Tasks</h3>
              <p className="text-2xl font-semibold text-gray-900">{taskStats.total}</p>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <CheckCircle size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Completed</h3>
              <p className="text-2xl font-semibold text-gray-900">{taskStats.completed}</p>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <Clock size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">In Progress</h3>
              <p className="text-2xl font-semibold text-gray-900">{taskStats.inProgress}</p>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 sm:mb-0">Tasks</h2>
        <Link to={`/projects/${id}/tasks/new`}>
          <Button variant="primary" className="flex items-center">
            <PlusCircle size={18} className="mr-2" />
            Add Task
          </Button>
        </Link>
      </div>
      
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search tasks"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <select
              className="border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </Card>
      
      {filteredTasks.length > 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {filteredTasks.map((task) => (
              <li key={task.id} className="hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <Link to={`/tasks/${task.id}`} className="text-lg font-medium text-blue-600 truncate">
                      {task.title}
                    </Link>
                    <div className="ml-2 flex-shrink-0 flex">
                      <Badge variant={getBadgeVariant(task.status)}>
                        {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        {task.description.length > 100 
                          ? `${task.description.substring(0, 100)}...` 
                          : task.description}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <Calendar size={16} className="mr-1.5 text-gray-400" />
                      <p>
                        Due: {task.dueDate ? format(new Date(task.dueDate), 'MMM dd, yyyy') : 'No due date'}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end space-x-2">
                    <Link to={`/tasks/${task.id}/edit`}>
                      <Button variant="secondary" size="sm">
                        <Edit size={16} className="mr-1" />
                        Edit
                      </Button>
                    </Link>
                    <Button 
                      variant="danger" 
                      size="sm"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      <Trash2 size={16} className="mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <Card className="p-8 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
          <p className="text-gray-500 mb-6">
            {searchTerm || statusFilter !== 'all' 
              ? 'Try adjusting your search or filter criteria.' 
              : 'Get started by creating your first task for this project.'}
          </p>
          <Link to={`/projects/${id}/tasks/new`}>
            <Button variant="primary" className="inline-flex items-center">
              <PlusCircle size={18} className="mr-2" />
              Create Task
            </Button>
          </Link>
        </Card>
      )}
    </div>
  )
}