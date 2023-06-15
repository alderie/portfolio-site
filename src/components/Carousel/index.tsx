import { useEffect, useRef } from "react";
import arrows from "./arrows.svg";
import "./style.scss";
import { Project, ProjectProps } from "./Project";

export interface CarouselProps {
  currentProjectID: number;
}

const PROJECTS: Array<ProjectProps> = [
  {
    title: require("../../assets/project_assets/research_logo.png"),
    isTitleLogo: true,
    time: "may - [ongoing] 2023",
    description: "Using Pinecone DB and GPT-4 vector embeddings, I'm working on a better search engine for research, that is able to both provide more granular search results and give meaningful feedback in response to the abstract search query.",
    toolsUsed: ["Typescript", "React", "Pinecone", "Python", "GPT-4 API", "Pandas"],
    previewImage: require("../../assets/project_assets/research_preview.png")
  },
  {
    title: "DOMICILIUM",
    time: "april 7 - 9, 2023",
    description:
      "For UMD Bitcamp 2023, I worked on a project to help immigrants learn more about the destination countries they are trying to go to. I displayed information about quality of life, cost of living and rent, and other information about the country.",
    toolsUsed: ["Python", "Pandas", "Typescript", "React"],
    previewImage: require("../../assets/project_assets/domicilium_preview.png"),
  },
  {
    title: "CONGRESS WHISPER",
    time: "march - [ongoing] 2023",
    description: "I'm independendly working a newsletter powered by GPT-4 that will help create summaries of upcoming political legislation along with tailored responses about how that legislation could affect the subscriber",
    toolsUsed: ["Typescript", "React", "Firebase", "Python", "GPT-4 API", "Pandas"],
    previewImage: require("../../assets/project_assets/congress_whisper_preview.png"),
  },
  {
    title: require("../../assets/project_assets/lofi_logo.png"),
    isTitleLogo: true,
    time: "sep 20, 2021",
    description: "I like listening to lofi while I work. I decided to build a simple lofi player in Electron with some style inspirations from the Apple Watch.",
    toolsUsed: ["Typescript", "Electron"],
    previewImage: require("../../assets/project_assets/lofi_preview.png")
  }
];

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
          <img src={arrows} className="arrows" alt="three arrows pointing down" />
        </div>
        <div className="projects" ref={projectsRef}>
          {PROJECTS.map((project, i) => {
            return (
              <Project
                title={project.title}
                isTitleLogo={project.isTitleLogo}
                time={project.time}
                description={project.description}
                toolsUsed={project.toolsUsed}
                previewImage={project.previewImage}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
