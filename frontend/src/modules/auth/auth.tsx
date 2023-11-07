// Dependencies
import { styled } from '@styled-system/jsx'

// Components
import { MonodoIcon } from '@/shared/components'
import { SignInForm, SignUpForm } from './components'

// Hooks
import { useState } from 'react'

export function AuthPage() {
  const [view, setView] = useState<'sign-in' | 'sign-up'>('sign-in')

  function ViewChanger() {
    return (
      <p>
        {view === 'sign-in'
          ? 'Not a user? Sign up '
          : 'Already a user? Sign in '}
        <styled.span
          cursor={'pointer'}
          textDecoration={'underline'}
          onClick={() =>
            setView(prev => (prev === 'sign-up' ? 'sign-in' : 'sign-up'))
          }
        >
          here
        </styled.span>
      </p>
    )
  }

  return (
    <styled.div
      css={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDir: 'column',
        width: '100%',
        height: '100%',
        gap: 40
      }}
    >
      <styled.div css={{ transform: 'translateY(-40px)' }}>
        <MonodoIcon />
        <styled.span
          css={{
            mt: 16,
            textStyle: '3xl',
            letterSpacing: '-0.1rem',
            textAlign: 'center',
            width: '100%',
            display: 'block'
          }}
        >
          {'monodo'}
        </styled.span>
      </styled.div>
      {view === 'sign-in' ? <SignInForm /> : <SignUpForm />}
      <ViewChanger />
    </styled.div>
  )
}
