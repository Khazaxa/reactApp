import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./UsersPage.module.scss";
import api from "../../../../ApiConfig/ApiConfig";
import Notifications from "../../../Notifications/Notifications";

interface User {
  name: string;
  age: number;
  email: string;
  avatar: string;
}

export function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [originalUsers, setOriginalUsers] = useState([]);
  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<
    "success" | "error" | "warning" | null
  >(null);

  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search")?.toLowerCase() || "";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users");
        setUsers(originalUsers);
        setOriginalUsers(response.data);
      } catch (error) {
        setMessage("Error fetching users: " + error);
        setMessageType("error");
        setTimeout(() => {
          setMessage("");
          setMessageType(null);
        }, 3000);
      }
    };

    fetchUsers();
  }, [originalUsers]);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div className={styles.usersPage}>
      <Notifications messageType={messageType} message={message} />

      <div className={styles.usersList}>
        {filteredUsers.map((user) => (
          <div className={styles.userCard}>
            <div className={styles.userAvatar}>
              <img src={user.avatar} alt={`avatar`} />
            </div>
            <div className={styles.userName}>
              <strong>{user.name ? user.name : "--"}</strong>
            </div>
            <div className={styles.userAge}>
              <strong>{user.age ? user.age : "--"}</strong>
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
