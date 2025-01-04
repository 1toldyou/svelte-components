export type ARTData = Row[];
type Row = {[key: string]: any};

type RenderTableDataLabelP = {
    label: string,
    dataKey: keyof Row,
    elementType: "p",
    innerTextProcessor?: (data: Row[keyof Row], row: Row) => string,
}

type RenderTableDataLabelA = {
    label: string,
    dataKey: keyof Row,
    elementType: "a"
    hrefProcessor: (data: Row[keyof Row], row: Row) => string,
    innerTextProcessor?: (data: Row[keyof Row], row: Row) => string,
    openInNewTab?: boolean,
}

type RenderTableDataLabelButton = {
    label: string,
    dataKey: keyof Row,
    elementType: "button",
    onClick: (data: Row[keyof Row], row: Row) => void,
    innerTextProcessor?: (data: Row[keyof Row], row: Row) => string,
}

export type RenderTableDataLabel = RenderTableDataLabelP | RenderTableDataLabelA | RenderTableDataLabelButton;

export {default as ArbitraryResultsTable} from "./ArbitraryResultsTable.svelte";
