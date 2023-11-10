// Dependencies
import { styled } from '@styled-system/jsx'

// Components
import { Suspense as ReactSuspense } from 'react'
import { MonodoIcon } from '..'

// Types
import { type ReactNode } from 'react'

export function Suspense({
  children,
  fallback
}: {
  children: ReactNode
  fallback?: ReactNode
}) {
  return (
    <ReactSuspense fallback={fallback ?? <SuspenseFallback />}>
      {children}
    </ReactSuspense>
  )
}

export function SuspenseFallback() {
  return (
    <styled.div
      css={{ height: '100%', display: 'grid', placeContent: 'center' }}
    >
      <MonodoIcon />
    </styled.div>
  )
}
