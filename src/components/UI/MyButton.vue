<template>
    <div>
        <button class="my-btn bg-orange-color text-orange-dark-color transition-colors hover:bg-radial hover:from-orange-color  hover:to-orange-400/50 sm:text-xl   "  :type="type"><slot></slot><img  v-if="ico != ''" :src='ico' alt="" style="margin-left: 8px;" ></button>
    </div>
</template>

<script setup>
const props = defineProps({
    type: {
        type: String,
        default: 'button',
        validator: (value) => ['button', 'submit', 'reset'].includes(value)
    },
    ico: {
        type: String,
        default: ""
    }
}) 
</script>

<style lang="scss" scoped>
.my-btn {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 12px 32px;
    border-radius: 8px;
    border: none;
    font-family: TTNormsPro-B;
    text-transform: uppercase;
}
</style>