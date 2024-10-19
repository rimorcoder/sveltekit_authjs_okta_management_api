<script lang="ts">
    export let logs: any[];
    import Log from "$lib/Log/+page.svelte";
</script>

<div class="w-full h-full overflow-auto">
    <table class="table table-xs w-full">
        <thead>
            <tr>
                <th class="sticky top-0 bg-base-100 z-10">When</th>
                <th class="sticky top-0 bg-base-100 z-10">Who</th>
                <th class="sticky top-0 bg-base-100 z-10">Where</th>
                <th class="sticky top-0 bg-base-100 z-10">Why</th>
                <th class="sticky top-0 bg-base-100 z-10">What</th>
            </tr>
        </thead>
        <tbody>
            {#each logs as log}
                <Log {log} />
            {/each}
        </tbody>
    </table>
</div>

<style>
    div {
        height: calc(100vh - 4rem); /* Adjust 4rem as needed based on your layout */
    }
</style>
