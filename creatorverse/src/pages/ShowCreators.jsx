import { Link } from "react-router-dom";
import CreatorCard from "../components/CreatorCard";
import "./ShowCreators.css";

const ShowCreators = ({ creators, loading, err }) => {
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
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <h2>All Creators</h2>
        <Link to="/creators/new" className="btn">+ Add Creator</Link>
      </div>

      {(!creators || creators.length === 0) ? (
        <p className="empty">No content creators yet. Add one to get started!</p>
      ) : (
        <div className="creator-grid">
          {creators.map((c) => (
            <CreatorCard key={c.id} creator={c} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowCreators;
