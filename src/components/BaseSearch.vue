<template>
    <div class="flex flex-row items-center">
        <span class="w-full text-5xl text-red-800 font-medium">{{ msg }}</span>
        <div class="flex flex-row justify-end">
            <input
                type="text"
                placeholder="Search..."
                v-model="inputSearch"
                @keyup.enter="searchItem"
                class="search"
            />
            <i class="material-icons text-right text-3xl text-red-500 hover:text-red-900 ml-2 cursor-pointer" @click="searchItem">search</i>
        </div>
    </div>
</template>

<script>

export default {
    props: ["msg", "itemAll"],
    emits: ["item-search"],
    data() {
        return {
            inputSearch: "",
            itemSearch:[]
        };
    },
    methods: {
        searchItem(){
            this.itemSearch = this.itemAll.filter( i => i.name.concat(i.title).toLowerCase().includes(this.inputSearch.toLowerCase())||i.name.concat(i.description).concat(i.director).concat(i.year).toLowerCase().includes(this.inputSearch.toLowerCase()))
            this.$emit("item-search", this.itemSearch);
        }
    },
};
</script>