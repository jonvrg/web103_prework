import { Link } from "react-router-dom";
import "./CreatorCard.css";

/* Creator card shows the contents of the creator: Name, URL, Image, Description, etc.) */ 
const CreatorCard = ({ creator }) => {
  const { id, name, url, description, imageURL } = creator;

  return (
    <div className="creator-card">
      {imageURL && (
        <img
          src={imageURL}
          alt={name}
          className="creator-image"
        />
      )}

      <h3 className="creator-title">{name}</h3>
      <p className="creator-desc">{description}</p>

      <div className="creator-actions">
        <Link to={`/creators/${id}`} className="btn">View</Link>
        {url && (
          <a href={url} target="_blank" rel="noreferrer" className="btn">
            Visit
          </a>
        )}
      </div>
    </div>
  );
};

export default CreatorCard;
