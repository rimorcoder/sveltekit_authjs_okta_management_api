<script lang="ts">
    export let logs: any[];
    import Log from "$lib/components/Log/+page.svelte";
    import { writable } from 'svelte/store';

    const selectedLog = writable(null);

    function openModal(log: any) {
        selectedLog.set(log);
    }

    function closeModal() {
        selectedLog.set(null);
    }
</script>

<div class="w-full">
    <table class="table table-xs w-full">
        <thead>
            <tr>
                <th class="bg-base-100 z-10">When</th>
                <th class="bg-base-100 z-10">Who</th>
                <th class="bg-base-100 z-10">Where</th>
                <th class="bg-base-100 z-10">Why</th>
                <th class="bg-base-100 z-10">What</th>
                <th class="bg-base-100 z-10">Details</th>
            </tr>
        </thead>
        <tbody>
            {#each logs as log}
                <tr>
                    <Log {log} />
                    <td>
                        <button class="btn btn-xs btn-primary" on:click={() => openModal(log)}>
                            Details
                        </button>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>

{#if $selectedLog}
    <div class="modal modal-open" 
         on:click|self={closeModal} 
         on:keydown={(e) => e.key === 'Escape' && closeModal()}
         role="dialog"
         tabindex="-1">
        <div class="modal-box relative max-w-4xl w-11/12 max-h-[90vh] flex flex-col">
            <button class="btn btn-sm btn-circle absolute right-2 top-2" on:click={closeModal}>✕</button>
            <h3 class="font-bold text-lg">Log Details</h3>
            <pre class="mt-4 bg-base-200 p-4 rounded-lg overflow-auto flex-grow">
                {JSON.stringify($selectedLog, null, 2)}
            </pre>
            <div class="modal-action mt-4">
                <button class="btn" on:click={closeModal}>Close</button>
            </div>
        </div>
    </div>
{/if}

<style>
    div {
        height: calc(100vh - 4rem); /* Adjust 4rem as needed based on your layout */
    }
    :global(.table td) {
        vertical-align: top;
    }
</style>
