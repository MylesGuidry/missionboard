import "./SpaceLoader.css";

export default function SpaceLoader() {
    return (
      <div className="space-loader">
        <div className="box-of-star1">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className={`star star-position${i + 1}`} />
          ))}
        </div>
  
        <div className="box-of-star2">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className={`star star-position${i + 1}`} />
          ))}
        </div>
  
        <div className="box-of-star3">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className={`star star-position${i + 1}`} />
          ))}
        </div>
  
        <div className="box-of-star4">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className={`star star-position${i + 1}`} />
          ))}
        </div>
  
        <div className="astronaut">
          <div className="head" />
          <div className="arm arm-left" />
          <div className="arm arm-right" />
          <div className="body">
            <div className="panel" />
          </div>
          <div className="leg leg-left" />
          <div className="leg leg-right" />
          <div className="schoolbag" />
        </div>
      </div>
    );
  }