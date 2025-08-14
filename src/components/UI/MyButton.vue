<template>
    <div>
        <button class="my-btn"  :type="type"><slot></slot><img  v-if="ico != ''" :src='ico' alt="" style="margin-left: 8px;" ></button>
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
    background: $orange-color;
    padding: 12px 32px;
    border-radius: 8px;
    border: none;
    color: $orange-dark-color;
    font-size: 20px;
    font-family: TTNormsPro-B;
    margin-bottom: 20px;
}
</style>