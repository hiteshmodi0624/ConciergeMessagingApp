import { type Message } from "~/mockData/users";
import ChatMessage from "./chat-message";
import { useEffect, useRef } from "react";

export default function ChatMessages({ messages,profilePhoto }: { messages: Message[],profilePhoto:string }) {
  
  const ref = useRef<HTMLDivElement>(null);
  useEffect(()=>{
      setTimeout(() => {
        if (ref.current !== null)
          ref.current.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 10);
  },[messages])
  return (
    <div className="flex w-full flex-1 flex-col space-y-2 overflow-scroll p-2">
      {messages.map((msg,i) => (
        <ChatMessage message={msg} key={i} profilePhoto={profilePhoto} />
      ))}
      <div ref={ref} />
    </div>
  );
}
