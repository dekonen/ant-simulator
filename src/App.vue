<script setup lang="ts">
import { useDark } from '@vueuse/core';
const isDark = useDark({
  valueDark: 'dark',
  valueLight: 'light',
})
isDark.value = false
</script>

<template>
  <RouterView></RouterView>
</template>

<style scoped></style>
