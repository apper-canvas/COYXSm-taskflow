import { format, isAfter, isBefore, isSameDay, subDays } from 'date-fns';

/**
 * Get all days with completed tasks
 * @param {Array} tasks - Array of task objects
 * @returns {Array} - Array of Date objects for days with completed tasks
 */
export const getCompletedDays = (tasks) => {
  // Get dates when tasks were completed
  const uniqueDates = new Set();
  
  tasks.forEach(task => {
    if (task.completed) {
      // Use completedAt if available, otherwise use createdAt
      const dateStr = task.completedAt || task.createdAt;
      if (dateStr) {
        // Get just the date part (without time) for comparison
        const dateObj = new Date(dateStr);
        uniqueDates.add(format(dateObj, 'yyyy-MM-dd'));
      }
    }
  });
  
  // Convert string dates back to Date objects
  return Array.from(uniqueDates).map(dateStr => new Date(dateStr));
};

/**
 * Calculate current streak of consecutive days with completed tasks
 * @param {Array} completedDays - Array of dates with completed tasks
 * @returns {Number} - Current streak count
 */
export const calculateStreak = (completedDays) => {
  if (!completedDays.length) return 0;
  
  // Sort dates in descending order (newest first)
  const sortedDates = [...completedDays].sort((a, b) => b - a);
  
  // Streak must include either today or yesterday to be current
  const today = new Date();
  const yesterday = subDays(today, 1);
  
  const hasRecentActivity = sortedDates.some(date => 
    isSameDay(date, today) || isSameDay(date, yesterday)
  );
  
  if (!hasRecentActivity) return 0;
  
  // Calculate streak
  let streak = 0;
  let currentDate = isSameDay(sortedDates[0], today) ? today : yesterday;
  
  while (true) {
    // Check if this date has completed tasks
    const hasCompletedTasks = sortedDates.some(date => isSameDay(date, currentDate));
    
    if (hasCompletedTasks) {
      streak++;
      currentDate = subDays(currentDate, 1);
    } else {
      break;
    }
  }
  
  return streak;
};

/**
 * Get the longest streak of consecutive days with completed tasks
 * @param {Array} completedDays - Array of dates with completed tasks
 * @returns {Number} - Longest streak count
 */
export const getLongestStreak = (completedDays) => {
  if (!completedDays.length) return 0;
  
  // Sort dates in ascending order (oldest first)
  const sortedDates = [...completedDays].sort((a, b) => a - b);
  
  let longestStreak = 0;
  let currentStreak = 1;
  
  for (let i = 1; i < sortedDates.length; i++) {
    const currentDate = sortedDates[i];
    const previousDate = sortedDates[i-1];
    
    // Check if dates are consecutive
    const expectedNextDay = new Date(previousDate);
    expectedNextDay.setDate(expectedNextDay.getDate() + 1);
    
    if (isSameDay(currentDate, expectedNextDay)) {
      currentStreak++;
    } else {
      // Streak broken, check if it was the longest so far
      longestStreak = Math.max(longestStreak, currentStreak);
      currentStreak = 1;
    }
  }
  
  // Check once more after the loop
  longestStreak = Math.max(longestStreak, currentStreak);
  
  return longestStreak;
};