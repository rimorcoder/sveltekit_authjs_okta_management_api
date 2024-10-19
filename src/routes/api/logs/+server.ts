import type { RequestHandler } from './$types';
import { json, redirect } from '@sveltejs/kit';
import { PUBLIC_OKTA_DOMAIN } from '$env/static/public';

const oktaDomain = PUBLIC_OKTA_DOMAIN;


export const GET: RequestHandler = async ({ url, fetch, locals }) => {
    const session = await locals.auth()

    if (!session || !session.user) {
        throw redirect(302, '/');
      }

      
    // const query = url.searchParams.get('query') || '';
    // const page = url.searchParams.get('page') || '1';
    // const query = new URLSearchParams({
    //     limit: "100",
    //     sortOrder: "ASCENDING",
    // }).toString();

    try {
        //const response = await fetch(`https://${oktaDomain}/api/logs?${query}`, {
        const response = await fetch(`https://${oktaDomain}/api/v1/logs`, {
                headers: {
                'Authorization': `Bearer ${session.user?.accessToken ?? ''}`,
                'Accept': "application/json",
            },
            method: "GET",
        });
        
        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Unauthorized');
            }
            else{
                throw new Error(`Failed to fetch data. Status: ${response.status}, ${response.statusText}`);
            }
        }

        const data = await response.json();
        return json(data);
       } catch (error) {
        console.error('==============', error);
        return json({ error: 'An error occurred while fetching data' }, { status: 500 });
    }
};
