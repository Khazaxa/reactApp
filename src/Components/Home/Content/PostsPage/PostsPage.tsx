import { useState, useEffect } from "react";
import styles from "./PostsPage.module.scss";
import api from "../../../../ApiConfig/ApiConfig";
import Notifications from '../../../Notifications/Notifications';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
}

export function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<"success" | "error" | "warning" | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/posts");
        setPosts(response.data);
      } catch (error) {
        setMessage("Error fetching posts: " + error);
        setMessageType("error");
        setTimeout(() => {
          setMessage("");
          setMessageType(null);
        }, 3000);
      }
    };

    fetchPosts();
  }, []);

  const readMorePost = () => {
    console.log("Read more post");
  };

  return (
    <div className={styles.usersPage}>
      <Notifications messageType={messageType} message={message} />
      <div className={styles.postsList}>
        {posts.map((post) => (
          <div className={styles.postCard}>
            <div className={styles.postTitle}>
              <strong>{post.title}</strong><p> by {post.author}</p>
            </div>
            <div className={styles.postContent}>
            {post.content ? (
                post.content.length > 130 ? (
                  <>
                    {post.content.slice(0, 130)} ... <a onClick={readMorePost}>Show more</a>
                  </>
                ) : (
                  post.content
                )
              ) : ("")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
