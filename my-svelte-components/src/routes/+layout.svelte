<script lang="ts">
	import 'bulma/css/bulma.min.css';

	let { children }: { children: import('svelte').Snippet } = $props();
</script>

{@render children()}
