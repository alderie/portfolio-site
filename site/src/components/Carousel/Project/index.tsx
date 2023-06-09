import './style.scss';

export interface ProjectProps {}


export const Project: React.FC<ProjectProps> = () => {
  return (
    <div className="project">
      <div className="info">
        <h3 className="title">DOMICILIUM</h3>
        <span className="time">jan - march 2022</span>
      </div>
    </div>
  );
};
