// Components
import { MonodoIcon, Box, Stack, Text } from '@/shared/components'
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
        <Text
          id='change-view-button'
          onClick={() =>
            setView(prev => (prev === 'sign-up' ? 'sign-in' : 'sign-up'))
          }
          css={{
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          here
        </Text>
      </p>
    )
  }

  return (
    <Stack
      css={{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        gap: 40,
        px: 40
      }}
    >
      <Box css={{ transform: 'translateY(-20px)' }}>
        <MonodoIcon />
        <Text
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
        </Text>
      </Box>
      {view === 'sign-in' ? <SignInForm /> : <SignUpForm />}
      <ViewChanger />
    </Stack>
  )
}
