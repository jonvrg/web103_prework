import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddCreator.css";

const API_URL = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/creators`;
const API_KEY = import.meta.env.VITE_SUPABASE_KEY;

const AddCreator = ({ onChanged }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    if (!name.trim() || !url.trim() || !description.trim()) {
      setErr("Please fill in name, URL, and description.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        API_URL,
        { name, url, description, imageURL: imageURL || null },
        {
          headers: {
            apikey: API_KEY,
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
            Prefer: "return=representation",
          },
        }
      );
      // refresh list then go home (or to details if you prefer)
      if (onChanged) await onChanged();
      navigate("/");
    } catch (e) {
      setErr(e?.response?.data?.message || e.message || String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h2>Add New Content Creator</h2>
      {err && <p className="error">Error: {err}</p>}
      <form className="form" onSubmit={handleSubmit}>
        <label> Name
          <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Creator name" required />
        </label>
        <label> Channel/Page URL
          <input type="url" value={url} onChange={(e)=>setUrl(e.target.value)} placeholder="https://…" required />
        </label>
        <label> Image URL (optional)
          <input type="url" value={imageURL} onChange={(e)=>setImageURL(e.target.value)} placeholder="https://…" />
        </label>
        <label> Description
          <textarea rows={5} value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="What is this creator about?" required />
        </label>
        <div className="actions">
          <button className="btn primary" type="submit" disabled={loading}>{loading ? "Adding…" : "Add Creator"}</button>
          <Link className="btn" to="/">Cancel</Link>
        </div>
      </form>
    </div>
  );
};

export default AddCreator;
