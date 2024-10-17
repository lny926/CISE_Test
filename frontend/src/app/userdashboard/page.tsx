"use client"; 

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function UserPage() {
  const [article, setArticle] = useState({
    title: '',
    author: '',
    journal: '',
    date: '',
    volume: '',
    number: '',
    pages: '',
    doi: '',
  });
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArticle({
      ...article,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8082/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(article),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Article submitted successfully');
        // Clear form after submission
        setArticle({
          title: '',
          author: '',
          journal: '',
          date: '',
          volume: '',
          number: '',
          pages: '',
          doi: '',
        });
      } else {
        alert(result.message || 'Failed to submit article');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleLogin = () => {
    router.push('/login');
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] relative bg-white">
      <header className="absolute top-0 left-0 p-4 flex gap-4">
      <button onClick={handleLogin} 
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center bg-gray-200 text-black gap-2 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
        >
        Logout
        </button>
        <button className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center bg-gray-200 text-black gap-2 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
          My Articles
        </button>
      </header>

      <main className="flex flex-col items-center gap-8">
        {/* Main Title */}
        <h1 className="text-4xl font-bold text-black">SPEED</h1>

        <form className="flex flex-col text-black gap-4 w-full sm:w-96" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Article Title"
            value={article.title}
            onChange={handleInputChange}
            className="border border-grey-300 rounded p-2"
          />
          <input
            type="text"
            name="author"
            placeholder="Authors"
            value={article.author}
            onChange={handleInputChange}
            className="border border-grey-300 rounded p-2"
          />
          <input
            type="text"
            name="journal"
            placeholder="Journal Name"
            value={article.journal}
            onChange={handleInputChange}
            className="border border-gray-300 rounded p-2"
          />
          <div className="flex gap-4">
            <input
              type="date"
              name="date"
              placeholder="Year of Publication"
              value={article.date}
              onChange={handleInputChange}
              className="border border-gray-300 rounded p-2 flex-1"
            />
            <input
              type="text"
              name="volume"
              placeholder="Volume"
              value={article.volume}
              onChange={handleInputChange}
              className="border border-gray-300 rounded p-2 flex-1"
            />
          </div>
          <div className="flex gap-4">
            <input
              type="text"
              name="number"
              placeholder="Number"
              value={article.number}
              onChange={handleInputChange}
              className="border border-gray-300 rounded p-2 flex-1"
            />
            <input
              type="text"
              name="pages"
              placeholder="Pages"
              value={article.pages}
              onChange={handleInputChange}
              className="border border-gray-300 rounded p-2 flex-1"
            />
          </div>
          <input
            type="text"
            name="doi"
            placeholder="DOI"
            value={article.doi}
            onChange={handleInputChange}
            className="border border-gray-300 rounded p-2"
          />
          <button
            type="submit"
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center bg-gray-200 text-black gap-2 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full"
          >
            Submit Article
          </button>
        </form>
      </main>
    </div>
  );
}
