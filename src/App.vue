<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="flex h-screen flex-col justify-between">
    <main>
      <component :is="$route.meta.layout || 'div'">
        <RouterView />
      </component>
    </main>
  </div>
</template>