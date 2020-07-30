<template>
  <div>
    
    <div
        class="card m-1 p-1 bg-light"
        v-for="product in products"
        :key="product.id"
    >
      <h4>
        {{ product.name }}
        <span class="badge badge-pill badge-primary float-right">
          {{ product.price | currency }}
        </span>
      </h4>
      <div class="card-text bg-white p-1">{{ product.description }}</div>
    </div>
  
    <page-controls />
  </div>
</template>

<script>
	import { mapGetters} from "vuex";
	import PageControls from "./PageControls";
	
	
	export default {
		components: { PageControls },
		computed: {
			...mapGetters({ products: "processedProducts" })
		},
		filters: {
			currency(value) {
				return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
			}
		}
	}
</script>