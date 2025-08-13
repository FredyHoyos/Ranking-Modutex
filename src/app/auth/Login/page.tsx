import React from 'react'
import { Container, Heading } from '@radix-ui/themes'
import SignIn from '@/app/component/auth/SigninForm'

export default function Login() {
  return (
    <Container size="1" height="100%" className='w-full p-6'>
        <SignIn/>
    </Container>
  )
}