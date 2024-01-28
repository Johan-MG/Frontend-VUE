<script>
import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net'
import Select from 'datatables.net-select'
import 'datatables.net-select'
import 'datatables.net-responsive-bs5'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

function getPurchases() {
    const URL = "http://localhost:3000/api/v1/purchases"
    const headers = {'Content-Type':'application/json',
                    'Access-Control-Allow-Origin':'*',
                    'Access-Control-Allow-Methods':'GET,POST'}
    return new Promise((resolve, reject) => {
        fetch(URL).then(response =>{
            if(!response.ok){
                toast["error"]("Error al realizar la petición")
                throw new Error('La respuesta no fue exitosa');
            }
            return response.json()
        }).then(data =>{
            resolve(data);
        }).catch(error => {
            reject(error);
        });
    })
    
}

export default {
    
    async mounted(){
        this.persons = await getPurchases()
    },
    data(){
        return{
            persons:[]
        }
  }
};
</script>

<template>
    <div class="container">
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
            <tbody v-for="(person, index) in persons" :key="index">
                <tr>
                    <td>{{person.user_purchase}}</td>
                    <td>{{person.description}}</td>
                    <td>{{person.cost}}</td>
                    <td>{{person.payment_method}}</td>
                    <td>{{person.store}}</td>
                    <td>{{person.status}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>