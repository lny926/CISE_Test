"use client";

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

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

const RejectedArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  const router = useRouter();

  useEffect(() => {
    const fetchRejectedArticles = async () => {
      try {
        const response = await fetch('http://localhost:8082/api/articles/rejected'); // Fetch rejected articles
        const result = await response.json();
        if (response.ok) {
          setArticles(result.articles); // Set rejected articles into the state
        } else {
          alert('Failed to fetch rejected articles.');
        }
      } catch (error) {
        console.error('Error fetching rejected articles:', error);
      }
    };

    fetchRejectedArticles();
  }, []); // Ensure this runs only once on component mount

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center bg-gray-200 text-black gap-2 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          onClick={() => router.push('/admindashboard')}
        >
          Back
        </button>
      </div>

      <h1 className="text-4xl font-bold text-black mb-10">Rejected Articles</h1>
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
              <td colSpan={8} style={{ padding: '10px', textAlign: 'center' }}>No rejected articles found</td>
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

export default RejectedArticles;
