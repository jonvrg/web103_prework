import { Link } from "react-router-dom";
import "./CreatorCard.css"; // only used for the image height

const CreatorCard = ({ creator }) => {
  const { id, name, url, description, imageURL } = creator;

  return (
    <article>
      {imageURL && (
        <img
          src={imageURL}
          alt={name ? `${name} image` : "Creator image"}
          className="creator-image"
        />
      )}

      <header>
        <h3 style={{ marginBottom: ".25rem" }}>{name}</h3>
      </header>

      {description && <p>{description}</p>}

      <footer style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
        <Link to={`/creators/${id}`} role="button">
          Details
        </Link>
        {url && (
          <a href={url} target="_blank" rel="noreferrer" role="button" className="secondary">
           TikTok
          </a>
        )}
        <Link to={`/creators/${id}/edit`} role="button" className="secondary">
          Edit
        </Link>
      </footer>
    </article>
  );
};

export default CreatorCard;
