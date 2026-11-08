import {Button, Checkbox, DialogActions, DialogContent, FormControl, FormControlLabel, TextField} from "@mui/material";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {useFilterStore} from "../../store/useFilterStore.ts";
import type {PanelFilterPresetDTO} from "../../models/objects.ts";
import type {FilterPresetSettingsDTO} from "../../models/filters.ts";

export function SaveFilterPresetDialog({close, disabled, callback}: Readonly<{
    close: () => void;
    disabled: boolean;
    callback: (preset: PanelFilterPresetDTO) => void;
}>) {
    const filterData = useFilterStore((state) => state);
    const [name, setName] = useState<string>("")
    const [saveGroupingAndOrdering, setSaveGroupingAndOrdering] = useState<boolean>(false)
    const [showInFullscreenQuickSelection, setShowInFullscreenQuickSelection] = useState<boolean>(false)

    const {t} = useTranslation();

    const handleAdd = () => {
        if (name) {
            const settings: FilterPresetSettingsDTO = {
                useAndFilteringStyle: filterData.useAndFilteringStyle ?? false,
                isInstalled: filterData.isInstalled ?? false,
                isUninstalled: filterData.isUninstalled ?? false,
                isHidden: filterData.isHidden ?? false,
                isFavorite: filterData.isFavorite ?? false,
                name: filterData.name,
                version: filterData.version,
                releaseYear: filterData.releaseYear,
                genre: filterData.genre,
                platform: filterData.platform,
                publisher: filterData.publisher,
                developer: filterData.developer,
                category: filterData.category,
                tag: filterData.tag,
                series: filterData.series,
                region: filterData.region,
                source: filterData.source,
                ageRating: filterData.ageRating,
                library: filterData.library,
                completionStatuses: filterData.completionStatuses,
                feature: filterData.feature,
                userScore: filterData.userScore,
                criticScore: filterData.criticScore,
                communityScore: filterData.communityScore,
                lastActivity: filterData.lastActivity,
                recentActivity: filterData.recentActivity,
                added: filterData.added,
                modified: filterData.modified,
                playTime: filterData.playTime,
                installSize: filterData.installSize,
            }
            const preset: PanelFilterPresetDTO = {
                name,
                settings,
                sortingOrder: saveGroupingAndOrdering ? filterData.sortingOrder : null,
                sortingOrderDirection: saveGroupingAndOrdering ? filterData.sortingOrderDirection : null,
                groupingOrder: saveGroupingAndOrdering ? filterData.groupingOrder : null,
                showInFullscreenQuickSelection,
            }
            callback(preset);
        }
    }

    return (<>
        <DialogContent sx={{minWidth: '360px'}}>
            <TextField
                    autoFocus
                    required
                    margin="dense"
                    name="name"
                    label={t("common.name")}
                    fullWidth
                    variant="standard"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
            />
            <FormControl fullWidth size="small">
                <FormControlLabel
                        control={<Checkbox checked={saveGroupingAndOrdering}
                                           onChange={(event) => setSaveGroupingAndOrdering(event.target.checked)}/>}
                        label={t("filters.saveGroupingAndOrdering")}
                />
            </FormControl>
            <FormControl fullWidth size="small">
                <FormControlLabel
                        control={<Checkbox checked={showInFullscreenQuickSelection}
                                           onChange={(event) => setShowInFullscreenQuickSelection(event.target.checked)}/>}
                        label={t("library.edit.showInFullscreenQuickSelection")}
                />
            </FormControl>
        </DialogContent>
        <DialogActions>
            <Button onClick={close} sx={{color: 'text.primary'}}>{t("common.cancel")}</Button>
            <Button variant="contained" color="primary" disabled={disabled}
                    onClick={handleAdd}>{t("common.add")}</Button>
        </DialogActions>
    </>)
}