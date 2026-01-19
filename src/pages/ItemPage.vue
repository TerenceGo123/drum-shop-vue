<template>
    <div class="mb-12">
        <!-- <p>{{ currentItem.category }} -> {{ currentItem.title }} </p> -->
        <div v-if="currentItem" class="flex justify-between mb-14">
            <div class="w-1/2">
                <div class="bg-main-color flex justify-center py-16 rounded-2xl mb-5">
                    <img :src="currentItem.img" alt="">
                </div>
                <div class="grid gap-5 grid-cols-4 h-24">
                    <div class=" bg-main-color rounded-2xl"></div>
                    <div class=" bg-main-color rounded-2xl"></div>
                    <div class=" bg-main-color rounded-2xl"></div>
                    <div class=" bg-main-color rounded-2xl"></div>
                </div>
            </div>
            <div class="w-9/20">
                <div>
                    <div class="mb-5">
                        <img src="/LOGOS/SONOR.png" alt=""> <!-- ДОДЕЛАТЬ -->
                    </div>
                    <h1 class=" text-4xl font-norms-b! mb-2">{{ currentItem.title }}</h1>
                    <div class="flex items-center mb-14">
                        <div class="rating-mini mr-3"> <!-- ДОДЕЛАТЬ -->
                            <span class="star-active"></span>	
                            <span class="star-active"></span>    
                            <span class="star-active"></span>  
                            <span class="star-active"></span>    
                            <span class="star-active"></span>
                        </div>
                        <p class="inline">5.0 РЕЙТИНГ</p>
                    </div>
                </div>
                <h2 v-if="currentItem.oldPrice" class=" text-xl text-stroke-color mb-3 line-through">{{ currentItem.oldPrice }}</h2>
                <h2 class=" text-4xl font-norms-b! mb-14">${{ currentItem.price }}</h2>
                <div class="mb-14">
                    <p class="mb-3">ЦВЕТ: <strong>ЧЕРНЫЙ</strong></p> <!-- ДОДЕЛАТЬ -->
                    <div class="flex ">
                        <div class="h-10 w-10 bg-black mr-3 rounded-full cursor-pointer"></div>
                        <div class="h-10 w-10 bg-gray-400 mr-3 rounded-full cursor-pointer"></div>
                        <div class="h-10 w-10 bg-amber-950 rounded-full cursor-pointer"></div>
                    </div>
                </div>
                <div>
                    <MyButton class="mb-3 w-1/2" :ico="'/ICONS/CardAdd.svg'">Добавить в корзину</MyButton>
                    <div class="flex items-center">
                        <img src="@/assets/DeliveryIco.svg" class="mr-2" alt="">
                        <p>ДОСТАВКА В МОСКВУ ДО 3-Х ДНЕЙ</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <img src="/loader.svg" alt="">
        </div>
        <div v-if="currentItem" class="mb-8">
            <MyTitle>ХАРАКТЕРИСТИКИ</MyTitle>
            <p class="text-xl mb-3">Когда SONOR разрабатывает барабаны, их целью является постоянное улучшение акустического качества в любой конкретной ситуации. При создании SQ1 SONOR тесно сотрудничала с Крисом Коулманом и другими музыкантами SONOR при разработке этой новой серии барабанов. В звукоснимателях серии SQ1 применены те же передовые технологии, что и в корпусах shell.<br><br>В качестве корпуса для SQ1 был выбран корпус birch из-за его характерных высоких частот и четко выраженных низких частотных диапазонов. В ходе слепых тестов SONOR перепробовала множество различных типов корпусов, от чисто березовых до гибридных версий. Чистый березовый снаряд оказался безоговорочным победителем во всех тестовых ситуациях.</p>

            <div class="bg-main-color px-10 py-3 rounded-xl mb-14">
                <div v-for="value,key in descr" class="flex justify-between mb-2 last-of-type:mb-0" >
                    <p>{{ key }}</p>
                    <p>{{ value }}</p>
                </div>
            </div>

            <div>
                <MyTitle>ОТЗЫВЫ</MyTitle>
                <div class="flex justify-between">
                    <div class="flex flex-col w-3/5">
                        <div class="flex mb-8">
                            <div>
                                <img src="@/assets/review1.png" alt="" class="">
                            </div>
                            <div class="w-full">
                                <div class="p-2">
                                    <div class="flex">
                                        <h4 class="font-bold mr-2">Артём Пешков</h4>
                                        &bull;
                                        <p class="text-stroke-color ml-2">Вчера</p>
                                    </div>
                                    <div class="rating-mini mb-2"> <!-- ДОДЕЛАТЬ -->
                                        <span class="star-active"></span>	
                                        <span class="star-active"></span>    
                                        <span class="star-active"></span>  
                                        <span class="star-active"></span>    
                                        <span class="star-active"></span>
                                    </div>
                                    <p class="mb-3">Я недавно приобрел малый барабан Sonor и остался очень доволен. Звучание барабана просто потрясающее — глубокие басы и четкие высокие частоты. Качество сборки на высшем уровне, а хромированное покрытие придает ему привлекательный вид.</p>
                                    <p class="underline">Ответы</p>
                                </div>
                            </div>
                        </div>
                        <div class="flex ">
                            <div>
                                <img src="@/assets/review2.png" alt="" class="">
                            </div>
                            <div class="w-full">
                                <div class="p-2">
                                    <div class="flex">
                                        <h4 class="font-bold mr-2">Антон Грибков</h4>
                                        &bull;
                                        <p class="text-stroke-color ml-2">11.09.2024</p>
                                    </div>
                                    <div class="rating-mini mb-2"> <!-- ДОДЕЛАТЬ -->
                                        <span class="star-active"></span>	
                                        <span class="star-active"></span>    
                                        <span class="star-active"></span>  
                                        <span class="star-active"></span>    
                                        <span class="star-active"></span>
                                    </div>
                                    <p class="mb-3">Недавно приобрел малый барабан Sonor, и он превзошел все мои ожидания! С первого взгляда видно, что это качественный инструмент.</p>
                                    <p class="underline">Ответы</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="w-3/10">
                        <div class="flex justify-between">
                            <div class="rating-mini mb-2"> <!-- ДОДЕЛАТЬ -->
                                <span class="star-active"></span>	
                                <span class="star-active"></span>    
                                <span class="star-active"></span>  
                                <span class="star-active"></span>    
                                <span class="star-active"></span>
                            </div>
                            <p class="text-xl font-norms-b!">5.0</p>
                        </div>
                        <hr class=" border-stroke-color mb-3">
                        <div class="flex items-center justify-between mb-3">
                            <p class="mr-2 w-1/10">5</p>
                            <div class="w-8/10 bg-orange-color h-2 rounded-lg mr-2"></div>
                            <p class="font-norms-b! w-1/10 text-end">28</p>
                        </div> 
                        <div class="flex items-center justify-between mb-3">
                            <p class="mr-2 w-1/10">4</p>
                            <div class="w-8/10  bg-main-color h-2 rounded-lg mr-2"></div>
                            <p class="font-norms-b! w-1/10 text-end">0</p>
                        </div> 
                        <div class="flex items-center justify-between mb-3">
                            <p class="mr-2 w-1/10">3</p>
                            <div class="w-8/10  bg-main-color h-2 rounded-lg mr-2"></div>
                            <p class="font-norms-b! w-1/10 text-end">0</p>
                        </div> 
                        <div class="flex items-center justify-between mb-3">
                            <p class="mr-2 w-1/10">2</p>
                            <div class="w-8/10  bg-main-color h-2 rounded-lg mr-2"></div>
                            <p class="font-norms-b! w-1/10 text-end">0</p>
                        </div> 
                        <div class="flex items-center justify-between mb-3">
                            <p class="mr-2 w-1/10">1</p>
                            <div class="w-8/10 bg-main-color h-2 rounded-lg mr-2"></div>
                            <p class="font-norms-b! w-1/10 text-end">0</p>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
        <MyTitle class="mb-8">ПОХОЖИЕ ТОВАРЫ</MyTitle>
        <list-items :items="sortedSearch"></list-items>
    </div>
</template>

<script setup>
import MyButton from '@/components/UI/MyButton.vue';
import { useDrumDataStore } from '@/stores/DrumData';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import MyTitle from '@/components/UI/MyTitle.vue';
import ListItems from '@/components/ListItems.vue';


const route = useRoute();
const drumStore = useDrumDataStore()

const descr = {
    "Цвет": "Черный",
    "Бренд": "ЧЁРНЫЙ",
    "Страна производства": "USA",
}


const currentId = computed(() => Number(route.params.id))

const currentItem = computed(() => {
  return drumStore.items.find(item => item.id === currentId.value);

});

const sortedSearch = computed(() => {
    return drumStore.items.filter(item => item.category == currentItem.value.category && item.id != currentItem.value.id)
});



</script>

<style lang="scss" scoped>
.rating-mini {
	display: inline-block;
	font-size: 0;
}
.rating-mini span {
	padding: 0;
	font-size: 32px;
	line-height: 1;
	color: var(--color-main-color);
}
.rating-mini > span:before {
	content: '★';
}
.rating-mini > span.star-active {
	color: var(--color-orange-color);
}
</style>