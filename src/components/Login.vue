<script>
import Cookies from 'js-cookie';
import {backendRequest} from '../utils/request'
export default {
    data(){
        return{
            username:""
        }
    },
    methods:{
        async login(){
            const token = await backendRequest('api/v1/auth', 'POST', null, {username: this.username})
            Cookies.set('token', token.token, { expires: 1 })
        }
    }
}

</script>
<template class="position-relative">
    <div class="col-sm-3 position-absolute top-50 start-50 translate-middle">
        <div class="card">
            <div class="card-header text-center bg-dark text-light" data-bs-theme="dark">
                Iniciar sesión
            </div>
            <div class="card-body">
                <div class="mb-3">
                    <label for="user" class="form-label">Usuario</label>
                    <input type="text" class="form-control" id="user" v-model="username">
                </div>
                <div class="row">
                    <button type="button" class="btn btn-outline-dark" id="login" @click="login()">Iniciar sesión</button>
                </div>
            </div>
        </div>
    </div>
</template>