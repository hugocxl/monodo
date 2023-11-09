// Components
import { Button, Form, Input, Text } from '@/shared/components'

// Hooks
import { useSignUpCommand } from '@/shared/hooks'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

// Typesw
import type { FormEvent, ChangeEvent } from 'react'

export function SignUpForm() {
  const navigate = useNavigate()
  const { command, isPending, error } = useSignUpCommand({
    onSuccess: () => {
      navigate(`/`)
    }
  })
  const [user, setUser] = useState({
    email: 'corta.hugo@gmail.com',
    password: '123456'
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
        flexDir: 'column',
        justifyContent: 'center',
        width: '100%',
        gap: 12
      }}
    >
      <Input
        placeholder={'Email'}
        required
        type={'text'}
        value={user.email}
        onChange={onChangeField('email')}
      />
      <Input
        required
        placeholder={'Password'}
        type={'password'}
        value={user.password}
        onChange={onChangeField('password')}
      />
      <Button
        disabled={isPending}
        css={{ width: '100%', mt: 12 }}
        type='submit'
      >
        Sign Up
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
