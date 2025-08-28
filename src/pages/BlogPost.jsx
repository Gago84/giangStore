import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/config";
import {  doc,  getDoc,  collection,  addDoc,  query,  orderBy,  onSnapshot,  serverTimestamp,} from "firebase/firestore";

function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setPost(docSnap.data());
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

    await addDoc(collection(db, "posts", id, "comments"), {
      text: newComment,
      user: "Khách", // sau này có thể lấy từ currentUser.displayName
      createdAt: serverTimestamp(),
    });

    setNewComment("");
  };

  if (!post) return <p>Loading...</p>;

  return (
    <article>
      <h2>{post.title}</h2>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <h3>Bình luận</h3>
      <ul>
        {comments.map((c) => (
          <li key={c.id}>
            <b>{c.user}</b>: {c.text}
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Viết bình luận..."
        />
        <button type="submit">Gửi</button>
      </form>
    </article>
  );
}

export default BlogPost;
