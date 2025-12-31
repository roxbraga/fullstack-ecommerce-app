<script setup>
import axios from 'axios'
import { ref, reactive, computed, onMounted } from 'vue'
import { useGlobalStore } from '../stores/global.js'

const userStore = useUserStore()
const isAdmin = computed(() => userStore.role === 'admin' && userStore.isLoggedIn)

// Products state
const products = ref([])

// Editing state
const editingProduct = ref(null)
const form = reactive({
  name: '',
  description: '',
  price: 0,
  category: '',
  isActive: true
})

// Fetch products from backend
async function fetchProducts() {
  try {
    const res = await axios.get('http://localhost:5000/api/products')
    products.value = res.data
  } catch (err) {
    console.error('Failed to fetch products:', err)
  }
}

// Select product to edit
function editProduct(product) {
  editingProduct.value = product
  form.name = product.name
  form.description = product.description
  form.price = product.price
  form.category = product.category
  form.isActive = product.isActive
}

// Cancel editing
function cancelEdit() {
  editingProduct.value = null
}

// Update product via PATCH
async function updateProduct() {
  if (!editingProduct.value) return

  try {
    // Only send changed fields
    const updates = {}
    if (form.name !== editingProduct.value.name) updates.name = form.name
    if (form.description !== editingProduct.value.description) updates.description = form.description
    if (form.price !== editingProduct.value.price) updates.price = form.price
    if (form.category !== editingProduct.value.category) updates.category = form.category
    if (form.isActive !== editingProduct.value.isActive) updates.isActive = form.isActive

    const res = await axios.patch(
      `http://localhost:5000/api/products/${editingProduct.value._id}`,
      updates
    )

    // Update local table
    const index = products.value.findIndex(p => p._id === editingProduct.value._id)
    if (index !== -1) products.value[index] = res.data.product

    editingProduct.value = null
    alert('Product updated successfully!')
  } catch (err) {
    console.error('Failed to update product:', err)
    alert('Failed to update product')
  }
}

// Fetch products on mount
onMounted(() => {
  if (isAdmin.value) fetchProducts()
})
</script>
