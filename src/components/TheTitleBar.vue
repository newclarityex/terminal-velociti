<script lang="ts" setup>
import TheTitleBarTab from "./TheTitleBarTab.vue";
import { appWindow } from '@tauri-apps/api/window';
import { useWindowFocus, useWindowMaximized } from "../hooks/AppWindow";
import { useSettings } from "../hooks/Settings";
import { onMounted } from "@vue/runtime-core";

const focused = useWindowFocus();
const maximized = useWindowMaximized();
const { settings } = useSettings();
</script>

<template> 
<div class="w-full h-16 noselect" :style="{
    backgroundColor: 
    settings?.appearance?.themes[settings.appearance?.currentTheme]
            .colors
            .primary
}"
    :class="{
            'text-white/40': !focused,
            'text-white/80': focused
        }">
    <div class="h-8 flex flex-row justify-between items-center text-sm">
        <div 
            data-tauri-drag-region
            class="px-4 flex gap-2">
            <img src="../assets/tauri.svg" alt="" width="16" height="16">
            Velocity
        </div>
        <div class="flex h-full">
            <div class="px-2 hover:bg-white/20 hover:cursor-pointer h-full grid place-items-center">
                File
            </div>
            <div class="px-2 hover:bg-white/20 hover:cursor-pointer h-full grid place-items-center">
                Edit
            </div>
            <div class="px-2 hover:bg-white/20 hover:cursor-pointer h-full grid place-items-center">
                View
            </div>
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
        class="w-full h-8 flex justify-between items-center">
        <div class="w-full flex flex-row h-full items-center">
            <div class="w-full h-full grid grid-flow-col grow overflow-hidden">
                <TheTitleBarTab text="hello" :active="true" />
                <TheTitleBarTab text="hello" :active="false" />
                <TheTitleBarTab text="hello" :active="false" />
                <TheTitleBarTab text="hello" :active="false" />
                <TheTitleBarTab text="hello" :active="false" />
                <TheTitleBarTab text="hello" :active="false" />
                <TheTitleBarTab text="hello" :active="false" />
            </div>
            <!-- <div data-tauri-drag-region class="h-full flex-grow" ></div> -->
            <div class="h-full w-24 bg-slate-600">

            </div>
        </div>
    </div>
</div>
</template>