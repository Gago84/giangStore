import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/config";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";   // 🔹 import Auth
import "../styles/BlogPost.css";

function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        let data = docSnap.data();

        // 🔹 Convert storage path → URL
        if (data.imageUrl) {
          try {
            const storage = getStorage();
            const imgRef = ref(storage, data.imageUrl);
            data.imageUrl = await getDownloadURL(imgRef);
          } catch (e) {
            console.error("Error loading image:", e);
          }
        }

        setPost(data);
      }
    };
    fetchPost();

    const q = query(
      collection(db, "posts", id, "comments"),
      orderBy("createdAt", "asc")
    );
    const unsub = onSnapshot(q, (snapshot) => {
      let list = [];
      snapshot.forEach((doc) => list.push({ id: doc.id, ...doc.data() }));
      setComments(list);
    });
    return () => unsub();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const auth = getAuth();
    const currentUser = auth.currentUser;

    const userName =
      currentUser?.displayName ||
      currentUser?.phoneNumber ||
      "Khách";

    await addDoc(collection(db, "posts", id, "comments"), {
      text: newComment,
      user: userName,
      createdAt: serverTimestamp(),
    });

    setNewComment("");
  };

  if (!post) return <p>Loading...</p>;

  return (
    <article className="blog-post">
      <h1>{post.title}</h1>
      {post.imageUrl && (
        <img src={post.imageUrl} alt={post.title} className="blogpost-img" />
      )}
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <h3>Bình luận</h3>
      {comments.length > 0 ? (
        <ul className="blog-comments">
          {comments.map((c) => (
            <li key={c.id}>
              <b>{c.user || "Ẩn danh"}</b>: {c.text}
              <br />
              <small>
                {c.createdAt?.toDate
                  ? c.createdAt.toDate().toLocaleString("vi-VN") // 🔹 chỉ ngày
                  : "Đang cập nhật..."}
              </small>
            </li>
          ))}
        </ul>
      ) : (
        <p>Chưa có bình luận nào</p>
      )}

      <form onSubmit={handleSubmit} className="blog-form">
        <textarea
          value={newComment}
          maxLength={300}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Viết bình luận (tối đa 300 ký tự)..."
          rows={3}   // mặc định 3 dòng
        />
        <button type="submit">Gửi</button>
      </form>
      <p className="comment-hint">
        {newComment.length}/300 ký tự
      </p>

    </article>
  );
}

export default BlogPost;
