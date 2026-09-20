import type { ContactMessage, CurrentUser, Product, Service } from '@/types';
export interface ApiClient { getProducts(): Promise<Product[]>; getProduct(slug: string): Promise<Product | undefined>; getServices(): Promise<Service[]>; getService(slug: string): Promise<Service | undefined>; getMessages(): Promise<ContactMessage[]>; getCurrentUser(): Promise<CurrentUser>; }
export { liveClient as api } from './client';
