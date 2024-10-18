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

  const sortedArticles = articles
    .filter((article) => {
      const valueToSearch = article[searchField].toLowerCase();
      return valueToSearch.includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

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

        {/* Search and sorting options */}
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

      <h1 className="text-4xl font-bold text-black mb-10">Admin Dashboard</h1>

      <table style={{ width: '100%', border: '1px solid black', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th
              style={{ border: '1px solid black', padding: '10px', cursor: 'pointer' }}
              onClick={() => handleSort('title')}
            >
              Title {sortField === 'title' && (sortOrder === 'asc' ? '▲' : '▼')}
            </th>
            <th
              style={{ border: '1px solid black', padding: '10px', cursor: 'pointer' }}
              onClick={() => handleSort('author')}
            >
              Author {sortField === 'author' && (sortOrder === 'asc' ? '▲' : '▼')}
            </th>
            <th
              style={{ border: '1px solid black', padding: '10px', cursor: 'pointer' }}
              onClick={() => handleSort('journal')}
            >
              Journal {sortField === 'journal' && (sortOrder === 'asc' ? '▲' : '▼')}
            </th>
            <th
              style={{ border: '1px solid black', padding: '10px', cursor: 'pointer' }}
              onClick={() => handleSort('date')}
            >
              Date {sortField === 'date' && (sortOrder === 'asc' ? '▲' : '▼')}
            </th>
            <th
              style={{ border: '1px solid black', padding: '10px', cursor: 'pointer' }}
              onClick={() => handleSort('volume')}
            >
              Volume {sortField === 'volume' && (sortOrder === 'asc' ? '▲' : '▼')}
            </th>
            <th
              style={{ border: '1px solid black', padding: '10px', cursor: 'pointer' }}
              onClick={() => handleSort('number')}
            >
              Number {sortField === 'number' && (sortOrder === 'asc' ? '▲' : '▼')}
            </th>
            <th
              style={{ border: '1px solid black', padding: '10px', cursor: 'pointer' }}
              onClick={() => handleSort('pages')}
            >
              Pages {sortField === 'pages' && (sortOrder === 'asc' ? '▲' : '▼')}
            </th>
            <th
              style={{ border: '1px solid black', padding: '10px', cursor: 'pointer' }}
              onClick={() => handleSort('doi')}
            >
              DOI {sortField === 'doi' && (sortOrder === 'asc' ? '▲' : '▼')}
            </th>
            <th>Actions</th> {/* Column for Accept/Reject */}
          </tr>
        </thead>
        <tbody>
          {sortedArticles.length === 0 ? (
            <tr>
              <td colSpan={9} style={{ padding: '10px', textAlign: 'center' }}>No articles found</td>
            </tr>
          ) : (
            sortedArticles.map((article) => (
              <tr key={article._id}>
                <td style={{ border: '1px solid black', padding: '10px' }}>{article.title}</td>
                <td style={{ border: '1px solid black', padding: '10px' }}>{article.author}</td>
                <td style={{ border: '1px solid black', padding: '10px' }}>{article.journal}</td>
                <td style={{ border: '1px solid black', padding: '10px' }}>{article.date}</td>
                <td style={{ border: '1px solid black', padding: '10px' }}>{article.volume}</td>
                <td style={{ border: '1px solid black', padding: '10px' }}>{article.number}</td>
                <td style={{ border: '1px solid black', padding: '10px' }}>{article.pages}</td>
                <td style={{ border: '1px solid black', padding: '10px' }}>{article.doi}</td>
                <td style={{ border: '1px solid black', padding: '10px' }}>
                  <button
                    style={{ marginRight: '10px', padding: '5px 10px', backgroundColor: 'green', color: 'white' }}
                    onClick={() => alert('Article accepted!')}
                  >
                    Accept
                  </button>
                  <button
                    style={{ padding: '5px 10px', backgroundColor: 'red', color: 'white' }}
                    onClick={() => handleReject(article._id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
