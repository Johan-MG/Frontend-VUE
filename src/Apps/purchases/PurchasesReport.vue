<script>
import 'datatables.net-select'
import 'datatables.net-responsive-bs5'
import 'vue3-toastify/dist/index.css'
import NewPurchaseModalVue from './components/NewPurchaseModal.vue'
import StateButton from './components/StateButton.vue'
import DateFilter from './components/DateFilter.vue'
import {backendRequest} from '../../utils/request'

export default {
    beforeMount(){
        this.setDates()
    },
    async mounted(){
        this.getPurchases()
    },
    components:{
        NewPurchaseModalVue,
        StateButton,
        DateFilter
    },
    data(){
        return{
            purchases:[],
            personToFilter: "Todos",
            start:"",
            end:""
        }
    },
    methods:{
        async ChangeStatus(data){
            const {state, index, id} = data
            this.purchasesFiltered[index].status = state
            const purchase = {
                id: id,
                status: state
            }
            await backendRequest('api/v1/purchases/status', 'PUT', null, purchase)
        },
        FilterbyDate(dates){
            this.start = dates.start
            this.end = dates.end
            
            this.getPurchases()
        },
        setDates(){
            const now = new Date()
            if(now.getDate()>=15){
                this.start = `${now.getFullYear()}-${(now.getMonth()+1).toLocaleString('en-US', {minimumIntegerDigits: 2})}-15`
                this.end = `${now.getFullYear()}-${(now.getMonth()+2).toLocaleString('en-US', {minimumIntegerDigits: 2})}-15`
            }else{
                const month = now.getMonth() == 0 ? 12 : now.getMonth().toLocaleString('en-US', {minimumIntegerDigits: 2})
                this.start = `${now.getFullYear()}-${month}-15`
                this.end = `${now.getFullYear()}-${(now.getMonth()+1).toLocaleString('en-US', {minimumIntegerDigits: 2})}-15`
            }
        },
        async getPurchases(){
            const parameter = {
                start:this.start,
                end:this.end
            }
            this.purchases = await backendRequest('api/v1/purchases', 'GET', parameter)
        }
    },
    computed:{
        amount: function(){
            try{
                const total = this.purchasesFiltered.reduce(
                    (total, purchase) => total + parseFloat(purchase.cost), 0)
                return total.toFixed(2)
            }catch(e){
                return 0
            }
        },
        persons: function(){
            const persons = new Set(this.purchases.map(purchase => purchase.user_purchase))
            return Array.from(persons)
        },
        purchasesFiltered:function(){
            if(this.personToFilter == "Todos") return this.purchases

            return this.purchases.filter(purchase => purchase.user_purchase == this.personToFilter)
        }
    }
};
</script>

<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                <ul class="nav nav-pills card-header-pills">
                    <li class="nav-item">
                        <NewPurchaseModalVue></NewPurchaseModalVue>
                    </li>
                    <li class="nav-item">
                        <div class="form-floating mx-2">
                            <select class="form-select" id="personSelect" aria-label="Select by person" v-model="personToFilter">
                                <option selected>Todos</option>
                                <option v-for="(person, index) in persons" :key="index">{{ person }}</option>
                            </select>
                            <label for="personSelect">Filtrar por:</label>
                        </div>
                    </li>
                    <li class="nav-item" style="display: flex;">
                        <DateFilter :start="start" :end="end" @change-date="FilterbyDate"></DateFilter>
                    </li>
                </ul>
            </div>
            <div class="card-body table-responsive">
                <table class="table table-hover mt-4">
                    <thead class="table-dark">
                        <tr>
                            <th>Persona</th>
                            <th>Articulo</th>
                            <th>Monto</th>
                            <th>Tienda</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(purchase, index) in purchasesFiltered" :key="index">
                            <td>{{purchase.user_purchase}}</td>
                            <td>{{purchase.description}}</td>
                            <td>{{purchase.cost}}</td>
                            <td>{{purchase.store}}</td>
                            <td><StateButton :state="purchase.status" :index="index" :id="purchase.id" @change-status="ChangeStatus"></StateButton></td>
                        </tr>
                    </tbody>
                    <tfoot class="table-dark">
                        <tr>
                            <td>Total:</td>
                            <td></td>
                            <td>{{ amount }}</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </div>
</template>