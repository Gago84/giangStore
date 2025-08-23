import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import "../styles/UserArea.css";


function UserArea() {
  const [currentUser, setCurrentUser] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Watch auth state
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);

      if (user) {
        // 🟢 Listen to Firestore profile in real-time
        const unsubscribeProfile = onSnapshot(doc(db, "users", user.uid), (docSnap) => {
          if (docSnap.exists()) {
            setProfile(docSnap.data());
          } else {
            setProfile(null);
          }
        });

        return () => unsubscribeProfile();
      } else {
        setProfile(null);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  return (
    <div className="user-area">
      {currentUser ? (
        <Link to="/profile" className="user-name">
          {profile?.name || currentUser?.phoneNumber}
        </Link>
      ) : (
        <span className="user-name">Guest</span>
      )}

      {!currentUser && (
        <>
          <Link to="/login" className="user-link">Log in</Link>
          <Link to="/signup" className="user-link">Sign up</Link>
        </>
      )}

      {currentUser && (
        <a
          href="#"
          className="user-link logout"
          onClick={() => signOut(auth)}
        >
          Log out
        </a>
      )}
    </div>
  );
}

export default UserArea;
