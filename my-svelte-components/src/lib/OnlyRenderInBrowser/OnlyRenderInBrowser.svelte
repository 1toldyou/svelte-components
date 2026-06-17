<script lang="ts">
    import {browser} from "$app/environment";
    import type {Snippet} from "svelte";

    let {children}: { children?: Snippet } = $props();
</script>

{#if browser}
    {@render children?.()}
{:else}
    <div>
        This component / page will only render in the browser with JavaScript enabled.
    </div>
{/if}
