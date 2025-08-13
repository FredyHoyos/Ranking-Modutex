import React from 'react';
import { Flex, Text } from '@radix-ui/themes';

interface ToggleTextProps {
    toggleForm: () => void;
    isSignUp: boolean;
    children?: React.ReactNode;
}

export default function ToggleText( { toggleForm, isSignUp, children }: ToggleTextProps) {
  return (
    <Flex justify="between" my="-9" className='flex flex-row items-center'>
      {isSignUp ? (
        <>
          <Text className='mr-4 text-yellow-300'>Ya tienes una cuenta?</Text>
          <button onClick={toggleForm} className='text-fuchsia-600 font-bold mt-4 my-4 mx-2 hover:underline hover:cursor-pointer'>
            Inicia Sesión
          </button>
        </>
      ) : (
        <>
          <Text className='mr-4 text-fuchsia-600'>Todavía no tienes una cuenta?</Text>
          <button onClick={toggleForm} className='text-fuchsia-600 font-bold mt-4 my-4 mx-2 hover:underline hover:cursor-pointer'>
            Registrate
          </button>
        </>
      )}
      {children}
    </Flex>
  );
}
