function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

export default function CommunityPost({post, likePost}) {
    return (
        <div className="post">
            <p className="username">{post.username}</p>
            <p className="timestamp">{formatDate(post.createAt)}</p>
            <p>{post.text}</p>
            <div className="buttons">
              <button className="heart-btn" onClick={() => likePost(post.id)}>
                <span className="heart-icon">&#10084;</span> {post.likes}
              </button>
              <button className="coment-btn">
                <img src="/assets/coment.png" className="coment-icon" alt="comment" /> {post.comments}
              </button>
            </div>
        </div>
    );
}