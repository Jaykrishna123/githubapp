export default function Loader() {
  return (
    <div className="card skeleton-square" style={{ border: 0 }}>
      <div className="avatar_image skeleton-square" style={{borderRadius:'50%'}}>
        <div className="logo"></div>
      </div>
      <div className="card-content">
        <span className="skeleton-line"></span>
        <span className="skeleton-line"></span>
        <p className="skeleton-line"></p>
      </div>
    </div>
  );
};

