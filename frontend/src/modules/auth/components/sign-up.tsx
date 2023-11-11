// Components
import { Button, Form, Input, Text } from '@/shared/components'

// Hooks
import { useSignUpCommand, useUser } from '@/shared/hooks'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

// Typesw
import type { FormEvent, ChangeEvent } from 'react'

export function SignUpForm() {
  const navigate = useNavigate()
  const [, setAuthUser] = useUser()
  const { commandAsync, isPending, error } = useSignUpCommand({
    onSuccess: () => {
      navigate(`/`)
    }
  })
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const onChangeField = (field: string) => (e: ChangeEvent<HTMLInputElement>) =>
    setUser({ ...user, [field]: e.target.value })

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault()

    const res = await commandAsync(user)

    if (res.id) setAuthUser(res)
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
        id='input-email'
        placeholder={'Email'}
        required
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
