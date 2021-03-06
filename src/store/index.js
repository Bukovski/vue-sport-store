import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

import CartModule from './cart';
import OrdersModule from "./orders";
import AuthModule from "./auth";


Vue.use(Vuex);

const baseUrl = "http://localhost:3500";
const productsUrl = `${baseUrl}/products`;
const categoriesUrl = `${baseUrl}/categories`;


export default new Vuex.Store({
  strict: true,
  modules:  {
    cart: CartModule,
    orders: OrdersModule,
    auth: AuthModule
  },
  
  state: {
    categoriesData: [],
    currentPage: 1,
    pageSize: 4,
    currentCategory: "All",
    pages: [],
    serverPageCount: 0,
    searchTerm: "",
    showSearch: false
  },
  
  getters: {
    processedProducts: (state) => state.pages[state.currentPage],
    pageCount: (state) => state.serverPageCount,
    categories: state => [ "All", ...state.categoriesData ],
    productById: (state) => (id) => state.pages[ state.currentPage ].find(page => page.id == id)
  },
  
  mutations: {
    _setCurrentPage(state, page) {
      state.currentPage = page;
    },
    _setPageSize(state, size) {
      state.pageSize = size;
      state.currentPage = 1;
    },
    _setCurrentCategory(state, category) {
      state.currentCategory = category;
      state.currentPage = 1;
    },
    addPage(state, page) {
      for (let i = 0; i < page.pageCount; i++) {
        
        // receive a page of data from the server and add it to the array
        // the object or array to modify, the property or index to assign to, and the value to assign.
        // Using Vue.set ensures that the change is recognized and handled as an update
        Vue.set(
          state.pages,
          page.number + i,
          page.data.slice(i * state.pageSize, (i * state.pageSize) + state.pageSize)
        );
      }
    },
    clearPages(state) {
      state.pages.splice(0, state.pages.length);
    },
    setCategories(state, categories) {
      state.categoriesData = categories;
    },
    setPageCount(state, count) {
      state.serverPageCount = Math.ceil(Number(count) / state.pageSize);
    },
    setShowSearch(state, show) {
      state.showSearch = show;
    },
    setSearchTerm(state, term) {
      state.searchTerm = term;
      state.currentPage = 1;
    },
    _addProduct(state, product) {
      state.pages[state.currentPage].unshift(product);
    },
    _updateProduct(state, product) {
      const page = state.pages[ state.currentPage ];
      const index = page.findIndex(p => p.id == product.id);
      
      Vue.set(page, index, product);
    }
  },
  
  actions: {
    async getData(context) {
      await context.dispatch("getPage", 2);
      
      context.commit("setCategories", (await Axios.get(categoriesUrl)).data);
    },
    async getPage(context, getPageCount = 1) {
      // http://localhost:8080/products?_page=3&_limit=4
      let url = `${ productsUrl }?_page=${ context.state.currentPage }&_limit=${ context.state.pageSize * getPageCount }`;
      
      // http://localhost:8080/products?_page=3&_limit=4&category=Watersports
      if (context.state.currentCategory !== "All") {
        url += `&category=${ context.state.currentCategory }`;
      }
  
      // http://localhost:8080/products?_page=3&_limit=4&category=Soccer&q=car
      if (context.state.searchTerm !== "") {
        url += `&q=${ context.state.searchTerm }`;
      }
      
      const response = await Axios.get(url);
      
      // how many objects are available in order to display the pagination buttons
      //get the value of the header from the response and use it to update the page count
      context.commit("setPageCount", response.headers["x-total-count"]);
      context.commit("addPage", {
        number: context.state.currentPage,
        data: response.data, pageCount: getPageCount
      });
    },
    setCurrentPage(context, page) {
      context.commit("_setCurrentPage", page);
      
      if (!context.state.pages[page]) {
        context.dispatch("getPage");
      }
    },
    setPageSize(context, size) {
      context.commit("clearPages");
      context.commit("_setPageSize", size);
      context.dispatch("getPage", 2);
    },
    setCurrentCategory(context, category) {
      context.commit("clearPages");
      context.commit("_setCurrentCategory", category);
      context.dispatch("getPage", 2);
    },
    search(context, term) {
      context.commit("setSearchTerm", term);
      context.commit("clearPages");
      context.dispatch("getPage", 2);
    },
    clearSearchTerm(context) {
      context.commit("setSearchTerm", "");
      context.commit("clearPages");
      context.dispatch("getPage", 2);
    },
    async addProduct(context, product) {
      const data = (await context.getters.authenticatedAxios.post(productsUrl, product)).data;
      
      product.id = data.id;
      
      this.commit("_addProduct", product);
    },
    async removeProduct(context, product) {
      await context.getters.authenticatedAxios.delete(`${ productsUrl }/${ product.id }`);
      
      context.commit("clearPages");
      context.dispatch("getPage", 1);
    },
    async updateProduct(context, product) {
      await context.getters.authenticatedAxios.put(`${ productsUrl }/${ product.id }`, product);
      
      this.commit("_updateProduct", product);
    }
  },
  
})
