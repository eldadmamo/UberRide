import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloProvider } from 'react-apollo'
import client from './apollo.ts'
import App from './Components/App'
import "./global-styles.ts"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
    <App />
    </ApolloProvider>
  </StrictMode>,
)
