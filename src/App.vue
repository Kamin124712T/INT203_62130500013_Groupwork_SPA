<template>
  <div id="nav" class="w-full h-12 bg-red-400 fixed">
    <div class="w-272 h-12 mx-auto flex flex-row items-center">
      <router-link to="/">
        <img src="./assets/home.png" />
      </router-link>
      <div class="w-full flex flex-row justify-end items-center text-white text-xl divide-x-2">
        <router-link to="/" class="nav">Home</router-link>
        <router-link to="/about" class="nav">About</router-link>
        <router-link to="/title" class="nav">Title</router-link>
      </div>
    </div>
  </div>
  <div class="w-full h-full mt-12 -z-10 bg-red-200 bg-no-repeat bg-center fixed opacity-20 bgimg"></div>
  <router-view class="w-272 pt-12 mx-auto"/>
</template>
<style>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
.bgimg {
  background-image: url("./assets/Studio_Ghibli_logo.png");
  background-size: 60%;
}
</style>

