'use client'

import {SessionProvider} from 'next-auth/react'
import { UserProvider } from './UserContext';

export default function Provider({children}) {
  return (
    <SessionProvider>
      <UserProvider>
      {children}
      </UserProvider>
    </SessionProvider>
  )
}