<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col bg-dark text-white">
          <a class="navbar-brand">SPORTS STORE</a>
        </div>
      </div>
    </div>
    
    <div class="m-2">
      <div class="form-group m-2">
        <label>Name</label>
        <input class="form-control " v-model="$v.name.$model"/>
        
        <validation-error :validation="$v.name" />
      </div>
    </div>
    
    <div class="text-center">
      <router-link class="btn btn-secondary m-1" to="/cart">
        Back
      </router-link>
      
      <button class="btn btn-primary m-1" @click="submitOrder">
        Place Order
      </button>
    </div>
    
  </div>
</template>

<script>
	import { required } from "vuelidate/lib/validators";
	import ValidationError  from "./ValidationError";
	
	
	export default {
		components: { ValidationError },
		data() {
			return {
				name: null
			}
		},
		validations: {
			name: {
				required
			}
		},
		methods: {
			submitOrder() {
				this.$v.$touch();
				// todo: save order
			}
		}
	}
</script>



