import { toast } from 'vue3-toastify'

export const backendRequest = (endpoint: string, method:string, parameters:JSON, body:JSON) =>{
    const setEndpoint = setParameters(endpoint, parameters)
    const URL = `http://localhost:3000/${setEndpoint}`

    const headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer tu_token',
      });

    const requestOptions = {
        method: method || "GET", 
        headers: headers,
        body: JSON.stringify(body), 
      };

    return new Promise((resolve, reject) => {
        fetch(URL, requestOptions).then(response =>{
            if(!response.ok){
                toast["error"]("Error al realizar la petición")
                //throw new Error('La respuesta no fue exitosa');
            }
            return response.json()
        }).then(data =>{
            resolve(data);
        }).catch(error => {
            reject(error);
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