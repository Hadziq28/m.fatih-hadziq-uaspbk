<template>
  <div class="px-4 py-6">
    <!-- Gambar Toko -->
    <div class="mb-6">
      <img
        src="http://saintpauljember.sch.id/wp-content/uploads/2019/08/kantin.jpg"
        alt="Kantin Digital"
        class="w-full h-60 object-cover rounded-xl shadow-md"
      />
    </div>

    <!-- Menu Populer -->
    <section class="mb-8">
      <h2 class="text-xl font-bold text-gray-800 mb-4">🍛 Menu Populer</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="menu in popularMenus"
          :key="menu.id"
          @click="selectMenu(menu)"
          class="bg-white rounded-xl shadow p-4 cursor-pointer hover:shadow-lg transition"
        >
          <img :src="menu.image || 'https://via.placeholder.com/300x200?text=No+Image'" alt="menu.name" class="w-full h-40 object-cover rounded" />
          <h3 class="mt-2 text-lg font-semibold">{{ menu.name }}</h3>
          <p class="text-sm text-gray-500">Rp {{ menu.price.toLocaleString() }}</p>
          <div v-if="menu.rating" class="text-yellow-400">⭐ {{ menu.rating }}</div>
        </div>
      </div>
    </section>

    <!-- Menu Baru -->
    <section>
      <h2 class="text-xl font-bold text-gray-800 mb-4">🆕 Menu Baru</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="menu in newMenus"
          :key="menu.id"
          @click="selectMenu(menu)"
          class="bg-white rounded-xl shadow p-4 cursor-pointer hover:shadow-lg transition"
        >
          <img :src="menu.image || 'https://via.placeholder.com/300x200?text=No+Image'" alt="menu.name" class="w-full h-40 object-cover rounded" />
          <h3 class="mt-2 text-lg font-semibold">{{ menu.name }}</h3>
          <p class="text-sm text-gray-500">Rp {{ menu.price.toLocaleString() }}</p>
          <div v-if="menu.rating" class="text-yellow-400">⭐ {{ menu.rating }}</div>
        </div>
      </div>
    </section>

    <!-- Detail Menu Modal -->
    <div
      v-if="selectedMenu"
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
      @click.self="selectedMenu = null"
    >
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <img :src="selectedMenu.image || 'https://via.placeholder.com/400x250'" alt="menu.name" class="w-full h-48 object-cover rounded" />
        <h3 class="mt-4 text-xl font-bold">{{ selectedMenu.name }}</h3>
        <p class="text-gray-600">Harga: Rp {{ selectedMenu.price.toLocaleString() }}</p>
        <p v-if="selectedMenu.rating" class="text-yellow-500 mt-1">⭐ Rating: {{ selectedMenu.rating }}</p>

        <!-- Input Rating & Jumlah -->
        <div class="mt-4 space-y-3">
          <div>
            <label class="block text-sm font-medium text-gray-700">Jumlah Pesanan</label>
            <input
              v-model.number="orderQty"
              type="number"
              min="1"
              class="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <!-- Total Harga -->
          <div class="text-gray-800 text-sm mt-1">
            💰 Total Harga: <strong>Rp {{ totalHarga.toLocaleString() }}</strong>
          </div>

          <!-- Rating -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Beri Rating (0.0 - 5.0)</label>
            <input
              v-model.number="newRating"
              type="number"
              step="0.1"
              min="0"
              max="5"
              class="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <!-- Tombol -->
          <div class="flex justify-between gap-2 pt-2">
            <button @click="pesanMenu" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
              Pesan Sekarang
            </button>
            <button @click="submitRating" class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">
              Simpan Rating
            </button>
            <button @click="selectedMenu = null" class="text-gray-500 underline">Tutup</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const popularMenus = ref([])
const newMenus = ref([])
const selectedMenu = ref(null)
const newRating = ref(0)
const orderQty = ref(1)

// Total harga dinamis berdasarkan qty x harga
const totalHarga = computed(() => {
  return selectedMenu.value ? selectedMenu.value.price * orderQty.value : 0
})

const selectMenu = (menu) => {
  selectedMenu.value = menu
  newRating.value = menu.rating || 0
  orderQty.value = 1
}

const submitRating = async () => {
  if (!selectedMenu.value || newRating.value < 0 || newRating.value > 5) return

  try {
    await axios.patch(`http://localhost:3000/menus/${selectedMenu.value.id}`, {
      rating: newRating.value
    })

    selectedMenu.value.rating = newRating.value
    alert('Rating berhasil diperbarui!')
    selectedMenu.value = null
    newRating.value = 0
  } catch (err) {
    alert('Gagal menyimpan rating.')
    console.error(err)
  }
}

const pesanMenu = async () => {
  if (!selectedMenu.value || orderQty.value < 1) return

  try {
    const newOrder = {
      id: Date.now(),
      menuId: selectedMenu.value.id,
      name: selectedMenu.value.name,
      price: selectedMenu.value.price,
      qty: orderQty.value,
      total: totalHarga.value,
      date: new Date().toISOString()
    }

    await axios.post('http://localhost:3000/orders', newOrder)
    alert(`Menu "${selectedMenu.value.name}" berhasil dipesan (${orderQty.value}x)!\nTotal: Rp ${totalHarga.value.toLocaleString()}`)
    selectedMenu.value = null
    newRating.value = 0
    orderQty.value = 1
  } catch (err) {
    alert('Gagal menyimpan pesanan.')
    console.error(err)
  }
}

onMounted(async () => {
  const res = await axios.get('http://localhost:3000/menus')
  const allMenus = res.data

  popularMenus.value = allMenus
    .filter(menu => menu.rating !== undefined)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3)

  newMenus.value = [...allMenus].reverse().slice(0, 3)
})
</script>
