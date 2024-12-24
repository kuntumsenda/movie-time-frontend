<script lang="ts" setup>
const router = useRouter();
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
    route: "/movie",
  },
  {
    label: "TV SHOWS",
  },
];
</script>
<template>
  <header
    :class="classes.mHeader"
    class="fixed top-0 left-0 w-screen flex items-center bg-bgHeader py-4 md:py-0"
  >
    <div class="container md:flex items-center justify-between gap-4">
      <div class="flex items-center gap-9 w-full">
        <img
          src="@/assets/images/MoovieTime-Logo.svg"
          class="cursor-pointer"
          @click="router.push('/')"
        />
        <div :class="classes.searchInput" class="w-full">
          <MAutoComplete block placeholder="Find Movie">
            <template #prepend>
              <MIcon name="mdi:movie" color="#494c51" />
            </template>
            <template #append>
              <MIcon name="mdi:search" />
            </template>
          </MAutoComplete>
        </div>
      </div>
      <nav class="text-sm mt-5 md:mt-0">
        <ul class="flex items-center gap-9">
          <div v-for="(nav, index) in navHeader" :key="index">
            <li
              v-if="nav.route"
              class="flex items-center gap-3 cursor-pointer"
              @click="router.push(nav.route)"
            >
              <span>{{ nav.label }}</span>
            </li>
            <li v-else class="flex items-center gap-3 cursor-pointer">
              <MIcon v-if="nav.icon" :name="nav.icon" class="text-xl" />
              <span class="whitespace-nowrap">{{ nav.label }}</span>
            </li>
          </div>
          <li>LOGIN</li>
        </ul>
      </nav>
    </div>
  </header>
</template>
<style lang="css" module="classes">
.mHeader {
  height: 108px;
}
@media screen and (min-width: 768px) {
  .mHeader {
    height: 66px;
  }
}

.searchInput {
  max-width: 571px;
}
</style>
