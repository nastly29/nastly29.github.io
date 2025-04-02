function getRandomQuote() {
    const index = Math.floor(Math.random() * motivationalQuotes.length);
    return motivationalQuotes[index];
}
  
function getUrgentGoals() {
    const now = new Date();
    return allGoals
      .filter(goal => {
        if (goal.isCompleted || !goal.deadline) return false;
        const deadline = new Date(goal.deadline);
        const timeLeft = deadline - now;
        const hoursLeft = timeLeft / (1000 * 60 * 60);
        return hoursLeft > 0 && hoursLeft <= 24;
      })
      .map(goal => `${goal.title}`);
}
  
function showMotivationalReminder() {
    const quote = getRandomQuote();
    const urgentGoals = getUrgentGoals();
    const reminder = document.createElement("div");
    reminder.className = "motivational-reminder";
  
    let html = `
      <button class="close-reminder">&times;</button>
      <p><strong>💡 Мотивація дня</strong></p>
      <p>${quote}</p>
    `;
  
    if (urgentGoals.length > 0) {
      html += `<hr><p><strong>Цілі, до дедлайну яких залишилось не більше 24 години:</strong></p>`;
      html += `<ul>${urgentGoals.map(g => `<p>&bull; ${g}</p>`).join("")}</ul>`;
    }
  
    reminder.innerHTML = html;
    document.body.appendChild(reminder);
  
    document.querySelector(".close-reminder").addEventListener("click", () => {
      reminder.remove();
    });
}
document.addEventListener("DOMContentLoaded", showMotivationalReminder);