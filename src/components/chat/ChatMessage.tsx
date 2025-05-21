import { motion } from "framer-motion";
import { FC } from "react";

type ChatMessageProps = {
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: Date;
};

const ChatMessage: FC<ChatMessageProps> = ({ content, role, timestamp }) => {
  const isUser = role === 'user';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`
          max-w-[80%] md:max-w-[70%] rounded-2xl p-4 shadow-md
          ${isUser 
            ? 'bg-purple-700 text-white rounded-tr-none' 
            : 'bg-zinc-800 text-white rounded-tl-none'
          }
        `}
      >
        <p className="whitespace-pre-wrap">{content}</p>
        <div className={`text-xs mt-1 ${isUser ? 'text-purple-200' : 'text-zinc-400'}`}>
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;