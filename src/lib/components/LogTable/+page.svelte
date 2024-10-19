<script lang="ts">
    export let logs: any[];
</script>

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
        {#each logs as log}
            <tr>
                <td>{log.published}</td>
                <td>{log.displayMessage}</td>
                <td>{log.eventType}</td>
                <td>{log.uuid}</td>
            </tr>
        {/each}
    </tbody>
</table>