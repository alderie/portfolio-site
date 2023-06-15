import "./style.scss";
import eyesURL from "./assets/eyes.png";
import thumbsURL from "./assets/thumbs.png";

export const ContactButton: React.FC = () => {
  return (
    <a href="mailto:victorvnovichkov@gmail.com">
      <div className="contact">
        <img src={eyesURL} className="eyes" alt="eyes emoji" />
        <button>contact me</button>
        <img src={thumbsURL} className="thumbs" alt="thumbs up emoji" />
      </div>
    </a>
  );
};
