"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Import the useRouter hook

// Define the shape of an article
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
}

const AdminDashboard = () => {
  const [articles, setArticles] = useState<Article[]>([]);
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
    });

  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const router = useRouter(); // Use the router to handle navigation

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('http://localhost:8082/api/articles');
        const result = await response.json();
        if (response.ok) {
          setArticles(result.articles);
        } else {
          alert('Failed to fetch articles.');
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  const handleSort = (field: keyof Article) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
  };

  const handleReject = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8082/api/articles/${id}/reject`, {
        method: 'PATCH',
      });
      if (response.ok) {
        setArticles(articles.filter(article => article._id !== id)); // Remove rejected article from list
      } else {
        alert('Failed to reject the article.');
      }
    } catch (error) {
      console.error('Error rejecting article:', error);
    }
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

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        {/* Left-side buttons */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center bg-gray-200 text-black gap-2 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            onClick={() => router.push('/adminlogin')}
          >
            Logout
          </button>
          <button
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center bg-gray-200 text-black gap-2 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            onClick={() => router.push('/rejectedarticles')}
          >
            Rejected Articles
          </button>
        </div>

         
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
              <label>
                  <input
                      type="checkbox"
                      checked={visibleColumns.title}
                      onChange={() => toggleColumnVisibility('title')}
                  /> Title
              </label>
              <label>
                  <input
                      type="checkbox"
                      checked={visibleColumns.author}
                      onChange={() => toggleColumnVisibility('author')}
                  /> Author
              </label>
              <label>
                  <input
                      type="checkbox"
                      checked={visibleColumns.journal}
                      onChange={() => toggleColumnVisibility('journal')}
                  /> Journal
              </label>
              <label>
                  <input
                      type="checkbox"
                      checked={visibleColumns.date}
                      onChange={() => toggleColumnVisibility('date')}
                  /> Date
              </label>
              <label>
                  <input
                      type="checkbox"
                      checked={visibleColumns.volume}
                      onChange={() => toggleColumnVisibility('volume')}
                  /> Volume
              </label>
              <label>
                  <input
                      type="checkbox"
                      checked={visibleColumns.number}
                      onChange={() => toggleColumnVisibility('number')}
                  /> Number
              </label>
              <label>
                  <input
                      type="checkbox"
                      checked={visibleColumns.pages}
                      onChange={() => toggleColumnVisibility('pages')}
                  /> Pages
              </label>
              <label>
                  <input
                      type="checkbox"
                      checked={visibleColumns.doi}
                      onChange={() => toggleColumnVisibility('doi')}
                  /> DOI
              </label>
          </div>

      <h1 className="text-4xl font-bold text-black mb-10">Admin Dashboard</h1>

            <table style={{ width: '100%', border: '1px solid black', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        {visibleColumns.title && (
                            <th
                                style={{ border: '1px solid black', padding: '10px', cursor: 'pointer' }}
                                onClick={() => handleSort('title')}
                            >
                                Title {sortField === 'title' && (sortOrder === 'asc' ? '▲' : '▼')}
                            </th>
                        )}
                        {visibleColumns.author && (
                            <th
                                style={{ border: '1px solid black', padding: '10px', cursor: 'pointer' }}
                                onClick={() => handleSort('author')}
                            >
                                Author {sortField === 'author' && (sortOrder === 'asc' ? '▲' : '▼')}
                            </th>
                        )}
                        {visibleColumns.journal && (
                            <th
                                style={{ border: '1px solid black', padding: '10px', cursor: 'pointer' }}
                                onClick={() => handleSort('journal')}
                            >
                                Journal {sortField === 'journal' && (sortOrder === 'asc' ? '▲' : '▼')}
                            </th>
                        )}
                        {visibleColumns.date && (
                            <th
                                style={{ border: '1px solid black', padding: '10px', cursor: 'pointer' }}
                                onClick={() => handleSort('date')}
                            >
                                Date {sortField === 'date' && (sortOrder === 'asc' ? '▲' : '▼')}
                            </th>
                        )}
                        {visibleColumns.volume && (
                            <th
                                style={{ border: '1px solid black', padding: '10px', cursor: 'pointer' }}
                                onClick={() => handleSort('volume')}
                            >
                                Volume {sortField === 'volume' && (sortOrder === 'asc' ? '▲' : '▼')}
                            </th>
                        )}
                        {visibleColumns.number && (
                            <th
                                style={{ border: '1px solid black', padding: '10px', cursor: 'pointer' }}
                                onClick={() => handleSort('number')}
                            >
                                Number {sortField === 'number' && (sortOrder === 'asc' ? '▲' : '▼')}
                            </th>
                        )}
                        {visibleColumns.pages && (
                            <th
                                style={{ border: '1px solid black', padding: '10px', cursor: 'pointer' }}
                                onClick={() => handleSort('pages')}
                            >
                                Pages {sortField === 'pages' && (sortOrder === 'asc' ? '▲' : '▼')}
                            </th>
                        )}
                        {visibleColumns.doi && (
                            <th
                                style={{ border: '1px solid black', padding: '10px', cursor: 'pointer' }}
                                onClick={() => handleSort('doi')}
                            >
                                DOI {sortField === 'doi' && (sortOrder === 'asc' ? '▲' : '▼')}
                            </th>
                        )}
                        <th style={{ border: '1px solid black', padding: '10px' }}>Actions</th>
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
                            <td style={{ border: '1px solid black', padding: '10px' }}>
                                <button onClick={() => handleReject(article._id)}>Reject</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;
