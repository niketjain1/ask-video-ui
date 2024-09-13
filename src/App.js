import React, { useState } from "react";
import axios from "axios";
import { Loader } from "lucide-react";

const App = () => {
  const [url, setUrl] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/ask", {
        url,
        question,
      });
      setAnswer(response.data.answer);
    } catch (error) {
      console.error("Error:", error);
      setAnswer("An error occurred while fetching the answer.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-3 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-6">
                YouTube Video Q&A
              </h1>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter YouTube URL"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Enter your question"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                {loading ? (
                  <Loader className="animate-spin h-5 w-5 mr-3" />
                ) : (
                  "Ask"
                )}
              </button>
            </form>
            {answer && (
              <div className="mt-6">
                <h2 className="text-lg font-medium text-gray-900">Answer:</h2>
                <p className="mt-2 text-gray-600">{answer}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
