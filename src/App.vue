<script setup lang="ts">
import TheTitleBar from "./components/TheTitleBar.vue";
// import { invoke } from '@tauri-apps/api/tauri';
// console.log(await invoke('open_terminal'))
</script>

<template>
  <div class="w-full h-full overflow-hidden flex flex-col">
    <TheTitleBar />
    <div class="grow bg-slate-800"></div>
  </div>
</template>
