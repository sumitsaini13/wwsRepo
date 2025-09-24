import axios from 'axios';
import qs from "qs"

export const STRAPI_API = process.env.NEXT_PUBLIC_STRAPI_API || 'http://localhost:1337/api';

export const api = axios.create({ baseURL: STRAPI_API });

export function setAuthToken(token?: string) {
  if (token) api.defaults.headers.common.Authorization = `Bearer ${token}`;
  else delete api.defaults.headers.common.Authorization;
}

export function storeAuth(jwt: string, user: any) {
  localStorage.setItem('jwt', jwt);
  localStorage.setItem('user', JSON.stringify(user));
  setAuthToken(jwt);
}

export function getUser() {
  if (typeof window === 'undefined') return null;
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

export function getJwt() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('jwt');
}

export function logout() {
  localStorage.removeItem('jwt');
  localStorage.removeItem('user');
  setAuthToken(undefined);
}

export const q = (obj: any) =>
  qs.stringify(obj, { encodeValuesOnly: true });
