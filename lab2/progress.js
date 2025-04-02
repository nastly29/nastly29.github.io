let allGoals = JSON.parse(localStorage.getItem("goals")) || [];

//виводить аквтивну ціль з прогресом 
function renderActiveGoal(goal, parent){
    const percent = goal.steps.length === 0
          ? 0
          : Math.round((goal.completedSteps.length / goal.steps.length) * 100);
  
    const goalDiv = document.createElement("div");
    goalDiv.className = "goal";
    goalDiv.innerHTML = `
        <h4>${goal.title}</h4>
        <div class="progress-bar">
            <div class="progress" style="width: ${percent}%">${percent}%</div>
        </div>
    `;
    parent.appendChild(goalDiv);
}

//виводить досягнуту ціль
function renderCompletedGoal(goal,parent){
    const reward = goal.steps.length > 0 ? goal.steps.length * 15 : 20;
    const completedDiv = document.createElement("div");
    completedDiv.className = "completed-goal";
    completedDiv.innerHTML = `
        <h4>${goal.title}</h4>
        <div class="reward">Винагорода: ${reward} монет <span class="coin">&#129689;</span></div>
    `;
    parent.appendChild(completedDiv);
}

function renderProgress(activeSection, completedSection){
    let total = allGoals.length;
    let completed = 0;
    let coins = 0;

    allGoals.forEach(goal => {
        if(goal.isCompleted){
            renderCompletedGoal(goal, completedSection);
            completed++;
            coins += goal.steps.length > 0 ? goal.steps.length * 15 : 20;
        } else {
            renderActiveGoal(goal, activeSection);
        }
    });
    renderStats(total,completed,coins);
}

//виводить статистику
function renderStats(total,completed,coins){
    const statsContainer = document.querySelector(".stats-container");
    if(!statsContainer) return;
    statsContainer.innerHTML = `
        <div class="stats-box">Всього цілей: ${total}</div>
        <div class="stats-box">Досягнуті цілі: ${completed}</div>
        <div class="stats-box">Монети: ${coins}&#129689;</div>
    `;
}

function initProgressPage() {
    const activeSection = document.querySelector(".active-goals");
    const completedSection = document.querySelector(".completed-goals");
  
    activeSection.innerHTML = "";
    completedSection.innerHTML = "";
    
    renderProgress(activeSection, completedSection);
}

document.addEventListener("DOMContentLoaded", initProgressPage);