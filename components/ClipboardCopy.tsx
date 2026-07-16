import React, { useState } from 'react';

const ClipboardCopy = ({ textToCopy }: { textToCopy: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="flex items-center gap-2 p-3 bg-gray-100 rounded-lg shadow-sm max-w-md">
      <code className="text-sm text-gray-800 truncate flex-1">{textToCopy}</code>
      <button
        onClick={handleCopy}
        className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      >
        {isCopied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
};

export default ClipboardCopy;
