'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api, setAuthToken, storeAuth } from '../../../lib/strapi';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const jwt = params.get('jwt');

    if (jwt) {
      setAuthToken(jwt);
      api.get('/users/me')
        .then(res => {
          storeAuth(jwt, res.data);
          router.push('/');
        })
        .catch(() => router.push('/'));
    } else {
      router.push('/');
    }
  }, [router]);

  return <p>Logging you in…</p>;
}
