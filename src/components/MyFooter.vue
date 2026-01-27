<template>
    <div>
        <footer class="footer pl-10 max-xl:pl-5 bg-main-color relative max-md:justify-around! max-md:pl-0 max-md:py-4 max-sm:flex-col max-sm:scale-120">
          <img src="@/assets/DrumLogo.svg" alt="" class="mr-5 max-lg:w-1/10 max-sm:w-1/4 max-sm:mb-2 max-sm:mr-0">
          <div class="flex justify-between w-1/3 max-lg:w-2/3 max-sm:hidden">
            <div class="footer__general mr-3">
              <p class="font-bold">ОБЩЕЕ</p>
              <p>ГЛАВНАЯ</p>
              <p>О НАС</p>
            </div>
            <div class="footer__categories mr-3">
              <p class="font-bold">КАТЕГОРИИ</p>
              <p>БАРАБАНЫ</p>
              <p>ПАЛОЧКИ</p>
              <p>ПЕДАЛИ</p>
            </div>
            <div class="footer__contacts">
              <p class="font-bold">КОНТАКТЫ</p>
              <p>КРАСНОДАР, УЛ КРАСНАЯ, 82 /1</p>
              <p>+7 123 456 78 90</p>
            </div>
          </div>
          <img class="footer__drum max-lg:w-1/4 max-md:hidden" src="@/assets/footerDrum.png" alt="">
          <div>
            <p>Все права защищены</p>
            <p class="text-center">© 2025–2026</p>
          </div>
      </footer>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
.footer {
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  &__drum {
    width: 35%;
  }

  p:hover:not(.font-bold) {
    color: #FFBD4A;
    cursor: pointer
  }
}
</style>