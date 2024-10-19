import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (async ({ locals }) => {
  const session = await locals.auth()
  
  if (!session) {
        throw redirect(302, '/');
    }
    return {};
}) satisfies PageServerLoad;