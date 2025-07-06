<template>
  <div class="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
    <h2 class="text-2xl font-semibold text-yellow-600 mb-6">📋 Daftar Pemesanan</h2>

    <!-- Daftar Pesanan -->
    <div v-if="orders.length > 0" class="space-y-4">
      <div
        v-for="order in orders"
        :key="order.id"
        class="p-4 border rounded-lg shadow-sm bg-gray-50"
      >
        <div class="flex justify-between items-start">
          <div>
            <p class="text-lg font-semibold text-gray-800">{{ order.qty }}x {{ order.name }}</p>
            <p class="text-sm text-gray-600">Total: Rp {{ order.total.toLocaleString() }}</p>
            <p class="text-xs text-gray-500">Tanggal: {{ formatDate(order.date) }}</p>
            <p class="text-sm mt-1 text-green-600" v-if="order.arrived">✅ Pesanan Sudah Tiba</p>
          </div>
        </div>
      </div>

      <!-- Total Semua Harga -->
      <div class="mt-6 p-4 bg-yellow-50 border border-yellow-300 rounded-lg text-lg font-semibold text-gray-700">
        💰 Total Harga Semua Pesanan: <span class="text-yellow-700">Rp {{ totalHargaSemuaPesanan.toLocaleString() }}</span>
      </div>
    </div>

    <p v-else class="text-gray-500 text-sm">Belum ada pesanan.</p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const orders = ref([])

const fetchOrders = async () => {
  try {
    const res = await axios.get('http://localhost:3000/orders')
    orders.value = res.data
  } catch (err) {
    console.error('Gagal mengambil data pesanan:', err)
  }
}

const formatDate = (iso) => {
  return new Date(iso).toLocaleString('id-ID')
}

const totalHargaSemuaPesanan = computed(() => {
  return orders.value.reduce((sum, order) => sum + order.total, 0)
})

onMounted(() => {
  fetchOrders()
})
</script>
