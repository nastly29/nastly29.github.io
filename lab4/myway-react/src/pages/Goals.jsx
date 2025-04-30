import { useEffect, useState } from "react";
import "../styles/goals.css";
import GoalCard from "../components/GoalCard";
import { addGoal, getGoals,updateGoalStatus,deleteGoal,updateCompletedSteps } from "../firebase/firestoreService";
import { useAuth } from "../firebase/AuthContext";

export default function Goals() {
  const { user } = useAuth();
  const [goals, setGoals] = useState([]);
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [steps, setSteps] = useState([""]);
  const [filter, setFilter] = useState("active");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGoals = async () => {
      if (user) {
        const userGoals = await getGoals(user.uid);
        setGoals(userGoals);
      }
    };
    fetchGoals();
  }, [user]);  

  const addStep = () => setSteps([...steps, ""]);
  const updateStep = (index, value) => {
    const updated = [...steps];
    updated[index] = value;
    setSteps(updated);
  };

  const handleSubmit = async () => {
    if(!title.trim()){
      setError("Введіть назву цілі!");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    setError("");
    const newGoal = {
      title,
      deadline, 
      steps: steps.filter(step=>step.trim()!==""),
      completedSteps: [],
      status: "active"
    };

    try {
      await addGoal(user.uid, newGoal);
      const userGoals = await getGoals(user.uid); 
      setGoals(userGoals);
    } catch (error) {
      console.error("Помилка при створенні цілі:", error);
    }
    setTitle("");
    setDeadline("");
    setSteps([""]);
  };

  const handleStepChange = async (goalId, stepIndex, checked) => {
    try {
      const updatedGoals = goals.map(goal => {
        if (goal.id === goalId) {
          const newCompletedSteps = checked
            ? [...goal.completedSteps, stepIndex]
            : goal.completedSteps.filter(i => i !== stepIndex);
          return { ...goal, completedSteps: newCompletedSteps };
        }
        return goal;
      });

      setGoals(updatedGoals);
      const updatedGoal = updatedGoals.find(g => g.id === goalId);
      await updateCompletedSteps(user.uid, goalId, updatedGoal.completedSteps); 
    } catch (error) {
      console.error("Помилка при оновленні виконаних кроків:", error);
    }
  };

  const handleDeleteGoal = async(goalId) => {
    try {
      await deleteGoal(user.uid, goalId);
      const userGoals = await getGoals(user.uid);
      setGoals(userGoals);
     } catch(error){
      console.error("Помилка при видаленні цілі:", error);
     }
  };

  const handleUpdateStatus = async (goal, newStatus) => {
    if (newStatus === "completed" && goal.steps.length !== goal.completedSteps.length) {
      return;
    }
    try {
      await updateGoalStatus(user.uid, goal.id, newStatus);
      const userGoals = await getGoals(user.uid);
      setGoals(userGoals);
    } catch(error){
      console.error("Помилка при оновленні статусу:", error);
    }
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
            <button className="user-button done-btn" onClick={addStep}>Додати крок</button>
            <button className="user-button" onClick={handleSubmit}>Зберегти</button>
          </div>
          {error && <p className="error-message">{error}</p>}
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
            toggleStep={handleStepChange}
            deleteGoal={handleDeleteGoal}
            updateStatus={handleUpdateStatus}
          />
        ))}
      </div>
    </main>
  );
}