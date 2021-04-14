<template>
  <div id="nav" class="w-full h-12 bg-red-400 fixed">
    <div class="w-272 h-12 mx-auto flex flex-row items-center">
      <router-link to="/"><img src="./assets/home.png"></router-link>
      <div class="w-full flex flex-row justify-end items-center text-white text-xl divide-x-2">
        <router-link to="/" class="nav">Home</router-link>
        <router-link to="/about" class="nav">About</router-link>
        <router-link to="/title" class="nav">Title</router-link>
        <router-link to="/gallery" class="nav">Gallery</router-link>
      </div>
    </div>
  </div>
  <router-view />
</template>


