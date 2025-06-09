import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {
  FilterProvider

} from './components/FilterContext.tsx'
import { LanguageContextProvider } from './components/LanguageContext.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FilterProvider>
      <LanguageContextProvider>
        <App />
      </LanguageContextProvider>
    </FilterProvider>
  </StrictMode>,
)
