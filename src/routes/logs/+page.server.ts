import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (async ({ locals }) => {
  const session = await locals.auth()

  if (!session || !session.user) {
    throw redirect(302, '/');
  }

  return {
    session
  };
}) satisfies PageServerLoad;



