import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { sendMessageFlow } from "../functionality/chat";
import { useChatStore } from "../storage/store";

export default function ChatInput() {
  const [text, setText] = useState("");

  const loading = useChatStore((s) => s.loadingByConversation);
  const activeId = useChatStore((s) => s.activeId);

  const handleSend = async () => {
    if (!text.trim() || !activeId) return;

    const message = text;
    setText("");

    try {
      await sendMessageFlow(message, activeId);
    } catch (error) {
      console.error("Send failed:", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        p: 2,
        borderTop: "1px solid #ddd",
      }}
    >
      <TextField
        fullWidth
        multiline
        maxRows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
      />

      <Button
        variant="contained"
        onClick={handleSend}
        disabled={!text.trim() || loading[activeId] || !activeId}
      >
        {loading[activeId] ? "Sending..." : "Send"}
      </Button>
    </Box>
  );
}