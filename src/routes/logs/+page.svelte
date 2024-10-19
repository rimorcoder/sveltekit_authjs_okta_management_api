<script lang="ts">
    // export let data: PageData;

    let searchQuery = "";
    let isLoading = false;
    let error: string | null = null;
    let searchResults: any[] = [];

    async function handleSearch() {
        isLoading = true;
        try {
            const response = await fetch(
                `/api/logs?query=${encodeURIComponent(searchQuery)}`,
            );
            if (!response.ok) {
                throw new Error("Failed to fetch search results");
            }
            const data = await response.json();
            searchResults = data;
        } catch (err) {
            error = "An error occurred while searching. Please try again.";
            console.error(err);
        } finally {
            isLoading = false;
        }
    }
</script>

<button class="btn btn-primary" on:click={handleSearch}>Refresh Logs</button>

{#if isLoading}
    <p>Loading...</p>
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
    <div class="overflow-x-auto">
        <table class="table table-compact w-full">
            <thead>
                <tr>
                    <th>Timestamp</th>
                    <th>displayMessage</th>
                    <th>eventType</th>
                    <th>uuid</th>
                </tr>
            </thead>
            <tbody>
                {#each searchResults as log}
                    <tr>
                        <td>{log.published}</td>
                        <td>{log.displayMessage}</td>
                        <td>{log.eventType}</td>
                        <td>{log.uuid}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
{/if}
