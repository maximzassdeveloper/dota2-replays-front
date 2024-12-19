import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { Input } from '../../../components/Input'
import { Button } from '../../../components/Button'
import { register, RegisterFormData } from '../api/AuthAPI'
import { UserRoles } from '../types/auth'
import s from './RegisterPage.module.css'
import { Layout } from '../../../components/Layout'
import { AxiosResponse } from 'axios'
import { useAuthStore } from '../store/authStore'
// import { AxiosResponse } from 'axios'

export const AUTH_TOKEN_KEY = 'authToken'

export const RegisterPage: FC = () => {
  const form = useForm<RegisterFormData>()
  const navigate = useNavigate()
  const setUser = useAuthStore((state) => state.setUser)

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess(data) {
      setUser(data.data)

      toast('Регистрация прошла успешно!', { type: 'success' })
      form.reset()
      navigate('/')
    },
    onError() {
      toast('Произошла ошибка при регистрации', { type: 'error' })
    },
  })

  const submitHandler = form.handleSubmit((values) => {
    registerMutation.mutate({
      username: values.username,
      password: values.password,
      role: UserRoles.USER,
    })
  })

  return (
    <Layout>
      <form className={s.form} onSubmit={submitHandler}>
        <h1 className={s.title}>Регистрация</h1>

        <Input {...form.register('username')} required placeholder="Введите логин" />
        <Input
          {...form.register('password')}
          name="password"
          type="password"
          required
          placeholder="Введите пароль"
        />

        <Button type="submit" disabled={registerMutation.isPending}>
          Зарегистрироваться
        </Button>

        <p className={s.subText}>
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </p>
      </form>
    </Layout>
  )
}

