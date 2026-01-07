import { z } from 'zod';

/**
 * Схема валідації для форми калькулятора плинтуса
 */
export const plintusCalculatorSchema = z.object({
  plintusId: z.string().uuid('Оберіть плинтус'),
  perimeterLength: z
    .number({
      message: 'Введіть периметр приміщення',
    })
    .positive('Периметр має бути більше 0')
    .min(0.1, 'Мінімальний периметр: 0.1 м')
    .max(10000, 'Максимальний периметр: 10000 м'),
});

export type PlintusCalculatorFormData = z.infer<typeof plintusCalculatorSchema>;
