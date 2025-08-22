import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/config";
import { RecaptchaVerifier, signInWithPhoneNumber, updateProfile } from "firebase/auth";
import { clearForm, convertToE164, isValidVietnamesePhone } from "../utils";
import {  doc,  setDoc,  serverTimestamp,  collection,  query,  where,  getDocs,} from "firebase/firestore";
import "../styles/AuthForm.css";

export default function SignUp() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpSection, setShowOtpSection] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Khởi tạo reCAPTCHA khi component mount
  useEffect(() => {
    console.log("🔄 useEffect chạy → khởi tạo reCAPTCHA");
    if (!window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier = new RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "normal",
            callback: (response) => {
              console.log("✅ reCAPTCHA solved:", response);
            },
            "expired-callback": () => {
              console.warn("⚠️ reCAPTCHA expired. Please try again.");
            },
          },
          auth
        );
        console.log("✅ reCAPTCHA verifier đã khởi tạo", window.recaptchaVerifier);
      } catch (err) {
        console.error("❌ Lỗi khi khởi tạo reCAPTCHA:", err);
      }
    }
  }, []);

  // ✅ Gửi OTP
  const sendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {

      if (!isValidVietnamesePhone(phone)) {
        alert("⚠️ Vui lòng nhập số điện thoại hợp lệ (VD: 09xxxxxxxx)");
        setLoading(false);
        return;
      }

      const phoneNumber = convertToE164(phone);
      console.log("📞 Số điện thoại chuẩn hóa:", phoneNumber);

      // Kiểm tra số đã tồn tại?
      const q = query(collection(db, "users"), where("phone", "==", phoneNumber));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        alert("⚠️ Số điện thoại này đã được đăng ký. Bạn hãy đăng nhập nhé!");
        setLoading(false);
        return;
      }

      const appVerifier = window.recaptchaVerifier;
      console.log("🔍 appVerifier hiện tại:", appVerifier);

      if (!appVerifier) throw new Error("reCAPTCHA chưa sẵn sàng");

      const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);

      setConfirmationResult(result);
      setShowOtpSection(true);
      console.log("✅ OTP đã gửi thành công đến", phoneNumber);
    } catch (error) {
      console.error("❌ Error sending OTP:", error);
      alert("❌ " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Verify OTP
  const verifyOtp = async () => {
    if (!confirmationResult) {
      alert("No OTP confirmation found. Please request OTP again.");
      return;
    }

    setLoading(true);
    try {
      console.log("🔍 Xác thực OTP:", otp);

      const result = await confirmationResult.confirm(otp);
      const user = result.user;
      console.log("✅ OTP verified. User:", user);

      // 👉 Cập nhật Auth profile
      await updateProfile(user, {
        displayName: name,
      });

      // 👉 Lưu Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: name,
        phone: user.phoneNumber,
        createdAt: serverTimestamp(),
      });

      alert("✅ Số điện thoại được xác thực, hồ sơ được lưu, chào mừng bạn " + name);

      clearForm(setName, setPhone, setOtp);
      navigate("/");
    } catch (error) {
      console.error("❌ OTP verification failed:", error);
      alert("❌ " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-form-container">
        <h2>Sign Up with Phone</h2>

        {!showOtpSection && (
          <form onSubmit={sendOtp}>
            <input
              type="text"
              placeholder="Họ tên"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="09XXXXXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            {/* ✅ reCAPTCHA container */}
            <div id="recaptcha-container"></div>

            <div className="form-buttons">
              <button type="submit" className="auth-btn-primary" disabled={loading}>
                {loading ? "Sending..." : "Send OTP"}
              </button>
              <button
                type="button"
                className="auth-btn-secondary"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {showOtpSection && (
          <div className="auth-otp-section">
            <input
              type="text"
              placeholder="Nhập mã OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button onClick={verifyOtp} className="auth-btn-primary" disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
            <button
              type="button"
              className="auth-btn-secondary"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
