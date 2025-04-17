export default function ProgressCard({goal, getProgressPercent}) {
    return (
        <div className="goal">
            <h4>{goal.title}</h4>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${getProgressPercent(goal)}%` }}>
                {getProgressPercent(goal)}%
              </div>
            </div>
        </div>
    );
}