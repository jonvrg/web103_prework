import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../client";
import "./AddCreator.css";

const AddCreator = () => {
  const [form, setForm] = useState({
    name: "",
    url: "",
    description: "",
    imageURL: "",
  });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState(null);

  const navigate = useNavigate();

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

    // imageURL is optional
    const payload = { ...form };
    if (!payload.imageURL) {
      delete payload.imageURL;
    }

    const { data, error } = await supabase
      .from("creators")
      .insert([payload])
      .select()
      .single();

    if (error) {
      setErr(error.message);
      setSaving(false);
      return;
    }

    navigate(`/creators/${data.id}`);
  };

  return (
    <div className="page">
      <h2>Add Creator</h2>

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
            {saving ? "Saving…" : "Save"}
          </button>
          <Link className="btn" to="/">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddCreator;
