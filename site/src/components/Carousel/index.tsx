import { useEffect, useRef } from "react";
import arrows from "./arrows.svg";
import "./style.scss";
import { Project } from "./Project";

import previewImage from '../../assets/design_political_site.png';

export interface CarouselProps {
  currentProjectID: number;
}

const PROJECTS = [1, 2, 3, 4, 5];

export const Carousel: React.FC<CarouselProps> = ({ currentProjectID }) => {
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (projectsRef.current) {
      const projects = projectsRef.current.querySelectorAll(".project");
      const offset =
        projects[currentProjectID].getBoundingClientRect().x -
        projectsRef.current.getBoundingClientRect().left;

      projectsRef.current.scrollBy({
        left: offset - 15,
        behavior: "smooth",
      });
    }
  }, [currentProjectID]);

  return (
    <div className="carousel">
      <div className="highlight">
        <div className="label">
          <h3 className="title">SEE WHAT I'VE MADE</h3>
          <img src={arrows} className="arrows" />
        </div>
        <div className="projects" ref={projectsRef}>
          {PROJECTS.map((v, i) => {
            return (
              <Project
                title={"DOMICILIUM"}
                time={"jan - march 2022"}
                description={
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
                }
                toolsUsed={["Python", "Typescript", "React"]}
                previewImage={previewImage}
              ></Project>
            );
          })}
        </div>
      </div>
    </div>
  );
};
