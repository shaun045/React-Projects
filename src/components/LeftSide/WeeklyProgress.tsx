import type { Habit } from "../../App"

interface WeeklyProgressProps {
  habits: Habit[];
  today: string;
}

export default function WeeklyProgress({ habits }: WeeklyProgressProps) {

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const completedDays = days.filter(day =>
    habits.length > 0 && habits.every(h => h.completedDays.includes(day))
  ).length;

  const percentage = completedDays / 7;
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const filledLength = percentage * circumference;

  return (
    <div className="section-card this-week">
      <div className='first-section'>
        <h3>This Week</h3>
        <div className="weekly-wrapper">
          <div className="week-bars">
            {days.map((day) => {
              const count = habits.filter(h => h.completedDays.includes(day)).length;
              const maxHeight = 100;
              const height = habits.length > 0 ? (count / habits.length) * maxHeight : 0;

              return (
                <div key={day} className="day-container">
                  <div className="day-bar" style={{ height: `${height}px` }}></div>
                  <p className="day-container-daylist">{day}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className='second-section'>
        <div className="overall-progress">
          <p>Overall Progress</p>

          <div>
            <svg width="150" height="150" viewBox="0 0 80 80">
              <circle
                cx="40" cy="40" r={radius}
                fill="none"
                stroke="#e0e0e0"
                strokeWidth="8"
              />
              <circle
                cx="40" cy="40" r={radius}
                fill="none"
                stroke="#4caf50"
                strokeWidth="8"
                strokeDasharray={`${filledLength} ${circumference}`}
                strokeLinecap="round"
                transform="rotate(-90 40 40)"
                style={{
                  transition: "stroke-dasharray 0.6s ease"
                }}
              />
              <text
                x="40"
                y="40"
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="18"
                fontWeight="bold"
                fill="#333"
              >
                {completedDays}/7
              </text>
            </svg>
          </div>

        </div>
      </div>
    </div>
  )
}