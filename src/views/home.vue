<template>
  <v-header/>
  <v-menu/>
  <!--	<div class="content-box" :class="{ 'content-collapse': sidebar.collapse }">-->
  <!--		<v-tags></v-tags>-->
  <div class="content">
    <router-view v-slot="{ Component }">
      <transition name="move" mode="out-in">
        <div>
          <component :is="Component"></component>
        </div>
      </transition>
    </router-view>
    <!--		</div>-->
  </div>

</template>
<script setup lang="ts">
import vHeader from '../components/header.vue';
import vMenu from '../components/tab-card.vue';

</script>
