import { useEffect,useState } from "react";

export default function ProgressCard({goal, getProgressPercent}) {
  const [progress,setProgress] = useState(0);
  useEffect(() => {
    const targetProgress = getProgressPercent(goal);
    let current = 0;
    const interval = setInterval(() => {
      if(current<targetProgress){
        current++;
        setProgress(current);
      }else{
        clearInterval(interval);
      }
    }, 10);
    return () => clearInterval(interval);
  }, [goal, getProgressPercent]);

    return (
        <div className="goal">
            <h4>{goal.title}</h4>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${progress}%` }}>
                {progress}%
              </div>
            </div>
        </div>
    );
}