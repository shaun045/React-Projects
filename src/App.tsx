import './App.css'
import { useState } from 'react';
import LeftSide from './components/LeftSide/LeftSide'


export interface Habit {
  id: number;
  title: string;
}

function App() {

  const [habits, setHabits] = useState<Habit[]>([]);
  
  function addHabit() {
    const newHabit = {
      id: Date.now(),
      title: "Habit title"
    }

    setHabits([...habits, newHabit])
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


  return (
    <div className="app-container">

      <LeftSide
        habits={habits}
        addHabit={addHabit}
        deleteHabit={deleteHabit}
        editHabit={editHabit}
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