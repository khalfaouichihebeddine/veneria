import bcrypt from 'bcryptjs';
export type AuthUser = { id: string; email: string; name: string };
export async function hashPassword(password: string) { return bcrypt.hash(password, 12); }
export async function verifyPassword(password: string, hash: string) { return bcrypt.compare(password, hash); }
export function requireAdmin() { return true; }
