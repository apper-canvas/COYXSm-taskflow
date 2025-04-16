const STREAK_DATA_KEY = 'streak_data';

/**
 * Get the stored streak data from localStorage
 * @returns {Object} The streak data object
 */
export const getStreakData = () => {
  const storedData = localStorage.getItem(STREAK_DATA_KEY);
  if (storedData) {
    return JSON.parse(storedData);
  }
  
  // Default streak data
  return {
    currentStreak: 0,
    longestStreak: 0,
    lastCompletedDate: null,
    completedDays: []
  };
};

/**
 * Save streak data to localStorage
 * @param {Object} streakData - The streak data to save
 */
export const saveStreakData = (streakData) => {
  localStorage.setItem(STREAK_DATA_KEY, JSON.stringify(streakData));
};

/**
 * Check and update daily streak
 * This function should be called once when the app loads
 * @returns {Object} Updated streak data
 */
export const checkAndUpdateDailyStreak = () => {
  const streakData = getStreakData();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // If we don't have data yet, initialize with demo data
  if (!streakData.completedDays.length) {
    const demoData = generateDemoStreakData();
    saveStreakData(demoData);
    return demoData;
  }
  
  // Check if the last completed date exists
  if (streakData.lastCompletedDate) {
    const lastDate = new Date(streakData.lastCompletedDate);
    lastDate.setHours(0, 0, 0, 0);
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // If the last completed date is not today or yesterday, reset streak
    if (!(lastDate.getTime() === today.getTime() || lastDate.getTime() === yesterday.getTime())) {
      streakData.currentStreak = 0;
    }
  }
  
  saveStreakData(streakData);
  return streakData;
};

/**
 * Mark a day as completed and update the streak
 * @param {Date} date - The date to mark as completed
 * @returns {Object} Updated streak data
 */
export const markDayAsCompleted = (date = new Date()) => {
  const streakData = getStreakData();
  const completionDate = new Date(date);
  completionDate.setHours(0, 0, 0, 0);
  
  // Check if this date is already marked as completed
  const isAlreadyCompleted = streakData.completedDays.some(dayStr => {
    const day = new Date(dayStr);
    return day.getTime() === completionDate.getTime();
  });
  
  if (!isAlreadyCompleted) {
    streakData.completedDays.push(completionDate.toISOString());
    streakData.lastCompletedDate = completionDate.toISOString();
    
    // Update current streak
    if (streakData.currentStreak === 0) {
      streakData.currentStreak = 1;
    } else {
      const yesterday = new Date(completionDate);
      yesterday.setDate(yesterday.getDate() - 1);
      
      const isYesterdayCompleted = streakData.completedDays.some(dayStr => {
        const day = new Date(dayStr);
        return day.getTime() === yesterday.getTime();
      });
      
      if (isYesterdayCompleted) {
        streakData.currentStreak += 1;
      }
    }
    
    // Update longest streak if needed
    if (streakData.currentStreak > streakData.longestStreak) {
      streakData.longestStreak = streakData.currentStreak;
    }
    
    saveStreakData(streakData);
  }
  
  return streakData;
};

/**
 * Generate demo streak data for initial setup
 * @returns {Object} Demo streak data
 */
const generateDemoStreakData = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const completedDays = [];
  let currentDate = new Date(today);
  
  // Add today
  completedDays.push(new Date(currentDate).toISOString());
  
  // Add yesterday
  currentDate.setDate(currentDate.getDate() - 1);
  completedDays.push(new Date(currentDate).toISOString());
  
  // Add the day before yesterday
  currentDate.setDate(currentDate.getDate() - 1);
  completedDays.push(new Date(currentDate).toISOString());
  
  // Add some random days in the past 30 days
  for (let i = 0; i < 15; i++) {
    const randomDaysAgo = Math.floor(Math.random() * 30) + 3; // Between 3 and 32 days ago
    const randomDate = new Date(today);
    randomDate.setDate(randomDate.getDate() - randomDaysAgo);
    randomDate.setHours(0, 0, 0, 0);
    completedDays.push(randomDate.toISOString());
  }
  
  return {
    currentStreak: 3, // Today, yesterday, and the day before
    longestStreak: 3,
    lastCompletedDate: today.toISOString(),
    completedDays: completedDays
  };
};