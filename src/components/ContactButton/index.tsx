import "./style.scss";
import eyesURL from "./assets/eyes.png";
import thumbsURL from "./assets/thumbs.png";
import { useState } from "react";

export const ContactButton: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <a href="mailto:victorvnovichkov@gmail.com">
      <div
        className="contact"
        onClick={() => {
          setOpen((state) => !state);
        }}
      >
        <img src={eyesURL} className="eyes" />
        <button>contact me</button>
        <img src={thumbsURL} className="thumbs" />
      </div>
    </a>
  );
};
