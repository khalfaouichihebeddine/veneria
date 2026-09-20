export type Product = { id: string; name: string; slug: string; description: string; price: number; imageUrl: string | null; published: boolean };
export type Service = { id: string; name: string; slug: string; description: string; duration: string; priceFrom: number; published: boolean };
export type ContactMessage = { id: string; name: string; email: string; subject: string; message?: string; status: 'NEW' | 'IN_PROGRESS' | 'DONE'; createdAt: string };
export type CurrentUser = { name: string; email: string };
