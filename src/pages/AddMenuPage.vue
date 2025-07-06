<template>
  <div class="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
    <h2 class="text-2xl font-semibold mb-4">Tambah Menu Baru</h2>

    <form @submit.prevent="tambahMenu" class="space-y-4">
      <div>
        <label class="block text-sm font-medium">Nama Makanan</label>
        <input
          v-model="menu.name"
          type="text"
          placeholder="Contoh: Sate Ayam"
          class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
          required
        />
      </div>

      <div>
        <label class="block text-sm font-medium">Harga (Rp)</label>
        <input
          v-model.number="menu.price"
          type="number"
          class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
          required
        />
      </div>

      <div>
        <label class="block text-sm font-medium">Link Gambar</label>
        <input
          v-model="menu.image"
          type="url"
          placeholder="https://link-gambar.com/ayam.jpg"
          class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
        />
      </div>

      <div class="flex items-center space-x-2">
        <input type="checkbox" v-model="menu.available" class="form-checkbox text-yellow-500" />
        <label>Tersedia</label>
      </div>

      <button type="submit" class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">
        Simpan Menu
      </button>
    </form>

    <p v-if="successMessage" class="mt-4 text-green-600">{{ successMessage }}</p>
    <p v-if="errorMessage" class="mt-4 text-red-600">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

// State form menu
const menu = ref({
  name: '',
  price: 0,
  available: true,
  image: ''
})

const successMessage = ref('')
const errorMessage = ref('')

// Fungsi submit
const tambahMenu = async () => {
  try {
    await axios.post('http://localhost:3000/menus', menu.value)
    successMessage.value = `Menu "${menu.value.name}" berhasil ditambahkan.`
    errorMessage.value = ''
    menu.value = { name: '', price: 0, available: true, image: '' }
  } catch (err) {
    errorMessage.value = 'Gagal menyimpan menu ke server.'
    successMessage.value = ''
    console.error(err)
  }
}
</script>
