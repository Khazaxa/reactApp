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
      <div className={styles.usersHeader}>
        <h3>User:</h3>
        <h3>Age:</h3>
        <h3>Email:</h3>
      </div>
      <div className={styles.userList}>
        {error && <p>{error}</p>}
        {users.map((user) => (
          <div className={styles.userCard}>
            <img
              src={user.avatar}
              alt={`avatar`}
              className={styles.userAvatar}
            />
            <div className={styles.userInfo}>
              <p>
                <strong>{user.name}</strong>
              </p>
              <p>{user.age}</p>
              <p>{user.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}