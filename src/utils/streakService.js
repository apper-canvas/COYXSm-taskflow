import { format, isSameDay, startOfDay } from 'date-fns';
import { calculateStreak, getCompletedDays, getLongestStreak } from './streakUtils';

/**
 * Initialize streak data in local storage if it doesn't exist
 * @returns {Object} Current streak data
 */
export const initializeStreakData = () => {
  const existingData = localStorage.getItem('streakData');
  
  if (!existingData) {
    const initialData = {
      currentStreak: 0,
      longestStreak: 0,
      lastUpdated: new Date().toISOString(),
      completedDays: []
    };
    
    localStorage.setItem('streakData', JSON.stringify(initialData));
    return initialData;
  }
  
  return JSON.parse(existingData);
};

/**
 * Get current streak data from storage
 * @returns {Object} Current streak data
 */
export const getStreakData = () => {
  const streakData = localStorage.getItem('streakData');
  return streakData ? JSON.parse(streakData) : initializeStreakData();
};

/**
 * Save streak data to storage
 * @param {Object} data - Streak data to save
 */
export const saveStreakData = (data) => {
  localStorage.setItem('streakData', JSON.stringify(data));
};

/**
 * Update streak data based on task completion
 * @param {Object} task - The completed task
 * @returns {Object} Updated streak data
 */
export const updateStreakOnTaskCompletion = (task) => {
  if (!task.completed) return getStreakData();
  
  // Get existing streak data
  const streakData = getStreakData();
  
  // Get the completed date
  const completionDate = task.completedAt ? new Date(task.completedAt) : new Date();
  const dateString = format(completionDate, 'yyyy-MM-dd');
  
  // Check if this date is already recorded
  const existingDays = new Set(streakData.completedDays);
  if (!existingDays.has(dateString)) {
    existingDays.add(dateString);
  }
  
  // Convert back to array and transform to Date objects for calculations
  const completedDaysArray = Array.from(existingDays);
  const completedDaysAsDate = completedDaysArray.map(dateStr => new Date(dateStr));
  
  // Recalculate streaks
  const currentStreak = calculateStreak(completedDaysAsDate);
  const longestStreak = Math.max(streakData.longestStreak, currentStreak);
  
  // Update streak data
  const updatedData = {
    currentStreak,
    longestStreak,
    lastUpdated: new Date().toISOString(),
    completedDays: completedDaysArray
  };
  
  // Save updated data
  saveStreakData(updatedData);
  
  return updatedData;
};

/**
 * Check if streak needs to be updated for a new day
 * @returns {Object} Current streak data after check
 */
export const checkAndUpdateDailyStreak = () => {
  const streakData = getStreakData();
  const lastUpdated = new Date(streakData.lastUpdated);
  const today = startOfDay(new Date());
  
  // If already updated today, just return current data
  if (isSameDay(lastUpdated, today)) {
    return streakData;
  }
  
  // Get all tasks to recalculate streak
  const savedTasks = localStorage.getItem('tasks');
  const tasks = savedTasks ? JSON.parse(savedTasks) : [];
  
  // Recalculate completed days
  const completedDays = getCompletedDays(tasks);
  const completedDaysStrings = completedDays.map(date => format(date, 'yyyy-MM-dd'));
  
  // Recalculate streaks
  const currentStreak = calculateStreak(completedDays);
  const longestStreak = Math.max(streakData.longestStreak, getLongestStreak(completedDays));
  
  // Update streak data
  const updatedData = {
    currentStreak,
    longestStreak,
    lastUpdated: today.toISOString(),
    completedDays: completedDaysStrings
  };
  
  // Save updated data
  saveStreakData(updatedData);
  
  return updatedData;
};

/**
 * Reset streak data
 * @returns {Object} Reset streak data
 */
export const resetStreakData = () => {
  const resetData = {
    currentStreak: 0,
    longestStreak: 0,
    lastUpdated: new Date().toISOString(),
    completedDays: []
  };
  
  saveStreakData(resetData);
  return resetData;
};