import { useEffect, useState } from "react";
import "../styles/progress.css";
import ProgressCard from "../components/ProgressCard";
import { useAuth } from "../firebase/AuthContext";
import { getGoals } from "../firebase/firestoreService";

export default function Progress() {
  const { user } = useAuth();
  const [goals, setGoals] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, coins: 0 });

  useEffect(() => {
    const fetchGoals = async () => {
      if (user) {
        const userGoals = await getGoals(user.uid);
        setGoals(userGoals);
      }
    };
    fetchGoals();
  }, [user]);

  useEffect(() => {
    const total = goals.filter(g => g.status !== "delayed").length;
    let completed = 0;
    let coins = 0;

    goals.forEach(goal => {
      if (goal.status === "completed") {
        completed++;
        coins += goal.steps.length > 0 ? goal.steps.length * 15 : 20;
      }
    });

    setStats({ total, completed, coins });
  }, [goals]);

  const getProgressPercent = (goal) => {
    if (!goal.steps || goal.steps.length === 0) return 0;
    return Math.round((goal.completedSteps.length / goal.steps.length) * 100);
  };

  return (
    <main>
      <div className="stats-container">
        <div className="stats-box">Всього цілей: {stats.total}</div>
        <div className="stats-box">Досягнуті цілі: {stats.completed}</div>
        <div className="stats-box">Монети: {stats.coins}&#129689;</div>
      </div>

      <h2 className="progress-title">Ваш прогрес</h2>
      <section className="active-goals">
        {goals.filter(g => g.status === "active").map(goal => (
          <ProgressCard key={goal.id} goal={goal} getProgressPercent={getProgressPercent}/>
        ))}
      </section>

      <h2 className="progress-title">Досягнуті цілі</h2>
      <section className="completed-goals">
        {goals.filter(g => g.status === "completed").map(goal => (
          <div key={goal.id}>
            <h4>{goal.title}</h4>
            <div className="reward">
              Винагорода: {goal.steps.length > 0 ? goal.steps.length * 15 : 20} монет
              <span className="coin">&#129689;</span>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}