import React from 'react'
import { Container, Heading } from '@radix-ui/themes'
import SignupForm from '@/app/component/auth/SignupForm'

export default function Register() {
  return (
    <Container size="1" height="100%" className="w-full p-6">
        <SignupForm />
    </Container>
  );
}