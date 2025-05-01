import { useEffect, useState } from "react";
import "../styles/progress.css";
import ProgressCard from "../components/ProgressCard";
import { useAuth } from "../firebase/AuthContext";
import { getGoals, getTopUsers,getUserCoins } from "../firebase/firestoreService";
import { fetchCompletedGoals } from "../api";

function toJSDate(ts) {
  if (!ts) return null;
  if (typeof ts.toDate === "function") {
    return ts.toDate();
  } else if (ts.seconds || ts._seconds) {
    const secs = ts.seconds ?? ts._seconds;
    return new Date(secs * 1000);
  } else {
    return new Date(ts);
  }
}

function formatDate(ts) {
  const dateObj = toJSDate(ts);
  if (!dateObj || isNaN(dateObj.getTime())) {
    return "—";
  }
  return dateObj.toLocaleDateString("uk-UA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
}

function calcReward(steps = []) {
  return steps.length > 0 ? steps.length * 15 : 20;
}

export default function Progress() {
  const { user } = useAuth();
  const [goals, setGoals] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0});
  const [topUsers, setTopUsers] = useState([]);
  const [dbCoins, setDbCoins] = useState(0);
  const [completedGoals, setCompletedGoals] = useState([]);

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
    const completed = goals.filter(g => g.status === "completed").length;
    setStats({ total, completed });
  }, [goals]);

  useEffect(() => {
    if (!user) return;
    (async () => {
        const [coins, ranking] = await Promise.all([
          getUserCoins(user.uid),
          getTopUsers(10)
        ]);
        setDbCoins(coins);
        setTopUsers(ranking);
    })();
  }, [user]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const data = await fetchCompletedGoals(user.uid);
      setCompletedGoals(data);
    })();
  }, [user]);

  const getProgressPercent = (goal) => {
    if (!goal.steps || goal.steps.length === 0) return 0;
    return Math.round((goal.completedSteps.length / goal.steps.length) * 100);
  };

  return (
    <main>
      <div className="stats-container">
        <div className="stats-box">Всього цілей: {stats.total}</div>
        <div className="stats-box">Досягнуті цілі: {stats.completed}</div>
        <div className="stats-box">Монети: {dbCoins}&#129689;</div>
      </div>

      <h2 className="progress-title">Ваш прогрес</h2>
      <section className="active-goals">
        {goals.filter(g => g.status === "active").map(goal => (
          <ProgressCard key={goal.id} goal={goal} getProgressPercent={getProgressPercent}/>
        ))}
      </section>

      <h2 className="progress-title">Досягнуті цілі</h2>
      <section className="completed-goals">
        {completedGoals.length > 0 ? (
          completedGoals.map(goal => (
            <div key={goal.id} className="completed-goal-item">
              <h4>{goal.title}</h4>
              <div className="reward">Виконано: {formatDate(goal.completedAt)}</div>
              <div className="reward">
                Винагорода: {calcReward(goal.steps)} монет{" "}
                <span className="coin">&#129689;</span>
              </div>
            </div>
          ))
        ) : (
          <p>Ви ще не завершили жодної цілі.</p>
        )}
      </section>


      <h2 className="progress-title">Топ-10 користувачів</h2>
      <section className="ranking-container">
        <ul className="ranking-list">
          {topUsers.map((u, i) => (
            <li key={u.id} className="ranking-item">
              <span className="rank-number">{i + 1}.</span>
              <span className="user-name">{u.email}</span>
              <span className="user-coins">{u.coins} <span className="coin">&#129689;</span>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}