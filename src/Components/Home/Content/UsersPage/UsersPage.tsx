import { useState, useEffect } from "react";
import styles from "./UsersPage.module.scss";
import api from "../../../../ApiConfig/ApiConfig";

interface User {
  name: string;
  age: number;
  email: string;
  avatar: string;
}

export function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users");
        setUsers(response.data);
      } catch (error) {
        setError("Error fetching users");
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className={styles.usersPage}>
      <div className={styles.userList}>
        {error && <p>{error}</p>}
        {users.map((user) => (
          <div className={styles.userCard}>
            <div className={styles.userAvatar}>
              <img src={user.avatar} alt={`avatar`} />
            </div>
            <div className={styles.userName}>
              <strong>{user.name ? user.name : "---"}</strong>
            </div>
            <div className={styles.userAge}>
              <strong>{user.age ? user.age : "---"}</strong>
            </div>
            <div className={styles.userEmail}>
              <strong>{user.email}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
