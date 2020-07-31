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
      <div class="card-text bg-white p-1">
        {{ product.description }}
        
        <button
            class="btn btn-success btn-sm float-right"
            @click="handleProductAdd(product)"
        >
          Add To Cart
        </button>
      </div>
    </div>
    
    <page-controls />
  </div>
</template>

<script>
	import { mapGetters, mapMutations } from "vuex";
	import PageControls from "./PageControls";
	
	
	export default {
		components: { PageControls },
		methods: {
			...mapMutations({ addProduct: "cart/addProduct" }),
			handleProductAdd(product) {
				this.addProduct(product);
				
				this.$router.push("/cart");
			}
		},
		computed: {
			...mapGetters({ products: "processedProducts" })
		}
	}
</script>