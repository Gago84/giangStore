import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import "../styles/Blog.css";

function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, async (snapshot) => {
      const storage = getStorage();
      const list = await Promise.all(
        snapshot.docs.map(async (d) => {
          const data = { id: d.id, ...d.data() };

          // 🔹 Convert storage path → https url
          if (data.imageUrl) {
            try {
              const imgRef = ref(storage, data.imageUrl);
              data.imageUrl = await getDownloadURL(imgRef);
            } catch (e) {
              console.error("Error loading image:", e);
            }
          }

          return data;
        })
      );
      setPosts(list);
    });
    return () => unsub();
  }, []);

  return (
<section className="blog-section">
  <h2 className="blog-title">📝 Bài viết</h2>

  <ul className="blog-list">
    {posts.map((post) => (
      <li key={post.id} className="blog-item">
        {post.imageUrl && (
          <img src={post.imageUrl} alt={post.title} />
        )}

        <div className="blog-content">
          <h3>{post.title}</h3>
          <p className="blog-date">
            {post.createdAt?.toDate().toLocaleDateString("vi-VN")}
          </p>
          <p className="blog-excerpt">
            {post.content.replace(/<[^>]+>/g, "").slice(0, 180)}...
          </p>
          <Link className="blog-link" to={`/blog/${post.id}`}>
            Đọc tiếp →
          </Link>
        </div>
      </li>
    ))}
  </ul>
</section>

  );
}

export default Blog;
