<script setup>
import { RouterLink } from 'vue-router'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
  type: {
    type: String,
    default: 'button',
  },
  to: {
    type: String,
    default: '',
  },
})
const goBack = () => {
  if(props.to){
    router.push(props.to)
  } else {
    router.go(-1)
  }
}
</script>

<template>
  <button
    @click = "goBack"
    class="inline-flex items-center justify-center px-4 py-2 bg-white border border-amber-700 rounded-md font-semibold text-xs text-amber-700 hover:text-white uppercase tracking-widest  hover:bg-amber-700 0 focus:outline-none  disabled:opacity-25 transition ease-in-out duration-150"
  >
    <slot />
  </button>
</template>
