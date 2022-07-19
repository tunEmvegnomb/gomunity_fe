const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"

async function signup(){
    const signupData = {
        username : document.getElementById("username").value,
        password : document.getElementById("password").value,
        nickname : document.getElementById("nickname").value,
        email : document.getElementById("email").value,
    }

    const response = await fetch(`${backend_base_url}/user/signup/`, {
        headers:{
            'Content-type':'application/json',
        },
        method:'POST',
        body:JSON.stringify(signupData)
    }
    )

    response_json = await response.json()

    if (response.status == 200){
        window.location.replace(`${frontend_base_url}/login.html`);
    }else{
        alert("회원가입 실패");
    }
}