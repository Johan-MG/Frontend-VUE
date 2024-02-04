import { toast } from 'vue3-toastify'

export const backendRequest = (endpoint: string, method:string, body:JSON) =>{
    const URL = `http://localhost:3000/${endpoint}`

    const headers = new Headers({
        'Content-Type': 'application/json', // Indica que el cuerpo de la solicitud es JSON
        'Authorization': 'Bearer tu_token', // Ejemplo de encabezado de autorización
      });

    const requestOptions = {
        method: method || "GET", // Puedes cambiar a 'GET', 'PUT', 'DELETE', etc.
        headers: headers,
        body: JSON.stringify(body), // Convierte el objeto a JSON
      };

    return new Promise((resolve, reject) => {
        fetch(URL, requestOptions).then(response =>{
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