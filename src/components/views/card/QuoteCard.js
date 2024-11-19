import React from 'react';

const QuoteCard = ({ quote }) => {

    function formatQuote(quote, wordsPerLine) {
    const words = quote.split(' ');
    let lines = [];
    for(let i=0; i<words.length; i+=wordsPerLine) {
        lines.push(words.slice(i, i+wordsPerLine).join(' '));
    }
    return lines.join('\n');
    }

    const wordsPerLine = 5;
    const formattedQuote = formatQuote(quote, wordsPerLine);

    return (
        <div className="px-4 max-w-md mx-auto text-center">
            <div className="font-bold text-2xl font-serif m-0">“</div>
            <p className="font-serif text-lg m-0">
                {formattedQuote.split('\n').map((line, i) => (
                    <span key={i}>
                        {line}
                        <br />
                    </span>
                ))}
            </p>
            <div className="font-bold text-2xl font-serif m-0">”</div>
        </div>
    );
};

export default QuoteCard;

