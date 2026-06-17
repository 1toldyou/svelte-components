<script lang="ts">
    import type {ARTData, RenderTableDataLabel} from "./index.js";

    let {
        data,
        dataLabels: dataLabelsProp = [],
        defaultDataLabels = false,
        selectRows = false,
        selectedRows = $bindable([]),
        selectedRowsIndex = $bindable([])
    }: {
        data: ARTData;
        dataLabels?: RenderTableDataLabel[];
        defaultDataLabels?: boolean;
        selectRows?: boolean;
        selectedRows?: boolean[];
        selectedRowsIndex?: number[];
    } = $props();

    let dataLabels = $derived<RenderTableDataLabel[]>(
        defaultDataLabels && data.length > 0
            ? Object.keys(data[0]).map(key => ({label: key, dataKey: key, elementType: "p" as const}))
            : dataLabelsProp
    );

    // Reset/resize selection state when data length changes.
    // We mutate in place (instead of reassigning) so a parent bind:selectedRows
    // keeps receiving updates on the same state proxy.
    $effect(() => {
        const targetLength = data.length;
        if (selectedRows.length !== targetLength) {
            selectedRows.length = targetLength;
            for (let i = 0; i < targetLength; i++) {
                selectedRows[i] = selectedRows[i] ?? false;
            }
        }
    });

    // Keep selectedRowsIndex in sync with selectedRows while preserving the
    // parent bind:selectedRowsIndex reference.
    $effect(() => {
        const next: number[] = [];
        for (let index = 0; index < selectedRows.length; index++) {
            if (selectedRows[index]) {
                next.push(index);
            }
        }
        selectedRowsIndex.length = 0;
        for (const index of next) {
            selectedRowsIndex.push(index);
        }
    });

    let selectByRangeStart = $state(0);
    let selectByRangeEnd = $state(0);

    function selectAll() {
        for (let i = 0; i < data.length; i++) {
            selectedRows[i] = true;
        }
    }

    function deselectAll() {
        for (let i = 0; i < data.length; i++) {
            selectedRows[i] = false;
        }
    }

    function selectByRange() {
        selectByRangeStart = Math.max(selectByRangeStart, 0);
        selectByRangeEnd = Math.min(selectByRangeEnd, data.length - 1);

        for (let i = selectByRangeStart; i <= selectByRangeEnd; i++) {
            selectedRows[i] = true;
        }
    }
</script>

{#if data.length > 0}
    {#if selectRows}
        <button class="button is-primary" onclick={selectAll}>Select All</button>
        <button class="button is-danger" onclick={deselectAll}>Deselect All</button>
        <input type="number" bind:value={selectByRangeStart} min="0" max={data.length - 1}>
        <input type="number" bind:value={selectByRangeEnd} min="0" max={data.length - 1}>
        <button class="button is-primary" onclick={selectByRange}>Select by Range</button>
        <p>{selectedRowsIndex.length} rows selected</p>
    {/if}
    <table class="table is-striped">
        <thead>
        <tr>
            {#if selectRows}
                <th>Index</th>
            {/if}
            {#each dataLabels as label, j (j)}
                <th>{label.label}</th>
            {/each}
            {#if selectRows}
                <th>Select</th>
            {/if}
        </tr>
        </thead>
        <tbody>
        {#each data as row, i (i)}
            <tr>
                {#if selectRows}
                    <th>{i}</th>
                {/if}
                {#each dataLabels as label, j (j)}
                    <td>
                        {#if label.elementType === "p"}
                            {#if label.innerTextProcessor}
                                <p>{label.innerTextProcessor(row[label.dataKey], row)}</p>
                            {:else}
                                <p>{row[label.dataKey]}</p>
                            {/if}
                        {:else if label.elementType === "a"}
                            <a href={label.hrefProcessor(row[label.dataKey], row)} target={label.openInNewTab ? "_blank" : ""}>
                                {#if label.innerTextProcessor}
                                    {label.innerTextProcessor(row[label.dataKey], row)}
                                {:else}
                                    {row[label.dataKey]}
                                {/if}
                            </a>
                        {:else if label.elementType === "button"}
                            <button class="button" onclick={() => label.onClick(row[label.dataKey], row)}>
                                {#if label.innerTextProcessor}
                                    {label.innerTextProcessor(row[label.dataKey], row)}
                                {:else}
                                    {label.label}
                                {/if}
                            </button>
                        {:else}
                            <p><b>Need to specify elementType</b></p>
                        {/if}
                    </td>
                {/each}
                {#if selectRows}
                    <td>
                        <label class="checkbox">
                            <input type="checkbox" bind:checked={selectedRows[i]} />
                        </label>
                    </td>
                {/if}
            </tr>
        {/each}
        </tbody>
    </table>
{:else}
    <p class="has-text-centered">No data</p>
{/if}
