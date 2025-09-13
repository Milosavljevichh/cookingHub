<script setup>
    import { defineProps } from 'vue';
    import { RouterLink } from 'vue-router';
    const props = defineProps({
        title: String,
        thumb: String,
        category: String,
        area: String,
        video: String,
        id: String
    })
</script>

<template>
<article class="card">
    <div class="card__img">
        <img :src="thumb" :alt="title">
    </div>
    <div class="card__avatar"><div></div></div>
    <div class="card__title">{{title}}</div>
    <div class="card__subtitle">{{ category }} - {{ area }}</div>
    <div class="card__wrapper">
        <a :href="video" target="_blank"><button class="card__btn">Video</button></a>
        <RouterLink :to="'/recipe/' + id" class="card__btn card__btn-solid">Article</RouterLink>
    </div>
</article>
</template>

<style>
.card {
  --main-color: var(--dark);
  --submain-color: var(--secondary);
  --bg-color:  #fff;
  position: relative;
  width: 100%;
  height: 384px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  background: #fff;
  border: 2px solid var(--primary);
}

.card__img {
  height: 182px;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px 20px 0 0;
}

.card__img img {
  width: 100%;
}

.card__avatar {
  position: absolute;
  width: 94px;
  height: 94px;
  background: var(--bg-color);
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  top: calc(50% - 50px);
}

.card__avatar div {
  width: calc(100% - 50px);
  height: calc(100% - 50px);
  background-image: url('/public/img/heart.png');
  background-size: contain;
  transition: all 0.35s;
}
.card__avatar div:hover {
    cursor: pointer;
  background-image: url('/public/img/heart_full.png');
  background-size: contain;
}

.card__title {
  margin-top: 60px;
  font-weight: 700;
  font-size: 1.2rem;
  color: var(--main-color);
}

.card__subtitle {
  margin-top: 10px;
  font-weight: 400;
  font-size: 1rem;
  color: var(--submain-color);
}

.card__btn {
  margin-top: 15px;
    padding: 6px 12px;
  border: 2px solid var(--main-color);
  border-radius: 4px;
  font-weight: 700;
  font-size: 0.8rem;
  color: var(--main-color);
  background: var(--bg-color);
  text-transform: uppercase;
  transition: all 0.3s;
}

.card__btn:hover{
    cursor: pointer;
}

.card__btn-solid {
  background: var(--main-color);
  color: var(--bg-color);
  margin-left: 18px;
  text-decoration: none;
}

.card__btn:hover {
  background: var(--main-color);
  color: var(--bg-color);
}

.card__btn-solid:hover {
  background: var(--bg-color);
  color: var(--main-color);
}
</style>