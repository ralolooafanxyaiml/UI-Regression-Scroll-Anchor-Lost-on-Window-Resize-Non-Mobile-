bugfix_code = r"""import React, { useEffect, useRef } from 'react';

const ChatWindow = ({ messages }) => {
  const chatContainerRef = useRef(null);
  const isAtBottomRef = useRef(true);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
    isAtBottomRef.current = isAtBottom;
  };

  useEffect(() => {
    const handleResize = () => {
      if (isAtBottomRef.current && chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    };

    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div 
      ref={chatContainerRef} 
      onScroll={handleScroll} 
      style={{ overflowY: 'auto', height: '100vh' }}
    >
      {messages.map(msg => <div key={msg.id}>{msg.text}</div>)}
    </div>
  );
};"""

print(bugfix_code)