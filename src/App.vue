<template>
  <store />
</template>

<script>
	import { mapActions } from "vuex";
	import Store from "./components/Store";
	
	
	export default {
		name: 'app',
		components: { Store },
		methods: {
			...mapActions(["getData"])
		},
		created() {
			this.getData();
		}
	}
</script>