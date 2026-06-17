# my-svelte-components
A collection of Svelte components that I frequently need to copy to new projects.

## Usage

Install the package in a SvelteKit project with:

```bash
npm install my-svelte-components
```

### ArbitraryResultsTable

```svelte
<script lang="ts">
  import { ArbitraryResultsTable } from 'my-svelte-components';
  import type { ARTData, RenderTableDataLabel } from 'my-svelte-components';

  const data: ARTData = [
    { id: 1, name: 'Alice', url: 'https://example.com/alice' },
    { id: 2, name: 'Bob', url: 'https://example.com/bob' },
  ];

  const dataLabels: RenderTableDataLabel[] = [
    { label: 'ID', dataKey: 'id', elementType: 'p' },
    { label: 'Name', dataKey: 'name', elementType: 'a', hrefProcessor: (url) => url },
    { label: 'Say hi', dataKey: 'name', elementType: 'button', onClick: (name) => alert(`Hi ${name}`) },
  ];

  let selectedRows = $state<boolean[]>([]);
  let selectedRowsIndex = $state<number[]>([]);
</script>

<ArbitraryResultsTable
  {data}
  {dataLabels}
  selectRows
  bind:selectedRows
  bind:selectedRowsIndex
/>

<p>{selectedRowsIndex.length} row(s) selected</p>
```

Bind `selectedRows` and `selectedRowsIndex` to `$state([])` for reactive row selection. Set `defaultDataLabels` to auto-generate column labels from the keys of `data[0]`.

### OnlyRenderInBrowser

```svelte
<script lang="ts">
  import { OnlyRenderInBrowser } from 'my-svelte-components';
</script>

<OnlyRenderInBrowser>
  <p>This content only renders in the browser.</p>
</OnlyRenderInBrowser>
```

Wraps children that depend on browser APIs. Falls back to a placeholder during server-side rendering.

## Developing
Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

Everything inside `src/lib` is part of your library, everything inside `src/routes` can be used as a showcase or preview app.

## Building

To build your library:

```bash
npm run package
```

To create a production version of your showcase app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Publishing

Go into the `package.json` and give your package the desired name through the `"name"` option. Also consider adding a `"license"` field and point it to a `LICENSE` file which you can create from a template (one popular option is the [MIT license](https://opensource.org/license/mit/)).

To publish your library to [npm](https://www.npmjs.com):

```bash
npm publish
```
