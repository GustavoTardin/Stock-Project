import Header from '@/components/Header';
import '../index.css';
import { Button } from '@/components/ui/button';
// import {useAuthUser, useAuthHeader} from 'react-auth-kit'
// import { useEffect } from 'react';

export default function Home() {
  // const authHeader = useAuthHeader()
  // const token = authHeader().split(' ')[1] 

  return (
    <>
      <Header />
      <h1 className='flex justify-center p-10 text-2xl text-yellowDetails'>Escrever Uma Frase</h1>
      <main className='flex justify-center items-center'>
        <Button size="xl">Principais Páginas 1</Button>
        <Button size="xl">Principais Páginas 2</Button>
        <Button size="xl">Principais Páginas 3</Button>
        <Button size="xl">Principais Páginas 4</Button>
      </main>
    </>
  );
}
