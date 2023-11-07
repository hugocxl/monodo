// Dependencies
import { useSignInCommand } from '@/shared/hooks'
import { styled } from '@styled-system/jsx'
import { useState, type ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'

export function SignInForm() {
  const navigate = useNavigate()
  const { command, isLoading, error } = useSignInCommand({
    onSuccess: () => navigate(`/home?date=${new Date()}`)
  })
  const [user, setUser] = useState({
    email: '',
    password: ''
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
      <button onClick={() => command(user)}>
        {isLoading ? 'Loading...' : 'Sign In'}
      </button>

      {Boolean(error) && (
        <styled.p mt={16} textAlign={'center'}>{`${error?.message}`}</styled.p>
      )}
    </styled.div>
  )
}
