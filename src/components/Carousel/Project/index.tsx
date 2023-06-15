import { useEffect, useRef, useState } from "react";
import "./style.scss";

export interface ProjectProps {
  title: string,
  isTitleLogo?: boolean,
  time: string, //jan - march 2022
  description: string,
  toolsUsed: string[],
  previewImage: string
}

export const Project: React.FC<ProjectProps> = ({ title, isTitleLogo, time, description, toolsUsed, previewImage }) => {
  const [showTools, setShowTools] = useState(false);
  const toolRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    const handleClickOutside = (event: MouseEvent) => {
      if (toolRef.current && !toolRef.current.contains(event.target as Node)) {
        setShowTools(false);
      }
    };

    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    }
  }, [])

  return (
    <div className="project">
      <div className="info">
        {isTitleLogo ? <img alt="logo" src={title} className='title'></img> : <h3 className="title">{title}</h3>}
        <span className="time">{time}</span>
      </div>
      <div className='preview'>
        <img src={previewImage} className='web-preview' alt="website preview"/>
      </div>
      <div className="description">
        {description}
      </div>
      <div className="tools" ref={toolRef}>
        <div
          className="dot"
          onClick={() => {
            setShowTools(state => !state);
          }}
        ><span className="material-symbols-outlined">
        {showTools ? "close" : "handyman"}
        </span></div>
        {showTools ? (
          <ul className="list">
            {toolsUsed.map(name => (<li>{name}</li>))}
          </ul>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
