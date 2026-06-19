import { Box } from '@mui/material';
import { useChatStore } from '../storage/store';
import ConversationSidebar from '../ui/ConversationSideBar';
import ChatWindow from '../ui/Chat';

export default function ChatScreen() {
  const activeId = useChatStore((s) => s.activeId)

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <ConversationSidebar />

      <Box sx={{ flex: 1 }}>
        {activeId ? (
          <ChatWindow />
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: '#888',
            }}
          >
            Select or create a conversation
          </Box>
        )}
      </Box>
    </Box>
  )
}