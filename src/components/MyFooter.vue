<template>
    <div>
        <footer class="footer">
          <img src="@/assets/DrumLogo.svg" alt="">
          <div class="footer__general">
            <p>ОБЩЕЕ</p>
            <p>ГЛАВНАЯ</p>
            <p>О НАС</p>
          </div>
          <div class="footer__categories">
            <p>БАРАБАНЫ</p>
            <p>ПАЛОЧКИ</p>
            <p>ПЕДАЛИ</p>
          </div>
          <div class="footer__contacts">
            <p>КОНТАКТЫ</p>
            <p>КРАСНОДАР, УЛ КРАСНАЯ, 82 /1</p>
            <p>+7 123 456 78 90</p>
          </div>
          <img class="footer__drum" src="@/assets/footerDrum.png" alt="">
      </footer>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
.footer {
  background-color: $main-color;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
  overflow: hidden;
  padding-left: 40px;
  &__drum {
    width: 35%;
  }
}
</style>