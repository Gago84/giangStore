// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) {
        navigate("/login");
        return;
      }

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserData(docSnap.data());
      } else {
        console.error("❌ User document not found!");
      }
      setLoading(false);
    };

    fetchUserData();
  }, [navigate]);

  // ✅ Handle save changes
  const handleSave = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, {
        name: userData.name,
        note: userData.note,
        map: {
          ...userData.map,
          address: userData.map.address,
        },
      });

      alert("✅ Thông tin đã được cập nhật!");
    } catch (error) {
      console.error("❌ Error updating profile:", error);
      alert("Lỗi khi lưu thông tin: " + error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!userData) return <p>No user data found.</p>;

    return (
        <div className="profile-page">
            <h2>👤 Hồ sơ người dùng</h2>

            <label>Họ tên:</label>
            <input
                type="text"
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            />

            <label>Số điện thoại:</label>
            <input type="text" value={userData.phone} disabled />

            <label>Địa chỉ:</label>
            <input
                type="text"
                value={userData.map?.address || ""}
                onChange={(e) =>
                    setUserData({
                    ...userData,
                    map: { ...userData.map, address: e.target.value },
                    })
                }
            />

            <p>⭐ Điểm tích lũy: <b>{userData.points || 0}</b></p>

            <button onClick={handleSave} className="profile-btn-save">
            Lưu thay đổi
            </button>
        </div>
    );
}
