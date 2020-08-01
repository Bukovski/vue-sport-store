<template>
  <div class="row mt-2">
    
    <div class="col-3 form-group">
      <select class="form-control" v-on:change="changePageSize">
        <option value="4">4 per page</option>
        <option value="8">8 per page</option>
        <option value="12">12 per page</option>
      </select>
    </div>
    
    <div class="text-right col">
      <button
        :disabled="currentPage === 1"
        @click="setCurrentPage(currentPage - 1)"
        class="btn btn-secondary mx -1"
      >
        Previous
      </button>
      <span v-if="currentPage > 4">
        <button class="btn btn-secondary mx-1" @click="setCurrentPage(1)">1</button>
        <span class="h4">...</span>
      </span>
      <span class="mx-1">
        <button
          v-for="pageNumber in pageNumbers" :key="pageNumber"
          class="btn btn-secpmdary"
          :class="{ 'btn-primary': pageNumber === currentPage }"
          @click="setCurrentPage(pageNumber)"
        >
          {{ pageNumber }}
        </button>
      </span>
      <span v-if="currentPage <= pageCount - 4">
        <span class="h4">...</span>
        <button class="btn btn-secondary mx-1" @click="setCurrentPage(pageCount)">
          {{ pageCount}}
        </button>
      </span>
      <button
          class="btn btn-secondary mx-1"
          :disabled="currentPage === pageCount"
          @click="setCurrentPage(currentPage + 1)"
      >
        Next
      </button>
    </div>
  
  </div>
</template>

<script>
	import { mapState, mapGetters, mapActions } from "vuex";
	
	export default {
		methods: {
			...mapActions([ "setCurrentPage", "setPageSize" ]),
			changePageSize($event) {
				this.setPageSize(Number($event.target.value));
			}
		},
		computed: {
			...mapState([ "currentPage" ]),
			...mapGetters([ "pageCount" ]),
			pageNumbers() {
				if (this.pageCount < 4) {
          // create and copy new Array
          // this.pageCount = 13 => [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 ]
					return [ ...Array(this.pageCount + 1).keys() ].slice(1);
				} else if (this.currentPage <= 4) {
					return [ 1, 2, 3, 4, 5 ];
				} else  if (this.currentPage > this.pageCount - 4) {
					// when left only 5 pagination buttons in the end [21, 22, 23, 24, 25] or it is last 5 button in the list buttons
					return [ ...Array(5).keys() ].reverse().map(v => this.pageCount - v);
				} else {
					// when pagination buttons between dots ... 4, 5, 6 ... (5 active button)
					return [ this.currentPage -1, this.currentPage, this.currentPage + 1 ];
				}
			}
		},
	}
</script>