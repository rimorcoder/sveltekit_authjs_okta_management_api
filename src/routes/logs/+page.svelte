<script lang="ts">
    import LogList from "$lib/components/LogList/+page.svelte";

    let searchQuery = "limit=10&sortOrder=DESCENDING";
    let searchInput: string = "";
    let isLoading = false;
    let error: string | null = null;
    let logs: any[] = [];

    async function handleSearch() {
        isLoading = true;
        let updatedQuery = searchQuery;
        try {
            if (searchInput.trim()) {
                const encodedInput = encodeURIComponent(searchInput.trim());
                updatedQuery += (searchQuery ? "&" : "") + `q=${encodedInput}`;
            }
            
            const response = await fetch(
                `/api/logs?query=${encodeURIComponent(updatedQuery)}`,
            );
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch logs');
            }
            logs = await response.json();
        } catch (err) {
            error = err instanceof Error ? err.message : String(err);
        } finally {
            isLoading = false;
        }
    }
</script>

<div class="flex flex-col gap-4">
    <div class="flex items-end gap-4">
        <div class="flex-grow">
            <label for="searchInput" class="block mb-2 text-sm font-medium">Search:</label>
            <input
                type="text"
                id="searchInput"
                bind:value={searchInput}
                class="w-full p-2 border rounded"
                placeholder="Enter search terms"
            />
        </div>
        <button class="btn btn-primary" on:click={handleSearch}>Get Logs</button>
    </div>
</div>

<div class="flex flex-col items-center h-screen px-4 pt-8">
    {#if isLoading}
        <span class="loading loading-ring loading-lg"></span>
    {:else if error}
        <div class="alert alert-error">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                ><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                /></svg
            >
            <span>{error}</span>
        </div>
    {:else}
        <LogList {logs} />
    {/if}
</div>
