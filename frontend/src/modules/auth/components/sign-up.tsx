import { useSignUpCommand } from '@/shared/hooks'
import { styled } from '@styled-system/jsx'
import { useState, type ChangeEvent } from 'react'

export function SignUpForm() {
  const { command } = useSignUpCommand()
  const [user, setUser] = useState({
    email: 'corta.hugo@gmail.com',
    password: '123456'
  })

  const onChangeField = (field: string) => (e: ChangeEvent<HTMLInputElement>) =>
    setUser({ ...user, [field]: e.target.value })

  return (
    <styled.div
      css={{
        display: 'flex',
        flexDir: 'column',
        justifyContent: 'center',
        width: '100%',
        gap: 8
      }}
    >
      <input type='text' value={user.email} onChange={onChangeField('email')} />
      <input
        type='password'
        value={user.password}
        onChange={onChangeField('password')}
      />
      <button onClick={() => command(user)}>Sign Up</button>
    </styled.div>
  )
}
