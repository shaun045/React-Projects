import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import type { Habit } from '../../App';

interface CalendarProps {
  habits: Habit[];
  streak: number;
}



export default function Calendar({habits, streak}: CalendarProps) {
  function toLocalDateString(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


  const fullyCompletedDates = habits.length > 0
    ? getFullyCompletedDates(habits)
    : [];

  function getFullyCompletedDates(habits: Habit[]): string[] {
    const allDates = habits.flatMap(h => h.completedDates);
    const uniqueDates = [...new Set(allDates)];

    return uniqueDates.filter(date =>
      habits.every(h => h.completedDates.includes(date))
    );
  }

  function tileClassName({date}: {date: Date}) {
    const dateString = toLocalDateString(date);
    if (fullyCompletedDates.includes(dateString)) {
      return 'fully-completed';
    }
    return null;
  }

  return (
    <div className="right-section">
      {/* CALENDAR */}
      <div className="section-card calendar-card">
        <h3 className="title-center">
          Calendar
        </h3>
        <ReactCalendar
          tileClassName={tileClassName}
        />
      </div>
      {/* STREAK */}
      <div className="section-card streak-card">
        <div className="streak-box">
          <h1>{streak}</h1>
          <h2>Day Streak</h2>
        </div>

      </div>

    </div>
  )
}