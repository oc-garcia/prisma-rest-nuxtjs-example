<template>
  <div>
    <pre>{{ feed }}</pre>
  </div>
</template>

<script lang="ts" setup>
let feed = ref([]);

const { pending, error } = await useLazyAsyncData(
  async () => {
    const getFeed = await fetch(`/api/user`).then((res) => res.json());

    feed.value = getFeed;
  },
  { server: false }
);
</script>

<style></style>
