import { Box } from "@mui/material";
import { useChatStore } from "../storage/store";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import { useEffect } from "react";

export default function ChatWindow() {
  const activeId = useChatStore((s) => s.activeId);
  const conversations = useChatStore((s) => s.conversations);

  const activeChat = conversations.find(
    (c) => c.id === activeId
  );

  useEffect(() => {
    console.log("activeChat:", activeChat);
  }, [activeChat]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Box sx={{ flex: 1, overflowY: "auto" }}>
        <MessageList messages={activeChat?.messages || []} />
      </Box>

      <ChatInput />
    </Box>
  );
}