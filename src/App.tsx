import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

interface NewsProps {
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

function App() {
  const [news, setNews] = useState<NewsProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://saurav.tech/NewsAPI/everything/cnn.json')
      .then((result) => {
        setNews(result.data.articles);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError('Error fetching news. Please try again later.');
        setLoading(false);
      });
  }, []);

  const featuredNews = news.slice(0, 3);
  const remainingNews = news.slice(3, 23);

  return (
    <>
      <h1>The News</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="featured-news-container">
        {featuredNews.map((article, index) => (
          <div
            key={index}
            className={`news-item ${index === 0 ? 'featured' : ''}`}
          >
            <h2>{article.title}</h2>
            <img src={article.urlToImage} alt={article.title || 'News Image'} />
            <p className="news-description">{article.description}</p>
            <button className="read-more">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read More...
              </a>
            </button>
          </div>
        ))}
      </div>

      <h4>More News</h4>
      <div className="news-container">
        {remainingNews.map((article, index) => (
          <div key={index} className="news-2">
            <img src={article.urlToImage} alt={article.title || 'News Image'} />
            <h3>{article.title}</h3>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Read More...
            </a>
          </div>
        ))}
      </div>
      <footer><small>Desenvolvido por Jéssica Sobreira, 2023.</small></footer>
    </>
  );
}

export default App;
