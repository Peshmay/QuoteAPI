import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import "./card.css";
const Card = () => {
    const [randQuotes, setRandQuotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchQuotes = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch("https://api.gameofthronesquotes.xyz/v1/random");
            if (!res.ok)
                throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            // Normalize both possible shapes (single object or array)
            const arr = Array.isArray(data) ? data : [data];
            const normalized = arr.map((q) => ({
                // API often returns "sentence" and "character.name"
                quote: q.sentence ?? q.quote ?? "",
                author: q.character?.name ?? q.author ?? "Unknown",
            }));
            setRandQuotes(normalized);
        }
        catch (err) {
            console.error("Something went wrong:", err);
            setError(err?.message ?? "Unknown error");
            setRandQuotes([]);
        }
        finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchQuotes();
    }, []);
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "container", children: [isLoading && _jsx("div", { className: "loading-Spinner", children: "Loading..." }), !isLoading && error && (_jsxs("p", { className: "error", children: ["Failed to load quotes: ", error] })), !isLoading && !error && randQuotes.length > 0 && (_jsxs(_Fragment, { children: [_jsx("h2", { children: "Game of Thrones Quote" }), randQuotes.map((q, idx) => (_jsxs("span", { className: "quote-card", children: [_jsx("p", { children: q.quote }), _jsxs("h4", { children: ["\u2014 ", q.author] })] }, idx)))] })), !isLoading && !error && randQuotes.length === 0 && (_jsx("p", { children: "No quotes found." }))] }), _jsx("button", { onClick: fetchQuotes, disabled: isLoading, children: isLoading ? "Loading…" : "New Quote" })] }));
};
export default Card;
//# sourceMappingURL=card.js.map