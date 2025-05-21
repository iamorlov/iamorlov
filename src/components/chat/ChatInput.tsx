import { FC, useState, FormEvent, KeyboardEvent } from "react";
import { motion } from "framer-motion";

type ChatInputProps = {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
};

const ChatInput: FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-auto p-4 border-t border-zinc-800 bg-black/50 backdrop-blur-sm">
      <div className="relative flex items-end">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Grok something..."
          disabled={isLoading}
          className="w-full p-4 pr-16 bg-zinc-900 text-white rounded-xl border border-zinc-700 focus:border-purple-500 focus:outline-none resize-none h-14 max-h-36"
          rows={1}
          style={{
            minHeight: "56px", 
            overflowY: message.split("\n").length > 1 ? "auto" : "hidden"
          }}
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={!message.trim() || isLoading}
          type="submit"
          className="absolute right-2 bottom-2 p-2 bg-purple-700 text-white rounded-lg disabled:bg-purple-900 disabled:text-purple-300"
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </motion.button>
      </div>
    </form>
  );
};

export default ChatInput;