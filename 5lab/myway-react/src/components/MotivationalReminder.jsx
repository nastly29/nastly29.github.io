import { useEffect, useState } from "react";
import { motivationalQuotes } from "../data/quotes.js";
import "../styles/reminder.css";
import { useAuth } from "../firebase/AuthContext";
import { getGoals } from "../firebase/firestoreService";

function getRandomQuote() {
  return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)] || "";
}

function getUrgentGoals(goals) {
  const currentTime = new Date();
  return goals
    .filter(goal => {
      if (!goal || goal.status === "completed" || !goal.deadline) return false;
      const deadline = new Date(goal.deadline);
      const hoursLeft = (deadline - currentTime) / (1000 * 60 * 60);
      return hoursLeft > 0 && hoursLeft <= 24;
    })
    .map(goal => goal.title);
}

export default function MotivationalReminder() {
  const { user } = useAuth();
  const [show, setShow] = useState(false);
  const [quote, setQuote] = useState("");
  const [urgentGoals, setUrgentGoals] = useState([]);

  useEffect(() => {
    if(!user){
      setShow(false);
      return;
    }
    const storageKey =  `lastMotivationTime_${user.uid}`;
    const lastShow = localStorage.getItem(storageKey);
    const now = Date.now();
    if(lastShow && now-Number(lastShow)<60*60*1000) return;

    (async () => {
      try {
        const allGoals = await getGoals(user.uid);
        setQuote(getRandomQuote());
        setUrgentGoals(getUrgentGoals(allGoals));
        setShow(true);
        localStorage.setItem(storageKey, now.toString());
      } catch (error) {
        console.error("Помилка при отриманні цілей:", error);
      }
    })();
  }, [user]);

  if (!show) return null;

  return (
    <div className="motivational-reminder">
      <button className="close-reminder" onClick={() => setShow(false)}>
        &times;
      </button>
      <p><strong>💡 Мотивація дня</strong></p>
      <p>{quote}</p>
      {urgentGoals.length > 0 && (
        <>
          <hr />
          <p><strong>Цілі, до дедлайну яких залишилось не більше 24 годин:</strong></p>
          <ul>
            {urgentGoals.map((g, i) => (
              <li key={i}>{g}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
