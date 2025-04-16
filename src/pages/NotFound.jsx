import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

const NotFound = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto text-center"
      >
        <div className="mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-9xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          >
            404
          </motion.div>
          <h1 className="text-2xl font-bold mt-4 mb-2">Page Not Found</h1>
          <p className="text-surface-600 dark:text-surface-400">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 btn btn-primary"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default NotFound