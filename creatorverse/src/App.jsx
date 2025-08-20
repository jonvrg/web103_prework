import { useEffect, useState, useCallback } from "react";
import { Link, useRoutes } from "react-router-dom";
import axios from "axios";
import ShowCreators from "./pages/ShowCreators";
import ViewCreator from "./pages/ViewCreator";
import AddCreator from "./pages/AddCreator";
import EditCreator from "./pages/EditCreator";

const API_URL = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/creators`;
const API_KEY = import.meta.env.VITE_SUPABASE_KEY;

const App = () => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const fetchCreators = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL, {
        headers: { apikey: API_KEY, Authorization: `Bearer ${API_KEY}` },
        params: { select: "*", order: "created_at.desc" },
      });
      setCreators(res.data || []);
      setErr(null);
    } catch (e) {
      setErr(e?.response?.data?.message || e.message || String(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCreators(); }, [fetchCreators]);

  const element = useRoutes([
    { path: "/", element: <ShowCreators creators={creators} loading={loading} err={err} /> },
    { path: "/creators/new", element: <AddCreator onChanged={fetchCreators} /> },
    { path: "/creators/:id", element: <ViewCreator /> },
    { path: "/creators/:id/edit", element: <EditCreator onChanged={fetchCreators} /> },
  ]);

  return (
    <>
      <nav className="container-fluid">
        <ul>
          <li>
            <Link to="/" className="contrast" style={{ textDecoration: "none" }}>
              <strong>Creatorverse</strong>
            </Link>
          </li>
        </ul>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/creators/new">Add Creator</Link></li>
        </ul>
      </nav>

      <main className="container">
        {element}
      </main>
    </>
  );
};

export default App;
