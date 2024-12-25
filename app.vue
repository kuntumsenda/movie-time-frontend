<script setup>
const colorMode = useColorMode();
colorMode.preference = "dark";
</script>

<template>
  <div class="dark dark:bg-black">
    <NuxtLayout>
      <NuxtLoadingIndicator color="#348feb" height="5" style="z-index: 100" />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
