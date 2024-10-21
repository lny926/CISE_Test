"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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
  isAccepted: boolean;
  isRejected: boolean;
}

const AdminSettings = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [editedValues, setEditedValues] = useState<Article | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchAllArticles = async () => {
      try {
        const response = await fetch('http://localhost:8082/api/articles/all');
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

    fetchAllArticles();
  }, []);

  const handleEditClick = (article: Article) => {
    setEditingArticle(article);
    setEditedValues(article); // Set the initial values for editing
  };

  const handleSaveClick = async () => {
    if (editedValues) {
      try {
        const statusUpdate = editedValues.isAccepted
          ? { isAccepted: true, isRejected: false }
          : { isAccepted: false, isRejected: true };

        const response = await fetch(
          `http://localhost:8082/api/articles/${editedValues._id}/edit`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...editedValues, ...statusUpdate }),
          }
        );

        const result = await response.json();
        if (response.ok && result.success) {
          setArticles((prev) =>
            prev.map((article) =>
              article._id === editedValues._id ? editedValues : article
            )
          );
          setEditingArticle(null); // Exit editing mode
          alert('Article updated successfully.');
          // No redirection, just stay on the same page.
        } else {
          alert(result.message || 'Failed to update the article.');
        }
      } catch (error) {
        console.error('Error updating article:', error);
        alert('An error occurred while updating the article.');
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (editedValues) {
      const { name, value } = e.target;
      setEditedValues((prev) => (prev ? { ...prev, [name]: value } : null));
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 className="text-4xl font-bold text-black mb-10">Admin Settings</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
            <button
                className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center bg-gray-200 text-black gap-2 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                onClick={() => router.push('/admindashboard')}
            >
                Back
            </button>
        </div>
      </div>

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
            <th style={{ border: '1px solid black', padding: '10px' }}>Status</th>
            <th style={{ border: '1px solid black', padding: '10px' }}>Edit</th>
          </tr>
        </thead>
        <tbody>
          {articles.length === 0 ? (
            <tr>
              <td colSpan={10} style={{ padding: '10px', textAlign: 'center' }}>No articles found</td>
            </tr>
          ) : (
            articles.map((article) => (
              <tr key={article._id}>
                <td style={{ border: '1px solid black', padding: '10px' }}>
                  {editingArticle && editingArticle._id === article._id ? (
                    <input
                      name="title"
                      value={editedValues?.title || ''}
                      onChange={handleChange}
                      style={{ width: '100%' }}
                    />
                  ) : (
                    article.title
                  )}
                </td>
                <td style={{ border: '1px solid black', padding: '10px' }}>
                  {editingArticle && editingArticle._id === article._id ? (
                    <input
                      name="author"
                      value={editedValues?.author || ''}
                      onChange={handleChange}
                      style={{ width: '100%' }}
                    />
                  ) : (
                    article.author
                  )}
                </td>
                {/* Repeat the same input logic for other fields */}
                <td style={{ border: '1px solid black', padding: '10px' }}>
                  {editingArticle && editingArticle._id === article._id ? (
                    <input
                      name="journal"
                      value={editedValues?.journal || ''}
                      onChange={handleChange}
                      style={{ width: '100%' }}
                    />
                  ) : (
                    article.journal
                  )}
                </td>
                <td style={{ border: '1px solid black', padding: '10px' }}>
                  {editingArticle && editingArticle._id === article._id ? (
                    <input
                      name="date"
                      value={editedValues?.date || ''}
                      onChange={handleChange}
                      style={{ width: '100%' }}
                    />
                  ) : (
                    article.date
                  )}
                </td>
                <td style={{ border: '1px solid black', padding: '10px' }}>
                  {editingArticle && editingArticle._id === article._id ? (
                    <input
                      name="volume"
                      value={editedValues?.volume || ''}
                      onChange={handleChange}
                      style={{ width: '100%' }}
                    />
                  ) : (
                    article.volume
                  )}
                </td>
                <td style={{ border: '1px solid black', padding: '10px' }}>
                  {editingArticle && editingArticle._id === article._id ? (
                    <input
                      name="number"
                      value={editedValues?.number || ''}
                      onChange={handleChange}
                      style={{ width: '100%' }}
                    />
                  ) : (
                    article.number
                  )}
                </td>
                <td style={{ border: '1px solid black', padding: '10px' }}>
                  {editingArticle && editingArticle._id === article._id ? (
                    <input
                      name="pages"
                      value={editedValues?.pages || ''}
                      onChange={handleChange}
                      style={{ width: '100%' }}
                    />
                  ) : (
                    article.pages
                  )}
                </td>
                <td style={{ border: '1px solid black', padding: '10px' }}>
                  {editingArticle && editingArticle._id === article._id ? (
                    <input
                      name="doi"
                      value={editedValues?.doi || ''}
                      onChange={handleChange}
                      style={{ width: '100%' }}
                    />
                  ) : (
                    article.doi
                  )}
                </td>
                <td style={{ border: '1px solid black', padding: '10px' }}>
                  {editingArticle && editingArticle._id === article._id ? (
                    <select
                      name="isAccepted"
                      value={editedValues?.isAccepted ? 'accept' : 'reject'}
                      onChange={(e) =>
                        setEditedValues((prev) =>
                          prev
                            ? {
                                ...prev,
                                isAccepted: e.target.value === 'accept',
                                isRejected: e.target.value === 'reject',
                              }
                            : null
                        )
                      }
                    >
                      <option value="accept">Accept</option>
                      <option value="reject">Reject</option>
                    </select>
                  ) : article.isAccepted ? (
                    'Accepted'
                  ) : article.isRejected ? (
                    'Rejected'
                  ) : (
                    'Pending'
                  )}
                </td>
                <td style={{ border: '1px solid black', padding: '10px' }}>
                  {editingArticle && editingArticle._id === article._id ? (
                    <button onClick={handleSaveClick}>Save</button>
                  ) : (
                    <button onClick={() => handleEditClick(article)}>Edit</button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminSettings;
