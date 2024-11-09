import React from 'react';
import DOMPurify from 'dompurify';

const SanitizedHTMLContent = ({ htmlContent }) => {
  // Sanitize the HTML content using DOMPurify
  const sanitizedContent = DOMPurify.sanitize(htmlContent);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
};

export default SanitizedHTMLContent;
