import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, useRoutes } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import Layout from './components/DefaultLayout'

// type from vite-plugin-pages/client-react
import routes from '~react-pages'
import './index.css'
import { queryClient } from '@/query'

export function App() {
  return (
    <Suspense fallback={<p></p>}>
      {useRoutes([
        {
          path: '/',
          element: <Layout />, // 모든 페이지를 Layout으로 감쌈
          children: routes, // 자동 생성된 routes를 children으로 포함
        },
      ])}
    </Suspense>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <App />
      </Router>
    </QueryClientProvider>
  </React.StrictMode>,
)
