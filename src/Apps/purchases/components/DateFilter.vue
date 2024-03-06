<script>
export default {
    name: 'DateFilter',
    props:["start","end"],
    emits: ['changeDate'],
    beforeMount(){
        this.dateStart = this.start
        this.dateEnd = this.end
    },
    data(){
        return{
            dateStart:"",
            dateEnd:""
        }
    },
    methods:{
        emitDates(){
            this.$emit('change-date', {start: this.dateStart, end: this.dateEnd});
        }
    }
};
</script>
<template>
    <div class="form-floating mx-2">
        <input type="date" id="start" class="form-control" v-model="dateStart">
        <label for="start">Desde:</label>
    </div>
    
    <div class="form-floating mx-2">
        <input type="date" id="end" class="form-control" v-model="dateEnd">
        <label for="start">Hasta:</label>
    </div>
    <button id="search" type="button" class="btn btn-outline-primary" v-on:click="emitDates()">Buscar</button>
</template>

<style>
#search{
    height: 40px;
    align-self: center;
}
</style>