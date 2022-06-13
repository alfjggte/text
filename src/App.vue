<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "APP",
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  position: absolute;
}
::-webkit-scrollbar-thumb {
  background-color: #1890ff;
}
::-webkit-scrollbar-track {
  background-color: #ddd;
}
</style>
