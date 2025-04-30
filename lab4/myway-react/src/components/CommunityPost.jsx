function formatDate(timestamp) {
  if (!timestamp) return "";
  const date = timestamp.toDate();
  return date.toLocaleString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

export default function CommunityPost({ post, likePost, user, onReply}) {
  const isLiked = user && post.likedBy?.includes(user.email);
  return (
    <div className="post">
      <div className="post-header">
        <p className="username">{post.username}</p>
        <p className="timestamp">{formatDate(post.createAt)}</p>
      </div>

      <p className="post-text">{post.text}</p>

      <div className="buttons">
        <button
          className={`heart-btn ${isLiked ? "liked" : ""}`}
          onClick={() => likePost(post.id)}
        >
          <span className="heart-icon">&#10084;</span> {post.likes}
        </button>

        <button className="coment-btn" onClick={() => onReply(post.username)}>
          <img src="/assets/coment.png" className="coment-icon" alt="comment" />
        </button>
      </div>
    </div>
  );
}
