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
          {{ product.price }}
        </span>
      </h4>
      <div class="card-text bg-white p-1">{{ product.description }}</div>
    </div>
    
  </div>
</template>

<script>
	import { mapState } from "vuex";
	
	
	export default {
		computed: {
			...mapState([ "products" ])
		}
	}
</script>