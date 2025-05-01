export async function fetchCompletedGoals(uid) {
    const res = await fetch(`/api/completed-goals?uid=${uid}`);
    if (!res.ok) throw new Error('Error fetching completed goals');
    return res.json();
  }
  
  export async function markGoalCompleted(uid, goalId) {
    const res = await fetch('/api/completed-goals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uid, goalId })
    });
    if (!res.ok) throw new Error('Error marking goal completed');
    return res.json();
  }
  