<template>
  <div v-if="pageCount > 1" class="text-right">
    <div class="btn-group mx-2">
      <button
          class="btn btn-secpmdary"
          v-for="pageNumber in pageNumbers"
          :key="pageNumber"
          :class="{ 'btn-primary': pageNumber === currentPage }"
      >
        {{ pageNumber }}
      </button>
    </div>
  </div>
</template>

<script>
	import { mapState, mapGetters } from "vuex";
	
	
	export default {
		computed: {
			...mapState([ "currentPage" ]),
			...mapGetters([ "pageCount" ]),
			pageNumbers() {
				// create and copy new Array
				// this.pageCount = 13 => [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 ]
				return [ ...Array(this.pageCount + 1).keys() ].slice(1);
			}
		}
	}
</script>