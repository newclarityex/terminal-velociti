<script lang="ts" setup>
import TheTitleBarTab from "./TheTitleBarTab.vue";
import { appWindow } from '@tauri-apps/api/window';
import { onMounted, onUnmounted, ref } from 'vue';

const maximized = ref(false);
const focused = ref(true);
const unlistenResize = ref(null as any);
const unlistenFocus = ref(null as any);

onMounted(async () => {
    maximized.value = await appWindow.isMaximized();
    unlistenResize.value = await appWindow.onResized(async () => {
        maximized.value = await appWindow.isMaximized();
    });
    unlistenFocus.value = await appWindow.onFocusChanged(({ payload: focus }) => {
        focused.value = focus;
    });
}); 

onUnmounted(() => {
    unlistenResize.value();
    unlistenFocus.value();
});
</script>

<template> 
<div class="w-full h-15 text-white bg-gradient-to-b from-[#181528] to-[#181528]"
    :class="{
            'text-white/40': !focused
        }">
    <div class="h-7 flex flex-row justify-between items-center">
        <div 
            data-tauri-drag-region
            class="noselect px-4 text-sm">
            Velocity
        </div>
        <div data-tauri-drag-region class="h-full flex-grow"></div>
        <div class="flex flex-row gap-2 px-2">
            <div
                @click="appWindow.minimize"
                class="w-3 h-3 bg-green-500 rounded-full hover:cursor-pointer"
                >
            </div>
            <div
                @click="appWindow.toggleMaximize"
                class="w-3 h-3 bg-yellow-500 rounded-full hover:cursor-pointer"
                >
            </div>
            <div
                @click="appWindow.close"
                class="w-3 h-3 bg-red-500 rounded-full hover:cursor-pointer"
                >
            </div>
        </div>
    </div>
    <div data-tauri-drag-region 
        class="w-full h-8 flex justify-between items-center"
        :class="{
                'text-white/40': !focused
            }">
        <div class="w-full flex flex-row h-full items-center">
            <div class="w-full h-full grid grid-flow-col">
                <TheTitleBarTab text="hello" :active="true" />
                <TheTitleBarTab text="hello" :active="false" />
                <TheTitleBarTab text="hello" :active="false" />
                <TheTitleBarTab text="hello" :active="false" />
                <TheTitleBarTab text="hello" :active="false" />
                <TheTitleBarTab text="hello" :active="false" />
                <TheTitleBarTab text="hello" :active="false" />
            </div>
            <div data-tauri-drag-region class="h-full flex-grow" ></div>
        </div>
    </div>
</div>
</template>