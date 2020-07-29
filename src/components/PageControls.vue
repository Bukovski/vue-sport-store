<template>
  <div class="row mt-2">
    
    <div class="col form-group">
      <select class="form-control" v-on:change="changePageSize">
        <option value="4">4 per page</option>
        <option value="8">8 per page</option>
        <option value="12">12 per page</option>
      </select>
    </div>
    
    <div class="text-right col">
      <div class="btn-group mx-2">
        <button
            class="btn btn-secpmdary"
            v-for="pageNumber in pageNumbers"
            :key="pageNumber"
            :class="{ 'btn-primary': pageNumber === currentPage }"
            @click="setCurrentPage(pageNumber)"
        >
          {{ pageNumber }}
        </button>
      </div>
    </div>
    
  </div>
</template>

<script>
	import { mapState, mapGetters, mapMutations } from "vuex";
	
	
	export default {
		methods: {
			...mapMutations([ "setCurrentPage", "setPageSize" ]),
			changePageSize($event) {
				// count show items page on page
				this.setPageSize(Number($event.target.value));
			}
		},
		computed: {
			...mapState([ "currentPage" ]),
			...mapGetters([ "pageCount" ]),
			pageNumbers() {
				// create and copy new Array
				// this.pageCount = 13 => [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 ]
				return [ ...Array(this.pageCount + 1).keys() ].slice(1);
			}
		},
	}
</script>