import { Button } from 'react-bootstrap'
import type { Habit } from '../../App'

interface HabitProps {
  habits: Habit[]
  addHabit: () => void;
  deleteHabit: (id: number) => void;
  editHabit: () => void;
}

export default function LeftSide({
    habits, 
    addHabit, 
    deleteHabit, 
    editHabit,
  }: HabitProps) {
  return (
    <div className="left-section">

        {/* WEEKLY PROGRESS */}
        <div className="section-card this-week">
          <div className='first-section'>
            <h3>This Week</h3>
            <div className="weekly-wrapper">
              <div className="week-bars">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                  <div key={day} className="day-container">
                    <div className="day-bar"></div>
                    <p>{day}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className='second-section'>
            <div className="overall-progress">
              <p>Overall Progress</p>

              <div className="circle-progress">
                7/7
              </div>
            </div>
          </div>
        </div>

        {/* HABIT LIST */}
        <div className="section-card">

          <h3 className="title-center">
            Habit List
          </h3>

          <div className="habit-actions">
            <Button 
              variant="primary"
              onClick={addHabit}
            >
              Add Habit
            </Button>

            <select 
              className="form-select filter-habits" 
              aria-label="Default select example">
              <option value="1">All</option>
              <option value="2">Done</option>
              <option value="3">Not Done</option>
            </select>
          </div>

          <div className="habit-list">
            {habits.map((habit) => (

              <div className="habit-item" key={habit.id}>
                <label>
                  <input type="checkbox" />
                  <h3>{habit.title}</h3>
                
                  <div className="habit-buttons">
                    <Button 
                      type='button' 
                      className='btn btn-success'
                      onClick={editHabit}
                    >
                      Edit
                    </Button>
                    <Button 
                      type='button' 
                      className='btn btn-danger'
                      onClick={() => deleteHabit(habit.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </label>
              </div>

            ))}
          </div>

        </div>

      </div>
  )
}