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

    const response = await fetch(`${backend_base_url}/user/api/custom/token/`,{
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
        alert("로그인 성공했다북")
        window.location.replace('main.html')
    }else{
        alert("잘못된 정보입니다")
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

    const response = await fetch(`${backend_base_url}/user/signup/`,{
        headers:{
            Accept:"application/json",
            'Content-type':'application/json',
        },
        method:'POST',
        body:JSON.stringify(signupData)
    })

    const result = await response.json()

    if (response.status == 200){
        alert(result['message'])
            window.location.replace(`${frontend_base_url}/login.html`);
        }else{
        alert(result['message']);
        }
    }


//로그아웃
function logout(){
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
    alert("로그아웃했습니다 안녕히 가세요")
    window.location.replace(`${frontend_base_url}/index.html`);
}

// 공지사항 조회

async function getNotices(){
    const response = await fetch(`${backend_base_url}/webmaster/`,{
        method: 'GET',
    });
    response_json = await response.json();
    return response_json
}

// 질문글 목록 조회
async function getQuestions(){
    const response = await fetch(`${backend_base_url}/qna/list/`,{
        method: 'GET',
    });
    response_json = await response.json();
    return response_json
}

// 질문글 작성
async function createQuestion(){
    
    const category = document.getElementsByClassName("article_category")[0];
    const category_value = category.options[category.selectedIndex].textContent;
    const question_data = {
        title : document.getElementById("article_title").value,
        content : document.getElementById("article_content").value    
    }
    if (category_value === "질의응답"){
        const response = await fetch(`${backend_base_url}/qna/`,{
            headers:{
                Authorization: "Bearer " + localStorage.getItem("access"),
                Accept:"application/json",
                'Content-type':'application/json',
            },
            method:'POST',
            body:JSON.stringify(question_data)
        })
        const response_json = await response.json()
        console.log(response_json)
        if (response.status == 200){
            alert(response_json.message);
        }
        else {
            alert(response_json.message);
        }
        window.location.replace('main.html');
    }
}


async function goDetail(question_id){
    localStorage.setItem("question_id", question_id);
    window.location.replace(`detail.html`);
}

//질문글 상세조회
async function QuestionDetail(question_id){
    const response = await fetch(`${backend_base_url}/qna/${question_id}`,{
        method: 'GET',
    });
    response_json = await response.json();
    return response_json
}

//답변 작성
async function postComment(){
    const question_id = localStorage.getItem("question_id")
    const comment_data = {
        "content":document.getElementById("create_comment").value
        
    }
    const response = await fetch(`${backend_base_url}/qna/${question_id}/answer/`,{
        headers:{
            Authorization: "Bearer " + localStorage.getItem("access"),
            Accept:"application/json",
            'Content-type':'application/json',
        },
        method:'POST',
        body:JSON.stringify(comment_data)
    })
    const response_json = await response.json()
    console.log(response_json)
    if (response.status == 200){
        alert(response_json.message);
    }
    else {
        alert(response_json.message);
    }
    window.location.replace(`detail.html`);
}
//


//답변 수정
async function updateComment(answer_id){
    const comment_data = {
        content : document.getElementsByClassName(answer_id)[0].childNodes[0].value
    } 

    const response = await fetch(`${backend_base_url}/qna/answer/${answer_id}`,{
        headers:{
            Authorization: "Bearer " + localStorage.getItem("access"),
            Accept:"application/json",
            'Content-type':'application/json',
        },
        method:'PUT',
        body:JSON.stringify(comment_data)
    })
    const response_json = await response.json()
    console.log(response_json)
    if (response.status == 200){
        alert(response_json.message);
    }
    else {
        alert(response_json.message);
    }
    window.location.reload();
}


// 답변 삭제
async function deleteComment(answer_id){
    const comment_data = {
        content : document.getElementsByClassName(answer_id)[0].childNodes[0].value
    } 
    console.log('comment_data', comment_data)
    const response = await fetch(`${backend_base_url}/qna/answer/${answer_id}`,{
        headers:{
            Authorization: "Bearer " + localStorage.getItem("access"),
            Accept:"application/json",
            'Content-type':'application/json',
        },
        method:'DELETE',
        body:JSON.stringify(comment_data)
    })
    const response_json = await response.json()
    console.log(response_json)
    if (response.status == 200){
        alert(response_json.message);
    }
    else {
        alert(response_json.message);
    }
    window.location.reload();
}

// 답변 좋아요
async function likeAnswer(answer_id){
   
    const response = await fetch(`${backend_base_url}/qna/like/answer/${answer_id}`,{
        headers:{
            Authorization: "Bearer " + localStorage.getItem("access"),
            Accept:"application/json",
            'Content-type':'application/json',
        },
        method:'POST',
    })
    const response_json = await response.json()
    console.log(response_json)
    if (response.status == 200){
        alert(response_json.message);
    }
    else {
        alert(response_json.message);
    }
    window.location.reload();
}

async function likeQuestion(question_id){
   
    const response = await fetch(`${backend_base_url}/qna/like/question/${question_id}`,{
        headers:{
            Authorization: "Bearer " + localStorage.getItem("access"),
            Accept:"application/json",
            'Content-type':'application/json',
        },
        method:'POST',
    })
    const response_json = await response.json()
    console.log(response_json)
    if (response.status == 200){
        alert(response_json.message);
    }
    else {
        alert(response_json.message);
    }
    window.location.reload();
}
