import {Box, Button, Card, CardContent, CircularProgress, Divider, Stack, Typography} from "@mui/material";
import {useNavigate, useParams} from "react-router";
import {useMarkGameAsFavorite, useQueryGameDetails} from "../../hooks/objects.ts";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import {formatInstallSize, formatLocalDate, formatPlaytime} from "../../functions/util.ts";
import ResizableFrame from "../ResizableFrame.tsx";
import * as React from "react";
import IconImage from "../common/IconImage.tsx";
import ImageWithSpinner from "../common/ImageWithSpinner.tsx";
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import {useDialog} from "../../hooks/useDialog.ts";
import {DeleteGameDialog} from "../dialogs/DeleteGameDialog.tsx";
import type {PanelGameDTO} from "../../models/objects.ts";

interface StatCardProps {
    visible: boolean;
    label: string | undefined | null;
    value: string | undefined | null;
}

function StatCard({visible, label, value}: Readonly<StatCardProps>) {
    if (!visible) {
        return null;
    }

    return (
        <Card variant="outlined" sx={{
            p: '12px',
            //TODO color
            flexGrow: 1,
        }}>
            <Typography variant="caption" sx={{color: "text.secondary"}}>
                {label ?? ""}
            </Typography>
            <Typography variant="body1">
                {value ?? ""}
            </Typography>
        </Card>
    )
}

interface DetailsRowProps {
    label: string;
    value: string | number | null | undefined | (string | number | null | undefined)[];
    nodeAtEnd?: React.ReactNode;
}

function DetailsRow({label, value, nodeAtEnd}: Readonly<DetailsRowProps>) {
    const values = Array.isArray(value) ? value : [value];
    const nonNullValues = values.filter((item) => !!item);

    if (!nonNullValues?.length) {
        return null;
    }

    return (<>
        <Stack direction="row" sx={{justifyContent: "space-between"}}>
            <Typography align="left" sx={{fontWeight: 700, color: "text.secondary"}}>{label}</Typography>
            <Stack sx={{alignItems: "flex-end"}}>
                {nonNullValues.map((item) => (
                    <Typography align="right" key={item ?? ""} sx={{color: "text.primary"}}>{item ?? ""}</Typography>
                ))}
            </Stack>
        </Stack>
        {nodeAtEnd}
    </>)
}

function MarkAsFavoriteButton({gameDetails}: Readonly<
    { gameDetails: PanelGameDTO }
>) {
    const favoriteMutation = useMarkGameAsFavorite(gameDetails, !gameDetails.isFavorite);

    return (
        <Button color="warning" variant="contained" onClick={
                                                        () => favoriteMutation.mutate()
                                                    } disabled={favoriteMutation.isPending}>
            {gameDetails.isFavorite ? <StarRoundedIcon/> : <StarBorderRoundedIcon/>}
        </Button>
    )
}

export function GameDetailsPane() {
    const {id} = useParams();
    const navigate = useNavigate();

    const gameId = id ? Number.parseInt(id) : undefined

    const {data: gameDetails, isLoading, error} = useQueryGameDetails(gameId);
    const isCurrentGame = gameDetails?.id === gameId;

    const {openDialog} = useDialog();

    const handleDelete = () => {
        openDialog({
            title: "Delete game",
            render: ({close}) => {
                if (gameDetails == null) {
                    return null;
                }
                return <DeleteGameDialog close={close} game={gameDetails}/>;
            },
        });
    };

    if (isLoading || (gameId !== undefined && !error && !isCurrentGame)) {
        return (
            <Box
                sx={{
                    height: '100%',
                    overflowY: 'auto',
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <CircularProgress enableTrackSlot size="10vh" aria-label="Loading..."/>
            </Box>
        )
    }

    if (!gameDetails || error) {
        return null;
    }

    //TODO placeholder image
    //TODO border
    return (
        <Box
            sx={{
                height: '100%',
                overflowY: 'auto',
            }}
        >
            <Box sx={{
                height: '50vh',
                minHeight: '500px',
                display: 'flex',
                alignItems: 'flex-end',
                backgroundImage: (gameDetails?.id && gameDetails.backgroundImageUrl)
                    ? `linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.6) 25%, transparent 50%), url("${gameDetails.backgroundImageUrl}")`
                    : '',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}>
                <Stack direction="row"
                       sx={{
                           width: "100%",
                           alignItems: 'flex-end',
                       }}>
                    <Box
                        sx={{
                            width: 250,
                            height: 375,
                            flexShrink: 0,
                            m: 1.5,
                            boxShadow: '0 12px 32px rgba(0,0,0,0.5)'
                        }}
                    >
                        <ImageWithSpinner
                            src={gameDetails?.id && gameDetails.coverImageUrl || ''}
                            alt="Cover"
                            width={250}
                            height={375}
                        />
                    </Box>

                    <Box>
                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 800,
                                lineHeight: 1.1,
                                textShadow: '-1px -1px 4px black, -1px 1px 4px black, 1px -1px 4px black, 1px 1px 4px black',
                                minWidth: 0,
                                mb: 1.5,
                            }}
                        >
                            {gameDetails?.name}
                            <IconImage
                                src={gameDetails?.plugin?.id && gameDetails.plugin.iconUrl || "/applogo_dark.png"}
                                alt={gameDetails?.plugin?.name || 'Playnite'}
                                title={gameDetails?.plugin?.name || 'Playnite'}
                                sx={{
                                    display: 'inline-block',
                                    verticalAlign: 'middle',
                                    ml: 1.5,
                                    fontSize: '1em',
                                    width: 48,
                                    height: 48,
                                    flexShrink: 0
                                }}
                            />
                        </Typography>

                        <Stack direction="row" spacing="8px" sx={{
                            mb: 1.5,
                        }}>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<EditRoundedIcon/>}
                                onClick={() => {
                                    navigate(`/games/edit/${gameDetails?.id}`)
                                }}
                                sx={{
                                    px: 3,
                                    py: 1,
                                }}
                            >
                                Edit
                            </Button>

                            <MarkAsFavoriteButton gameDetails={gameDetails}/>

                            <Button color="error" variant="contained" onClick={handleDelete}>
                                <DeleteRoundedIcon/>
                            </Button>
                        </Stack>
                    </Box>
                </Stack>
            </Box>
            <Box sx={{
                p: 3,
            }}>

                <Card
                    sx={{
                        flex: 1,
                    }}
                >
                    <CardContent>
                        <Stack direction="row" spacing="8px" useFlexGap sx={{
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                            p: 1
                        }}>
                            <StatCard
                                visible={!!gameDetails?.source?.name}
                                label="Source"
                                value={gameDetails?.source?.name}/>

                            <StatCard
                                visible={true}
                                label="Last Played"
                                value={formatLocalDate(gameDetails?.lastActivity)}/>

                            <StatCard
                                visible={true}
                                label="Time Played"
                                value={formatPlaytime(gameDetails?.playtime)}/>

                            <StatCard
                                visible={!!gameDetails?.completionStatus?.name}
                                label="Completion"
                                value={gameDetails?.completionStatus?.name}/>

                            <StatCard
                                visible={true}
                                label="Play Count"
                                value={`${gameDetails?.playCount ?? 0} times`}/>
                        </Stack>
                    </CardContent>
                </Card>

                {gameDetails?.links?.length > 0 && <Card
                    sx={{
                        flex: 1,
                        mt: '16px'
                    }}
                >
                    <CardContent>
                        <Typography variant="h6" sx={{fontWeight: 700, mb: 2}}>
                            Links
                        </Typography>
                        <Stack direction="row" useFlexGap spacing="16px" sx={{flexWrap: 'wrap', minWidth: 0}}>
                            {gameDetails?.links?.map((link) => (
                                <Button
                                    key={`${link.name}-${link.url}`}
                                    component="a"
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    variant="outlined"
                                    type="button"
                                    color="info"
                                    size="small"
                                    endIcon={<OpenInNewRoundedIcon fontSize="small"/>}
                                    sx={{maxWidth: '100%', textTransform: 'none', overflowWrap: 'anywhere'}}
                                >
                                    {link.name}
                                </Button>
                            ))}
                        </Stack>
                    </CardContent>
                </Card>}

                <Stack direction="row" spacing={2.5} sx={{mt: 3, width: '100%'}}>
                    <Card
                        sx={{
                            flex: 1,
                            minWidth: '250px',
                            maxWidth: '300px',
                        }}
                    >
                        <CardContent>
                            <Typography variant="h6" sx={{fontWeight: 700, mb: 2}}>
                                Details
                            </Typography>

                            <Stack direction="column" spacing={1.5}>
                                <DetailsRow label="Critic score" value={gameDetails?.criticScore}
                                            nodeAtEnd={<Divider/>}/>
                                <DetailsRow label="Community score" value={gameDetails?.communityScore}
                                            nodeAtEnd={<Divider/>}/>
                                <DetailsRow label="Platform"
                                            value={gameDetails?.platforms?.map((platform) => platform.name)}
                                            nodeAtEnd={<Divider/>}/>
                                <DetailsRow label="Library" value={gameDetails?.plugin?.name} nodeAtEnd={<Divider/>}/>
                                <DetailsRow label="Release date" value={formatLocalDate(gameDetails?.releaseDate)}
                                            nodeAtEnd={<Divider/>}/>
                                <DetailsRow label="Developer"
                                            value={gameDetails?.developers?.map((platform) => platform.name)}
                                            nodeAtEnd={<Divider/>}/>
                                <DetailsRow label="Publisher"
                                            value={gameDetails?.publishers?.map((platform) => platform.name)}
                                            nodeAtEnd={<Divider/>}/>
                                <DetailsRow label="Genre" value={gameDetails?.genres?.map((platform) => platform.name)}
                                            nodeAtEnd={<Divider/>}/>
                                <DetailsRow label="Category"
                                            value={gameDetails?.categories?.map((platform) => platform.name)}
                                            nodeAtEnd={<Divider/>}/>
                                <DetailsRow label="Feature"
                                            value={gameDetails?.features?.map((platform) => platform.name)}
                                            nodeAtEnd={<Divider/>}/>
                                <DetailsRow label="Tag" value={gameDetails?.tags?.map((platform) => platform.name)}
                                            nodeAtEnd={<Divider/>}/>
                                <DetailsRow label="Age rating"
                                            value={gameDetails?.ageRatings?.map((platform) => platform.name)}
                                            nodeAtEnd={<Divider/>}/>
                                <DetailsRow label="Series" value={gameDetails?.series?.map((platform) => platform.name)}
                                            nodeAtEnd={<Divider/>}/>
                                <DetailsRow label="Install size" value={formatInstallSize(gameDetails?.installSize)}
                                            nodeAtEnd={<Divider/>}/>
                            </Stack>
                        </CardContent>
                    </Card>

                    <Card
                        sx={{
                            // bgcolor: 'rgba(255,255,255,0.04)',
                            // border: '1px solid rgba(255,255,255,0.08)',
                            flex: 4
                        }}
                    >
                        <CardContent>
                            <Typography variant="h6" sx={{fontWeight: 700, mb: 2}}>
                                Description
                            </Typography>
                            <Typography variant="body2" sx={{color: 'grey.300', lineHeight: 1.7}}>
                                <ResizableFrame
                                    html={gameDetails?.description}
                                />
                            </Typography>
                        </CardContent>
                    </Card>
                </Stack>
            </Box>
        </Box>
    )
}