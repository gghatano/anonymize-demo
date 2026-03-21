import './App.css'
import DemoPage from './components/DemoPage'
import { PresentationProvider } from './contexts/PresentationContext'

function App() {
  return (
    <PresentationProvider>
      <DemoPage />
    </PresentationProvider>
  )
}

export default App
