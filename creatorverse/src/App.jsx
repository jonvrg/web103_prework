import { useEffect, useState } from "react";
import { Link, useRoutes } from "react-router-dom";
import { supabase } from "./client";
import ShowCreators from "./pages/ShowCreators";
import ViewCreator from "./pages/ViewCreator";
import AddCreator from "./pages/AddCreator";
import EditCreator from "./pages/EditCreator";
import "./App.css";

const App = () => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    async function fetchCreators() {
      try {
        const { data, error } = await supabase
          .from("creators")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw error;
        setCreators(data ?? []);
      } catch (e) {
        setErr(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCreators();
  }, []);

  const element = useRoutes([
    { path: "/", element: <ShowCreators creators={creators} loading={loading} err={err} /> },
    { path: "/creators/new", element: <AddCreator /> },
    { path: "/creators/:id", element: <ViewCreator /> },
    { path: "/creators/:id/edit", element: <EditCreator /> },
  ]);

  return (
    <div className="container">
      <header className="app-header">
        <Link to="/" className="brand">Creatorverse</Link>
        <nav>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/creators/new" className="nav-link">Add Creator</Link>
        </nav>
      </header>
      <main>{element}</main>
    </div>
  );
};

export default App;
