<script>
import 'datatables.net-select'
import 'datatables.net-responsive-bs5'
import 'vue3-toastify/dist/index.css'
import NewPurchaseModalVue from './components/NewPurchaseModal.vue'
import {backendRequest} from '../../utils/request'

export default {
    
    async mounted(){
        this.purchases = await backendRequest('api/v1/purchases')
    },
    components:{
        NewPurchaseModalVue
    },
    data(){
        return{
            purchases:[]
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
                            <td>{{purchase.status}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>