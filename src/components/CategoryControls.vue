<template>
  <div class="container-fluid">
    
    <div class="row my-2" v-for="categorie in categories" :key="categorie">
      <button
          class="btn btn-block"
          @click="setCurrentCategory(categorie)"
          :class="categorie === currentCategory ? 'btn-primary' : 'btn-secondary'"
      >
        {{ categorie }}
      </button>
    </div>
    
  </div>
</template>

<script>
	import { mapState, mapGetters, mapActions } from "vuex";
	
	
	export default {
		computed: {
			...mapState(["currentCategory"]),
			...mapGetters(["categories"])
		},
		methods: {
			...mapActions(["setCurrentCategory"])
		}
	}
</script>