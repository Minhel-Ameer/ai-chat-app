import { useEffect, useState } from "react";
import {
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
  Box,
  Button,
  List,
  ListItemButton,
  Typography,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import { useChatStore } from "../storage/store";
import { createConversation } from "../functionality/conversation";
import { saveConversations } from "../storage/conversation.storage";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export default function ConversationSidebar() {
  const {
    conversations,
    activeId,
    setConversations,
    setActiveId,
  } = useChatStore();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  const { theme: appTheme, toggleTheme } = useChatStore();

  useEffect(() => {
      handleNewChat()
  },[])

  const handleNewChat = () => {
    const newConv = createConversation();
    const updated = [newConv, ...conversations];

    setConversations(updated);
    setActiveId(newConv.id);
    saveConversations(updated);

    if (isMobile) setOpen(false);
  };

  const selectChat = (id: string) => {
    setActiveId(id);
    if (isMobile) setOpen(false);
  };

const sidebarContent = (
    <Box
      // sx={{
      //   width: 280,
      //   maxWidth: "100vw",
      //   height: "100vh",
      //   display: "flex",
      //   flexDirection: "column",
      //   p: 2,
      //   boxSizing: "border-box",
      // }}
        sx={{
          width: 280,
          maxWidth: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          p: 2,
          boxSizing: "border-box",
          bgcolor: appTheme === "dark" ? "#1e1e1e" : "#ffffff",
          color: appTheme === "dark" ? "#ffffff" : "#111111",
        }}
    >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            {/* <Typography variant="h6">Chats</Typography> */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: appTheme === "dark" ? "#fff" : "#111",
              }}
            >
              Chats
            </Typography>
            <IconButton onClick={toggleTheme}>
                {appTheme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
        </Box>
  
      <Button
        variant="contained"
        onClick={handleNewChat}
        // sx={{
        //   mb: 2,
        //   flexShrink: 0,
        // }}
        sx={{
          mb: 2,
          flexShrink: 0,
          textTransform: "none",
          fontWeight: 500,
          borderRadius: 2,
          bgcolor: appTheme === "dark" ? "#2a2a2a" : "#f5f5f5",
          color: appTheme === "dark" ? "#fff" : "#111",
          border: appTheme === "dark" ? "1px solid #3a3a3a" : "1px solid #e5e5e5",
          "&:hover": {
            bgcolor: appTheme === "dark" ? "#3a3a3a" : "#eaeaea",
          },
        }}
        fullWidth
      >
        + New Chat
      </Button>
  
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
        }}
      >
        <List disablePadding>
          {conversations.map((c) => (
            <ListItemButton
              key={c.id}
              selected={c.id === activeId}
              onClick={() => selectChat(c.id)}
              // sx={{
              //   borderRadius: 1,
              //   mb: 0.5,
              // }}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                px: 1.5,
                py: 1,
                textTransform: "none",
                fontSize: "0.9rem",
              
                color: appTheme === "dark" ? "#e6e6e6" : "#222",
              
                bgcolor:
                  c.id === activeId
                    ? appTheme === "dark"
                      ? "#2f2f2f"
                      : "#e8f0ff"
                    : "transparent",
              
                "&:hover": {
                  bgcolor: appTheme === "dark" ? "#2a2a2a" : "#f3f3f3",
                },
              
                transition: "0.2s ease",
              }}
            >
              {c.title}
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Box>
  );

  // 🖥️ DESKTOP VIEW
  if (!isMobile) {
    return (
      <Box
        sx={{
          width: 280,
          borderRight: "1px solid #ddd",
          height: "100vh",
        }}
      >
        {sidebarContent}
      </Box>
    );
  }

  // 📱 MOBILE VIEW
  return (
    <>
      <IconButton
        onClick={() => setOpen(true)}
        sx={{
          position: "fixed",
          top: 10,
          left: 10,
          zIndex: 1300,
        }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
      >
        {sidebarContent}
      </Drawer>
    </>
  );
}