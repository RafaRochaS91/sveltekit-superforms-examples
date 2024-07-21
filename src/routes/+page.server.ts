import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import type { PageServerLoad } from './$types';
import { dataSchema } from './schema';
import type { Actions } from '@sveltejs/kit';

const mockItems = [
  {
    id: 'some-id-1',
    value: 'Item 1',
  },
  {
    id: 'some-id-2',
    value: 'Item 2',
  },
  {
    id: 'some-id-3',
    value: 'Item 3',
  },
];

export const load = (async () => {
  const form = await superValidate(zod(dataSchema));

  return {
    form,
    options: mockItems,
  };
}) satisfies PageServerLoad;

export const actions: Actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, zod(dataSchema));
    console.log(form.data);

    return {
      form,
    };
  },
}