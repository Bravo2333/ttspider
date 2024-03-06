import React from 'react';

const Highlighter = ({ text, searchWords, highlightStyle }) => {
  const highlightText = () => {
    if (!searchWords || searchWords.length === 0) {
      return text;
    }

    // 使用正则表达式将匹配的文本进行高亮显示
    const pattern = new RegExp(`(${searchWords.join('|')})`, 'gi');
    return text.split(pattern).map((part, index) => {
      if (searchWords.includes(part.toLowerCase())) {
        return <span key={index} style={highlightStyle}>{part}</span>;
      }
      return part;
    });
  };

  return <>{highlightText()}</>;
};

export default Highlighter;
