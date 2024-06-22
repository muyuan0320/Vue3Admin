<template>
  <div :class="['sidebar', { 'is-collapsed': isCollapsed }]">
    <button class="toggle-button" @click="toggleSidebar">{{ isCollapsed ? '展开' : '收起' }}</button>
    <nav v-if="!isCollapsed">
      <!-- 这里可以添加更多导航链接 -->
    </nav>
    <button class="back-button" @click="goBack">返回</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapsed: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed;
    },
    goBack() {
      window.location.href = 'http://localhost:5173/'; // 返回主路由
    }
  }
};
</script>

<style scoped>
.sidebar {
  position: relative;
  width: 200px;
  transition: width 0.3s;
  background-color: #333;
  color: white;
  padding: 20px;
  overflow: hidden;
  height: 100%;
}

.is-collapsed {
  width: 50px;
}

.toggle-button, .back-button {
  display: block;
  margin-bottom: 10px;
  padding: 8px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

nav {
  margin-top: 20px;
}
</style>