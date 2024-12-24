<script lang="ts" setup>
const navHeader = [
  {
    label: "CATEGORIES",
    icon: "mdi:view-grid",
    items: [
      { label: "ACTION" },
      { label: "ADVENTURE" },
      { label: "ANIMATION" },
      { label: "COMEDY" },
      { label: "CRIME" },
      { label: "DOCUMENTARY" },
      { label: "DRAMA" },
      { label: "FAMILY" },
      { label: "FANTASY" },
      { label: "HISTORY" },
      { label: "HOROR" },
    ],
  },
  {
    label: "MOVIES",
  },
  {
    label: "TV SHOWS",
  },
];
</script>
<template>
  <header
    :class="classes.mHeader"
    class="fixed top-0 left-0 w-screen flex items-center"
  >
    <div class="container flex items-center justify-space-between gap-4">
      <div class="flex items-center gap-9">
        <img src="@/assets/images/MoovieTime-Logo.svg" />
        <MAutoComplete
          :class="classes.searchInput"
          block
          placeholder="Find Movie"
        >
          <template #prepend>
            <MIcon name="mdi:movie" color="#494c51" />
          </template>
          <template #append>
            <MIcon name="mdi:search" />
          </template>
        </MAutoComplete>
      </div>
      <nav class="text-sm">
        <ul class="flex flex-wrap items-center gap-9">
          <li
            v-for="(nav, index) in navHeader"
            :key="index"
            class="flex items-center gap-3"
          >
            <MIcon v-if="nav.icon" :name="nav.icon" class="text-xl" />
            <span>{{ nav.label }}</span>
          </li>
          <li>LOGIN</li>
        </ul>
      </nav>
    </div>
  </header>
</template>
<style lang="css" module="classes">
.mHeader {
  background: rgba(255, 255, 255, 0.05);
  height: 66px;
  z-index: 100;
}
.searchInput {
  min-width: 571px;
}
</style>
