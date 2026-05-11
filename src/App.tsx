import './App.css'
import { useState } from 'react';
import LeftSide from './components/LeftSide/LeftSide'


export interface Habit {
  id: number;
  title: string;
  completedDays: string[];
}

function App() {

  const [habits, setHabits] = useState<Habit[]>([]);
  
  function addHabit() {
    const newHabit = {
      id: Date.now(),
      title: "Habit title",
      completedDays: []
    }

    setHabits([...habits, newHabit])
  }
  const today = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'][new Date().getDay()];

  function toggleDay(id: number, day: string) {
    setHabits(habits.map(habit => {
      if (habit.id !== id) return habit;
      const alreadyDone = habit.completedDays.includes(day);
      return {
        ...habit,
        completedDays: alreadyDone
          ? habit.completedDays.filter(d => d !== day)
          : [...habit.completedDays, day]
      }
    }))
  }


  function deleteHabit(id: number) {
    setHabits(habits.filter(habit => habit.id !== id));
  }


  const [editId, setEditId] = useState<number | null>(null);
  const [editInput, setEditInput] = useState<string>("");

  function editHabit(id: number) {
    setEditId(id);
    const habitToEdit = habits.find(habit => habit.id === id);
    if (habitToEdit) {
      setEditInput(habitToEdit.title);
    }
    console.log("Habit Edited")
  }

  function saveHabit() {
    setHabits(habits.map(habit => 
      habit.id === editId
        ? {...habit, title: editInput}
        : habit
    ));
    setEditId(null);
    setEditInput("");
  }

  
  const [filter, setFilter] = useState("all");

  const filterHabits = habits.filter(habit => {
    const done = habit.completedDays.includes(today);

    if (filter === "done") return done;
    if (filter === "not-done") return !done;
    return true;
  });

  return (
    <div className="app-container">

      <LeftSide
        habits={habits}
        addHabit={addHabit}
        deleteHabit={deleteHabit}
        editHabit={editHabit}

        editId={editId}
        editInput={editInput}
        setEditInput={setEditInput}
        saveHabit={saveHabit}

        toggleDay={toggleDay}
        today={today}

        filter={filter}
        setFilter={setFilter}
        filterHabits={filterHabits}
      />

      {/* RIGHT SIDE */}
      <div className="right-section">

        {/* CALENDAR */}
        <div className="section-card calendar-card">

          <h3 className="title-center">
            Calendar
          </h3>

          <div className="calendar-placeholder"></div>

        </div>

        {/* STREAK */}
        <div className="section-card streak-card">

          <div className="streak-box">
            <h2>Day</h2>
            <h2>Streak</h2>
          </div>

        </div>

      </div>

    </div>
  )
}

export default App