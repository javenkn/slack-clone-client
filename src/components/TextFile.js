import React, { useState, useEffect } from 'react';

export default function TextFile({ url }) {
  const [text, setText] = useState('');
  useEffect(() => {
    async function fetchTextFile() {
      const response = await fetch(url);
      const text = await response.text();
      setText(text);
    }
    fetchTextFile();
  }, []);
  return (
    <div>
      <div>-----</div>
      <p>{text}</p>
      <div>-----</div>
    </div>
  );
}
