import { Link } from "react-router-dom";
import CreatorCard from "../components/CreatorCard";
import "./ShowCreators.css";

const ShowCreators = ({ creators, loading, err }) => {
  if (loading) return <p>Loading…</p>;
  if (err) return <p className="error">Error: {err}</p>;

  return (
    <section>
      <header className="grid" style={{ alignItems: "center" }}>
        <h2>All Creators</h2>
        <div style={{ justifySelf: "end" }}>
          <Link to="/creators/new" role="button" className="contrast">
            + Add Creator
          </Link>
        </div>
      </header>

      {(!creators || creators.length === 0) ? (
        <p>No content creators yet. Add one to get started!</p>
      ) : (
        <div className="card-grid">
          {creators.map((c) => (
            <CreatorCard key={c.id} creator={c} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ShowCreators;
