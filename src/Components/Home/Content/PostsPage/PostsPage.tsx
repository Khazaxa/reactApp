import { useState, useEffect } from "react";
import styles from "./PostsPage.module.scss";
import api from "../../../../ApiConfig/ApiConfig";
import Notifications from '../../../Notifications/Notifications';

interface Post {
  id: number;
  title: string;
  content: string;
}

export function UsersPage() {
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

  return (
    <div className={styles.usersPage}>
      <Notifications messageType={messageType} message={message} />
      <div className={styles.userList}>
        {posts.map((post) => (
          <div className={styles.userCard}>
            <div className={styles.userName}>
              <strong>{post.title}</strong>
            </div>
            <div className={styles.userEmail}>
              <strong>{post.content}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
