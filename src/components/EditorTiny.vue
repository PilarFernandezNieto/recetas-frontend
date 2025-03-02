<script setup>
import Editor from '@tinymce/tinymce-vue'
</script>
<template>
  <Editor
    api-key="3mwpefylf87qmow9slz4sqdjz7toujobppay56nan6xsqdqp"
    :init="{
      plugins: 'lists link code',
      toolbar: 'undo redo | bold italic underline | bullist numlist | outdent indent link code',
      language_url: '/langs/es.js',
      language: 'es',
    }"
  />
</template>
