// 비동기 함수
// html을 불러오면, 자연스럽게 head 태그 내부의 여러 링크들을 불러오게 됩니다
// 이 때 javascript 파일 또한 불러와지는데, 전체를 한 번에 읽어내는 특징이 있습니다.
// 만약 사용자가 로그인할 아이디와 비밀번호를 적기 전부터 아래의 함수가 전부 불러와진다면, 입력한 데이터가 없어서 요청을 보낼 수가 없겠죠?
// 그렇기 때문에 사용자가 호출하기 전까지 이 함수는 불러와 져서는 안됩니다
// 함수를 직접 호출하기 전에는 읽지 않는 것을 비동기라고 합니다


const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"


//로그인
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
        window.location.replace(`${frontend_base_url}/main.html`);
        
    }else{
        alert(response.status)
    }
}

// 회원가입 
async function signup(){
    const signupData = {
        username : document.getElementById("username").value,
        password : document.getElementById("password").value,
        nickname : document.getElementById("nickname").value,
        email : document.getElementById("email").value,
    }
    console.log(signupData)
    const response = await fetch(`${backend_base_url}/user/signup/`, {
        headers:{
            Accept:"application/json",
            'Content-type':'application/json',
        },
        method:'POST',
        body:JSON.stringify(signupData)
    }
    )

    response_json = await response.json()
    console.log(response_json)
    if (response.status == 200){
        alert("회원가입에 성공했다북!")
        window.location.replace(`${frontend_base_url}/login.html`);
    }else{
        alert("회원가입에 실패했다북");
    }
}

//로그아웃
async function logout(){
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
    alert("로그아웃했습니다 안녕히 가세요")
    window.location.replace(`${frontend_base_url}/index.html`);
}