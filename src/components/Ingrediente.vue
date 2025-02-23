<script setup>
import { RouterLink } from 'vue-router'
import { computed, inject } from 'vue'
import { useIngredienteStore } from '../stores/ingredienteStore';


const ingredienteStore = useIngredienteStore();

const props = defineProps({
    ingrediente: {
        type: Object,
        required: true,
    },
})

</script>
<template>
    <div
        class="shadow-md p-4 space-y-4 md:grid md:grid-cols-[65%_35%] items-center bg-white justify-between"
    >
        <div class="space-y-2">
            <p class="font-black text-2xl">
                {{ ingrediente.nombre }}
            </p>
            <p class="text-lg">{{ ingrediente.descripcion }}</p>
        </div>
        <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div class="flex justify-center lg:mb-0">
                <img
                    :src="ingrediente.imagen"
                    :alt="ingrediente.nombre"
                    class="w-full lg:w-40 rounded-md"
                />
            </div>
            <div class="flex lg:flex-col justify-between gap-5">
                <a href="/"
            
                    class="bg-indigo-600 text-white py-2 px-4 rounded-md text-center cursor:pointer w-1/2 md:w-full"
                    >Editar</a
                >
                <button
                    class="bg-red-600 text-white py-2 px-4 rounded w-1/2 md:w-full"
                   
                >
                    Eliminar
                </button>
            </div>
        </div>
    </div>
</template>
