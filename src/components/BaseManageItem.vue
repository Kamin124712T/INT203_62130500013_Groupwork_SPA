<template>
    <div class="flex justify-center items-center fixed z-10 inset-0 overflow-y-auto">
        <div class="w-176 h-128 bg-red-300 rounded-3xl shadow-lg">
            <div>
                <p class="h-16 text-5xl text-red-800 font-medium mt-5 ml-10">{{isEdit?'Edit Title':'Add Title'}}</p>
                <form @submit.prevent="submitForm">
                    <div class="flex flex-row">
                        <div>
                            <img :src="imgSrc" class="w-52 ml-6" />
                            <input
                                type="file"
                                class="ml-6 mt-4 w-52 focus:outline-none"
                                @change="uploadImg"
                            />
                        </div>

                        <div class="ml-4 text-xl font-medium w-full mr-4">
                            <div class="flex flex-row mt-1">
                                <label for="name">Name :</label>
                                <input
                                    id="name"
                                    v-model.trim="name"
                                    @blur="validateName"
                                    class="search flex-grow"
                                />
                            </div>
                            <div class="flex flex-row mt-1">
                                <label for="director">Director :</label>
                                <input
                                    id="director"
                                    v-model.trim="director"
                                    class="search flex-grow"
                                />
                            </div>
                            <div class="flex flex-col mt-1">
                                <label for="description">Description</label>
                                <textarea
                                    id="description"
                                    v-model="description"
                                    class="search flex-grow h-40"
                                />
                            </div>
                            <div class="flex flex-row mt-3">
                                <label for="year">Year :</label>
                                <input id="year" v-model.trim="year" type="number" class="search" />
                            </div>
                            <p v-if="invalidName" class="text-red-500">Please enter name!</p>
                        </div>
                    </div>
                    <div class="flex flex-row justify-center w-96 mx-auto mt-2 text-2xl text-white">
                        <button
                            type="submit"
                            class="font-bold py-2 px-3 mr-4 rounded-xl bg-green-600 hover:bg-green-400 focus:outline-none"
                        >Submit</button>
                        <button
                            @click="cancel"
                            class="font-bold py-2 px-3 ml-4 rounded-xl bg-red-600 hover:bg-red-800 focus:outline-none"
                        >Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ["isEdit", "editItem"],
    emits: ["item-edit", "item-add", "is-show"],
    data() {
        return {
            name: this.editItem.name,
            director: this.editItem.director,
            description: this.editItem.description,
            imgSrc: this.editItem.imgSrc ? this.editItem.imgSrc : require('../assets/addImg.jpg'),
            year: this.editItem.year,
            invalidName: false,
        };
    },
    methods: {
        uploadImg(event) {
            const file = event.target.files[0]
            const reader = new FileReader()
            reader.onload = (event) => {
                this.imgSrc = event.target.result;
            };
            reader.readAsDataURL(file);
        },
        validateName() {
            this.invalidName = this.name === ''||this.name === undefined ? true : false
        },
        submitForm() {
            this.validateName()
            if (!this.invalidName) {
                if (!this.isEdit) {
                    this.$emit("item-add", {
                        name: this.name,
                        director: this.director,
                        description: this.description,
                        imgSrc: this.imgSrc,
                        year: this.year,
                    });
                } else {
                    this.$emit("item-edit", {
                        id: this.editItem.id,
                        name: this.name,
                        director: this.director,
                        description: this.description,
                        imgSrc: this.imgSrc,
                        year: this.year,
                    });
                }
                this.cancel();
            }
        },
        cancel() {
            this.name = "",
                this.director = "",
                this.description = "",
                this.imgSrc = require('../assets/addImg.jpg'),
                this.year = "",
                this.$emit("item-show", false)
        },
    }
}
</script>