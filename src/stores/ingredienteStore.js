import { defineStore } from 'pinia'
import { ingredientes as ingredientesData } from '../data/ingredientes'
import { ref } from 'vue'

export const useIngredienteStore = defineStore('ingredientes', () => {
  const ingredientes = ref(ingredientesData)


  return {
    ingredientes,
  }
})
