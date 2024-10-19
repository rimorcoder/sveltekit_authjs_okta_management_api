import type { RequestHandler } from './$types';
import { json, redirect, error } from '@sveltejs/kit';
import { PUBLIC_OKTA_DOMAIN } from '$env/static/public';
import { getExternalAPI } from '$lib/functions/externalAPI';
const oktaDomain = PUBLIC_OKTA_DOMAIN;

export const GET: RequestHandler = async ({ url, fetch, locals }) => {
    // Validate session
    const session = await locals.auth()
    if (!session || !session.user) {
        throw redirect(302, '/');
    }

    // Get logs
    try {  
        const query = url.searchParams.get('query') || '';
        const data = await getExternalAPI(oktaDomain, "api/v1/logs", session, query );
        return json(data);
    } catch (err) {
        console.error('Error fetching logs:', err);
        
        const errorMessage = err instanceof Error ? err.message : String(err);
        const errorCode = err instanceof Error && 'code' in err ? (err as any).code : 'UNKNOWN_ERROR';
        
        return json({ 
            error: true, 
            message: `${errorMessage}`,
            code: errorCode
        }, { status: 500 });
    }
};
