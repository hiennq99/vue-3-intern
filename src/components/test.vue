<template >
    <div>
        aadd
    <test-1 @a='a()'></test-1>
    </div>
</template>
<script>
import { reactive } from '@vue/reactivity'
import test1 from './test1.vue'
export default {
    methods: {
        a(){
            console.log("sssss")
        }
    },
    components: {
        test1,
    },
    setup(){
        const data=reactive({
            name:'a',
            size:1
        })
        return {
            data,
        }
    }
}
</script>