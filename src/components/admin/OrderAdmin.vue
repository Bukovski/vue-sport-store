<template>
  <div>
    <h4 class="bg-info text-white text-center p-2">Orders</h4>
    
    <div class="form-group text-center">
      <input class="form-check-input" type="checkbox" v-model="showShipped" />
      <label class="form-check-label">Show Shipped Orders</label>
    </div>
    
    <table class="table table-sm table-bordered">
      <thead>
      <tr>
        <th>ID</th><th>Name</th><th>City, Zip</th>
        <th class="text-right">Total</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      
      <tr v-if="displayOrders.length === 0">
        <td colspan="5">There are no orders</td>
      </tr>
      
      <tr
          v-for="order in displayOrders"
          :key="order.id"
      >
        <td>{{ order.id }}</td>
        <td>{{ order.name }}</td>
        <td>{{ `${order.city}, ${order.zip}` }}</td>
        <td class="text-right">{{ getTotal(order) | currency }}</td>
        <td class="text-center">
          <button
            class="btn btn-sm btn-danger"
            @click="shipOrder(order)"
          >
            {{ order.shipped ? 'Not Shipped' : 'Shipped' }}
          </button>
        </td>
      </tr>
      
      </tbody>
    </table>
    
  </div>
</template>

<script>
	import { mapState, mapActions, mapMutations } from "vuex";
	
	
	export default {
		data: function() {
			return {
				showShipped: false
			}
		},
  
		methods: {
			...mapMutations(["changeOrderShipped"]),
			...mapActions(["getOrders", "updateOrder"]),
			getTotal(order) {
				if (order.cartLines != null && order.cartLines.length > 0) {
					return order.cartLines.reduce((total, line) =>
						total + (line.quantity * line.product.price), 0)
				} else {
					return 0;
				}
			},
			shipOrder(order) {
				this.updateOrder(order);
			}
		},
		computed: {
			...mapState({ orders: state => state.orders.orders}),
			displayOrders() {
				return this.showShipped ? this.orders
					: this.orders.filter(order => order.shipped !== true);
			}
		},
		created() {
			this.getOrders();
		}
	}
</script>