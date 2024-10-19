<script lang="ts">
    import type { PageData } from './$types';
    import { onMount } from 'svelte';
    
    export let data: PageData;
    let showAlert = false;

    function formatDate(dateString: string) {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    function copyToClipboard(text: string) {
        navigator.clipboard.writeText(text)
            .then(() => {
                showAlert = true;
                setTimeout(() => {
                    showAlert = false;
                }, 1000);
            })
            .catch(err => console.error('Failed to copy: ', err));
    }
</script>


<style>
    .wrap-anywhere {
        overflow-wrap: anywhere;
        word-break: break-word;
        max-width: 75vw; /* 75% of the viewport width */
    }
</style>


<h1 class="text-3xl font-bold mb-4">Profile</h1>

{#if showAlert}
    <div class="fixed top-0 left-0 right-0 flex justify-center z-50 mt-4">
        <div class="alert alert-success w-auto">
            <span>Successfully copied to clipboard</span>
        </div>
    </div>
{/if}

{#if data.session}
<div class="overflow-x-auto">
    <table class="table table-compact w-full">
        <thead>
            <tr>
                <th>Name</th>
                <th>Value</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>expires</td>
                <td>{formatDate(data.session?.expires)}</td>
                <td>
                    <button class="btn btn-xs" on:click={() => copyToClipboard(data.session?.expires ?? '')}>
                        Copy
                    </button>
                </td>
            </tr>
            {#each Object.entries(data.session?.user ?? {}) as [name, value]}
                <tr>
                    <td>{name}</td>
                    <td class="whitespace-normal">
                        <div class="wrap-anywhere">
                            {value}
                        </div>
                    </td>
                    <td>
                        <button class="btn btn-xs" on:click={() => copyToClipboard(value)}>
                            Copy
                        </button>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
{/if}

