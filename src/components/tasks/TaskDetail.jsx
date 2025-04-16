import { useParams, Link, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { ArrowLeft, Edit, Trash2, Calendar, User } from 'lucide-react'
import Card from '../common/Card'
import Badge from '../common/Badge'
import Button from '../common/Button'
import { useProjects } from '../../context/ProjectContext'
import { useTasks } from '../../context/TaskContext'

export default function TaskDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { projects } = useProjects()
  const { getTask, deleteTask } = useTasks()
  
  const task = getTask(id)
  
  if (!task) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-medium text-gray-900">Task not found</h2>
        <p className="text-gray-500 mt-2">The task you're looking for doesn't exist or has been removed.</p>
        <Link to="/tasks" className="mt-4 inline-block">
          <Button variant="primary">Return to Tasks</Button>
        </Link>
      </div>
    )
  }
  
  const project = projects.find(p => p.id === task.projectId)
  
  const handleDeleteTask = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(id)
      navigate('/tasks')
    }
  }
  
  const getBadgeVariant = (status) => {
    switch (status) {
      case 'completed': return 'success'
      case 'in-progress': return 'primary'
      case 'pending': return 'warning'
      default: return 'default'
    }
  }
  
  const getPriorityBadgeVariant = (priority) => {
    switch (priority) {
      case 'high': return 'danger'
      case 'medium': return 'warning'
      case 'low': return 'primary'
      default: return 'default'
    }
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <Link to="/tasks" className="mr-4 text-gray-500 hover:text-gray-700">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{task.title}</h1>
          <div className="flex items-center mt-1">
            <Badge variant={getBadgeVariant(task.status)} className="mr-2">
              {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
            </Badge>
            <Link to={`/projects/${task.projectId}`} className="text-blue-600 text-sm hover:underline">
              {project?.name || 'Unknown Project'}
            </Link>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end mb-6 space-x-2">
        <Link to={`/tasks/${id}/edit`}>
          <Button variant="secondary" className="flex items-center">
            <Edit size={16} className="mr-2" />
            Edit
          </Button>
        </Link>
        <Button 
          variant="danger" 
          className="flex items-center"
          onClick={handleDeleteTask}
        >
          <Trash2 size={16} className="mr-2" />
          Delete
        </Button>
      </div>
      
      <Card className="mb-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Task Details</h2>
        
        <div className="prose max-w-full mb-6">
          <p className="text-gray-700">{task.description}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center">
            <Calendar size={20} className="text-gray-400 mr-2" />
            <div>
              <div className="text-sm text-gray-500">Created</div>
              <div>{format(new Date(task.createdAt), 'MMM dd, yyyy')}</div>
            </div>
          </div>
          
          <div className="flex items-center">
            <Calendar size={20} className="text-gray-400 mr-2" />
            <div>
              <div className="text-sm text-gray-500">Due Date</div>
              <div>{task.dueDate ? format(new Date(task.dueDate), 'MMM dd, yyyy') : 'No due date'}</div>
            </div>
          </div>
          
          <div className="flex items-center">
            <User size={20} className="text-gray-400 mr-2" />
            <div>
              <div className="text-sm text-gray-500">Assigned To</div>
              <div>{task.assignedTo || 'Unassigned'}</div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center mt-6">
          <div className="mr-6">
            <div className="text-sm text-gray-500">Priority</div>
            <Badge variant={getPriorityBadgeVariant(task.priority)} className="mt-1">
              {task.priority ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1) : 'None'}
            </Badge>
          </div>
        </div>
      </Card>
    </div>
  )
}