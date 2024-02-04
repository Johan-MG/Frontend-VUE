<script>
import {backendRequest} from '../../../utils/request'
import { paymentMethod } from '../../../interfaces/methodPaid'

export default {
    name: 'NewPurchaseModal',
    async mounted(){
        this.persons = await backendRequest('api/v1/users')
        this.stores = await backendRequest('api/v1/stores')
    },
    data(){
        return{
            persons:[],
            person_selected: null,
            stores:[],
            store_selected: null,
            methods: paymentMethod,
            method_selected: null,
            cost:null,
            description: null,
            status: "PENDING"
        }
    },
    methods:{
        async createPurchase(){
            const purchase = {
                user_pay: 1,
                user_purchase: this.person_selected,
                cost: this.cost,
                description: this.description,
                payment_method: this.method_selected,
                store: this.store_selected,
                status: this.status
            }
            console.log(purchase)
            await backendRequest('api/v1/purchases/create', 'POST', purchase)
            location.reload();
        }
    }
};
</script>

<template>
    <button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#newPurchase">Crear</button>
    
    <div class="modal fade modal-lg" id="newPurchase" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="newPurchaseLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="newPurchaseLabel">Crear una compra</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form class="row g-3">
                        <div class="col-md-6">
                            <label for="inputPerson" class="form-label">Persona</label>
                            <select  class="form-select" id="inputPerson" v-model="person_selected">
                                <option 
                                    v-for="(person, index) in persons" 
                                    v-bind:value="person.id" 
                                    :key="index"
                                    >
                                    {{ person.user_name }}
                                </option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label for="inputCost" class="form-label">Costo</label>
                            <input type="number" class="form-control" id="inputCost" v-model="cost">
                        </div>
                        <div class="col-md-6">
                            <label for="inputMethod" class="form-label">Método de Pago</label>
                            <select class="form-select" id="inputMethod" v-model="method_selected">
                                <option 
                                    v-for="(method, index) in methods" 
                                    v-bind:value="method.id" 
                                    :key="index"
                                    >
                                    {{ method.name }}
                                </option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label for="inputStore" class="form-label">Tienda</label>
                            <select class="form-select" id="inputStore" v-model="store_selected">
                                <option 
                                    v-for="(store, index) in stores" 
                                    v-bind:value="store.id" 
                                    :key="index"
                                    >
                                    {{ store.name }}
                                </option>
                            </select>
                        </div>
                        <div class="col-12">
                            <label for="inputDescription" class="form-label">Descripción</label>
                            <textarea class="form-control" id="inputDescription" placeholder="Descripción del articulo" v-model="description"></textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-success" @click="createPurchase()">Crear</button>
                </div>
            </div>
        </div>
    </div>
</template>