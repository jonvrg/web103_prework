import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./ViewCreator.css";

const API_URL = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/creators`;
const API_KEY = import.meta.env.VITE_SUPABASE_KEY;

const ViewCreator = () => {
  const { id } = useParams();
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const numericId = Number(id);
      if (Number.isNaN(numericId)) {
        setErr("Invalid creator id");
        setLoading(false);
        return;
      }

      try {
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

        const row = Array.isArray(res.data) ? res.data[0] : null;
        if (!mounted) return;

        if (!row) setErr("Creator not found");
        else setCreator(row);
      } catch (e) {
        if (!mounted) return;
        setErr(e?.response?.data?.message || e.message || String(e));
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="page">
        <p>Loading…</p>
      </div>
    );
  }

  if (err) {
    return (
      <div className="page">
        <p className="error">Error: {err}</p>
        <Link to="/" className="btn">← Back</Link>
      </div>
    );
  }

  if (!creator) {
    return (
      <div className="page">
        <p className="empty">Creator not found.</p>
        <Link to="/" className="btn">← Back</Link>
      </div>
    );
  }

  const { name, url, description, imageURL } = creator;

  return (
    <div className="page view-creator">
      <Link to="/" className="btn">← Back</Link>
      <h2 className="title">{name}</h2>

      {imageURL && (
        <img
          className="hero-image"
          src={imageURL}
          alt={name}
        />
      )}

      <p className="meta">{description}</p>

      <div className="actions">
        {url && (
          <a
            className="btn primary"
            href={url}
            target="_blank"
            rel="noreferrer"
          >
            Visit channel
          </a>
        )}
        <Link to={`/creators/${creator.id}/edit`} className="btn">Edit</Link>
      </div>
    </div>
  );
};

export default ViewCreator;
