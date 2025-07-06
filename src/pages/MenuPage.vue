<template>
  <div class="px-4 py-6">
    <h2 class="text-2xl font-bold text-gray-800 mb-6">📋 Daftar Seluruh Menu</h2>

    <div v-if="menus.length === 0" class="text-center text-gray-500">
      Belum ada menu yang tersedia.
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="menu in menus"
        :key="menu.id"
        class="bg-white rounded-xl shadow p-4 hover:shadow-lg transition"
      >
        <img
          :src="menu.image || 'https://via.placeholder.com/300x200?text=No+Image'"
          alt="menu.name"
          class="w-full h-40 object-cover rounded"
        />
        <h3 class="mt-2 text-lg font-semibold">{{ menu.name }}</h3>
        <p class="text-sm text-gray-500">Rp {{ menu.price.toLocaleString() }}</p>
        <div v-if="menu.rating" class="text-yellow-400 mt-1">⭐ {{ menu.rating }}</div>
        <div v-else class="text-gray-400 mt-1">Belum ada rating</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const menus = ref([])

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:3000/menus')
    menus.value = res.data
  } catch (err) {
    console.error('Gagal mengambil data menu:', err)
  }
})
</script>
