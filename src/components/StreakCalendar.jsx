import { useState, useEffect } from 'react';
import { format, eachDayOfInterval, subDays, isEqual, isSameDay } from 'date-fns';

const StreakCalendar = ({ completedDays }) => {
  const [calendarDays, setCalendarDays] = useState([]);

  useEffect(() => {
    // Generate an array of the last 35 days
    const endDate = new Date();
    const startDate = subDays(endDate, 34);
    const daysArray = eachDayOfInterval({ start: startDate, end: endDate });
    setCalendarDays(daysArray);
  }, []);

  const isCompletedDay = (date) => {
    return completedDays.some(completedDate => isSameDay(completedDate, date));
  };

  // Group days into weeks for better display
  const weeks = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push(calendarDays.slice(i, i + 7));
  }

  return (
    <div className="streak-calendar">
      <div className="grid grid-cols-7 gap-1 text-xs mb-2 text-center text-surface-500">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {weeks.map((week, weekIndex) => (
        <div key={weekIndex} className="grid grid-cols-7 gap-1 mb-1">
          {week.map((day, dayIndex) => (
            <div 
              key={dayIndex}
              className={`aspect-square rounded-sm flex items-center justify-center text-xs
                ${isCompletedDay(day) 
                  ? 'bg-primary dark:bg-primary-dark text-white' 
                  : 'bg-surface-100 dark:bg-surface-700 text-surface-500 dark:text-surface-400'
                }
                ${isSameDay(day, new Date()) ? 'ring-2 ring-offset-2 ring-primary dark:ring-primary-light' : ''}
              `}
              title={format(day, 'PPP')}
            >
              {format(day, 'd')}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default StreakCalendar;