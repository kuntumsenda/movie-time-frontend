<template>
  <footer
    :class="classes.mFooter"
    class="bg-black-300 flex w-screen items-center"
  >
    <div class="container grid grid-cols-3 text-gray-light">
      <div>
        <small>© 2021 MoovieTime. All rights reserved.</small>
      </div>
      <div>
        <img
          src="@/assets/images/MoovieTime-Logo-Grey.svg"
          alt="logo_footer"
          class="mx-auto"
        />
      </div>
      <div class="text-right">
        <small>Made with Nuxt.Js - TailwindCSS</small>
      </div>
    </div>
  </footer>
</template>
<style lang="css" module="classes">
.mFooter {
  font-size: 13px;
  height: 160px;
}
</style>
