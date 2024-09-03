import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@supabase/auth-helpers-react';

export default function Home() {
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    if (user) {
      router.push('/home');
    } else {
      router.push('/login');
    }
  }, [user, router]);

  return null; // This page will redirect, so we don't need to render anything
}