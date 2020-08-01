<template>
  <div
      class="row my-2"
      v-if="showSearch"
  >
    <label class="col-2 col-form-label text-right">Search:</label>
    <input
        class="col form-control"
        placeholder="Enter search term..."
        :value="searchTerm"
        @input="doSearch"
    />
    <button
        class="col-1 btn btn-sm btn-secondary mx-4"
        @click="handleClose"
    >
      Close
    </button>
  </div>
</template>

<script>
	import { mapMutations, mapState, mapActions } from "vuex";
	
	
	export default {
		computed: {
			...mapState(["showSearch", "searchTerm"])
		},
		methods: {
			...mapMutations(["setShowSearch"]),
			...mapActions(["clearSearchTerm", "search"]),
			handleClose() {
				this.clearSearchTerm();
				this.setShowSearch(false);
			},
			doSearch($event) {
				this.search($event.target.value);
			}
		}
	}
</script>