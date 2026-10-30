import type {LinkDTO} from "../../../../models/objects.ts";
import {Box, Button, IconButton, Stack, TextField, Typography} from "@mui/material";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import CloseIcon from "@mui/icons-material/Close";

export type LinkRow = { key: string; link: LinkDTO };

export interface LinksTabProps {
    rows: LinkRow[];
    setRows: (value: LinkRow[]) => void;
}

export function LinksTab({
                             rows,
                             setRows
                         }: Readonly<LinksTabProps>) {

    const updateLink = (key: string, changes: Partial<LinkDTO>) => {
        setRows(rows.map((row) =>
            row.key === key
                ? {...row, link: {...row.link, ...changes}}
                : row
        ));
    };

    const moveLink = (index: number, direction: -1 | 1) => {
        const nextRows = [...rows];
        const target = index + direction;
        [nextRows[index], nextRows[target]] = [nextRows[target], nextRows[index]];
        setRows(nextRows);
    };

    return <>
        <Stack sx={{
            gridColumn: "1 / -1",
        }}>
            <Button variant="contained" sx={{
                maxWidth: "240px",
                marginBottom: "16px",
            }}
                    onClick={() => setRows([
                        ...rows,
                        {key: crypto.randomUUID(), link: {name: "", url: ""}},
                    ])}>Add link</Button>

            {rows.length === 0 && <Typography>No links</Typography>}

            {rows.map(({key, link}, index) => (
                <Box
                    key={key}
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "minmax(100px, 1fr) minmax(200px, 2fr) 40px 40px 40px",
                        padding: "8px",
                        gap: "8px",
                    }}
                >
                    <TextField
                        size="small"
                        value={link.name ?? ""}
                        onChange={(event) => updateLink(key, {name: event.target.value})}
                    />
                    <TextField
                        size="small"
                        value={link.url ?? ""}
                        onChange={(event) => updateLink(key, {url: event.target.value})}
                    />

                    <IconButton
                        disabled={index === 0}
                        onClick={() => moveLink(index, -1)}
                    >
                        <ArrowUpwardRoundedIcon/>
                    </IconButton>
                    <IconButton
                        disabled={index === rows.length - 1}
                        onClick={() => moveLink(index, 1)}
                    >
                        <ArrowDownwardRoundedIcon/>
                    </IconButton>
                    <IconButton
                        onClick={() => setRows(rows.filter((row) => row.key !== key))}
                    >
                        <CloseIcon/>
                    </IconButton>
                </Box>
            ))}
        </Stack>
    </>;
}