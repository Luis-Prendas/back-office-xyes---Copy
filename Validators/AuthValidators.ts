import { z } from 'zod';

export const signInSchema = z.object({
    username: z.string(),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});
