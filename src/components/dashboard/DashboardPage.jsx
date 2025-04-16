import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { BarChart, CheckCircle, Clock, PlusCircle, ArrowRight } from 'lucide-react'
import Card from '../common/Card'
import Badge from '../common/Badge'
import Button from '../common/Button'
import { useProjects } from '../../context/ProjectContext'
import { useTasks } from '../../context/TaskContext'

export default function DashboardPage() {
  const { projects } = useProjects()
  const { tasks, getTaskStats } = useTasks()
  const taskStats = getTaskStats()
  
  // Get most recent tasks
  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5)
  
  // Get active projects
  const activeProjects = projects
    .filter(project => project.status !== 'completed')
    .slice(0, 3)

  const getBadgeVariant = (status) => {
    switch (status) {
      case 'completed': return 'success'
      case 'in-progress': return 'primary'
      case 'planning': return 'warning'
      default: return 'default'
    }
  }

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back to your TaskFlow dashboard</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white">
          <div className="flex items-start">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <BarChart size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Total Tasks</h3>
              <p className="text-2xl font-semibold text-gray-900">{taskStats.total}</p>
            </div>
          </div>
        </Card>
        
        <Card className="bg-white">
          <div className="flex items-start">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <CheckCircle size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Completed</h3>
              <p className="text-2xl font-semibold text-gray-900">{taskStats.completed}</p>
            </div>
          </div>
        </Card>
        
        <Card className="bg-white">
          <div className="flex items-start">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <Clock size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">In Progress</h3>
              <p className="text-2xl font-semibold text-gray-900">{taskStats.inProgress}</p>
            </div>
          </div>
        </Card>
        
        <Card className="bg-white">
          <div className="flex items-start">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <Clock size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Projects</h3>
              <p className="text-2xl font-semibold text-gray-900">{projects.length}</p>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Recent Tasks</h2>
            <Link to="/tasks">
              <Button variant="ghost" size="sm">
                View all
                <ArrowRight size={16} className="ml-1" />
              </Button>
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Task
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Project
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentTasks.map((task) => {
                  const project = projects.find(p => p.id === task.projectId)
                  return (
                    <tr key={task.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          <Link to={`/tasks/${task.id}`} className="hover:text-blue-600">
                            {task.title}
                          </Link>
                        </div>
                        <div className="text-sm text-gray-500">
                          {task.description.length > 50 
                            ? `${task.description.substring(0, 50)}...` 
                            : task.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={getBadgeVariant(task.status)}>
                          {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {project?.name || 'Unknown Project'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {task.dueDate ? format(new Date(task.dueDate), 'MMM dd, yyyy') : '-'}
                      </td>
                    </tr>
                  )
                })}
                {recentTasks.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                      No tasks found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
        
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Active Projects</h2>
            <Link to="/projects">
              <Button variant="ghost" size="sm">
                View all
                <ArrowRight size={16} className="ml-1" />
              </Button>
            </Link>
          </div>
          
          <div className="space-y-4">
            {activeProjects.map((project) => (
              <div key={project.id} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                <Link to={`/projects/${project.id}`} className="block group">
                  <h3 className="text-base font-medium text-gray-900 group-hover:text-blue-600">
                    {project.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {project.description.length > 80
                      ? `${project.description.substring(0, 80)}...`
                      : project.description}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <Badge variant={getBadgeVariant(project.status)}>
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {project.dueDate ? format(new Date(project.dueDate), 'MMM dd, yyyy') : 'No due date'}
                    </span>
                  </div>
                </Link>
              </div>
            ))}
            
            {activeProjects.length === 0 && (
              <div className="text-center py-4 text-gray-500">
                No active projects found
              </div>
            )}
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <Link to="/projects/new">
                <Button variant="primary" fullWidth className="flex items-center justify-center">
                  <PlusCircle size={16} className="mr-2" />
                  New Project
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}