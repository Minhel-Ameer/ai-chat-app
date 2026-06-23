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
  TextField,
  Snackbar,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from "@mui/icons-material/Edit";

const {
  deleteConversation,
} = useChatStore.getState()

import MenuIcon from "@mui/icons-material/Menu";

import { useChatStore } from "../storage/store";
import { createConversation } from "../functionality/conversation";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export default function ConversationSidebar() {
  const {
    conversations,
    activeId,
    setConversations,
    setActiveId,
    editChatName
  } = useChatStore();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  const { theme: appTheme, toggleTheme } = useChatStore();
  const [editText, setEditText] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [snackOpen, setSnackOpen] = useState(false);

  useEffect(() => {
      if (!conversations.length) {
        handleNewChat();
      }
  },[])

const handleNewChat = () => {
    const activeConversation = conversations.find((c) => c.id === activeId);

    if (activeConversation && activeConversation.messages.length === 0) {
      setSnackOpen(true);
      if (isMobile) setOpen(false);
      return;
    }

    <Snackbar
      open={snackOpen}
      autoHideDuration={3000}
      onClose={() => setSnackOpen(false)}
      message="New chat already exists"
    />

    const newConv = createConversation();
    const updated = [newConv, ...conversations];
    setConversations(updated);
    setActiveId(newConv.id);
    if (isMobile) setOpen(false);
  };

  const selectChat = (id: string) => {
    setActiveId(id);
    if (isMobile) setOpen(false);
  };

  const removeConversation = (id: string) => {
    deleteConversation(id)
  }

  const editConversationName = (id: string, title: string) => {
    setEditingId(id)
    setEditText(title)
  }

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

    const saveEdit = async (id: string) => {
      if (!editText.trim()) return;
        editChatName(id, editText);
      cancelEdit();
    };

    const filteredConversations = conversations.filter((chat) =>
      chat.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

const sidebarContent = (
    <Box
        sx={{
          width: 280,
          maxWidth: "100vw",
          height: "100dvh",
          display: "flex",
          flexDirection: "column",
          p: 2,
          boxSizing: "border-box",
          bgcolor: appTheme === "dark" ? "#1e1e1e" : "#ffffff",
          color: appTheme === "dark" ? "#ffffff" : "#111111",
        }}
    >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
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

      <Box sx={{ mb: 2 }}>
      <TextField
        value={searchQuery}
        fullWidth
        placeholder='Search chats...'
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            filteredConversations.length > 0 &&
              selectChat(filteredConversations[0].id)
          }
          if (e.key === 'Escape') {
            setSearchQuery('')
          }
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            bgcolor: appTheme === 'dark' ? '#2a2a2a' : '#f7f7f7',
            color: appTheme === 'dark' ? '#fff' : '#111',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: appTheme === 'dark' ? '#3a3a3a' : '#ddd',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: appTheme === 'dark' ? '#555' : '#bbb',
          },
          '& .MuiInputBase-input': {
            color: appTheme === 'dark' ? '#fff' : '#111',
          },
        }}
      />
    </Box>
  
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
        }}
      >
        <List disablePadding>
          {filteredConversations.map((c) => (
            <ListItemButton
              key={c.id}
              selected={c.id === activeId}
              onClick={() => {
                if (!editingId) selectChat(c.id)
              }}
              sx={{
                borderRadius: 2,
                mb: 0.8,
                px: 1.5,
                py: 1.2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',

                bgcolor:
                  c.id === activeId
                    ? appTheme === 'dark'
                      ? '#3a3a3a'
                      : '#e8f0ff'
                    : appTheme === 'dark'
                    ? '#1f1f1f'
                    : '#ffffff',

                border:
                  appTheme === 'dark'
                    ? '1px solid #2f2f2f'
                    : '1px solid #eaeaea',

                boxShadow:
                  appTheme === 'dark'
                    ? '0 0 0 1px rgba(255,255,255,0.03)'
                    : '0 1px 2px rgba(0,0,0,0.05)',

                transition: '0.2s ease',

                '&:hover': {
                  bgcolor:
                    appTheme === 'dark'
                      ? '#2a2a2a'
                      : '#f3f3f3',
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  gap: 1,
                }}
              >
                {c.id === editingId ? (
                  <TextField
                    value={editText}
                    size='small'
                    fullWidth
                    autoFocus
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        saveEdit(c.id)
                      }
                      if (e.key === 'Escape') cancelEdit()
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        bgcolor: appTheme === 'dark' ? '#2a2a2a' : '#fff',
                      },
                    }}
                  />
                ) : (
                  <>
                    <Box
                      sx={{
                        flex: 1,
                        fontSize: '0.9rem',
                        color: appTheme === 'dark' ? '#e6e6e6' : '#222',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {c.title}
                    </Box>

                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <IconButton
                        size='small'
                        onClick={() => editConversationName(c.id, c.title)}
                        sx={{
                          color: appTheme === 'dark' ? '#bbb' : '#555',
                          '&:hover': {
                            color: '#1976d2',
                          },
                        }}
                      >
                        <EditIcon fontSize='small' />
                      </IconButton>

                      <IconButton
                        size='small'
                        onClick={() => removeConversation(c.id)}
                        sx={{
                          color: appTheme === 'dark' ? '#bbb' : '#555',
                          '&:hover': {
                            color: '#ff4d4f',
                          },
                        }}
                      >
                        <DeleteIcon fontSize='small' />
                      </IconButton>
                    </Box>
                  </>
                )}
              </Box>
              
              
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Box>
  );

  if (!isMobile) {
    return (
      <Box
        sx={{
          width: 280,
          borderRight: "1px solid #ddd",
          height: "100dvh",
        }}
      >
        {sidebarContent}
      </Box>
    );
  }

  return (
    <>
      <IconButton
        onClick={() => setOpen(true)}
        sx={{
          position: "fixed",
          top: 10,
          left: 10,
          zIndex: 1300,
          display: open ? "none" : "flex",
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