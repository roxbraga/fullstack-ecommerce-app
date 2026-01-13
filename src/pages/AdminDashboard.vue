<template>
  <div class="container py-4">

    <h2 class="board-title text-center mb-3 text-warning">
      Admin Dashboard
    </h2>

    <!-- STATS -->
    <div class="row g-3 mb-3">
      <div class="col-md-3 col-sm-6" v-for="card in stats" :key="card.label">
        <div class="stat-card">
          <p class="stat-label">{{ card.label }}</p>
          <h3 class="stat-value" :class="card.color">{{ card.value }}</h3>
          <small class="stat-meta" :class="card.trendColor">
            {{ card.trend }}
          </small>
        </div>
      </div>
    </div>

    <!-- LOW STOCK (MOVED UP) -->
    <div class="glass-card mb-3">
      <h6 class="card-title text-warning mb-2">
        Low Stock Alerts
      </h6>

      <div class="d-flex flex-wrap gap-2">
        <div
          v-for="item in lowStock"
          :key="item.name"
          class="low-stock-item"
        >
          <span class="low-stock-name">
            {{ item.name }}
          </span>

    <span class="low-stock-count">
      {{ item.stock }} left
    </span>
  </div>
</div>

    </div>

    <!-- CHART + TOP SELLERS -->
    <div class="row g-3">

      <!-- SALES GRAPH -->
      <div class="col-lg-7">
        <div class="glass-card chart-card">
          <h6 class="card-title text-warning mb-2">
            Sales Overview
          </h6>
          <canvas ref="salesChart"></canvas>
        </div>
      </div>

      <!-- TOP SELLERS -->
      <div class="col-lg-5">
        <div class="glass-card chart-card">
          <h6 class="card-title text-warning mb-2">
            Top Selling Products
          </h6>

          <ul class="list-unstyled top-list">
            <li v-for="p in topProducts" :key="p.name">
              <div>
                <strong>{{ p.name }}</strong>
                <small class="sold-text">
                  {{ p.sold }} sold
                </small>
              </div>
              <span class="text-warning fw-bold">
                ₱{{ p.revenue.toLocaleString() }}
              </span>
            </li>
          </ul>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Chart from 'chart.js/auto'

const salesChart = ref(null)

const stats = [
  {
    label: 'Total Revenue',
    value: '₱1,245,300',
    trend: '+12% vs last month',
    color: 'text-warning',
    trendColor: 'text-success'
  },
  {
    label: 'Total Orders',
    value: '1,238',
    trend: '+6%',
    color: '',
    trendColor: 'text-success'
  },
  {
    label: 'Net Profit',
    value: '₱412,000',
    trend: '+9%',
    color: '',
    trendColor: 'text-success'
  },
  {
    label: 'Low Stock Items',
    value: '5',
    trend: 'Needs attention',
    color: 'text-danger',
    trendColor: 'text-danger'
  }
]

const topProducts = [
  { name: 'Bumper', sold: 124, revenue: 826664 },
  { name: 'Performance Wheels', sold: 98, revenue: 777771 },
  { name: 'Carbon Fiber Hood', sold: 86, revenue: 99999 },
  { name: 'Racing Steering Wheel', sold: 72, revenue: 111111 }
]

const lowStock = [
  { name: 'Brake Kit', stock: 3 },
  { name: 'Engine Dress-Up Kit', stock: 4 },
  { name: 'Exhaust System', stock: 2 }
]

onMounted(() => {
  new Chart(salesChart.value, {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          data: [12000, 15000, 11000, 18000, 22000, 19500, 25000],
          borderColor: '#ffc107',
          backgroundColor: 'rgba(255,193,7,.15)',
          tension: .4,
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: { ticks: { color: '#aaa' } },
        y: { ticks: { color: '#aaa' } }
      }
    }
  })
})
</script>

<style scoped>
.board-title {
  font-size: 2.2rem;
}

/* STATS */
.stat-card {
  background: rgba(0,0,0,.55);
  border-radius: 14px;
  padding: 1.1rem;
  border: 1px solid rgba(255,193,7,.35);
}

.stat-label {
  font-size: .75rem;
  color: #aaa;
}

.stat-value {
  font-size: 1.6rem;
  font-weight: 700;
}

.stat-meta {
  font-size: .7rem;
}

/* GLASS */
.glass-card {
  background: rgba(0,0,0,.55);
  border-radius: 16px;
  padding: 1rem;
  border: 1px solid rgba(255,193,7,.25);
}

/* SMALLER CHARTS */
.chart-card {
  height: 260px;
}

canvas {
  max-height: 180px;
}

/* TOP SELLERS */
.top-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .45rem 0;
  border-bottom: 1px solid rgba(255,255,255,.05);
}

.sold-text {
  display: block;
  font-size: .7rem;
  color: #ffc107;
}

/* LOW STOCK */
.low-stock-item {
  background: rgba(255, 0, 0, 0.12);
  padding: .65rem 1rem;
  border-radius: 12px;
  min-width: 200px;
  border: 1px solid rgba(255, 0, 0, 0.35);

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: .75rem;
}

.low-stock-name {
  font-weight: 600;
  color: #fff;
  font-size: .85rem;
}

.low-stock-count {
  font-size: .75rem;
  font-weight: 700;
  color: #ff4d4f;
  white-space: nowrap;
}


/* RESPONSIVE */
@media (max-width: 768px) {
  .chart-card {
    height: auto;
  }

  canvas {
    max-height: 200px;
  }
}
</style>
