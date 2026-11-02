import type {SelectOption} from "../inputs/SelectOption.ts";

export type PlatformSpecification = SelectOption<string>

export const PLATFORM_SPECIFICATIONS: PlatformSpecification[] = [
    {
        "name": "3DO Interactive Multiplayer",
        "id": "3do"
    },
    {
        "name": "Adobe Flash",
        "id": "adobe_flash"
    },
    {
        "name": "Amstrad CPC",
        "id": "amstrad_cpc"
    },
    {
        "name": "Apple II",
        "id": "apple_2"
    },
    {
        "name": "Arcade",
        "id": "arcade"
    },
    {
        "name": "Arduboy",
        "id": "arduboy"
    },
    {
        "name": "Atari 2600",
        "id": "atari_2600"
    },
    {
        "name": "Atari 5200",
        "id": "atari_5200"
    },
    {
        "name": "Atari 7800",
        "id": "atari_7800"
    },
    {
        "name": "Atari 8-bit",
        "id": "atari_8bit"
    },
    {
        "name": "Atari Falcon030",
        "id": "atari_falcon030"
    },
    {
        "name": "Atari Jaguar",
        "id": "atari_jaguar"
    },
    {
        "name": "Atari Lynx",
        "id": "atari_lynx"
    },
    {
        "name": "Atari ST/STE",
        "id": "atari_st"
    },
    {
        "name": "Bandai WonderSwan Color",
        "id": "bandai_wonderswan_color"
    },
    {
        "name": "Bandai WonderSwan",
        "id": "bandai_wonderswan"
    },
    {
        "name": "Coleco ColecoVision",
        "id": "coleco_vision"
    },
    {
        "name": "Commodore 64",
        "id": "commodore_64"
    },
    {
        "name": "Commodore Amiga CD32",
        "id": "commodore_amiga_cd32"
    },
    {
        "name": "Commodore Amiga",
        "id": "commodore_amiga"
    },
    {
        "name": "Commodore CBM-5x0",
        "id": "commodore_cbm5x0"
    },
    {
        "name": "Commodore CBM-II",
        "id": "commodore_cbm2"
    },
    {
        "name": "Commodore PET",
        "id": "commodore_pet"
    },
    {
        "name": "Commodore Plus/4",
        "id": "commodore_plus4"
    },
    {
        "name": "Commodore VIC20",
        "id": "commodore_vci20"
    },
    {
        "name": "Fairchild Channel F",
        "id": "fairchild_channelf"
    },
    {
        "name": "GCE Vectrex",
        "id": "vectrex"
    },
    {
        "name": "Macintosh",
        "id": "macintosh"
    },
    {
        "name": "Magnavox Odyssey 2",
        "id": "magnavox_odyssey_2"
    },
    {
        "name": "Mattel Intellivision",
        "id": "mattel_intellivision"
    },
    {
        "name": "Mega Duck",
        "id": "megaduck"
    },
    {
        "name": "Microsoft MSX",
        "id": "microsoft_msx"
    },
    {
        "name": "Microsoft MSX2",
        "id": "microsoft_msx2"
    },
    {
        "name": "Microsoft Xbox 360",
        "id": "xbox360"
    },
    {
        "name": "Microsoft Xbox One",
        "id": "xbox_one"
    },
    {
        "name": "Microsoft Xbox Series",
        "id": "xbox_series"
    },
    {
        "name": "Microsoft Xbox",
        "id": "xbox"
    },
    {
        "name": "NEC PC-88",
        "id": "nec_pc88"
    },
    {
        "name": "NEC PC-98",
        "id": "nec_pc98"
    },
    {
        "name": "NEC PC-FX",
        "id": "nec_pcfx"
    },
    {
        "name": "NEC SuperGrafx",
        "id": "nec_supergrafx"
    },
    {
        "name": "NEC TurboGrafx 16",
        "id": "nec_turbografx_16"
    },
    {
        "name": "NEC TurboGrafx-CD",
        "id": "nec_turbografx_cd"
    },
    {
        "name": "Nintendo 3DS",
        "id": "nintendo_3ds"
    },
    {
        "name": "Nintendo 64",
        "id": "nintendo_64"
    },
    {
        "name": "Nintendo DS",
        "id": "nintendo_ds"
    },
    {
        "name": "Nintendo DSi",
        "id": "nintendo_dsi"
    },
    {
        "name": "Nintendo Entertainment System",
        "id": "nintendo_nes"
    },
    {
        "name": "Nintendo Family Computer Disk System",
        "id": "nintendo_famicom_disk"
    },
    {
        "name": "Nintendo Game & Watch",
        "id": "nintendo_gameandwatch"
    },
    {
        "name": "Nintendo Game Boy Advance",
        "id": "nintendo_gameboyadvance"
    },
    {
        "name": "Nintendo Game Boy Color",
        "id": "nintendo_gameboycolor"
    },
    {
        "name": "Nintendo Game Boy",
        "id": "nintendo_gameboy"
    },
    {
        "name": "Nintendo GameCube",
        "id": "nintendo_gamecube"
    },
    {
        "name": "Nintendo SNES",
        "id": "nintendo_super_nes"
    },
    {
        "name": "Nintendo Switch",
        "id": "nintendo_switch"
    },
    {
        "name": "Nintendo Switch 2",
        "id": "nintendo_switch2"
    },
    {
        "name": "Nintendo Virtual Boy",
        "id": "nintendo_virtualboy"
    },
    {
        "name": "Nintendo Wii U",
        "id": "nintendo_wiiu"
    },
    {
        "name": "Nintendo Wii",
        "id": "nintendo_wii"
    },
    {
        "name": "PC (DOS)",
        "id": "pc_dos"
    },
    {
        "name": "PC (Linux)",
        "id": "pc_linux"
    },
    {
        "name": "PC (Windows)",
        "id": "pc_windows"
    },
    {
        "name": "Sega 32X",
        "id": "sega_32x"
    },
    {
        "name": "Sega CD",
        "id": "sega_cd"
    },
    {
        "name": "Sega Dreamcast",
        "id": "sega_dreamcast"
    },
    {
        "name": "Sega Game Gear",
        "id": "sega_gamegear"
    },
    {
        "name": "Sega Genesis",
        "id": "sega_genesis"
    },
    {
        "name": "Sega Master System",
        "id": "sega_mastersystem"
    },
    {
        "name": "Sega Saturn",
        "id": "sega_saturn"
    },
    {
        "name": "Sega SG-1000",
        "id": "sega_sg1000"
    },
    {
        "name": "Sharp X1",
        "id": "sharp_x1"
    },
    {
        "name": "Sharp X68000",
        "id": "sharp_x68000"
    },
    {
        "name": "Sinclair ZX Spectrum +3",
        "id": "sinclair_zxspectrum3"
    },
    {
        "name": "Sinclair ZX Spectrum",
        "id": "sinclair_zxspectrum"
    },
    {
        "name": "Sinclair ZX81",
        "id": "sinclair_zx81"
    },
    {
        "name": "SNK Neo Geo AES",
        "id": "snk_neogeo_aes"
    },
    {
        "name": "SNK Neo Geo CD",
        "id": "snk_neogeo_cd"
    },
    {
        "name": "SNK Neo Geo Pocket Color",
        "id": "snk_neogeopocket_color"
    },
    {
        "name": "SNK Neo Geo Pocket",
        "id": "snk_neogeopocket"
    },
    {
        "name": "Sony PlayStation 2",
        "id": "sony_playstation2"
    },
    {
        "name": "Sony PlayStation 3",
        "id": "sony_playstation3"
    },
    {
        "name": "Sony PlayStation 4",
        "id": "sony_playstation4"
    },
    {
        "name": "Sony PlayStation 5",
        "id": "sony_playstation5"
    },
    {
        "name": "Sony PlayStation Portable",
        "id": "sony_psp"
    },
    {
        "name": "Sony PlayStation Vita",
        "id": "sony_vita"
    },
    {
        "name": "Sony PlayStation",
        "id": "sony_playstation"
    },
    {
        "name": "Texas Instruments TI-83",
        "id": "ti_83"
    },
    {
        "name": "Thomson MO5",
        "id": "thomson_mo5"
    },
    {
        "name": "Thomson TO7",
        "id": "thomson_to7"
    },
    {
        "name": "TIC-80",
        "id": "tic_80"
    },
    {
        "name": "Uzebox",
        "id": "uzebox"
    },
    {
        "name": "WASM-4",
        "id": "wasm4"
    },
    {
        "name": "Watara Supervision",
        "id": "watara_supervision"
    },
    {
        "name": "Philips CD-i",
        "id": "philips_cdi"
    },
    {
        "name": "Pokémon mini",
        "id": "pokemon_mini"
    }
];