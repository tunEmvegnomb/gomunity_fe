const backend_base_url = "http://127.0.0.1:8000" 
const frontend_base_url = "http://127.0.0.1:5500"

async function login_api(){
    const loginData = {
        username : document.getElementById("username").value,
        password : document.getElementById("password").value
    }

    const response = await fetch(`${backend_base_url}/user/api/token/`,{
        headers:{
            Accept:"application/json",
            'Content-type':'application/json'
        },
        method : 'POST',
        body:JSON.stringify(loginData)
    }
    )

    response_json = await response.json()
    console.log(response_json)

    if (response.status == 200){
        localStorage.setItem("access", response_json.access)
        localStorage.setItem("refresh", response_json.refresh)

        const base64Url = response_json.access.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(atob(base64).split("").map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            }).join("")
        );
        localStorage.setItem("payload", jsonPayload);
    }else{
        alert(response.status)
    }
}