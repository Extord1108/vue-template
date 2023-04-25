<template>
  <div>
    <el-button @click="mkdir">创建文件</el-button>
  </div>
</template>
<script setup>
const mkdir = () => {
  window.electron.handleMkdir();
};
</script>
<style scoped lang="less"></style>
