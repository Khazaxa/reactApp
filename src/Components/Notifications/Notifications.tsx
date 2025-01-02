import React from 'react';
import styles from "./Notifications.module.scss";

interface NotificationsProps {
  messageType: "success" | "error" | "warning" | null;
  message: string;
}

const Notifications: React.FC<NotificationsProps> = ({ messageType, message }) => {

  return (
    <div className={styles.notification}>
      {message && (
        <div className={`${styles.message} ${messageType ? styles[messageType] : ""}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default Notifications;