<script setup>
const colorMode = useColorMode();
colorMode.preference = "dark";
</script>

<template>
  <div class="dark dark:bg-black">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
