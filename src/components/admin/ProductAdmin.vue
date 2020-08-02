<template>
  <div>
    <router-link to="/admin/products/create" class="btn btn-primary my-2">
      Create Product
    </router-link>
    
    <table class="table table-sm table-bordered">
      <thead>
        <th>ID</th>
        <th>Name</th>
        <th>Category</th>
        <th class="text-right">Price</th>
        <th></th>
      </thead>
      
      <tbody>
      <tr
        v-for="product in products"
        :key="product.id"
      >
        <td>{{ product.id }}</td>
        <td>{{ product.name }}</td>
        <td>{{ product.category }}</td>
        <td class="text-right">{{ product.price | currency }}</td>
        <td class="text-center">
          <button
            class="btn btn-sm btn-danger mx-1"
            @click="removeProduct(product)"
          >
            Delete
          </button>
          <button
            class="btn btn-sm btn-warning mx-1"
            @click="handleEdit(product)"
          >
            Edit
          </button>
        </td>
      </tr>
      </tbody>
    
    </table>
    <page-controls />
  </div>
</template>

<script>
	import { mapGetters, mapActions } from "vuex";
	import PageControls from "../PageControls";
	
	
	export default {
		components: { PageControls },
		computed: {
			...mapGetters({
				products: "processedProducts"
			})
		},
		methods: {
			...mapActions(["removeProduct"]),
			handleEdit(product) {
				this.$router.push(`/admin/products/edit/${ product.id }`);
			}
		}
	}
</script>
