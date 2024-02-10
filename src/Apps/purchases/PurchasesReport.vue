<script>
import 'datatables.net-select'
import 'datatables.net-responsive-bs5'
import 'vue3-toastify/dist/index.css'
import NewPurchaseModalVue from './components/NewPurchaseModal.vue'
import StateButton from './components/StateButton.vue'
import {backendRequest} from '../../utils/request'

export default {
    
    async mounted(){
        this.purchases = await backendRequest('api/v1/purchases')
    },
    components:{
        NewPurchaseModalVue,
        StateButton
    },
    data(){
        return{
            purchases:[]
        }
    },
    methods:{
        async ChangeStatus(data){
            const {state, index, id} = data
            this.purchases[index].status = state
            const purchase = {
                id: id,
                status: state
            }
            await backendRequest('api/v1/purchases/status', 'PUT', purchase)
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
                </ul>
            </div>
            <div class="card-body">
                <table class="table table-hover mt-4">
                    <thead class="table-dark">
                        <tr>
                            <th>Persona</th>
                            <th>Articulo</th>
                            <th>Monto</th>
                            <th>Método de pago</th>
                            <th>Tienda</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody v-for="(purchase, index) in purchases" :key="index">
                        <tr>
                            <td>{{purchase.user_purchase}}</td>
                            <td>{{purchase.description}}</td>
                            <td>{{purchase.cost}}</td>
                            <td>{{purchase.payment_method}}</td>
                            <td>{{purchase.store}}</td>
                            <td><StateButton :state="purchase.status" :index="index" :id="purchase.id" @change-status="ChangeStatus"></StateButton></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>