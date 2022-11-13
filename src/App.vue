<script setup lang="ts">
import TheTitleBar from "./components/TheTitleBar.vue";
import { invoke } from '@tauri-apps/api/tauri';
import { onMounted } from "vue";
import { useWindowMaximized } from "./hooks/AppWindow";
import { useSettings } from "./hooks/Settings";

useSettings();
onMounted(async () => {
  console.log(await invoke('run_command', { command: 'Hello World!' }))
});

const maximized = useWindowMaximized();
</script>

<template>
  <div class="w-full h-full">
    <div 
      class="w-full h-full overflow-hidden flex flex-col"
      :class="{
        'border-[1px] border-slate-600/40': !maximized,
      }"
      >
      <TheTitleBar />
      <div class="grow bg-slate-800"></div>
    </div>
  </div>
</template>
