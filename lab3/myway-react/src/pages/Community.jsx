import { useEffect,useState } from "react";
import "../styles/community.css";
import CommunityPost from "../components/CommunityPost";

export default function Community() {
  const [posts, setPosts] = useState(() => {
    return JSON.parse(localStorage.getItem("communityPosts")) || [];
  });
  const [newText, setNewText] = useState("");

  useEffect(() => {
    localStorage.setItem("communityPosts", JSON.stringify(posts));
  }, [posts]);

  const publishPost = () => {
    if (!newText.trim()) return;
    const now = new Date().toISOString();
    const newPost = {
      id: Date.now(),
      username: "@you",
      text: newText.trim(),
      likes: 0,
      comments: 0,
      createAt: now
    };
    setPosts([newPost, ...posts]);
    setNewText("");
  };

  const likePost = (id) => {
    const updated = posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p);
    setPosts(updated);
  };

  return (
    <div className="container">
      <div className="post-form">
        <textarea
          placeholder="Поділіться своїм досвідом..."
          value={newText}
          onChange={e => setNewText(e.target.value)}
        />
        <button className="user-button" onClick={publishPost}>Опублікувати</button>
      </div>

      <div className="community-posts">
        {posts.map(post => (
          <CommunityPost key={post.id} post={post} likePost={likePost}/>
        ))}
      </div>
    </div>
  );
}