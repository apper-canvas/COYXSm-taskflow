import { useState } from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { PlusCircle, Search, Filter, Edit, Trash2 } from 'lucide-react'
import Card from '../common/Card'
import Badge from '../common/Badge'
import Button from '../common/Button'
import { useProjects } from '../../context/ProjectContext'
import { useTasks } from '../../context/TaskContext'

export default function ProjectsPage() {
  const { projects, deleteProject } = useProjects()
  const { deleteProjectTasks } = useTasks()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  
  const handleDeleteProject = (id) => {
    if (window.confirm('Are you sure you want to delete this project? All associated tasks will also be deleted.')) {
      deleteProject(id)
      deleteProjectTasks(id)
    }
  }
  
  const filteredProjects = projects
    .filter(project => project.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                      project.description.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(project => statusFilter === 'all' ? true : project.status === statusFilter)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  
  const getBadgeVariant = (status) => {
    switch (status) {
      case 'completed': return 'success'
      case 'in-progress': return 'primary'
      case 'planning': return 'warning'
      default: return 'default'
    }
  }

  return (
    <div>
      <header className="mb-8 flex flex-col sm:flex-row justify-between sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600 mt-1">Manage your projects</p>
        </div>
        <Link to="/projects/new">
          <Button variant="primary" className="flex items-center">
            <PlusCircle size={18} className="mr-2" />
            New Project
          </Button>
        </Link>
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
              placeholder="Search projects"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter size={18} className="text-gray-400" />
            <select
              className="border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All status</option>
              <option value="planning">Planning</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="flex flex-col" hover>
            <Link to={`/projects/${project.id}`} className="flex-1">
              <div className="mb-4">
                <Badge variant={getBadgeVariant(project.status)}>
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </Badge>
                <h3 className="text-lg font-medium text-gray-900 mt-2">{project.name}</h3>
                <p className="text-gray-500 mt-1 line-clamp-2">{project.description}</p>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mt-auto">
                <div className="flex justify-between text-sm text-gray-500">
                  <div>Created: {format(new Date(project.createdAt), 'MMM dd, yyyy')}</div>
                  <div>
                    {project.dueDate ? `Due: ${format(new Date(project.dueDate), 'MMM dd, yyyy')}` : 'No due date'}
                  </div>
                </div>
              </div>
            </Link>
            
            <div className="flex justify-end mt-4 pt-4 border-t border-gray-200">
              <Link to={`/projects/${project.id}/edit`}>
                <Button variant="secondary" size="sm" className="mr-2">
                  <Edit size={16} className="mr-1" />
                  Edit
                </Button>
              </Link>
              <Button 
                variant="danger" 
                size="sm" 
                onClick={() => handleDeleteProject(project.id)}
              >
                <Trash2 size={16} className="mr-1" />
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
      
      {filteredProjects.length === 0 && (
        <Card className="p-8 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
          <p className="text-gray-500 mb-6">
            {searchTerm || statusFilter !== 'all' 
              ? 'Try adjusting your search or filter criteria.' 
              : 'Get started by creating your first project.'}
          </p>
          <Link to="/projects/new">
            <Button variant="primary" className="inline-flex items-center">
              <PlusCircle size={18} className="mr-2" />
              Create Project
            </Button>
          </Link>
        </Card>
      )}
    </div>
  )
}