<template>
  <div class="relative min-h-screen bg-gray-100">
    <!-- Top Navbar -->
    <header class="bg-white shadow-md py-3 px-6 flex justify-between items-center sticky top-0 z-50">
      <div class="flex items-center space-x-4">
        <button @click="toggleSidebar" class="text-2xl text-yellow-600 hover:text-yellow-700">
          &#9776;
        </button>
        <h1 class="text-xl font-bold text-yellow-600">🍽️ Kantin Digital</h1>
      </div>
      <div class="hidden sm:inline-block text-sm text-gray-600 space-x-4">
        <router-link to="/" class="hover:underline">Beranda</router-link>
        <router-link to="/menu" class="hover:underline">Daftar Menu</router-link>
        <router-link to="/order" class="hover:underline">Pemesanan</router-link>
        <router-link to="/add-menu" class="hover:underline">Tambah Menu</router-link>
        <router-link to="/community" class="hover:underline">Komunitas</router-link>
      </div>
    </header>

    <!-- Sidebar Drawer -->
    <transition name="slide">
      <aside
        v-if="sidebarOpen"
        class="fixed top-0 left-0 w-64 h-full bg-yellow-500 text-white shadow-lg z-40 transition-transform duration-300"
      >
        <div class="p-4 font-bold text-xl border-b border-yellow-300">Menu Navigasi</div>
        <nav class="p-4 space-y-3">
          <router-link to="/" class="block px-3 py-2 rounded hover:bg-yellow-600">🏠 Beranda</router-link>
          <router-link to="/menu" class="block px-3 py-2 rounded hover:bg-yellow-600">🍱 Daftar Menu</router-link>
          <router-link to="/order" class="block px-3 py-2 rounded hover:bg-yellow-600">🛒 Pemesanan</router-link>
          <router-link to="/add-menu" class="block px-3 py-2 rounded hover:bg-yellow-600">➕ Tambah Menu</router-link>
          <router-link to="/community" class="block px-3 py-2 rounded hover:bg-yellow-600">💬 Komunitas</router-link>
          <button @click="toggleSidebar" class="mt-6 text-sm underline">Tutup Menu</button>
        </nav>
      </aside>
    </transition>

    <!-- Overlay when sidebar open -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 bg-black bg-opacity-40 z-30"
      @click="closeAllDrawers"
    ></div>

    <!-- Main Content -->
    <main class="pt-6 px-4 md:px-6 lg:px-8">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const sidebarOpen = ref(false)

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}
const closeAllDrawers = () => {
  sidebarOpen.value = false
}
</script>

<style>
.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from, .slide-leave-to {
  transform: translateX(-100%);
}
</style>
