<template>
  <div class="code-block-container relative">
    <div class="code-header flex justify-between items-center bg-gray-800 text-white px-4 py-2 text-sm rounded-t-lg">
      <span class="language-label">{{ language }}</span>
      <button
        @click="copyCode"
        class="copy-btn px-1 py-1 rounded text-xs transition-colors flex items-center text-white/50 hover:text-white"
        :class="{ 'bg-green-600/30 text-white': copied }"
        aria-label="Copy code"
      >
        <component :is="copied ? Check : Clipboard" class="w-4 h-4" />
      </button>
    </div>
    <pre class="hljs bg-gray-900 text-white p-4 overflow-x-auto"><code v-html="highlightedCode"></code></pre>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Clipboard, Check } from 'lucide-vue-next';
import hljs from 'highlight.js';

const props = defineProps({
  code: String,
  language: String
});

const copied = ref(false);

const highlightedCode = computed(() => {
  const validLanguage = props.language && hljs.getLanguage(props.language) ? props.language : 'plaintext';
  return hljs.highlight(props.code, { language: validLanguage }).value;
});

const copyCode = async () => {
  await navigator.clipboard.writeText(props.code);
  copied.value = true;
  setTimeout(() => copied.value = false, 2000);
};
</script>
