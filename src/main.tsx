import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import ErrorBoundary from './components/errorBoundry.tsx'

createRoot(document.getElementById('root')!).render(
    <ErrorBoundary>
        <App />
    </ErrorBoundary>
)
