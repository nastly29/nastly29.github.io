let allGoals = JSON.parse(localStorage.getItem("goals")) || [];

function saveGoals() {
    localStorage.setItem("goals", JSON.stringify(allGoals));
}
  
//створення поля для введення кроку
function createStepInput() {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Крок для досягнення";
    input.classList.add("step-input");
    document.querySelector(".goal-form").insertBefore(input, document.querySelector(".button-container"));
}

//створення і збереження цілі
function addGoal(){
    const title = document.querySelector("input[type='text']").value;
    const deadline = document.getElementById("deadline").value;
    const steps = Array.from(document.querySelectorAll(".step-input")).map(i => i.value).filter(Boolean);

    if (!title) return alert("Введіть назву цілі!");

    const goal = {
      id: Date.now(),
      title,
      deadline,
      steps,
      completedSteps: [],
      isCompleted: false
    };

    allGoals.push(goal);
    saveGoals();
    location.reload();
}

//вивід усіх активних цілей
function renderGoals(){
    const container = document.querySelector(".goals-container");
    container.innerHTML = "";
    allGoals.filter(g => !g.isCompleted).forEach(goal=>{
        const card = renderGoalCard(goal);
        container.appendChild(card);
    })
}

//ціль
function renderGoalCard(goal){
    const card = document.createElement("div");
    card.className = "goal-card";

    const stepsList = goal.steps.map((step, i) => `
        <li>
        <label>
            <input type="checkbox" data-goal="${goal.id}" data-step="${i}" ${goal.completedSteps.includes(i) ? "checked" : ""}>
            ${step}
        </label>
        </li>
    `).join("");

    card.innerHTML = `
        <button class="delete-btn" data-goal="${goal.id}">&times;</button>
        <h3>${goal.title}</h3>
        <p class='goal-deadline'>Дедлайн: ${goal.deadline || "-"}</p>
        <ul class="goal-steps">${stepsList}</ul>
        <button class="user-button done-btn" data-goal="${goal.id}">Виконано</button>
    `;
    return card;
}

//відмітка виконаних кроків
function handleCheckboxChange(e){
    if (!e.target.matches("input[type='checkbox']")) return;
    const goalId = +e.target.dataset.goal;
    const stepIndex = +e.target.dataset.step;
    const goal = allGoals.find(g => g.id === goalId);

    if(e.target.checked){
        goal.completedSteps.push(stepIndex);
    }else{
        goal.completedSteps = goal.completedSteps.filter(i=> i!==stepIndex);
    }
    saveGoals();
}
  
//кнопки Виконано і Видалити
function handleButtonClick(e){
    const goalId = +e.target.dataset.goal;
    const goal = allGoals.find(g => g.id === goalId);

    if (e.target.classList.contains("done-btn")){
        goal.isCompleted = true;
    }
    if (e.target.classList.contains("delete-btn")){
        allGoals = allGoals.filter(g => g.id !==goalId);
    }
    saveGoals();
    location.reload();
}

//коли наводиш курсор на картку цілі
function addHoverEffectsCard(){
    document.querySelectorAll(".goal-card").forEach(card => {
        card.addEventListener("mouseenter", () => {
          card.style.boxShadow = "0 0 15px #971d1d";
        });
        card.addEventListener("mouseleave", () => {
          card.style.boxShadow = "none";
        });
      }); 
}


function initGoalsPage() {
    document.querySelector(".add-step-btn").addEventListener("click", createStepInput);
    document.querySelector(".user-button").addEventListener("click", addGoal);

    const container = document.querySelector(".goals-container");
    renderGoals();

    container.addEventListener("change", handleCheckboxChange);
    container.addEventListener("click", handleButtonClick);
    addHoverEffectsCard();
}

document.addEventListener("DOMContentLoaded", initGoalsPage);