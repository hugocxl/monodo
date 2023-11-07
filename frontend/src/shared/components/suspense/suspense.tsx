import { styled } from '@styled-system/jsx'
import { Suspense as ReactSuspense, type ReactNode } from 'react'
import { MonodoIcon } from '..'

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

function SuspenseFallback() {
  return (
    <styled.div css={{ height: '100%', placeContent: 'center' }}>
      <MonodoIcon />
    </styled.div>
  )
}
