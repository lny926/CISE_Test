"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter

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

const ViewArticle = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const router = useRouter(); // Initialize useRouter for navigation

  useEffect(() => {
    const fetchApprovedArticles = async () => {
      try {
        const response = await fetch('http://localhost:8082/api/articles/approved');
        const result = await response.json();
        if (response.ok) {
          setArticles(result.articles);
        } else {
          alert('Failed to fetch approved articles.');
        }
      } catch (error) {
        console.error('Error fetching approved articles:', error);
      }
    };

    fetchApprovedArticles();
  }, []);

  const handleBackClick = () => {
    router.push('/'); // Navigate back to the homepage (frontend/src/app/page.tsx)
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Back Button */}
      <button
        onClick={handleBackClick}
        className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center bg-gray-200 text-black gap-2 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 mb-10"
      >
        Back
      </button>

      <h1 className="text-4xl font-bold text-black mb-10">Approved Articles</h1>
      
      <table style={{ width: '100%', border: '1px solid black', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '10px' }}>Title</th>
            <th style={{ border: '1px solid black', padding: '10px' }}>Author</th>
            <th style={{ border: '1px solid black', padding: '10px' }}>Journal</th>
            <th style={{ border: '1px solid black', padding: '10px' }}>Date</th>
            <th style={{ border: '1px solid black', padding: '10px' }}>Volume</th>
            <th style={{ border: '1px solid black', padding: '10px' }}>Number</th>
            <th style={{ border: '1px solid black', padding: '10px' }}>Pages</th>
            <th style={{ border: '1px solid black', padding: '10px' }}>DOI</th>
          </tr>
        </thead>
        <tbody>
          {articles.length === 0 ? (
            <tr>
              <td colSpan={8} style={{ padding: '10px', textAlign: 'center' }}>No approved articles found</td>
            </tr>
          ) : (
            articles.map((article) => (
              <tr key={article._id}>
                <td style={{ border: '1px solid black', padding: '10px' }}>{article.title}</td>
                <td style={{ border: '1px solid black', padding: '10px' }}>{article.author}</td>
                <td style={{ border: '1px solid black', padding: '10px' }}>{article.journal}</td>
                <td style={{ border: '1px solid black', padding: '10px' }}>{article.date}</td>
                <td style={{ border: '1px solid black', padding: '10px' }}>{article.volume}</td>
                <td style={{ border: '1px solid black', padding: '10px' }}>{article.number}</td>
                <td style={{ border: '1px solid black', padding: '10px' }}>{article.pages}</td>
                <td style={{ border: '1px solid black', padding: '10px' }}>{article.doi}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewArticle;
