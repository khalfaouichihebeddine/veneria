import { z } from 'zod';
export const contactSchema = z.object({ name:z.string().min(2), email:z.string().email(), subject:z.string().min(3), message:z.string().min(10) });
export const productSchema = z.object({ name:z.string().min(2), slug:z.string().min(2), description:z.string().min(10), price:z.number().int().positive(), imageUrl:z.string().url().optional() });
export const serviceSchema = z.object({ name:z.string().min(2), slug:z.string().min(2), description:z.string().min(10), duration:z.string().min(2), priceFrom:z.number().int().positive() });
