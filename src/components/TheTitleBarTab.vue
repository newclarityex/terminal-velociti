<script lang="ts" setup>
const props = defineProps<{
  text: string;
  active: boolean;
}>();
</script>

<template>
    <div class="flex items-center justify-between h-8 px-4"
        :class="{
            'bg-black/30 text-white/50': !props.active,
            'bg-slate-800 text-white': props.active
        }">
        <div>
            {{ props.text }}
        </div>
        <div class="w-2">
            x
        </div>
    </div>
</template>