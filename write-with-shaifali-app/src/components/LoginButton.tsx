import React from 'react';
import { STRAPI_API } from '../lib/strapi';

export default function LoginButton() {
  const handleLogin = () => {
    const redirect = encodeURIComponent(`${window.location.origin}/auth/callback`);
    window.location.href = `${STRAPI_API.replace('/api', '')}/api/connect/google?redirect=${redirect}`;
  };

  return <button onClick={handleLogin}>Login with Google</button>;
}
