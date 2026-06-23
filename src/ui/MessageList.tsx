import {
  Box,
  IconButton,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useRef, useState } from "react";
import type { Message } from "../functionality/types";
import { editMessageFlow } from "../functionality/chat";
import { useChatStore } from "../storage/store";

export default function MessageList({
  messages,
  conversationId,
}: {
  messages: Message[];
  conversationId: string;
}) {
  const lastMessageRef = useRef<HTMLDivElement>(null);

  const theme = useChatStore((s) => s.theme);

  const loading = useChatStore(
    (s) => s.loadingByConversation?.[conversationId] || false
  );

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [messages, loading]);

  const startEdit = (m: Message) => {
    setEditingId(m.id);
    setEditText(m.text);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const saveEdit = async (id: string) => {
    if (!editText.trim()) return;
    await editMessageFlow(id, editText);
    cancelEdit();
  };

  const isDark = theme === "dark";

  return (
    <Box sx={{ p: 2 }}>
      {messages.map((m, index) => {
        const isEditing = editingId === m.id;

        return (
          <Box
            key={m.id}
            ref={index === messages.length - 1 ? lastMessageRef : null}
            sx={{
              display: "flex",
              justifyContent:
                m.role === "user" ? "flex-end" : "flex-start",
              mb: 1.2,
            }}
          >
            <Box
              sx={{
                maxWidth: "70%",
                p: 1.5,
                borderRadius: 2,
                fontSize: "14px",
                lineHeight: 1.5,
                bgcolor: m.role === "user"
                  ? isDark ? "#2b2b2b" : "#e3e3e6"
                  : isDark ? "#1e1e1e" : "#e9eaec",
                color: isDark ? "#f1f1f1" : "#111",
                border: isDark
                  ? "1px solid #333"
                  : "1px solid #e5e5e5",
                position: "relative",
              }}
            >
              {isEditing ? (
                <Box sx={{ position: "relative" }}>
                  <TextField
                    disabled={loading}
                    fullWidth
                    autoFocus
                    multiline
                    minRows={2}
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        saveEdit(m.id);
                      }
                      if (e.key === "Escape") {
                        cancelEdit();
                      }
                    }}
                  />

                  {!loading && (
                    <IconButton
                      size="small"
                      onClick={cancelEdit}
                      sx={{
                        position: "absolute",
                        top: -8,
                        right: -8,
                        width: 22,
                        height: 22,
                        bgcolor: isDark ? "#2a2a2a" : "#fff",
                        border: "1px solid",
                        borderColor: isDark ? "#444" : "#ddd",
                        color: isDark ? "#fff" : "#111",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                        "&:hover": {
                          bgcolor: isDark ? "#333" : "#f5f5f5",
                        },
                      }}
                    >
                      <CloseIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                  )}
                </Box>
              ) : (
                <Box sx={{ display: "flex", gap: 0.8 }}>
                  <Box sx={{ flex: 1 }}>{m.text}</Box>

                  {m.role === "user" && !loading && (
                    <IconButton
                      size="small"
                      onClick={() => startEdit(m)}
                      sx={{
                        opacity: 0,
                        transition: "0.15s",
                        width: 20,
                        height: 20,
                        ".MuiBox-root:hover &": {
                          opacity: 1,
                        },
                      }}
                    >
                      <EditIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                  )}
                </Box>
              )}
            </Box>
          </Box>
        );
      })}

      {loading && (
        <Box sx={{ display: "flex", mt: 1 }}>
          <Box
            sx={{
              px: 1.5,
              py: 1,
              borderRadius: 2,
              bgcolor: isDark ? "#1e1e1e" : "#f6f6f6",
              border: isDark ? "1px solid #333" : "1px solid #e5e5e5",
              display: "flex",
              gap: 0.5,
              alignItems: "center",
            }}
          >
            <TypingDots />
          </Box>
        </Box>
      )}
    </Box>
  );
}

function TypingDots() {
  return (
    <Box sx={{ display: "flex", gap: "3px" }}>
      <Dot delay="0s" />
      <Dot delay="0.2s" />
      <Dot delay="0.4s" />
    </Box>
  );
}

function Dot({ delay }: { delay: string }) {
  return (
    <Box
      sx={{
        width: 6,
        height: 6,
        borderRadius: "50%",
        bgcolor: "#888",
        animation: "bounce 1s infinite",
        animationDelay: delay,
        "@keyframes bounce": {
          "0%, 80%, 100%": { transform: "scale(0)" },
          "40%": { transform: "scale(1)" },
        },
      }}
    />
  );
}