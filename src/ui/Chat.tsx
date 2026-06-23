import { Box } from "@mui/material";
import { useChatStore } from "../storage/store";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";

export default function ChatWindow() {
  const activeId = useChatStore((s) => s.activeId);
  const conversations = useChatStore((s) => s.conversations);

  const activeChat = conversations.find(
    (c) => c.id === activeId
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100dvh",
      }}
    >
      <Box sx={{ flex: 1, overflowY: "auto" }}>
        <MessageList
          messages={activeChat?.messages || []}
          conversationId={activeId}
        />
      </Box>

      <ChatInput />
    </Box>
  );
}