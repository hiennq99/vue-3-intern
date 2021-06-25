<template>
    <div>
        {{title}}
    </div>
    <button @click="$emit('a')">thử </button>
</template>
<script>
import { reactive } from '@vue/reactivity'
export default {
    props:{
        'title':String
    },
    
}
</script>