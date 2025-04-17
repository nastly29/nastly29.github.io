import { useEffect, useState } from "react";
import "../styles/goals.css";
import GoalCard from "../components/GoalCard";

export default function Goals() {
  const [goals,setGoals] = useState(() => {
    return JSON.parse(localStorage.getItem("goals")) || [];
  });
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [steps, setSteps] = useState([""]);
  const [filter, setFilter] = useState("active");

  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  const addStep = () => setSteps([...steps, ""]);
  const updateStep = (index, value) => {
    const updated = [...steps];
    updated[index] = value;
    setSteps(updated);
  };

  const handleSubmit = () => {
    if(!title.trim()){
      alert("Введіть назву цілі!");
      return;
    }

    const newGoal = {
      id: Date.now(),
      title,
      deadline, 
      steps: steps.filter(step=>step.trim()!==""),
      completedSteps: [],
      //isCompleted: false,
      status: "active"
    };

    setGoals([...goals, newGoal]);
    setTitle("");
    setDeadline("");
    setSteps([""]);
  };

  const toggleStep = (goalId, stepIndex) => {
    const updatedGoals = goals.map(g => {
      if (g.id === goalId) {
        const updatedCompleted = g.completedSteps.includes(stepIndex)
          ? g.completedSteps.filter(i => i !== stepIndex)
          : [...g.completedSteps, stepIndex];
        return { ...g, completedSteps: updatedCompleted };
      }
      return g;
    });
    setGoals(updatedGoals);
  };

  const deleteGoal = (goalId) => {
    const updated = goals.filter(g => g.id !== goalId);
    setGoals(updated);
  };

  const updateStatus = (goalId, newStatus) => {
    const updated = goals.map(g => g.id === goalId ? { ...g, status: newStatus } : g);
    setGoals(updated);
  };  

  const filteredGoals = goals.filter(goal => {
    if (filter === "all") return true;
    if (filter === "completed") return goal.status === "completed";
    if (filter === "active") return goal.status === "active";
    if (filter === "delayed") return goal.status === "delayed";
    return true;
  });  

  return (
    <main>
      <div className="create-container">
        <div className="goal-form">
          <h3 className="create-header">Створіть нову ціль!</h3>
          <input
            type="text"
            placeholder="Назва цілі"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <input
            type="date"
            id="deadline"
            placeholder="Дедлайн"
            value={deadline}
            onChange={e => setDeadline(e.target.value)}
          />
          {steps.map((step, i) => (
            <input
              key={i}
              type="text"
              className="step-input"
              placeholder="Крок для досягнення"
              value={step}
              onChange={e => updateStep(i, e.target.value)}
            />
          ))}
          <div className="button-container">
            <button className="add-step-btn" onClick={addStep}>Додати крок</button>
            <button className="user-button" onClick={handleSubmit}>Зберегти</button>
          </div>
        </div>
      </div>

      <h2 className="goals-title">
        Кожна велика мрія починається з маленького кроку. Вперед до цілей!
      </h2>

      <div className="filter-container">
        <label>Фільтрувати за статусом:</label>
        <select id="filter" value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="active">Активні</option>
          <option value="completed">Завершені</option>
          <option value="delayed">Відкладені</option>
          <option value="all">Усі</option>
        </select>
      </div>

      <div className="goals-container">
        {filteredGoals.map(goal => (
          <GoalCard
            key={goal.id}
            goal={goal}
            toggleStep={toggleStep}
            deleteGoal={deleteGoal}
            updateStatus={updateStatus}
          />
        ))}
      </div>
    </main>
  );
}