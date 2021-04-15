<template>
    <div>
        <base-manage-item
            v-if="isShow"
            :isEdit="isEdit"
            :editItem="itemEdit"
            @item-show="onIsShow"
            @item-add="addItem"
            @item-edit="editItem"
        ></base-manage-item>
        <base-search
            msg="Studio Ghibli work list "
            :itemAll="titleAll"
            @item-search="ShowItem"
            class="mt-4 pb-3 border-b-2 border-red-300"
        ></base-search>
        <div class="w-full flex flex-row flex-wrap">
            <div v-for="item in itemShow" :key="item.id">
                <item-title :item="item" @item-delete="deleteItem" @item-edit="editOn"></item-title>
            </div>
            <div @click="addOn" class="w-80 flex flex-col items-center mx-5 my-4 cursor-pointer">
                <img src="../assets/addImg.jpg" class="w-80" />
                <p class="truncate text-4xl text-red-900 mt-4 w-80 text-center">Add Title</p>
            </div>
        </div>
    </div>
</template>
<script>
import ItemTitle from '../components/ItemTitle.vue'
export default {
    components: {
        ItemTitle,
    },
    data() {
        return {
            itemShow: [],
            titleAll: [],
            isShow: false,
            isEdit: false,
            itemEdit: [],
            url: "http://localhost:5001/title"
        };
    },
    methods: {
        ShowItem(item) {
            this.itemShow = item
        },
        onIsShow(show) {
            this.isShow = show
        },
        addOn() {
            this.itemEdit = []
            this.isEdit = false
            this.onIsShow(true)
        },
        editOn(item) {
            this.itemEdit = item
            this.isEdit = true
            this.onIsShow(true)
        },
        async fetch() {
            try {
                const res = await fetch(this.url);
                const data = await res.json();
                return data;
            } catch (error) {
                console.log(error);
            }
        },
        async deleteItem(item) {
            try {
                await fetch(`${this.url}/${item.id}`, {
                    method: 'DELETE'
                })
                this.titleAll = this.titleAll.filter((i) => i.id !== item.id)
                this.itemShow = this.itemShow.filter((i) => i.id !== item.id)
            } catch (error) {
                console.log(error)
            }
        },
        async addItem(item) {
            try {
                const res = await fetch(this.url, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: item.name,
                        director: item.director,
                        description: item.description,
                        imgSrc: item.imgSrc,
                        year: item.year,
                    })
                })
                const data = await res.json()
                this.titleAll = [...this.titleAll, data]
                this.itemShow = this.titleAll
            } catch (error) {
                console.log(error)
            }
        },
        async editItem(item) {
            try {
                const res = await fetch(`${this.url}/${item.id}`, {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: item.name,
                        director: item.director,
                        description: item.description,
                        imgSrc: item.imgSrc,
                        year: item.year,
                    })
                })
                const data = await res.json()
                this.titleAll = this.titleAll.map((i) =>
                    i.id === item.id
                        ? {
                            ...i,
                            name: data.name,
                            director: data.director,
                            description: data.description,
                            imgSrc: data.imgSrc,
                            year: data.year,
                        }
                        : i
                )
                this.itemShow = this.titleAll
                this.itemEdit = []
                this.isEdit = false
            } catch (error) {
                console.log(error)
            }
        }
    },
    async created() {
        this.titleAll = await this.fetch()
        this.itemShow = await this.titleAll
    },
}
</script>