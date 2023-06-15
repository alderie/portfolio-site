import React, { useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import mySvg from "./paint.svg";
import { ContactButton } from "./components/ContactButton";
import { Carousel } from "./components/Carousel";

const useStateRef = <T extends unknown>(initialState: T) => {
  const [state, setState] = useState(initialState);
  const ref = useRef(initialState);

  useEffect(() => {
    ref.current = state;
  }, [state]);

  // Use "as const" below so the returned array is a proper tuple
  return [state, setState, ref] as const;
};

const debounce = (delay: number, func: Function) => {
  let called = false;
  return () => {
    if (!called) {
      func();
      called = true;
      setTimeout(() => {
        called = false;
      }, delay);
    }
  };
};

const BREAKPOINTS = [0, 1000];
const NUM_PROJECTS = 3;

function App() {
  const [section, setSection, sectionRef] = useStateRef(0);
  const [projectNum, setProjectNum, projectNumRef] = useStateRef(0);

  const increasePagePosition = debounce(500, () => {
    if (sectionRef.current === 1 && projectNumRef.current < NUM_PROJECTS) {
      setProjectNum(Math.min(projectNumRef.current + 1, NUM_PROJECTS));
    } else {
      setSection(Math.min(sectionRef.current + 1, BREAKPOINTS.length - 1));
    }
  });
  const decreasePagePosition = debounce(500, () => {
    if (sectionRef.current === 1 && projectNumRef.current > 0) {
      setProjectNum(Math.max(projectNumRef.current - 1, 0));
    } else {
      setSection(Math.max(sectionRef.current - 1, 0));
    }
  });

  const appRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = (evt: WheelEvent) => {
      // Scroll down
      if (evt.deltaY > 0) {
        increasePagePosition();
      } else if (evt.deltaY < 0) {
        decreasePagePosition();
      }
    };

    window.addEventListener("wheel", onScroll);

    return () => {
      window.removeEventListener("wheel", onScroll);
    };
  }, []);

  useEffect(() => {
    if (appRef.current) {
      appRef.current.scrollTo({
        left: 0,
        top: BREAKPOINTS[section],
        behavior: "smooth",
      });
    }
  }, [section]);

  return (
    <div className="App" ref={appRef}>
      <div className={"guide " + (section == 1 ? "projects-active" : "")}>
        <div className="line"></div>
        <div className="second-line"></div>
        <div className="label">
          {section === 0 ? "contact..." : "...projects"}
        </div>
      </div>
      <div className="splash">
        <h1 className="splash-text">
          <b>VICTOR</b><span>NOVICHKOV</span>
        </h1>
        <div className="description">
          <div className="subtext">
            design - development - <b className="accent">magic</b>
          </div>
          <img src={mySvg} className="subtext-decor" />
        </div>
      </div>
      <ContactButton></ContactButton>
      <Carousel currentProjectID={projectNum}></Carousel>
    </div>
  );
}

export default App;
