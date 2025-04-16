import { useState } from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { Search, Filter, Edit, Trash2 } from 'lucide-react'
import Card from '../common/Card'
import Badge from '../common/Badge'
import Button from '../common/Button'
import { useProjects } from '../../context/ProjectContext'
import { useTasks } from '../../context/TaskContext'

export default function TasksPage() {
  const { projects } = useProjects()
  const { tasks, deleteTask } = useTasks()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [projectFilter, setProjectFilter] = useState('all')
  
  const handleDeleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(id)
    }
  }
  
  const filteredTasks = tasks
    .filter(task => task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                   task.description.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(task => statusFilter === 'all' ? true : task.status === statusFilter)
    .filter(task => projectFilter === 'all' ? true : task.projectId === projectFilter)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  
  const getBadgeVariant = (status) => {
    switch (status) {
      case 'completed': return 'success'
      case 'in-progress': return 'primary'
      case 'pending': return 'warning'
      default: return 'default'
    }
  }

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">All Tasks</h1>
        <p className="text-gray-600 mt-1">View and manage tasks across all projects</p>
      </header>
      
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
          
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <div className="flex items-center space-x-2">
              <Filter size={18} className="text-gray-400" />
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
            
            <div className="flex items-center space-x-2">
              <select
                className="border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={projectFilter}
                onChange={(e) => setProjectFilter(e.target.value)}
              >
                <option value="all">All projects</option>
                {projects.map(project => (
                  <option key={project.id} value={project.id}>{project.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </Card>
      
      {filteredTasks.length > 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {filteredTasks.map((task) => {
              const project = projects.find(p => p.id === task.projectId)
              return (
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
                        <Link to={`/projects/${task.projectId}`} className="text-blue-600 font-medium">
                          {project?.name || 'Unknown Project'}
                        </Link>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <p>
                        Due: {task.dueDate ? format(new Date(task.dueDate), 'MMM dd, yyyy') : 'No due date'}
                      </p>
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
              )
            })}
          </ul>
        </div>
      ) : (
        <Card className="p-8 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
          <p className="text-gray-500 mb-6">
            {searchTerm || statusFilter !== 'all' || projectFilter !== 'all' 
              ? 'Try adjusting your search or filter criteria.' 
              : 'Create tasks within your projects to start tracking your work.'}
          </p>
          <Link to="/projects">
            <Button variant="primary">
              Go to Projects
            </Button>
          </Link>
        </Card>
      )}
    </div>
  )
}