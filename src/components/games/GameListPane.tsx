import {
    Box,
    Divider,
    IconButton,
    InputBase,
    LinearProgress,
    ListItemButton,
    ListItemText,
    Tooltip,
    Typography
} from "@mui/material";
import {useFilterStore} from "../../store/useFilterStore.ts";
import SearchIcon from '@mui/icons-material/Search';
import {useDebouncedValue} from "@tanstack/react-pacer";
import {useQueryGames} from "../../hooks/objects.ts";
import {List, type RowComponentProps} from "react-window";
import {type ReactNode, useCallback, useEffect, useMemo} from "react";
import type {GameListDTO} from "../../models/gameList.ts";
import {useGameListStore} from "../../store/useGameListStore.ts";
import {useLocation, useNavigate, useParams} from "react-router";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import {formatLocalDate, formatPlaytime} from "../../functions/util.ts";
import {IconImage} from "../common/IconImage.tsx";
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import {
    getInstallSizeCode,
    getPastTimeSegmentCode,
    getPlaytimeCategoryCode,
    getScoreGroupCode,
    translateInstalledName,
    translateInstallSizeName,
    translatePastTimeSegmentName,
    translatePlaytimeCategoryName,
    translateScoreGroupName
} from "../../functions/gameList.ts";
import {useTranslation} from "react-i18next";
import type {TFunction} from "i18next";

const ROW_HEIGHT = 80;
const GROUP_ROW_HEIGHT = 44;

const getRowHeight = (index: number, {rows}: RowData) =>
    rows[index]?.type === 'group' ? GROUP_ROW_HEIGHT : ROW_HEIGHT;

const translateName = function (t: TFunction<"translation", undefined>, name: string | undefined, groupingOrder: string | undefined) {
    if (groupingOrder && ['UserScore', 'CriticScore', 'CommunityScore'].includes(groupingOrder)) {
        return translateScoreGroupName(t, getScoreGroupCode(name));
    }
    if (groupingOrder && ['LastActivity', 'RecentActivity', 'Added', 'Modified'].includes(groupingOrder)) {
        return translatePastTimeSegmentName(t, getPastTimeSegmentCode(name));
    }
    if (groupingOrder && groupingOrder == 'InstallSize') {
        return translateInstallSizeName(t, getInstallSizeCode(name));
    }
    if (groupingOrder && groupingOrder == 'PlayTime') {
        return translatePlaytimeCategoryName(t, getPlaytimeCategoryCode(name));
    }
    if (groupingOrder && groupingOrder == 'InstallationStatus') {
        return translateInstalledName(t, name);
    }
    return name || '(None)';
};

function GameRow({
                     index,
                     style,
                     rows,
                     onSelectGame,
                     onToggleGroup,
                 }: RowComponentProps<RowData> & RowData) {
    const row = rows[index];
    const gameId = row?.type === 'game' ? row.game?.id : undefined;
    const {t} = useTranslation();

    const isSelected = useGameListStore(
        (state) => gameId != null && state.selectedGameId === gameId
    );

    if (!row) return <div style={style}/>;

    if (row.type === 'group') {
        return (
            <div style={style}>
                <ListItemButton
                    onClick={() => onToggleGroup(row.name)}
                    sx={{height: GROUP_ROW_HEIGHT, px: 1.5}}
                >
                    {row.expanded ? <ExpandMoreIcon/> : <ChevronRightIcon/>}
                    <ListItemText primary={translateName(t, row.name, row.groupingOrder)} sx={{ml: 1}}/>
                    <Typography variant="caption">{row.count}</Typography>
                </ListItemButton>
            </div>
        );
    }

    const game = row.game;

    if (!game) return <div style={style}/>;

    function getIconUrl(): string | undefined {
        if (!game) return undefined;
        if (game.id && game.hasIcon && game.iconUrl) return game.iconUrl;
        if (game.plugin?.iconUrl) return game.plugin.iconUrl;
        return undefined;
    }

    function getPluginIconUrl(): string | undefined {
        if (!game) return undefined;
        if (game.plugin?.iconUrl) return game.plugin.iconUrl;
        return undefined;
    }

    return (
        <div style={style}>
            <ListItemButton
                selected={isSelected}
                onClick={() => onSelectGame(game.id)}
                sx={{
                    height: ROW_HEIGHT,
                    px: "4px",
                    py: "4px",
                }}>
                <IconImage
                    src={getIconUrl()}
                    alt={game.name}
                    width={48}
                    height={48}
                    sx={{
                        marginTop: '6px',
                        marginRight: '8px',
                        marginBottom: '6px',
                    }}
                />
                <ListItemText
                    disableTypography={true}
                    primary={
                        <Tooltip title={game.name ?? ""} arrow={true}
                                 disableInteractive>
                            <Typography variant="body2" noWrap={true} sx={{
                                fontWeight: 700,
                            }}>{game.name}</Typography></Tooltip>
                    }
                    secondary={
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            <Typography variant="caption" sx={{color: "text.secondary"}}>
                                {game.plugin?.name ?? ""} | {game.completionStatus?.name ?? ""}
                            </Typography>
                            <Typography variant="caption" sx={{color: "text.secondary"}}>
                                <AccessTimeIcon
                                    sx={{fontSize: 12}}/> {formatLocalDate(game.lastActivity)} | {formatPlaytime(game.playtime)}
                            </Typography>
                        </Box>
                    }
                    slotProps={{
                        primary: {
                            sx: {
                                lineHeight: 1.25,
                            },
                        },
                        secondary: {
                            sx: {
                                fontSize: 12,
                                mt: 0.5,
                            },
                        },
                    }}
                    sx={{
                        marginRight: '32px'
                    }}
                />
                <IconImage
                    src={getPluginIconUrl()}
                    alt={game?.plugin?.name || 'Playnite'}
                    title={game?.plugin?.name || 'Playnite'}
                    width={24}
                    height={24}
                    sx={{
                        position: 'absolute',
                        right: '8px',
                        top: '8px',
                    }}
                />
                {game.isFavorite && (
                    <StarRoundedIcon
                        sx={{
                            position: 'absolute',
                            right: '8px',
                            bottom: '8px',
                            fontSize: 24,
                            color: 'warning.main',
                        }}
                    />
                )}
            </ListItemButton>
        </div>
    )
}

type RowData = {
    rows: GameListRow[];
    onSelectGame: (id: number | undefined) => void;
    onToggleGroup: (name: string | undefined | null) => void;
};

interface GameListRow {
    type: ('game' | 'group')
    game?: GameListDTO;
    name?: string;
    groupingOrder?: string;
    count?: number;
    expanded?: boolean;
}

function GameList() {
    const {id} = useParams();
    const filterStore = useFilterStore();
    const collapsedGroups = useGameListStore((state) => state.collapsedGroups);
    const selectedGameId = useGameListStore((state) => state.selectedGameId);
    const gameListStoreAction = useGameListStore((state) => state.actions);

    const navigate = useNavigate();
    const {pathname} = useLocation();

    useEffect(() => {
        const idNumeric = id && Number.parseInt(id);
        if (idNumeric && !Number.isNaN(idNumeric)) {
            gameListStoreAction.setSelectedGameId(idNumeric);
        }
    }, [id, gameListStoreAction]);

    const [debouncedFilter] = useDebouncedValue(filterStore, {
        wait: 300
    });

    const {data: gameList, isLoading, isPlaceholderData, error} = useQueryGames(debouncedFilter);

    const rows = useMemo<GameListRow[]>(() => {
        const result: GameListRow[] = (gameList?.ungroupedResults ?? []).map(game => ({
            type: 'game',
            game
        }));

        const sortedGroups = gameList?.sortedGroups ?? [];
        const groupedResults: Record<string, GameListDTO[]> = gameList?.groupedResults ?? {};

        for (const name of sortedGroups) {
            const games = groupedResults[name];
            if (!games) continue;

            const expanded = !collapsedGroups.has(name);
            result.push({type: 'group', name, groupingOrder: gameList?.groupingOrder, count: games.length, expanded});

            if (expanded) {
                result.push(...games.map(game => ({type: 'game' as const, game})));
            }
        }

        return result;
    }, [gameList, collapsedGroups]);

    const handleSelectGame = useCallback(async (id: number | undefined) => {
        if (id != null) {
            await navigate(`/games/${id}`);
        }
    }, [navigate]);

    useEffect(() => {
        if (isLoading || isPlaceholderData || error || !gameList) return;

        const visibleGames = rows.filter(
            (row): row is GameListRow & { game: GameListDTO } =>
                row.type === 'game' && row.game != null
        );

        if (/^\/games?\/(?:add|edit\/[^/]+)\/?$/.test(pathname)) return;

        if (
            visibleGames.length > 0 &&
            (!selectedGameId || !visibleGames.some((row) => row.game.id === selectedGameId))
        ) {
            void handleSelectGame(visibleGames[0].game.id);
        } else if (selectedGameId) {
            void handleSelectGame(selectedGameId);
        }
    }, [isLoading, isPlaceholderData, error, gameList, rows, selectedGameId, handleSelectGame, pathname]);


    const handleToggleGroup = useCallback((name: string | undefined | null) => {
        if (name != null) {
            gameListStoreAction.toggleCollapsedGroup(name);
        }
    }, [gameListStoreAction]);

    const rowData = useMemo<RowData>(() => ({
        rows,
        onSelectGame: handleSelectGame,
        onToggleGroup: handleToggleGroup,
    }), [rows, handleSelectGame, handleToggleGroup]);

    let loaderNode: ReactNode;
    if (isLoading || isPlaceholderData) {
        loaderNode = (<Box sx={{marginBottom: "12px", width: "100%"}}>
            <LinearProgress sx={{height: "4px"}}/>
        </Box>)
    } else if (error) {
        loaderNode = (<Box sx={{marginBottom: "12px", width: "100%"}}>
            <LinearProgress variant="determinate" color="error" value={100} sx={{height: "4px"}}/>
        </Box>)
    } else {
        loaderNode = (<Box sx={{marginBottom: "16px", width: "100%"}}/>)
    }

    return (<>
            {loaderNode}

            {!!(rowData.rows.length) &&
                (<List
                        style={{minHeight: 0, flex: 1}}
                    rowComponent={GameRow}
                    rowCount={rowData.rows.length}
                    rowHeight={getRowHeight}
                    rowProps={rowData}
                />)
            }</>
    );
}

function AddGameButton() {
    const navigate = useNavigate();
    return (
        <IconButton sx={{
            position: "absolute",
            right: "12px",
            top: "12px",
            fontSize: '32px'
        }}
                    onClick={() =>
                        navigate(`/games/add`)}
        >
            <AddRoundedIcon/>
        </IconButton>
    )
}

export function GameListPane() {
    const searchQuery = useFilterStore((state) => state.name);
    const filterActions = useFilterStore((state) => state.actions);
    const {t} = useTranslation();

    return (
        <Box
            sx={{
                position: 'relative',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
        >

            <Box sx={{p: 1.5, flex: 0}}>
                <Typography variant="h6" sx={{fontWeight: 700, mb: 1}}>
                    {t('game.list.title')}
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        px: 1.25,
                        py: 0.75,
                        borderRadius: 1.5,
                        mb: 1,
                    }}
                >
                    <SearchIcon fontSize="small"/>
                    <InputBase
                        placeholder={t('game.list.searchInLibrary')}
                        sx={{flex: 1, fontSize: 14}}
                        onChange={e => filterActions.setName(e.target.value)}
                        value={searchQuery ?? ''}
                    />
                </Box>
            </Box>

            <Divider/>

            <Box sx={{marginTop: "8px", flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column'}}>
                <GameList/>
            </Box>
            <AddGameButton/>
        </Box>
    )
}