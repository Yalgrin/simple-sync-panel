import {IconButton, useColorScheme} from "@mui/material";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export default function ThemeToggle() {
    const {mode, setMode} = useColorScheme();

    return (
        <IconButton color="primary" aria-label="switch theme"
                    disabled={!mode}
                    onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}>
            {mode === 'dark' ? <DarkModeIcon/> : <LightModeIcon/>}
        </IconButton>
    );
}