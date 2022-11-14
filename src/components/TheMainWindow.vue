<script setup lang="ts">
import TheTitleBar from "./components/TheTitleBar.vue";
import { invoke } from '@tauri-apps/api/tauri';
import { onMounted } from "vue";
import useWindow from "../hooks/useWindow";
import useSettings from "../hooks/useSettings";

onMounted(async () => {
  console.log(await invoke('run_command', { command: 'Hello World!' }))
});

const { initialize: initializeSettings } = useSettings();
await initializeSettings();

const { initialize: initializeWindow, isMaximized } = useWindow();
await initializeWindow();
</script>

<template>
  <div class="w-full h-full">
      <div 
        class="w-full h-full overflow-hidden flex flex-col"
        :class="{
          'border-[1px] border-slate-600/40': !isMaximized,
        }"
        >
        <!-- <TheTitleBar /> -->
        <div class="grow bg-slate-800"></div>
      </div>
    </div>
</template>
