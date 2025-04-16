import { createContext, useContext, useState, useEffect } from 'react'

const ProjectContext = createContext(null)

// Sample project data
const initialProjects = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Redesign company website with modern UI/UX',
    status: 'in-progress',
    priority: 'high',
    createdAt: '2023-05-10T10:00:00Z',
    dueDate: '2023-07-30T23:59:59Z'
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'Develop a mobile app for iOS and Android',
    status: 'planning',
    priority: 'medium',
    createdAt: '2023-06-15T14:30:00Z',
    dueDate: '2023-12-01T23:59:59Z'
  },
  {
    id: '3',
    name: 'Marketing Campaign',
    description: 'Q4 product marketing campaign',
    status: 'completed',
    priority: 'high',
    createdAt: '2023-04-20T09:15:00Z',
    dueDate: '2023-06-30T23:59:59Z'
  }
]

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem('projects')
    return savedProjects ? JSON.parse(savedProjects) : initialProjects
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects))
  }, [projects])

  const getProject = (id) => {
    return projects.find(project => project.id === id) || null
  }

  const addProject = (project) => {
    const newProject = {
      ...project,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    setProjects([...projects, newProject])
    return newProject
  }

  const updateProject = (id, updatedData) => {
    const updatedProjects = projects.map(project => 
      project.id === id ? { ...project, ...updatedData } : project
    )
    setProjects(updatedProjects)
  }

  const deleteProject = (id) => {
    setProjects(projects.filter(project => project.id !== id))
  }

  const value = {
    projects,
    isLoading,
    getProject,
    addProject,
    updateProject,
    deleteProject
  }

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  )
}

export const useProjects = () => {
  const context = useContext(ProjectContext)
  if (context === null) {
    throw new Error('useProjects must be used within a ProjectProvider')
  }
  return context
}