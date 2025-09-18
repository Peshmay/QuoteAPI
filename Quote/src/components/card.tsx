import React, { useState, useEffect } from "react";
import "./card.css";

type QuoteType = {
  quote: string;
  author: string;
};

const Card: React.FC = () => {
  const [randQuotes, setRandQuotes] = useState<QuoteType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuotes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("https://api.gameofthronesquotes.xyz/v1/random");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      // Normalize both possible shapes (single object or array)
      const arr = Array.isArray(data) ? data : [data];

      const normalized: QuoteType[] = arr.map((q: any) => ({
        // API often returns "sentence" and "character.name"
        quote: q.sentence ?? q.quote ?? "",
        author: q.character?.name ?? q.author ?? "Unknown",
      }));

      setRandQuotes(normalized);
    } catch (err: any) {
      console.error("Something went wrong:", err);
      setError(err?.message ?? "Unknown error");
      setRandQuotes([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <>
      <div className="container">
        {isLoading && <div className="loading-Spinner">Loading...</div>}

        {!isLoading && error && (
          <p className="error">Failed to load quotes: {error}</p>
        )}

        {!isLoading && !error && randQuotes.length > 0 && (
          <>
            <h2>Game of Thrones Quote</h2>
            {randQuotes.map((q, idx) => (
              <span key={idx} className="quote-card">
                <p>{q.quote}</p>
                <h4>— {q.author}</h4>
              </span>
            ))}
          </>
        )}

        {!isLoading && !error && randQuotes.length === 0 && (
          <p>No quotes found.</p>
        )}
      </div>

      <button onClick={fetchQuotes} disabled={isLoading}>
        {isLoading ? "Loading…" : "New Quote"}
      </button>
    </>
  );
};

export default Card;
