import { Alert, Snackbar } from '@mui/material'
import { useChatStore } from '../storage/store'

export default function ErrorSnackbar() {
  const error = useChatStore((s) => s.error)
  const setError = useChatStore((s) => s.setError)

  const handleClose = () => {
    setError(null)
  }

  return (
    <Snackbar
      open={!!error}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <Alert
        severity='error'
        variant='filled'
        onClose={handleClose}
      >
        {error}
      </Alert>
    </Snackbar>
  )
}