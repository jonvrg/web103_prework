import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { supabase } from "../client";
import "./EditCreator.css";

const EditCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    url: "",
    description: "",
    imageURL: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    (async () => {
      const numericId = Number(id);
      if (Number.isNaN(numericId)) {
        setErr("Invalid creator id");
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from("creators")
        .select("*")
        .eq("id", numericId)
        .single();

      if (error) setErr(error.message);
      else if (data) {
        setForm({
          name: data.name || "",
          url: data.url || "",
          description: data.description || "",
          imageURL: data.imageURL || "",
        });
      }
      setLoading(false);
    })();
  }, [id]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    if (!form.name.trim()) {
      setErr("Name is required.");
      return;
    }
    setSaving(true);

    const payload = { ...form };
    if (!payload.imageURL) delete payload.imageURL;

    const { error } = await supabase
      .from("creators")
      .update(payload)
      .eq("id", Number(id));

    if (error) {
      setErr(error.message);
      setSaving(false);
      return;
    }
    navigate(`/creators/${id}`);
  };

  const onDelete = async () => {
    if (!confirm("Delete this creator?")) return;
    setSaving(true);
    const { error } = await supabase
      .from("creators")
      .delete()
      .eq("id", Number(id));

    if (error) {
      setErr(error.message);
      setSaving(false);
      return;
    }
    navigate("/");
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

      <form className="form" onSubmit={onSubmit}>
        <label>
          Name
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="Creator name"
          />
        </label>

        <label>
          Channel/Page URL
          <input
            name="url"
            value={form.url}
            onChange={onChange}
            placeholder="https://…"
          />
        </label>

        <label>
          Image URL (optional)
          <input
            name="imageURL"
            value={form.imageURL}
            onChange={onChange}
            placeholder="https://…"
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={onChange}
            rows={5}
            placeholder="What is this creator about?"
          />
        </label>

        <div className="actions">
          <button className="btn primary" type="submit" disabled={saving}>
            {saving ? "Saving…" : "Save Changes"}
          </button>
          <button
            type="button"
            className="btn danger"
            onClick={onDelete}
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
