
export async function getExternalAPI(
    oktaDomain: string, 
    endpoint: string,
    session: any, 
    query: string,
    threshold: number = .50
) {
    try {
        const url = `https://${oktaDomain}/${endpoint}${query ? `?${query}` : ''}`;
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${session.user?.accessToken ?? ''}`,
                'Accept': "application/json",
            },
            method: "GET",
        });

        if (!response.ok) {
            throw new Error(`${response.status} :  ${response.statusText}`);
        }

        const data = await response.json();
        return data; 
    } catch (error) {
        throw error;
    }
}
