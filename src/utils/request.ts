import { toast } from 'vue3-toastify'
import Cookies from 'js-cookie';
import router from '@/router';

export const backendRequest = (endpoint: string, method:string, parameters:JSON, body:JSON) =>{
    const setEndpoint = setParameters(endpoint, parameters)
    const URL = `http://localhost:3000/${setEndpoint}`
    const token = Cookies.get('token') as string

    const headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': token,
      });

    const requestOptions = {
        method: method || "GET", 
        headers: headers,
        body: JSON.stringify(body), 
      };

    return new Promise((resolve, reject) => {
        fetch(URL, requestOptions).then(response =>{
            if(!response.ok){
                if(response.status == 401){
                    return router.push('/login')
                }

                toast["error"]("Error al realizar la petición")
                //throw new Error('La respuesta no fue exitosa');
            }
            return response.json()
        }).then(data =>{
            resolve(data);
        }).catch(error => {
            reject(error);
            toast["error"]("Error al realizar la petición")
        });
    })
}

function setParameters(endpont:string, parameters:JSON) {
    if(parameters == undefined || parameters == null) return endpont

    const parametersClened = Object.entries(parameters)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
  
    return `${endpont}?${parametersClened}`;
  }