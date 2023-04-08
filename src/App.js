import { useState, useEffect } from 'react';
import './App.css';
import Card from './components/card';
import Loader from './components/loader';
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const sortField = ["stars", "watchers count", 'scrore', 'created_at', 'updated_at']

  useEffect(() => {
    if (query) {
      SearchRepo()
    }
    else {
      setData([])
      setLoading(true)
    }
  }, [query])

  const SearchRepo = async () => {
    setLoading(true)
    let value = query;
    setQuery(value)
    if (value.length > 2) {
      const res = await fetch(`https://api.github.com/search/repositories?q=${query}`);
      if (!res.ok) {
        console.log(res.status, 'error')
      }
      const responseData = await res.json();
      setLoading(false)
      setData(responseData.items)
    }
  }

  const SortData = (el) => {
    const exp = el
    const newSortedData = data.sort((a, b) => {
      switch (exp) {
        case "stars":
          return b.stargazers_count - a.stargazers_count
        case "watchers count":
          return b.watchers_count - a.watchers_count
        case "score":
          return b.score - a.score
        case "created_at":
          return new Date(b.created_at) - new Date(a.created_at)
        case "updated_at":
          return new Date(b.updated_at) - new Date(a.updated_at)
        default:
          console.log("no filter")
      }
      return true

    })
    setData([...newSortedData])
  }

  return (
    <div className="App">
      <div className='search-input'>
        <input onChange={(e) => setQuery(e.target.value)} placeholder='Search Repo' value={query} type='text' />
        <MagnifyingGlassIcon style={{ width: '30px' }} />
      </div>
      <div className='filter-container'>
        {sortField.map((el, index) =>
          <a className='filter' href='#' title={el} key={index} onClick={() => SortData(el)}>{el}</a>
        )}
      </div>
      <div className='cards-container'>
        {loading ?
          Array(15).fill("").map((_, i) => {
            return <Loader key={i} />
          })
          :
          data && data.length > 0 && data.map((el, index) =>
            <Card data={el} key={index} />
          )
        }
      </div>
    </div>
  );
}

export default App;
