export const state = () => ({
  products: [],
  error: null,
  errorDiv: false,
  messageDiv: false,
})
export const getters = {
  products: state => state.products,
  error: state => state.error,
  errorDiv: state => state.errorDiv,
  messageDiv: state => state.messageDiv
}
export const mutations = {
  setProducts(state, products) {
    state.products = products
  },
  deleteProducts(state, payload) {
    state.products.splice(state.products.indexOf(payload), 1)
  },
  deleteProductsGroup(state, payload) {
    state.products = state.products.filter(function(prod) {
    return !payload.includes(prod) 
    })
  },
  setError(state, error) {
    state.error = error
    state.errorDiv = true
  },
  clearError(state) {
    state.error = null
    state.errorDiv = false
  },
  setMessage(state) {
    state.messageDiv = true
  },
  clearMessage(state) {
    state.messageDiv = false
  }
}
export const actions = {
  async getProducts({commit}) {
    try {
       await wait()
       if (rejectByChance()) {
        const products = await this.$axios.$get('/products.json') 
        commit('setProducts', products)
       }
       else { throw new Error("Server error") }
   } catch (e) {
      commit('setError', e.message)
    }
  },
  async deleteProducts({commit}, payload) {
    try {
       await wait()
        if (rejectByChance()) {
          if (toString.call(payload) === '[object Array]'){
               commit('deleteProductsGroup', payload)
               commit('setMessage')
          }
          else { commit('deleteProducts', payload)
                 commit('setMessage')
           }
        }
        else { throw new Error("Server error") }
     } catch (e) {
       commit('setError', e.message)
      }
    }
}

 const rejectByChance = () => {return Math.random() >= 0.35}
 const delay = parseInt(Math.random() * 1000)
 const wait = () => {return new Promise(resolve => setTimeout(resolve, delay))}