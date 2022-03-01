import React from "react";
import './index.css';
import './App.css';

export default function Quotes() {
  const [data, setData] = React.useState(null);

  async function updateQuote() {
    try {
      const response = await fetch("https://api.quotable.io/random");
      const { statusCode, statusMessage, ...data } = await response.json();
      if (!response.ok) throw new Error(`${statusCode} ${statusMessage}`);
      setData(data);
    } catch (error) {
      // If the API request failed, log the error to console and update state
      // so that the error will be reflected in the UI.
      console.error(error);
      setData({ content: "Opps... Something went wrong" });
    }
  }

  // Run `updateQuote` once when component mounts
  React.useEffect(() => {
    updateQuote();
  }, []);

  // Do not render until the first quote is loaded
  if (!data) return null;
  return (

    <div className="flex items-center justify-center h-screen">
      <div className="bg-white font-semibold text-center rounded-3xl border shadow-lg p-10 max-w-xs">
        <h1 className="text-2xl text-gray-700">Quotes Generator</h1>
        <p className="text-lg text-gray-400 mt-4">"{data.content}"</p>
        <p className="text-sm text-gray-600 mt-4 italic">~ {data.author}</p>
        <button class="bg-indigo-600 px-8 py-2 mt-8 rounded-3xl text-gray-100 font-semibold tracking-wide" onClick={updateQuote}>Click Me!</button>
      </div>
    </div>

  )
}