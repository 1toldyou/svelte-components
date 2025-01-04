<script lang="ts">
    import {browser} from "$app/environment";
</script>

{#if browser}
    <slot />
{:else}
    <div>
        This component / page is will only render in the browser.
    </div>
{/if}
