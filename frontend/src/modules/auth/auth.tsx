import { useSignIn } from '@/shared/hooks'
import { useState, type ChangeEvent } from 'react'

export function AuthPage() {
  const mutete = useSignIn()
  const [user, setUser] = useState({
    email: 'corta.hugo@gmail.com',
    password: '123456'
  })

  const onChangeField = (field: string) => (e: ChangeEvent<HTMLInputElement>) =>
    setUser({ ...user, [field]: e.target.value })

  return (
    <div>
      <input type='text' value={user.email} onChange={onChangeField('email')} />
      <input
        type='password'
        value={user.password}
        onChange={onChangeField('password')}
      />
      <button onClick={() => mutete.mutate(user)}>submit</button>
    </div>
  )
}
