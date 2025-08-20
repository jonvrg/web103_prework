import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./EditCreator.css";

const API_URL = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/creators`;
const API_KEY = import.meta.env.VITE_SUPABASE_KEY;

const EditCreator = ({ onChanged }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState(null);

  // Load existing creator
  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const numericId = Number(id);
        if (Number.isNaN(numericId)) throw new Error("Invalid creator id");

        const res = await axios.get(API_URL, {
          headers: {
            apikey: API_KEY,
            Authorization: `Bearer ${API_KEY}`,
          },
          params: {
            select: "*",
            id: `eq.${numericId}`,
            limit: 1,
          },
        });

        if (!mounted) return;

        const row = Array.isArray(res.data) ? res.data[0] : null;
        if (!row) throw new Error("Creator not found");

        setName(row.name || "");
        setUrl(row.url || "");
        setDescription(row.description || "");
        setImageURL(row.imageURL || "");
        setErr(null);
      } catch (e) {
        setErr(e?.response?.data?.message || e.message || String(e));
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [id]);

  // Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(null);

    if (!name.trim()) {
      setErr("Name is required.");
      return;
    }

    setSaving(true);
    try {
      await axios.patch(
        API_URL,
        {
          name,
          url,
          description,
          imageURL: imageURL || null,
        },
        {
          headers: {
            apikey: API_KEY,
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
            Prefer: "return=representation",
          },
          params: {
            id: `eq.${Number(id)}`,
          },
        }
      );

      if (onChanged) await onChanged(); // refresh home list if App passed this
      navigate(`/creators/${id}`);
    } catch (e) {
      setErr(e?.response?.data?.message || e.message || String(e));
    } finally {
      setSaving(false);
    }
  };

  // Delete
  const handleDelete = async () => {
    if (!confirm("Delete this creator?")) return;
    setSaving(true);
    setErr(null);
    try {
      await axios.delete(API_URL, {
        headers: {
          apikey: API_KEY,
          Authorization: `Bearer ${API_KEY}`,
        },
        params: {
          id: `eq.${Number(id)}`,
        },
      });
      if (onChanged) await onChanged();
      navigate("/");
    } catch (e) {
      setErr(e?.response?.data?.message || e.message || String(e));
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="page">
        <p>Loading…</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h2>Edit Creator</h2>

      {err && <p className="error">Error: {err}</p>}

      <form className="form" onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            placeholder="Creator name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          Channel/Page URL
          <input
            type="url"
            placeholder="https://…"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>

        <label>
          Image URL (optional)
          <input
            type="url"
            placeholder="https://…"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
          />
        </label>

        <label>
          Description
          <textarea
            rows={5}
            placeholder="What is this creator about?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <div className="actions">
          <button className="btn primary" type="submit" disabled={saving}>
            {saving ? "Saving…" : "Save Changes"}
          </button>
          <button
            type="button"
            className="btn danger"
            onClick={handleDelete}
            disabled={saving}
          >
            {saving ? "Deleting…" : "Delete"}
          </button>
          <Link className="btn" to={`/creators/${id}`}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditCreator;
