<script lang="ts">
    import type {ARTData, RenderTableDataLabel} from "./index";

    export let data: ARTData;
    export let dataLabels: RenderTableDataLabel[];
    export let defaultDataLabels: boolean = false;
    export let selectRows: boolean = false;

    export let selectedRowsIndex: number[] = [];
    export let selectedRows: boolean[] = [];

    $: {
        if (defaultDataLabels && data.length > 0) {
            dataLabels = [];
            Object.keys(data[0]).forEach(key => {
                dataLabels.push({label: key, dataKey: key, elementType: "p"});
            });
            dataLabels = dataLabels;
        }
        console.log("new dataLabels", dataLabels, "from", data[0]);
    }

    $: {
        if (data && data.length != selectedRows.length){
            selectedRows = Array(data.length).fill(false);
        }
    }

    $: {
        selectedRows.forEach((selected, index) => {
            if(selected){
                if (!selectedRowsIndex.includes(index)){
                    selectedRowsIndex = [...selectedRowsIndex, index];
                }
            }else{
                selectedRowsIndex = selectedRowsIndex.filter(i => i !== index);
            }
        });
        console.log("selectedRowsIndex", selectedRowsIndex);
    }

    let selectByRangeStart = 0;
    let selectByRangeEnd = 0;
    function selectByRange(){
        selectByRangeStart = Math.max(selectByRangeStart, 0);
        selectByRangeEnd = Math.min(selectByRangeEnd, data.length - 1);

        for (let i = selectByRangeStart; i <= selectByRangeEnd; i++){
            selectedRows[i] = true;
        }
    }
</script>

{#if data.length > 0}
    {#if selectRows}
        <button class="button is-primary" on:click={() => selectedRows = Array(data.length).fill(true)}>Select All</button>
        <button class="button is-danger" on:click={() => selectedRows = Array(data.length).fill(false)}>Deselect All</button>
        <input type="number" bind:value={selectByRangeStart} min="0" max={data.length - 1}>
        <input type="number" bind:value={selectByRangeEnd} min="0" max={data.length - 1}>
        <button class="button is-primary" on:click={selectByRange}>Select by Range</button>
        <p>{selectedRowsIndex.length} rows selected</p>
    {/if}
    <table class="table is-striped">
        <thead>
        <tr>
            {#if selectRows}
                <th>Index</th>
            {/if}
            {#each dataLabels as label}
                <th>{label.label}</th>
            {/each}
            {#if selectRows}
                <th>Select</th>
            {/if}
        </tr>
        </thead>
        <tbody>
        {#each data as row, i}
            <tr>
                {#if selectRows}
                    <th>{i}</th>
                {/if}
                {#each dataLabels as label}
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
                            <button class="button" on:click={() => label.onClick(row[label.dataKey], row)}>
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
