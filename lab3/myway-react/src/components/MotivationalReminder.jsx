import { useEffect, useState } from "react";
import { motivationalQuotes } from "../data/quotes.js"; 
import "../styles/reminder.css";

// вибрати випадкову цитату
function getRandomQuote() {
  return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)] || "";
}

// отримати список термінових цілей
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
  const [show, setShow] = useState(false);
  const [quote, setQuote] = useState("");
  const [urgentGoals, setUrgentGoals] = useState([]);

  useEffect(() => {
      const lastShown = localStorage.getItem("lastMotivationTime");
      const now = Date.now();
      if (lastShown && now - Number(lastShown) < 60 * 60 * 1000) return;

      const allGoals = JSON.parse(localStorage.getItem("goals")) || [];
      setQuote(getRandomQuote());
      setUrgentGoals(getUrgentGoals(allGoals));
      setShow(true);
      localStorage.setItem("lastMotivationTime", now.toString());
  }, []);

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
          <p><strong>Цілі, до дедлайну яких залишилось не більше 24 години:</strong></p>
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
