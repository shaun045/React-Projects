import { Button } from 'react-bootstrap'
import type { Habit } from '../../App'
import WeeklyProgress from './WeeklyProgress'

interface HabitProps {
  habits: Habit[]
  addHabit: () => void;
  deleteHabit: (id: number) => void;
  editHabit: (id: number) => void;

  editId: number | null;
  editInput: string;
  setEditInput: (value: string) => void;
  saveHabit: () => void;

  today: string;
  toggleDay: (id: number, day: string) => void;

  filter: string;
  setFilter: (value: string) => void;
  filterHabits: Habit[];
}

export default function LeftSide({
    habits, 
    addHabit, 
    deleteHabit, 
    editHabit,
    editId,
    editInput,
    setEditInput,
    saveHabit,
    today,
    toggleDay,
    filter,
    setFilter,
    filterHabits
  }: HabitProps) {
  return (
    <div className="left-section">

        {/* WEEKLY PROGRESS */}
        <WeeklyProgress 
          habits={habits}
          today={today}
        />
        
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
              aria-label="Default select example"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="done">Done</option>
              <option value="not-done">Not Done</option>
            </select>
          </div>

          <div className="habit-list">
            {filterHabits.map((habit) => (

              <div className="habit-item" key={habit.id}>
                <label>
                  <input 
                    type="checkbox" 
                    checked={habit.completedDays.includes(today)}
                    onChange={() => toggleDay(habit.id, today)}
                  />
                  {editId === habit.id ? (
                    <input 
                      className='edit-habit-input'
                      type="text"
                      value={editInput}
                      onChange={(e) => setEditInput(e.target.value)}
                    />
                  ) : (
                    <h3>{habit.title}</h3>
                  )}
                  
                  <div className="habit-buttons">
                    {editId === habit.id ? (
                      <Button 
                        type='button' 
                        className='btn btn-success'
                        onClick={() => saveHabit()}
                      >
                        Save
                      </Button>
                    ) : (
                      <Button 
                        type='button' 
                        className='btn btn-success'
                        onClick={() => editHabit(habit.id)}
                      >
                        Edit
                    </Button>
                    )}
                    
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
            {filterHabits.length === 0 && (
              <p className='empty-habit'>
                No Habits yet. Add a new one.
              </p>
            )}
          </div>

        </div>

      </div>
  )
}