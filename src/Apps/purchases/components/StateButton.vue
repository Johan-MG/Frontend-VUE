<script>
export default {
    name: 'StateButton',
    props:["index","id","state"],
    data(){
        return{
            options:{
                PENDING: "Pendiente",
                PAID: "Pagado"
            }
        }
    },
    methods:{
        ChangeStatus(status){
            this.$refs.dropdownButton.click();
            this.$emit('change-status', {state: status, index: this.index, id:this.id});
        }
    },
    computed:{
        buttonClass:function () {
            const status = {
                "PENDING": "btn btn-warning dropdown-toggle",
                "PAID": "btn btn-success dropdown-toggle"
            }
            return status[this.state]
        },
        nameMaped:function(){
            try{
                return this.options[this.state]
            }catch(e){
                return "Otro"
            }
        }
    }
}

</script>
<template>
    <div class="btn-group d-grid">
        <button :class="buttonClass" ref="dropdownButton" data-bs-toggle="dropdown" aria-expanded="false">
        {{ nameMaped }}
        </button>
        <ul class="dropdown-menu" id="stateDropdown">
            <li v-for="(value, key, index) in options" :key="index">
                <a class="dropdown-item" @click="ChangeStatus(key)">{{ value }}</a>
            </li>
        </ul>
    </div>
</template>