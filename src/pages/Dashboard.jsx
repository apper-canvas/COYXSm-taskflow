import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format, isSameDay } from 'date-fns';
import { Trophy, Calendar, CheckCircle, ArrowRight, Flame } from 'lucide-react';
import StreakCalendar from '../components/StreakCalendar';
import { calculateStreak, getCompletedDays, getLongestStreak } from '../utils/streakUtils';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [completedDays, setCompletedDays] = useState([]);
  const [completionRate, setCompletionRate] = useState(0);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    const parsedTasks = savedTasks ? JSON.parse(savedTasks) : [];
    setTasks(parsedTasks);

    // Calculate streaks and stats
    const completed = getCompletedDays(parsedTasks);
    setCompletedDays(completed);
    
    const current = calculateStreak(completed);
    setCurrentStreak(current);
    
    const longest = getLongestStreak(completed);
    setLongestStreak(longest);

    // Calculate completion rate (tasks completed / total tasks)
    const completedTasks = parsedTasks.filter(task => task.completed).length;
    const totalTasks = parsedTasks.length;
    const rate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    setCompletionRate(rate);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="container mx-auto px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto"
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Your Productivity Dashboard
          </h1>
          <p className="text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
            Track your task completion streaks and productivity trends to build consistent habits.
          </p>
        </div>

        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <p className="text-surface-500 dark:text-surface-400 text-sm">Current Streak</p>
              <Flame size={20} className="text-primary dark:text-primary-light" />
            </div>
            <div className="flex items-end mt-2">
              <p className="text-3xl font-bold">{currentStreak}</p>
              <p className="text-surface-500 dark:text-surface-400 ml-1 mb-1 text-sm">days</p>
            </div>
            <p className="text-xs text-surface-500 mt-1">
              {currentStreak > 0 
                ? "Keep going! You're building a habit." 
                : "Complete a task today to start your streak!"}
            </p>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between">
              <p className="text-surface-500 dark:text-surface-400 text-sm">Longest Streak</p>
              <Trophy size={20} className="text-yellow-500" />
            </div>
            <div className="flex items-end mt-2">
              <p className="text-3xl font-bold">{longestStreak}</p>
              <p className="text-surface-500 dark:text-surface-400 ml-1 mb-1 text-sm">days</p>
            </div>
            <p className="text-xs text-surface-500 mt-1">
              {longestStreak > 0 
                ? `Your record is ${longestStreak} days in a row!` 
                : "Complete daily tasks to build your streak!"}
            </p>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between">
              <p className="text-surface-500 dark:text-surface-400 text-sm">Completion Rate</p>
              <CheckCircle size={20} className="text-green-500" />
            </div>
            <div className="flex items-end mt-2">
              <p className="text-3xl font-bold">{completionRate}%</p>
            </div>
            <div className="w-full bg-surface-200 dark:bg-surface-600 h-2 rounded-full mt-2">
              <div 
                className="bg-green-500 h-2 rounded-full" 
                style={{ width: `${completionRate}%` }}
              ></div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between">
              <p className="text-surface-500 dark:text-surface-400 text-sm">Active Days</p>
              <Calendar size={20} className="text-blue-500" />
            </div>
            <div className="flex items-end mt-2">
              <p className="text-3xl font-bold">{completedDays.length}</p>
              <p className="text-surface-500 dark:text-surface-400 ml-1 mb-1 text-sm">days</p>
            </div>
            <p className="text-xs text-surface-500 mt-1">
              Days with at least one completed task
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-surface-800 rounded-2xl p-6 border border-surface-200 dark:border-surface-700 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Completion Streak Calendar</h2>
            <span className="text-xs text-surface-500 dark:text-surface-400 bg-surface-100 dark:bg-surface-700 px-2 py-1 rounded-md">
              Last 35 days
            </span>
          </div>
          
          <StreakCalendar completedDays={completedDays} />
          
          <div className="flex justify-center mt-4 text-sm text-surface-500">
            <div className="flex items-center mr-4">
              <div className="w-3 h-3 rounded-sm bg-primary mr-1"></div>
              <span>Completed tasks</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-sm bg-surface-100 dark:bg-surface-700 mr-1"></div>
              <span>No completed tasks</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-surface-800 rounded-2xl p-6 border border-surface-200 dark:border-surface-700"
        >
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          
          {tasks.length > 0 ? (
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2 scrollbar-hide">
              {tasks
                .filter(task => task.completed)
                .sort((a, b) => new Date(b.completedAt || b.createdAt) - new Date(a.completedAt || a.createdAt))
                .slice(0, 5)
                .map(task => (
                  <div 
                    key={task.id}
                    className="flex items-center p-3 bg-surface-50 dark:bg-surface-700 rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{task.title}</p>
                      <p className="text-xs text-surface-500 dark:text-surface-400">
                        Completed: {task.completedAt ? format(new Date(task.completedAt), 'PPP') : 'Unknown'}
                      </p>
                    </div>
                    {task.priority && (
                      <span className={`priority-badge priority-${task.priority} ml-2`}>
                        {task.priority}
                      </span>
                    )}
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-8 text-surface-500 dark:text-surface-400">
              <p>No completed tasks yet.</p>
              <p className="text-sm mt-2">Complete tasks to see your activity here!</p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;