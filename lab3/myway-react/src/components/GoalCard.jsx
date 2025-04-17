export default function GoalCard({goal,toggleStep,deleteGoal,updateStatus}) {
    return(
        <div className="goal-card">
            <button className="delete-btn" onClick={() => deleteGoal(goal.id)}>&times;</button>
            <h3>{goal.title}</h3>
            <p className="goal-deadline">Дедлайн: {goal.deadline || "-"}</p>
            <ul className="goal-steps">
              {goal.steps.map((step, i) => (
                <li key={i}>
                  <label>
                    <input
                      type="checkbox"
                      checked={goal.completedSteps.includes(i)}
                      onChange={() => toggleStep(goal.id, i)}
                    />
                    {step}
                  </label>
                </li>
              ))}
            </ul>
            <div className="button-container">
              <div className="goal-buttons">
                {goal.status === "completed" ? null : (
                  <>
                    {goal.status === "active" && (
                      <>
                        <button className="user-button done-btn" onClick={() => updateStatus(goal.id, "completed")}>
                          Виконано
                        </button>
                        <button className="user-button delay-btn" onClick={() => updateStatus(goal.id, "delayed")}>
                          Відкласти
                        </button>
                      </>
                    )}
                    {goal.status === "delayed" && (
                      <button className="user-button delay-btn" onClick={() => updateStatus(goal.id, "active")}>
                        Відновити
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
    );
}