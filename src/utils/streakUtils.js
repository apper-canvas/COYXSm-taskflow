/**
 * Calculate the current streak based on completed days
 * @param {Array} completedDays - Array of dates when tasks were completed
 * @returns {number} - Current streak count
 */
export const calculateStreak = (completedDays) => {
  if (!completedDays.length) return 0;
  
  // Sort days in descending order (newest first)
  const sortedDays = [...completedDays].sort((a, b) => b - a);
  
  let currentStreak = 1;
  let currentDate = new Date(sortedDays[0]);
  
  // Check if the most recent day is today or yesterday
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const mostRecentDay = new Date(sortedDays[0]);
  mostRecentDay.setHours(0, 0, 0, 0);
  
  // If the most recent completion is not today or yesterday, the streak is broken
  if (!(mostRecentDay.getTime() === today.getTime() || mostRecentDay.getTime() === yesterday.getTime())) {
    return 0;
  }
  
  // Calculate streak by checking consecutive days
  for (let i = 1; i < sortedDays.length; i++) {
    const previousDate = new Date(currentDate);
    previousDate.setDate(previousDate.getDate() - 1);
    previousDate.setHours(0, 0, 0, 0);
    
    const checkDate = new Date(sortedDays[i]);
    checkDate.setHours(0, 0, 0, 0);
    
    if (previousDate.getTime() === checkDate.getTime()) {
      currentStreak++;
      currentDate = checkDate;
    } else {
      break;
    }
  }
  
  return currentStreak;
};

/**
 * Get the longest streak from an array of completed days
 * @param {Array} completedDays - Array of dates when tasks were completed
 * @returns {number} - Longest streak count
 */
export const getLongestStreak = (completedDays) => {
  if (!completedDays.length) return 0;
  
  // Sort days in ascending order
  const sortedDays = [...completedDays].sort((a, b) => a - b);
  
  let longestStreak = 1;
  let currentStreak = 1;
  
  for (let i = 1; i < sortedDays.length; i++) {
    const previousDate = new Date(sortedDays[i-1]);
    previousDate.setDate(previousDate.getDate() + 1);
    previousDate.setHours(0, 0, 0, 0);
    
    const currentDate = new Date(sortedDays[i]);
    currentDate.setHours(0, 0, 0, 0);
    
    if (previousDate.getTime() === currentDate.getTime()) {
      currentStreak++;
      longestStreak = Math.max(longestStreak, currentStreak);
    } else {
      currentStreak = 1;
    }
  }
  
  return longestStreak;
};

/**
 * Get an array of dates with completed tasks
 * @param {Array} tasks - Array of task objects
 * @returns {Array} - Array of unique dates when tasks were completed
 */
export const getCompletedDays = (tasks) => {
  if (!tasks.length) return [];
  
  const completedDays = tasks
    .filter(task => task.completed && task.completedAt)
    .map(task => {
      const date = new Date(task.completedAt);
      date.setHours(0, 0, 0, 0);
      return date.getTime();
    });
  
  // Get unique dates
  const uniqueDays = [...new Set(completedDays)].map(timestamp => new Date(timestamp));
  
  return uniqueDays;
};