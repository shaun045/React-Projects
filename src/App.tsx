import './App.css'
import { useEffect, useState } from 'react';
import LeftSide from './components/LeftSide/LeftSide'
import Calendar from './components/RightSide/Calendar';


export interface Habit {
  id: number;
  title: string;
  completedDays: string[];
  completedDates: string[];
}

function App() {

  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem('habits');
    if (!saved) return [];

    const parsed = JSON.parse(saved);
    return parsed.map((habit: Habit) => ({
      ...habit,
      completedDays: habit.completedDays ?? [],
      completedDates: habit.completedDates ?? [],
    }))
  });
  
  function addHabit() {
    const newHabit = {
      id: Date.now(),
      title: "Habit title",
      completedDays: [],
      completedDates: []
    }

    setHabits([...habits, newHabit])
  }

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits])

  const today = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'][new Date().getDay()];

  function toggleDay(id: number, day: string) {
    const todayDate = toLocalDateString(new Date());
    setHabits(habits.map(habit => {
      if (habit.id !== id) return habit;
      const alreadyDone = habit.completedDays.includes(day);
      return {
        ...habit,
        completedDays: alreadyDone
          ? habit.completedDays.filter(d => d !== day)
          : [...habit.completedDays, day],
        completedDates: alreadyDone
          ? habit.completedDates.filter(d => d !== todayDate)
          : [...habit.completedDates, todayDate]
      };
    }));
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

  function toLocalDateString(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


  function calculateStreak(habits: Habit[]): number {
    if (habits.length === 0) return 0;

    const allDates = habits.flatMap(h => h.completedDates);
    const uniqueDates = [...new Set(allDates)];
    const fullyCompletedDates = uniqueDates.filter(date => 
      habits.every(h => h.completedDates.includes(date))
    )

    let streak = 0;
    const current = new Date();

    while (true) {
      const dateString = toLocalDateString(current);
      if (fullyCompletedDates.includes(dateString)) {
        streak++;
        current.setDate(current.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  }

  const streak = calculateStreak(habits);

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

      <Calendar 
        habits={habits}
        streak={streak}
      />
      

    </div>
  )
}

export default App