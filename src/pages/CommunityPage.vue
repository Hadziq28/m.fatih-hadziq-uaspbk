<template>
  <div class="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg">
    <h2 class="text-2xl font-bold text-yellow-600 mb-3">💬 Komunitas Kantin</h2>
    <p class="text-gray-600 mb-4">Berbagi cerita & rekomendasi makanan favoritmu!</p>

    <!-- Form Pengirim -->
    <div class="flex flex-col sm:flex-row gap-3 items-stretch mb-6">
      <input
        v-model="username"
        type="text"
        placeholder="Nama Anda"
        class="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-yellow-400"
      />
      <input
        v-model="pesan"
        type="text"
        placeholder="Tulis pesan kamu..."
        class="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-yellow-400"
      />
      <button
        @click="kirim"
        class="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded-md"
      >
        Kirim
      </button>
    </div>

    <!-- Chat Bubble -->
    <div v-if="diskusi.length" class="space-y-4 max-h-[400px] overflow-y-auto px-1">
      <div
        v-for="chat in diskusi"
        :key="chat.id"
        class="flex flex-col bg-yellow-50 p-4 rounded-lg shadow border border-yellow-200"
      >
        <div class="flex justify-between items-center mb-1">
          <span class="font-semibold text-yellow-700">{{ chat.username }}</span>
          <span class="text-xs text-gray-500">{{ formatDate(chat.timestamp) }}</span>
        </div>
        <p class="text-gray-800">{{ chat.message }}</p>
      </div>
    </div>

    <p v-else class="text-gray-400 italic">Belum ada pesan, jadi yang pertama berbagi!</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const username = ref('')
const pesan = ref('')
const diskusi = ref([])

const fetchChats = async () => {
  try {
    const res = await axios.get('http://localhost:3000/chats')
    diskusi.value = res.data
  } catch (err) {
    console.error('Gagal mengambil data chat:', err)
  }
}

const kirim = async () => {
  if (!username.value.trim() || !pesan.value.trim()) return

  const newChat = {
    id: Date.now(),
    username: username.value.trim(),
    message: pesan.value.trim(),
    timestamp: new Date().toISOString()
  }

  try {
    await axios.post('http://localhost:3000/chats', newChat)
    diskusi.value.push(newChat)
    pesan.value = ''
  } catch (err) {
    console.error('Gagal mengirim pesan:', err)
  }
}

const formatDate = (iso) => new Date(iso).toLocaleString('id-ID')

onMounted(fetchChats)
</script>
