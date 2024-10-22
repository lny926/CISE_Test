"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import axios from 'axios';

interface Article {
  _id: string;
  title: string;
  author: string;
  journal: string;
  date: string;
  volume: string;
  number: string;
  pages: string;
  doi: string;
  ratings: number[];
}

const ViewArticle = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [averageRatings, setAverageRatings] = useState<{ [key: string]: number }>({});
  const router = useRouter(); // Initialize useRouter for navigation
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState<"title" | "author">("title");
  const [sortField, setSortField] = useState<keyof Article>('title');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [visibleColumns, setVisibleColumns] = useState({
      title: true,
      author: true,
      journal: true,
      date: true,
      volume: true,
      number: true,
      pages: true,
      doi: true,
      ratings: true,
  });

  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');

  useEffect(() => {
    const fetchApprovedArticles = async () => {
      try {
        const response = await fetch('http://localhost:8082/api/articles/approved');
        const result = await response.json();
        if (response.ok) {
          setArticles(result.articles);
          fetchAverageRatings(result.articles);
        } else {
          alert('Failed to fetch approved articles.');
        }
      } catch (error) {
        console.error('Error fetching approved articles:', error);
      }
    };

    fetchApprovedArticles();
  }, []);

  const fetchAverageRatings = async (articles: Article[]) => {
      const ratingsPromises = articles.map(article => getAverageRating(article._id));
      const ratingsResults = await Promise.all(ratingsPromises);
      const newAverageRatings = articles.reduce((acc, article, index) => {
          acc[article._id] = ratingsResults[index];
          return acc;
      }, {} as { [key: string]: number });
      setAverageRatings(newAverageRatings);
    };

    const getAverageRating = async (articleId: string): Promise<number> => {
      try {
          const response = await axios.get(`/api/articles/${articleId}/ratings`);
          return response.data.averageRating;
      } catch (error) {
          console.error(`Error fetching average rating for article ${articleId}:`, error);
          return 0;
      }
  };

  const handleBackClick = () => {
    router.push('/'); // Navigate back to the homepage (frontend/src/app/page.tsx)
  };

  const handleSort = (field: keyof Article) => {
      const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
      setSortField(field);
      setSortOrder(order);
  };

  const toggleColumnVisibility = (column: keyof typeof visibleColumns) => {
      setVisibleColumns(prevState => ({
          ...prevState,
          [column]: !prevState[column],
      }));
  };

  const filteredArticles = articles.filter((article) => {
      const articleYear = new Date(article.date).getFullYear();
      return (startYear === '' || articleYear >= +startYear) && (endYear === '' || articleYear <= +endYear);
  });

  const sortedArticles = filteredArticles
      .filter((article) => {
          const valueToSearch = article[searchField].toLowerCase();
          return valueToSearch.includes(searchTerm.toLowerCase());
      })
      .sort((a, b) => {
          if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
          if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
          return 0;
      });

    const submitRating = async (articleId: string, rating: number) => {
        try {
            const response = await axios.post(`http://localhost:8082/api/articles/${articleId}/rate`, { rating });

            if (response.data.success) {
           
                setAverageRatings((prev) => {
                    const currentAverage = prev[articleId] || 0;
                    if (currentAverage == 0) {
                        const updatedAverage = rating;
                        return {
                            ...prev,
                            [articleId]: updatedAverage,
                        };
                    }
                    const updatedAverage = (currentAverage + rating) / 2; 
                    return {
                        ...prev,
                        [articleId]: updatedAverage,
                    };
                });
                alert(response.data.message); 
            } else {
                alert(`Failed to submit rating: ${response.data.message}`);
            }
        } catch (error) {
            console.error('Failed to submit rating', error);
        }
    };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  return (
    <div style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              {/* Back Button */}
              <button
                  onClick={handleBackClick}
                  className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center bg-gray-200 text-black gap-2 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 "
              >
                  Back
              </button>

              {/* Search Bar */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                  <select
                      value={searchField}
                      onChange={(e) => setSearchField(e.target.value as "title" | "author")}
                      style={{ marginRight: '10px', padding: '8px', fontSize: '1em' }}
                  >
                      <option value="title">Title</option>
                      <option value="author">Author</option>
                  </select>
                  <input
                      type="text"
                      placeholder={`Search by ${searchField}...`}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{ padding: '8px', fontSize: '1em' }}
                  />
              </div>
          </div>

         Year range selection
          <div style={{ marginBottom: '20px' }}>
              <label>
                  Start Year:
                  <select value={startYear} onChange={(e) => setStartYear(e.target.value)} style={{ marginLeft: '10px' }}>
                      <option value="">Any</option>
                      {years.map((year) => (
                          <option key={year} value={year}>{year}</option>
                      ))}
                  </select>
              </label>
              <label style={{ marginLeft: '20px' }}>
                  End Year:
                  <select value={endYear} onChange={(e) => setEndYear(e.target.value)} style={{ marginLeft: '10px' }}>
                      <option value="">Any</option>
                      {years.map((year) => (
                          <option key={year} value={year}>{year}</option>
                      ))}
                  </select>
              </label>
          </div>

          <div style={{ marginBottom: '20px' }}>
              {Object.keys(visibleColumns).map((column) => (
                  <label key={column}>
                      <input
                          type="checkbox"
                          checked={visibleColumns[column as keyof typeof visibleColumns]}
                          onChange={() => toggleColumnVisibility(column as keyof typeof visibleColumns)}
                      /> {column.charAt(0).toUpperCase() + column.slice(1)}
                  </label>
              ))}
          </div>

      <h1 className="text-4xl font-bold text-black mb-10">Approved Articles</h1>
      
            <table style={{ width: '100%', border: '1px solid black', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        {visibleColumns.title && (
                            <th style={{ border: '1px solid black', padding: '10px', cursor: 'pointer' }} onClick={() => handleSort('title')}>
                                Title {sortField === 'title' && (sortOrder === 'asc' ? '▲' : '▼')}
                            </th>
                        )}
                        {visibleColumns.author && (
                            <th style={{ border: '1px solid black', padding: '10px', cursor: 'pointer' }} onClick={() => handleSort('author')}>
                                Author {sortField === 'author' && (sortOrder === 'asc' ? '▲' : '▼')}
                            </th>
                        )}
                        {visibleColumns.journal && (
                            <th style={{ border: '1px solid black', padding: '10px', cursor: 'pointer' }} onClick={() => handleSort('journal')}>
                                Journal {sortField === 'journal' && (sortOrder === 'asc' ? '▲' : '▼')}
                            </th>
                        )}
                        {visibleColumns.date && (
                            <th style={{ border: '1px solid black', padding: '10px', cursor: 'pointer' }} onClick={() => handleSort('date')}>
                                Date {sortField === 'date' && (sortOrder === 'asc' ? '▲' : '▼')}
                            </th>
                        )}
                        {visibleColumns.volume && (
                            <th style={{ border: '1px solid black', padding: '10px', cursor: 'pointer' }} onClick={() => handleSort('volume')}>
                                Volume {sortField === 'volume' && (sortOrder === 'asc' ? '▲' : '▼')}
                            </th>
                        )}
                        {visibleColumns.number && (
                            <th style={{ border: '1px solid black', padding: '10px', cursor: 'pointer' }} onClick={() => handleSort('number')}>
                                Number {sortField === 'number' && (sortOrder === 'asc' ? '▲' : '▼')}
                            </th>
                        )}
                        {visibleColumns.pages && (
                            <th style={{ border: '1px solid black', padding: '10px', cursor: 'pointer' }} onClick={() => handleSort('pages')}>
                                Pages {sortField === 'pages' && (sortOrder === 'asc' ? '▲' : '▼')}
                            </th>
                        )}
                        {visibleColumns.doi && (
                            <th style={{ border: '1px solid black', padding: '10px', cursor: 'pointer' }} onClick={() => handleSort('doi')}>
                                DOI {sortField === 'doi' && (sortOrder === 'asc' ? '▲' : '▼')}
                            </th>
                        )}
                        {visibleColumns.ratings && (
                            <th style={{ border: '1px solid black', padding: '10px' }}>
                                Average Rating
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {sortedArticles.map((article) => (
                        <tr key={article._id}>
                            {visibleColumns.title && <td style={{ border: '1px solid black', padding: '10px' }}>{article.title}</td>}
                            {visibleColumns.author && <td style={{ border: '1px solid black', padding: '10px' }}>{article.author}</td>}
                            {visibleColumns.journal && <td style={{ border: '1px solid black', padding: '10px' }}>{article.journal}</td>}
                            {visibleColumns.date && <td style={{ border: '1px solid black', padding: '10px' }}>{article.date}</td>}
                            {visibleColumns.volume && <td style={{ border: '1px solid black', padding: '10px' }}>{article.volume}</td>}
                            {visibleColumns.number && <td style={{ border: '1px solid black', padding: '10px' }}>{article.number}</td>}
                            {visibleColumns.pages && <td style={{ border: '1px solid black', padding: '10px' }}>{article.pages}</td>}
                            {visibleColumns.doi && <td style={{ border: '1px solid black', padding: '10px' }}>{article.doi}</td>}
                            {visibleColumns.ratings && (
                                <td style={{ border: '1px solid black', padding: '10px' }}>
                                    {averageRatings[article._id] ? averageRatings[article._id].toFixed(2) : 'No ratings'}
                                    <button onClick={() => submitRating(article._id, 1)} style={{ marginLeft: '10px' }}>Rate 1</button>
                                    <button onClick={() => submitRating(article._id, 2)} style={{ marginLeft: '5px' }}>Rate 2</button>
                                    <button onClick={() => submitRating(article._id, 3)} style={{ marginLeft: '5px' }}>Rate 3</button>
                                    <button onClick={() => submitRating(article._id, 4)} style={{ marginLeft: '5px' }}>Rate 4</button>
                                    <button onClick={() => submitRating(article._id, 5)} style={{ marginLeft: '5px' }}>Rate 5</button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewArticle;