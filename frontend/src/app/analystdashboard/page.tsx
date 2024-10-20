"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

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

const AnalystDashboard = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const fetchAcceptedArticles = async () => {
      try {
        const response = await fetch('http://localhost:8082/api/articles/accepted');
        const result = await response.json();
        if (response.ok) {
          setArticles(result.articles); // Set accepted articles into the state
        } else {
          alert('Failed to fetch accepted articles.');
        }
      } catch (error) {
        console.error('Error fetching accepted articles:', error);
      }
    };

    fetchAcceptedArticles();
  }, []);

  // Handle back button to navigate to analyst login page
  const handleBack = () => {
    router.push('/analystlogin'); // Redirect to analyst login page
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Back button */}
      <div style={{ display: 'flex', top: '10px', left: '10px' }}>
        <button 
          onClick={handleBack}
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center bg-gray-200 text-black gap-2 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
        >
          Back
        </button>
      </div>

      <h1 className="text-4xl font-bold text-black mb-10">Analyst Dashboard</h1>
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
              <td colSpan={8} style={{ padding: '10px', textAlign: 'center' }}>No accepted articles found</td>
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

export default AnalystDashboard;
