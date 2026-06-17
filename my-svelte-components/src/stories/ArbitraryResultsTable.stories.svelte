<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { ArbitraryResultsTable } from '../lib/index.js';
	import type { ARTData, RenderTableDataLabel } from '../lib/index.js';

	const sampleData: ARTData = [
		{
			id: 1,
			name: 'Alice',
			role: 'Admin',
			profileUrl: 'https://example.com/alice'
		},
		{
			id: 2,
			name: 'Bob',
			role: 'Editor',
			profileUrl: 'https://example.com/bob'
		},
		{
			id: 3,
			name: 'Charlie',
			role: 'Viewer',
			profileUrl: 'https://example.com/charlie'
		}
	];

	const baseLabels: RenderTableDataLabel[] = [
		{ label: 'ID', dataKey: 'id', elementType: 'p' },
		{ label: 'Name', dataKey: 'name', elementType: 'p' },
		{ label: 'Role', dataKey: 'role', elementType: 'p' }
	];

	const { Story } = defineMeta({
		title: 'My/Arbitrary Results Table',
		component: ArbitraryResultsTable,
		tags: ['autodocs'],
		argTypes: {
			defaultDataLabels: { control: 'boolean' },
			selectRows: { control: 'boolean' }
		},
		args: {
			data: sampleData
		}
	});
</script>

<script lang="ts">
	let selectedRows = $state<boolean[]>([]);
	let selectedRowsIndex = $state<number[]>([]);

	const linkLabels: RenderTableDataLabel[] = [
		{ label: 'ID', dataKey: 'id', elementType: 'p' },
		{
			label: 'Profile',
			dataKey: 'name',
			elementType: 'a',
			hrefProcessor: (_name, row) => row.profileUrl,
			openInNewTab: true,
			innerTextProcessor: (_name, row) => `${row.name} ↗`
		},
		{ label: 'Role', dataKey: 'role', elementType: 'p' }
	];

	const buttonLabels: RenderTableDataLabel[] = [
		{ label: 'ID', dataKey: 'id', elementType: 'p' },
		{ label: 'Name', dataKey: 'name', elementType: 'p' },
		{
			label: 'Action',
			dataKey: 'id',
			elementType: 'button',
			onClick: (id) => console.log(`Clicked row ID: ${id}`),
			innerTextProcessor: (id) => `Log #${id}`
		}
	];
</script>

<Story name="Default" args={{ data: sampleData, dataLabels: baseLabels }} />

<Story name="Auto Labels" args={{ data: sampleData, defaultDataLabels: true }} />

<Story name="With Links" args={{ data: sampleData, dataLabels: linkLabels }} />

<Story name="With Buttons" args={{ data: sampleData, dataLabels: buttonLabels }} />

<Story name="Empty" args={{ data: [], dataLabels: baseLabels }} />

<Story name="Selectable">
	<ArbitraryResultsTable
		data={sampleData}
		dataLabels={baseLabels}
		selectRows={true}
		bind:selectedRows
		bind:selectedRowsIndex
	/>
	<p data-testid="selection-summary">
		Selected indices: {selectedRowsIndex.length > 0 ? selectedRowsIndex.join(', ') : 'none'}
	</p>
</Story>
