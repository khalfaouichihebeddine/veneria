import type { ApiClient } from './index';
import type { ContactMessage, CurrentUser, Product, Service } from '@/types';

async function getJson<T>(path: string): Promise<T> {
  const baseUrl = typeof window === 'undefined' ? (process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000') : '';
  const response = await fetch(`${baseUrl}${path}`, { cache: 'no-store' });
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return response.json() as Promise<T>;
}

export const liveClient: ApiClient = {
  async getProducts() { return (await getJson<{ products: Product[] }>('/api/products')).products; },
  async getProduct(slug) { return (await this.getProducts()).find((product) => product.slug === slug); },
  async getServices() { return (await getJson<{ services: Service[] }>('/api/services')).services; },
  async getService(slug) { return (await this.getServices()).find((service) => service.slug === slug); },
  async getMessages() { return (await getJson<{ messages: ContactMessage[] }>('/api/admin/messages')).messages; },
  async getCurrentUser() { return (await getJson<{ user: CurrentUser }>('/api/auth/me')).user; }
};