<template>
    <div class="w-80 flex flex-col items-center mx-5 my-4">
        <img :src="item.imgSrc" class="w-80" />
        <p class="truncate text-3xl text-red-900 mt-2 w-80">{{ item.name }}</p>
        <p class="truncate text-xl w-80">Director : {{ item.director }}</p>
        <div class="w-full h-8 flex flex-row text-7xl ">
            <p class="text-xl w-full">Year : {{item.year}}</p>
            <i class="material-icons text-green-600 cursor-pointer" @click="editItem">edit </i>
            <i class="material-icons ml-3 text-red-600 cursor-pointer" @click="deleteItem"> delete </i>
        </div>
    </div>
</template>

<script>
export default {
    props: ["item"],
    emits: ["item-edit","item-delete"],
    data() {
        return {
        };
    },
    methods: {
        editItem(){
            this.$emit("item-edit", this.item);
        },
        deleteItem(){
            this.$emit("item-delete", this.item);
        }
    }
}
</script>