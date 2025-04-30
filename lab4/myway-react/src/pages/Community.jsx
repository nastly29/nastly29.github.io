import { useEffect,useState } from "react";
import "../styles/community.css";
import CommunityPost from "../components/CommunityPost";
import { useAuth } from "../firebase/AuthContext";
import { addCommunityPost, getCommunityPosts, toggleCommunityPostLike } from "../firebase/firestoreService";

export default function Community() {
  const [text, setText] = useState("");
  const {user} = useAuth();
  const [posts, setPosts] = useState([]);
  const [, setReplyTo] = useState(""); 

  useEffect(() => {
    const fetchPosts = async () => {
      const communityPosts = await getCommunityPosts();
      setPosts(communityPosts);
    }
    fetchPosts();
  }, []);

  const handleSubmitPost = async () => {
    if (!text.trim()) return;

    const newPost = {
      username: user?.email || "@Anonymous",
      text: text.trim(),
      likes: 0,
      likedBy: []
    };

    try {
      await addCommunityPost(newPost); 
      const communityPosts = await getCommunityPosts(); 
      setPosts(communityPosts);
      setText(""); 
      setReplyTo("");
    } catch (error) {
      console.error("Помилка при створенні посту:", error);
    }
  };

  const likePost = async (id) => {
    if (!user) return;
  
    try {
      await toggleCommunityPostLike(id, user.email); 
      const communityPosts = await getCommunityPosts(); 
      setPosts(communityPosts);
    } catch (error) {
      console.error("Помилка при перемиканні лайку:", error);
    }
  };
  
  const handleReply = (username) => {
    setReplyTo(username);
    setText(`${username} `);
  };

  return (
    <div className="container">
      {user ? (
        <div className="post-form">
          <textarea
            placeholder="Поділіться своїм досвідом..."
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <button className="user-button" onClick={handleSubmitPost}>Опублікувати</button>
        </div>
      ) : (
        <p></p>
      )}

      <div className="community-posts">
        {posts.map(post => (
          <CommunityPost key={post.id} post={post} likePost={likePost} user={user} onReply={handleReply}/>
        ))}
      </div>
    </div>
  );
}