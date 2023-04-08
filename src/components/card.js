export default function Card({ data }) {
  return (
    <div className="card">
      <div className="avatar_image">
        <img src={data.owner.avatar_url} alt="avantar" className="logo" />
      </div>
      <div className="card-content">
        <span>Repo Name: {data.name}</span>
        <span>Stars: {data.stargazers_count} {(data.stargazers_count.length > 1000) ? "k" : "" }</span>
        <span>Language : {data.language}</span>
        <p>Description : {data.description}</p>
      </div>
    </div>
  )
}

