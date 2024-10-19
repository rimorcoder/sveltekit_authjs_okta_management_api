<script lang="ts">
    export let log;

    function toLocalTime(timestamp: string): string {
        const date = new Date(timestamp);
        return date.toLocaleString();
    }
</script>


<td>
    <div class="collapse bg-base-200">
        <input type="checkbox" class="peer" />
        <div
            class="collapse-title text-xl font-medium peer-checked:bg-neutral peer-checked:bg-neutral">
            {toLocalTime(log.published)}
        </div>
        <div
            class="collapse-content bg-ghost text-primary-content peer-checked:bg-ghost peer-checked:text-slate-300">
            <pre>{JSON.stringify(log.published, null, 2)}</pre>
        </div>
    </div>
</td>
<td>
    <div class="collapse bg-base-200">
        <input type="checkbox" class="peer" />
        <div
            class="collapse-title text-xl font-medium peer-checked:bg-neutral peer-checked:bg-neutral">
            {log.actor.displayName} ({log.actor.type})
        </div>
        <div
            class="collapse-content bg-ghost text-primary-content peer-checked:bg-ghost peer-checked:text-slate-300">
            <pre class="wrap-anywhere">{JSON.stringify(log.actor, null, 2)}</pre>
        </div>
    </div>
</td>
<td>
    <div class="collapse bg-base-200">
        <input type="checkbox" class="peer" />
        <div
            class="collapse-title text-xl font-medium peer-checked:bg-neutral peer-checked:bg-neutral">
            {log.client.ipAddress}
        </div>
        <div
            class="collapse-content bg-ghost text-primary-content peer-checked:bg-ghost peer-checked:text-slate-300">
            <pre class="wrap-anywhere">{JSON.stringify(log.client, null, 2)}</pre>
        </div>
    </div>
</td>
<td>
    <div class="collapse bg-base-200">
        <input type="checkbox" class="peer" />
        <div
            class="collapse-title text-xl font-medium peer-checked:bg-neutral peer-checked:bg-neutral">
            {log.displayMessage}
        </div>
        <div
            class="collapse-content bg-ghost text-primary-content peer-checked:bg-ghost peer-checked:text-slate-300">
            <pre class="wrap-anywhere">{JSON.stringify(log.eventType, null, 2)}</pre>
        </div>
    </div>
</td>
<td>
    <div class="collapse bg-base-200">
        <input type="checkbox" class="peer" />
        <div class="collapse-title text-xl font-medium peer-checked:bg-neutral peer-checked:bg-neutral">
            <ul class="list-disc list-inside">
                {#if log.target && typeof log.target === 'object'}
                    {#each Object.entries(log.target) as [key, target]}
                        {#if typeof target === 'object' && target !== null && 'displayName' in target && 'type' in target}
                            <li>{target.displayName} ({target.type})</li>
                        {/if}
                    {/each}
                {/if}
            </ul>
        </div>
        <div
            class="collapse-content bg-ghost text-primary-content peer-checked:bg-ghost peer-checked:text-slate-300">
            <pre class="wrap-anywhere">{JSON.stringify(log.target, null, 2)}</pre>
        </div>
    </div>
</td>



<style>
    .wrap-anywhere {
        white-space: pre-wrap;
        word-break: break-all;
        max-width: 100%;
    }
</style>