import { ref, onMounted, onUnmounted } from 'vue';
import { appWindow } from '@tauri-apps/api/window'

export function useWindowFocus() {
    const isFocused = ref(true);
    const unlistenFocus = ref(null as any);

    onMounted(async () => {
        unlistenFocus.value = await appWindow.onFocusChanged(({ payload: focus }) => {
            isFocused.value = focus;
        });
    });

    onUnmounted(() => {
        unlistenFocus.value();
    });

    return isFocused;
}

export function useWindowMaximized() {
    const isMaximized = ref(false);
    const unlistenMaximize = ref(null as any);

    onMounted(async () => {
        isMaximized.value = await appWindow.isMaximized();
        unlistenMaximize.value = await appWindow.onResized(async () => {
            isMaximized.value = await appWindow.isMaximized();
        });
    });

    onUnmounted(() => {
        unlistenMaximize.value();
    });

    return isMaximized;
}