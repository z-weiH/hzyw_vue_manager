<template>
    <el-button :round="round" :type="type" :disabled="buttonDisabled()" :size="size" @click="HanldeBtnClick" :plain="plain">
        <slot>{{text}}</slot>
    </el-button>
</template>

<script>
    export default {
        name: 'customerButton',
        props:{
            text: {
                type: String,
                default: ''
            },
            type: {
                type: String,
                default: ''
            },
            round: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            size:{
                type:String,
                default: 'medium '
            },
            plain:{
              type: Boolean,
              default: false
            }
        },
        data(){
            return {
                disabled1: false
            }
        },
        methods:{
            HanldeBtnClick(){
                if(!this.disabled1){
                    this.disabled1 = true;
                    setTimeout(() => {
                        this.disabled1 = false;
                    },1000);
                    this.$emit('click');
                }
            },
            buttonDisabled(){
                return this.disabled || this.disabled1;
            }
        },
        mounted(){
        }
    }
</script>

<style scoped>

</style>
