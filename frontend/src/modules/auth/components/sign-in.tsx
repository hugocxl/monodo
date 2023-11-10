// Hooks
import { useSignInCommand } from '@/shared/hooks'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

// Dependencies
import { Button, Text, Input, Form } from '@/shared/components'

// Types
import type { ChangeEvent, FormEvent } from 'react'

export function SignInForm() {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const { command, isPending, error } = useSignInCommand({
    onSuccess: () => {
      navigate(`/`)
    }
  })

  const onChangeField = (field: string) => (e: ChangeEvent<HTMLInputElement>) =>
    setUser({ ...user, [field]: e.target.value })

  function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault()

    command(user)
  }

  return (
    <Form
      onSubmit={onSubmit}
      css={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        gap: 12
      }}
    >
      <Input
        id='input-email'
        required
        placeholder={'Email'}
        type={'text'}
        value={user.email}
        onChange={onChangeField('email')}
      />
      <Input
        id='input-password'
        required
        placeholder={'Password'}
        type={'password'}
        value={user.password}
        onChange={onChangeField('password')}
      />
      <Button
        id='submit'
        disabled={isPending}
        css={{ width: '100%', mt: 12 }}
        type={'submit'}
      >
        {isPending ? 'Loading...' : 'Sign In'}
      </Button>

      {Boolean(error) && (
        <Text
          css={{
            mt: 16,
            textAlign: 'center',
            color: 'red'
          }}
        >{`${error?.message}`}</Text>
      )}
    </Form>
  )
}
