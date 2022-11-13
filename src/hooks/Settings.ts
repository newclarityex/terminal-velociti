import { onMounted, onUnmounted, ref } from 'vue';
import { SettingsManager, getAll } from 'tauri-settings';
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

export function useSettings() {
    const settingsManager = ref<SettingsManager<Schema> | null>(null);
    const settings = ref<null | Schema>(null);

    onMounted(async () => {
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
        const initial = (await getAll<Schema>(settingsManager.value)).settings;

        settings.value = new Proxy(initial, {
            get(target, name: keyof Schema, reciever) {
                if (!settingsManager.value) return;

                if (name in target) {
                    target[name] = settingsManager.value.getCache(name);
                }

                return Reflect.get(target, name, reciever);
            },
            set<K extends keyof Schema>(target: Schema, name: K, value: Schema[K], reciever: any) {
                if (!settingsManager.value) return false;

                if (name in target) {
                    settingsManager.value.setCache(name, value);
                    settingsManager.value.syncCache();
                    target[name] = value;
                }
                Reflect.set(target, name, value, reciever);
                return true;
            }
        });
    });



    return {
        settings
    }
}