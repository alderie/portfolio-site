import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import mySvg from "./paint.svg";
import { ContactButton } from "./components/ContactButton";
import { Carousel } from "./components/Carousel";

/**
 * Utility function that makes a useState object that also provides a linked ref
 * @param {T} initialState 
 * @returns {[T, React.Dispatch<React.SetStateAction<T>>, React.MutableRefObject<T>]}
 */
const useStateRef = <T extends unknown>(initialState: T) => {
  const [state, setState] = useState(initialState);
  const ref = useRef(initialState);

  useEffect(() => {
    ref.current = state;
  }, [state]);

  // Use "as const" below so the returned array is a proper tuple
  return [state, setState, ref] as const;
};

/**
 * Utility function for making debounced calls
 * @param delay (debounce delay in ms)
 * @param func (function to be called)
 * @returns Function that can be called with the debounce delay
 */
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

  // Debounce handling for scroll wheel page position
  const increasePagePositionScroll = useRef(debounce(500, ()=>{
    if (sectionRef.current === 1 && projectNumRef.current < NUM_PROJECTS) {
      setProjectNum(Math.min(projectNumRef.current + 1, NUM_PROJECTS));
    } else {
      setSection(Math.min(sectionRef.current + 1, BREAKPOINTS.length - 1));
    }
  }))

  const decreasePagePositionScroll = useRef(debounce(500, ()=>{
    if (sectionRef.current === 1 && projectNumRef.current > 0) {
      setProjectNum(Math.max(projectNumRef.current - 1, 0));
    } else {
      setSection(Math.max(sectionRef.current - 1, 0));
    }
  }))

  /**
   * Debounced section and project index setters
   */
  const increaseSectionNum = useRef(
    debounce(500, () => {
      setSection(Math.min(sectionRef.current + 1, BREAKPOINTS.length - 1));
    })
  );
  const increaseProjectNum = useRef(
    debounce(500, () => {
      setProjectNum(Math.min(projectNumRef.current + 1, NUM_PROJECTS));
    })
  );
  const decreaseSectionNum = useRef(
    debounce(500, () => {
      setSection(Math.max(sectionRef.current - 1, 0));
    })
  );
  const decreaseProjectNum = useRef(
    debounce(500, () => {
      setProjectNum(Math.max(projectNumRef.current - 1, 0));
    })
  );

  const appRef = useRef<HTMLDivElement>(null);
  const initialPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const offset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {

    // Handle mousewheel scroll
    const onScroll = (evt: WheelEvent) => {
      // Scroll down
      if (evt.deltaY > 0) {
        increasePagePositionScroll.current();
      } else if (evt.deltaY < 0) {
        decreasePagePositionScroll.current();
      }
    };

    // Handle touch events for mobile and tablet
    const onTouchBegin = (evt: TouchEvent) => {
      if (evt.touches.length === 0) return;

      const touch = evt.touches[0];
      initialPosition.current = { x: touch.clientX, y: touch.clientY };
    };

    const onTouchMove = (evt: TouchEvent) => {
      const touch = evt.touches[0];
      offset.current = {
        x: touch.clientX - initialPosition.current.x,
        y: touch.clientY - initialPosition.current.y,
      };
    };

    const onTouchEnd = (evt: TouchEvent) => {
      const THRESHOLD = 100;
      // Special handling of swiping in the x direction for the projects section
      if (sectionRef.current === 1) {

        // Only change sections if y offset is over threshold
        if (offset.current.y < -THRESHOLD && Math.abs(offset.current.x) < THRESHOLD && projectNumRef.current === NUM_PROJECTS) {
          increaseSectionNum.current();
        } else if (offset.current.y > THRESHOLD && Math.abs(offset.current.x) < THRESHOLD && projectNumRef.current === 0) {
          decreaseSectionNum.current();
        }

        if (offset.current.x < -THRESHOLD) {
          increaseProjectNum.current();
        } else if (offset.current.x > THRESHOLD) {
          decreaseProjectNum.current();
        }

        // Every other section is treated normally with no x direction swiping
      } else {
        if (offset.current.y < 0) {
          increaseSectionNum.current();
        } else if (offset.current.y > 0) {
          decreaseSectionNum.current();
        }
      }

      offset.current = { x: 0, y: 0};
    };

    window.addEventListener("wheel", onScroll);

    window.addEventListener("touchstart", onTouchBegin);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);

    // Remove all listener on component destructuring
    return () => {
      window.removeEventListener("wheel", onScroll);
      window.removeEventListener("touchstart", onTouchBegin);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [increaseProjectNum, increaseSectionNum, decreaseProjectNum, decreaseSectionNum, projectNumRef, sectionRef]);

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
      <div className={"guide " + (section === 1 ? "projects-active" : "")}>
        <div className="line"></div>
        <div className="second-line"></div>
        <div className="label">
          {section === 0 ? "contact..." : "...projects"}
        </div>
      </div>
      <div className="splash">
        <h1 className="splash-text">
          <b>VICTOR</b>
          <span>NOVICHKOV</span>
        </h1>
        <div className="description">
          <div className="subtext">
            design - development - <b className="accent">magic</b>
          </div>
          <img
            src={mySvg}
            className="subtext-decor"
            alt="colorful brushstrokes"
          />
        </div>
      </div>
      <ContactButton></ContactButton>
      <Carousel currentProjectID={projectNum}></Carousel>
    </div>
  );
}

export default App;
