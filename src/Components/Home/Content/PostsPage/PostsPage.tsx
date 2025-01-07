import { useState, useEffect } from "react";
import styles from "./PostsPage.module.scss";
import api from "../../../../ApiConfig/ApiConfig";
import { useLocation, useNavigate } from "react-router-dom";
import Notifications from '../../../Notifications/Notifications';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
}

interface Comment {
  content: string;
  author: string;
  postId: number;
}

export function PostsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [readMore, setReadMore] = useState<{ [key: number]: boolean }>({});
  const [message, setMessage] = useState<string>("");
  const [postTitle, setPostTitle] = useState<string>("");
  const [postContent, setPostContent] = useState<string>("");
  const addPostFormView = location.state?.addPostFormView || false;
  const [messageType, setMessageType] = useState<"success" | "error" | "warning" | null>(null);
  const notificationDelay = () => {
    setTimeout(() => {
      setMessage("");
      setMessageType(null);
    }, 3000);
  }

  const fetchPosts = async () => {
    const response = await api.get("/posts");
    setPosts(response.data);
  }

  const fetchComments = async () => {
    const response = await api.get(`/comments`);
    setComments(response.data);
  }

  useEffect(() => {
    fetchPosts();
    fetchComments();
  }, []);

  const handleAddPost = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      await api.post("/post", { title: postTitle, content: postContent });
      setPostTitle("");
      setPostContent("");
      navigate("/posts", { state: { addPostFormView: false } });
      fetchPosts();

      setMessage("Post added successfully!");
      setMessageType("success");
      notificationDelay();
    }
    catch (error) {
      setMessage("Error adding post: " + error);
      setMessageType("error");
      notificationDelay();
    }
  };

  const readMorePost = (id: number) => {
    setReadMore((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div className={styles.postsPage}>
      <Notifications messageType={messageType} message={message} />

      {addPostFormView ? (
        <form onSubmit={handleAddPost}>
          <p>Type post title:</p>
          <input
            type="text"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            required
          />
          <p>Type post content:</p>
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            required
          ></textarea>
          <button type="submit">Add post</button>
        </form>
      ) : (
        true
      )}


      {posts.map((post) => (
        <div className={styles.postCard} key={post.id}>
          <div className={styles.postTitle}>
            <strong>{post.title}</strong><p> by {post.author}</p>
          </div>
          <div className={styles.postContent}>
            {!readMore[post.id] ? (
              post.content.length > 200 ? (
                <span>
                  {post.content.slice(0, 200)} ...
                  <span className={styles.readMoreBtn} onClick={() => readMorePost(post.id)}>Show more</span>
                </span>
              ) : (
                post.content
              )
            ) : (
              <span>
                {post.content}
                <span className={styles.readMoreBtn} onClick={() => readMorePost(post.id)}>Show less</span>
              </span>
            )}
          </div>
          <hr />
          <ul className={styles.commentsList}>
            <li className={styles.commentsListTitle}>
              Comments ({comments.filter((comment) => comment.postId === post.id).length}):
            </li>
            {comments
              .filter((comment) => comment.postId === post.id)
              .map((comment, index) => (
                <li key={index}>
                  <strong>{comment.author}</strong>: {comment.content}
                </li>
              ))}
          </ul>
          <button>Comment</button>
        </div>
      ))}
    </div>
  );
}
