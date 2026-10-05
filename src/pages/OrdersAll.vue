<template>
  <div class="container py-5" v-if="isAdmin">
    <h2 class="board-title text-center mb-4 text-warning">
      All Orders
    </h2>

    <div v-if="ordersStore.loading" class="text-center text-muted">
      Loading orders...
    </div>

    <div v-else class="table-responsive">
      <table class="table table-striped table-dark align-middle text-center">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Email</th>
            <th class="text-start">Products</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="order in ordersStore.orders"
            :key="order._id"
          >
            <!-- ORDER ID -->
            <td class="small">
              {{ order._id }}
            </td>

            <!-- CUSTOMER -->
            <td>
              {{ order.userId?.name || 'N/A' }}
            </td>

            <!-- EMAIL -->
            <td>
              {{ order.userId?.email || 'N/A' }}
            </td>

            <!-- PRODUCTS -->
            <td class="text-start">
              <ul class="list-unstyled mb-0">
                <li
                  v-for="item in order.products"
                  :key="item._id"
                >
                  {{ item.productId?.name || 'Deleted product' }}
                  × {{ item.quantity }}
                </li>
              </ul>
            </td>

            <!-- TOTAL -->
            <td class="text-warning fw-semibold">
              ₱{{ Number(order.totalPrice || 0).toLocaleString() }}
            </td>

            <!-- STATUS -->
            <td>
              <select
                class="form-select form-select-sm bg-dark text-white"
                :value="order.status"
                @change="
                  updateStatus(
                    order._id,
                    $event.target.value
                  )
                "
              >
                <option value="Pending">
                  Pending
                </option>

                <option value="completed">
                  Completed
                </option>

                <option value="abandoned">
                  Abandoned
                </option>

                <option value="draft">
                  Draft
                </option>

                <option value="cancelled">
                  Cancelled
                </option>
              </select>
            </td>

            <!-- DATE -->
            <td class="small">
              {{
                order.orderedOn
                  ? new Date(order.orderedOn).toLocaleString()
                  : 'N/A'
              }}
            </td>

            <!-- ACTIONS -->
            <td class="d-flex gap-2 justify-content-center">
              <button
                class="btn btn-sm btn-outline-warning"
                @click="cancel(order._id)"
                :disabled="order.status === 'cancelled'"
              >
                Cancel
              </button>

              <button
                class="btn btn-sm btn-danger"
                @click="remove(order._id)"
              >
                Delete
              </button>
            </td>
          </tr>

          <tr v-if="!ordersStore.orders.length">
            <td
              colspan="8"
              class="text-center text-muted py-4"
            >
              No orders found
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- ACCESS DENIED -->
  <div v-else class="text-center mt-5 text-white">
    <h3>Access Denied</h3>
    <p>
      You must be an admin to access this page.
    </p>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useOrdersStore } from '../stores/orders'
import { useGlobalStore } from '../stores/global'
import { Notyf } from 'notyf'

const ordersStore = useOrdersStore()
const globalStore = useGlobalStore()
const notyf = new Notyf()

const isAdmin = computed(
  () =>
    globalStore.isLoggedIn &&
    globalStore.user?.isAdmin
)

onMounted(() => {
  if (isAdmin.value) {
    ordersStore.fetchAllOrders()
  }
})

const updateStatus = async (orderId, status) => {
  try {
    await ordersStore.updateOrderStatus(
      orderId,
      status
    )

    notyf.success('Order status updated')
  } catch (error) {
    console.error(error)

    notyf.error(
      error.response?.data?.message ||
      'Failed to update order status'
    )
  }
}

const cancel = async (orderId) => {
  if (
    !confirm(
      'Cancel this order and restore stock?'
    )
  ) {
    return
  }

  try {
    await ordersStore.cancelOrder(orderId)

    notyf.success(
      'Order cancelled and stock restored'
    )
  } catch (error) {
    console.error(error)

    notyf.error(
      error.response?.data?.message ||
      'Failed to cancel order'
    )
  }
}

const remove = async (orderId) => {
  if (
    !confirm(
      'Delete this order permanently?'
    )
  ) {
    return
  }

  try {
    await ordersStore.deleteOrder(orderId)

    notyf.success(
      'Order deleted'
    )
  } catch (error) {
    console.error(error)

    notyf.error(
      error.response?.data?.message ||
      'Failed to delete order'
    )
  }
}
</script>

<style scoped>
h2 {
  font-size: 2.4rem;
  color: #ffd84d;
}

.table td,
.table th {
  vertical-align: middle;
}

select.form-select {
  min-width: 130px;
}
</style>