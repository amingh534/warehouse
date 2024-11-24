import { QueryClient, QueryClientProvider,  } from '@tanstack/react-query'
import React from 'react'

function TanstackQueryProvider({children}) {
    const queryClient = new QueryClient()
  return (
    
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
  )
}

export default TanstackQueryProvider