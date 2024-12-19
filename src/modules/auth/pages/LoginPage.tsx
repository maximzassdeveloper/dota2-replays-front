import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'
import { Input } from '../../../components/Input'
import { Button } from '../../../components/Button'
import { login } from '../api/AuthAPI'
import s from './RegisterPage.module.css'
import { Layout } from '../../../components/Layout'
import { AUTH_TOKEN_KEY } from './RegisterPage'
import { useAuthStore } from '../store/authStore'

interface LoginPageFields {
  username: string
  password: string
}

export const LoginPage: FC = () => {
  const form = useForm<LoginPageFields>()
  const navigate = useNavigate()
  const setUser = useAuthStore((state) => state.setUser)

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess(data) {
      setUser({
        id: data.data.id,
        role: data.data.role,
        username: data.data.username,
      })
      localStorage.setItem(AUTH_TOKEN_KEY, data.data.token)
      toast('Вход успешно выполнен!', { type: 'success' })
      form.reset()
      navigate('/')
    },
    onError() {
      toast('Неверный логин или пароль', { type: 'error' })
    },
  })

  const submitHandler = form.handleSubmit((values) => {
    loginMutation.mutate({
      username: values.username,
      password: values.password,
    })
  })

  return (
    <Layout>
      <form className={s.form} onSubmit={submitHandler}>
        <h1 className={s.title}>Вход</h1>

        <Input {...form.register('username')} required placeholder="Введите логин" />
        <Input
          {...form.register('password')}
          name="password"
          type="password"
          required
          placeholder="Введите пароль"
        />

        <Button type="submit" disabled={loginMutation.isPending}>
          Войти
        </Button>

        <p className={s.subText}>
          Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
        </p>
      </form>
    </Layout>
  )
}

