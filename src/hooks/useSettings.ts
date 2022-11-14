import { ref } from 'vue';
import { SettingsManager } from 'tauri-settings';
import RobotoMono from '../assets/fonts/RobotoMono-Regular.ttf';

interface Theme {
    name: string;
    default: boolean;
    colors: {
        primary: string;
        secondary: string;
        terminal: string;
        text: string;
    }
}

interface Schema {
    appearance: {
        themes: Theme[],
        currentTheme: number,
        font: {
            url: string,
            name: string,
        },
        fontSize: number,
    }
}

export default function useSettings() {
    const settingsManager = ref<SettingsManager<Schema> | null>(null);

    async function initialize() {
        settingsManager.value = new SettingsManager<Schema>(
            {
                appearance: {
                    themes: [
                        {
                            name: 'Default Dark',
                            default: true,
                            colors: {
                                primary: '#1e1e1e',
                                secondary: '#252526',
                                terminal: '#000000',
                                text: '#d4d4d4',
                            }
                        },
                    ],
                    currentTheme: 0,
                    font: {
                        url: RobotoMono,
                        name: 'Roboto Mono',
                    },
                    fontSize: 14,
                }
            }
        )

        await settingsManager.value.initialize();
        console.log("Settings initialized");
    }

    return {
        settingsManager,
        initialize,
    }
}