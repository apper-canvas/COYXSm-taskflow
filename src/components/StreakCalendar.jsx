import { useState } from 'react';
import { format, subDays, isSameDay, isToday } from 'date-fns';

const StreakCalendar = ({ completedDays }) => {
  const [hoveredDay, setHoveredDay] = useState(null);
  
  // Generate the last 35 days (5 weeks)
  const generateCalendarDays = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 34; i >= 0; i--) {
      days.push(subDays(today, i));
    }
    
    return days;
  };
  
  const calendarDays = generateCalendarDays();
  
  // Get day names for the first week (Sunday to Saturday)
  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  
  // Check if a day has completed tasks
  const isDayCompleted = (day) => {
    return completedDays.some(completedDay => 
      isSameDay(new Date(completedDay), day)
    );
  };
  
  // Get tooltip position adjustment to prevent it from going off-screen
  const getTooltipPosition = (index) => {
    // For the first 7 days (first column), position tooltip to the right
    if (index % 7 === 0) return 'left-0';
    // For the last 7 days (last column), position tooltip to the left
    if (index % 7 === 6) return 'right-0';
    // For middle days, center the tooltip
    return 'left-1/2 -translate-x-1/2';
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-max">
        {/* Day names header */}
        <div className="calendar-grid mb-2">
          {dayNames.map((day, index) => (
            <div key={index} className="text-center text-xs text-surface-500">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar grid */}
        <div className="calendar-grid">
          {calendarDays.map((day, index) => {
            const isCompleted = isDayCompleted(day);
            const dayClasses = `
              streak-day 
              ${isCompleted ? 'streak-day-completed' : 'streak-day-empty'} 
              ${isToday(day) ? 'streak-day-today' : ''}
            `;
            
            return (
              <div 
                key={index} 
                className="relative"
                onMouseEnter={() => setHoveredDay(day)}
                onMouseLeave={() => setHoveredDay(null)}
              >
                <div className={dayClasses}>
                  {format(day, 'd')}
                </div>
                
                {/* Tooltip */}
                {hoveredDay && isSameDay(hoveredDay, day) && (
                  <div 
                    className={`absolute top-full mt-1 z-10 bg-surface-800 dark:bg-surface-900 text-white rounded-md py-1 px-2 text-xs whitespace-nowrap ${getTooltipPosition(index)}`}
                  >
                    <div className="font-semibold">{format(day, 'PPP')}</div>
                    <div>
                      {isCompleted 
                        ? "Completed tasks ✓" 
                        : "No completed tasks"}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StreakCalendar;