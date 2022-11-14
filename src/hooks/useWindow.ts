import { ref, onUnmounted } from 'vue';
import { appWindow } from '@tauri-apps/api/window'

export default function useWindow() {
    const isMaximized = ref(false);
    const unlistenMaximize = ref<null | Function>(null);
    const isFocused = ref(true);
    const unlistenFocus = ref<null | Function>(null);

    async function initialize() {
        isMaximized.value = await appWindow.isMaximized();
        unlistenMaximize.value = await appWindow.onResized(async () => {
            isMaximized.value = await appWindow.isMaximized();
        });
        unlistenFocus.value = await appWindow.onFocusChanged(({ payload: focus }) => {
            isFocused.value = focus;
        });
    }

    onUnmounted(() => {
        if (unlistenMaximize.value) {
            unlistenMaximize.value();
        }
        if (unlistenFocus.value) {
            unlistenFocus.value();
        }
    });

    return {
        isMaximized,
        isFocused,
        initialize,
    };
}