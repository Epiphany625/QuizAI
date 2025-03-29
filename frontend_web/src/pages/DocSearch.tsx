import React, { useState } from 'react';
import axios from 'axios';
import { Header } from './../components/Header';

interface DocumentResult {
  course: string;
  email: string;
  filename: string;
}

export function DocSearch(): JSX.Element {
  const [searchString, setSearchString] = useState('');
  const [results, setResults] = useState<DocumentResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    const email = localStorage.getItem('email');
    if (!email) {
      setError('User not logged in.');
      return;
    }

    setLoading(true);
    setError('');
    setResults([]); // Clear previous results before searching

    try {
      const response = await axios.post('http://localhost:8000/api/file', {
        email,
        search: searchString,
      });
      setResults(response.data);
    } catch (err) {
      setError('Error searching documents.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Your existing header */}
      <Header onMistakesClick={() => {}} showBackButton={false} onBack={() => {}} />

      <div className="py-8 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Search Section */}
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h1 className="text-2xl font-bold mb-4 text-center">Document Search</h1>
            <div className="flex mb-4">
              <input
                type="text"
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
                placeholder="Enter search term"
                className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-300"
              />
              <button
                onClick={handleSearch}
                className="bg-blue-500 text-white px-6 py-2 rounded-r-lg hover:bg-blue-600 transition-colors"
              >
                Search
              </button>
            </div>
            {loading && <p className="text-gray-500 mb-4">Searching...</p>}
            {error && <p className="text-red-500 mb-4">{error}</p>}
          </div>

          {/* Results Section */}
          {results.length > 0 ? (
            results.map((doc, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow mb-4"
              >
                <h2 className="text-lg font-semibold mb-2">Filename: {doc.filename}</h2>
                <p className="text-gray-700 mb-1">
                  <span className="font-medium">Course:</span> {doc.course}
                </p>
              </div>
            ))
          ) : (
            !loading && (
              <p className="text-gray-500 text-center">No documents found.</p>
            )
          )}
        </div>
      </div>
    </div>
  );
}
