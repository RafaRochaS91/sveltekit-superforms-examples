import { z } from 'zod';

const dataSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      value: z.string(),
    }),
  ),
});


export { dataSchema };