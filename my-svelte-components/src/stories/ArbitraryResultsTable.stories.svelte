<script module lang="ts">
    import {defineMeta} from "@storybook/addon-svelte-csf";

    import {ArbitraryResultsTable} from "$lib";

    const {Story} = defineMeta({
        title: 'My/Arbitrary Results Table',
        component: ArbitraryResultsTable,
        tags: ['autodocs'],
        argTypes: {

        },
    });
</script>

<Story name="default" />
