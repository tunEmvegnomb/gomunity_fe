// const backend_base_url = "http://127.0.0.1:8000"
// const deploy_base_url = "http://3.34.167.27"
const deploy_base_url = "https://gomunity.org";
// const frontend_base_url = "http://127.0.0.1:5500"
const frontend_base_url = "https://gomunity.shop";


// 로그인체크
window.addEventListener('load', async function checkLogin() {
    const payload = localStorage.getItem("payload")
    const parsed_payload = await JSON.parse(payload)
    const username = document.getElementById("username")
    const logoutButton = document.getElementById("logout")

    if (parsed_payload) {
        username.innerText = parsed_payload.username
        logoutButton.innerText = "로그아웃"
        logoutButton.setAttribute("onclick", "logout()")
    } else {

        if(!logoutButton){} 
        else{        
            username.innerText = "회원가입"
            logoutButton.innerText = "로그인"
            logoutButton.setAttribute("onclick", "location.href='/login.html'")
        }
    }
});


// 회원가입 
async function signup() {

    const signupData = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
        nickname: document.getElementById("nickname").value,
        email: document.getElementById("email").value,
    }

    const response = await fetch(`${deploy_base_url}/user/signup/`,{
        headers:{
            Accept:"application/json",
            'Content-type':'application/json',
        },
        method: 'POST',
        body: JSON.stringify(signupData)
    })

    const result = await response.json()

    if (response.status == 200) {
        alert(result['message'])
        window.location.replace(`${frontend_base_url}/login.html`);
    } else {
        alert(result.error[0]);
    }
}

//로그인
async function login_api() {
    const loginData = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
    }
    const response = await fetch(`${deploy_base_url}/user/api/custom/token/`,{
        headers:{
            Accept:"application/json",
            'Content-type':'application/json'
        },
        method: 'POST',
        body: JSON.stringify(loginData)
    })
    const response_json = await response.json()

    if (response.status == 200) {
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
    } else {
        alert("잘못된 정보입니다")
    }
}

// 리프레쉬 토큰
window.addEventListener('load', () => {
    try{   
        const payload = JSON.parse(localStorage.getItem("payload"));
        if (payload.exp > (Date.now() / 1000)){
        } 
        else {
            const requestRefreshToken = async (url) => {
                  const response = await fetch(url, {
                      headers: {
                          'Content-Type': 'application/json',
                      },
                      method: "POST",
                      body: JSON.stringify({
                          "refresh": localStorage.getItem("refresh")
                      })}
                  );
                  return response.json();
            };
            requestRefreshToken(deploy_base_url + "/user/api/token/refresh/").then((data)=>{
                const accessToken = data.access;
    
                localStorage.setItem("access", accessToken);
            });
        }    
    }
    catch {
        
    }
});
    

//로그아웃
function logout() {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
    alert("로그아웃했습니다 안녕히 가세요")
    window.location.replace(`${frontend_base_url}/index.html`);
}


// 공지사항 조회
async function getNotices(){
    const response = await fetch(`${deploy_base_url}/webmaster/`,{
        method: 'GET',
    });
    const response_json = await response.json();
    return response_json
}


// 질문글 목록 조회
async function getQuestions(){
    const response = await fetch(`${deploy_base_url}/qna/list/`,{
        method: 'GET',
    });
    const response_json = await response.json();
    return response_json
}


// 질문글 작성
async function createQuestion() {
    const category = document.getElementsByClassName("article_category")[0];
    const category_value = category.options[category.selectedIndex].textContent;
    
    const title = document.getElementById("article_title").value;
    const hashtag = document.getElementById("hashtag").value;
    const content = document.getElementById("article_content").value;
    const image = document.getElementById("article_image").files[0];

    const formdata = new FormData();
    formdata.enctype = "multipart/form-data"
    formdata.append('title', title);
    formdata.append('hashtag', hashtag);
    formdata.append('content', content);

    if (image != undefined){
        formdata.append('image', image);
    }
    if (category_value === "질의응답"){
        const response = await fetch(`${deploy_base_url}/qna/`,{
            headers:{
                Authorization: "Bearer " + localStorage.getItem("access"),
            },
            method:'POST',
            body:formdata
        })
        const response_json = await response.json()

        if (response.status == 200){
            alert(response_json.message);
        } else {
            alert(response_json.message);
        }
        window.location.replace('main.html');
    }
}


async function goDetail(question_id) {
    localStorage.setItem("question_id", question_id);
    location.href = '/detail.html';
}

async function goarticle(question_id){
    localStorage.setItem("question_id", question_id);
    location.href = '/create_article.html';;
}
async function createarticle(){
    localStorage.removeItem("question_id");
    location.href = '/create_article.html';
}


//질문 수정
async function updateQuestion(question_id) {
    const category = document.getElementsByClassName("article_category")[0];
    const category_value = category.options[category.selectedIndex].textContent;

    const title = document.getElementById("article_title").value;
    const hashtag = document.getElementById("hashtag").value;
    const content = document.getElementById("article_content").value;
    const image = document.getElementById("article_image").files[0];
    
    const formdata = new FormData();
    formdata.enctype = "multipart/form-data"
    
    formdata.append('title', title);
    formdata.append('hashtag', hashtag);
    formdata.append('content', content);

    if(image != undefined){
        formdata.append('image', image);
    }

    if (category_value === "질의응답"){
        const response = await fetch(`${deploy_base_url}/qna/${question_id}`,{
            headers:{
                Authorization: "Bearer " + localStorage.getItem("access"),
            },
            method:'PUT',
            body:formdata
        })
        const response_json = await response.json()
        if (response.status == 200) {
            alert(response_json.message);
        }
        else {
            alert(response_json.message);
        }
        location.href = '/detail.html';
    }
}


//질문 삭제
async function deleteQuestion(question_id) {
    
    if (confirm("정말 삭제하시겠습니까??") == true){
        const response = await fetch(`${deploy_base_url}/qna/${question_id}`,{
            headers:{
                Authorization: "Bearer " + localStorage.getItem("access"),
                Accept: "application/json",
                'Content-type': 'application/json',
            },
            method: 'DELETE',
        })
        const response_json = await response.json()
        
        if (response.status == 200) {
            alert(response_json.message);
        }
        else {
            alert(response_json.message);
        }
        window.location.replace('main.html');
    }}


//질문글 상세조회
async function QuestionDetail(question_id){
    const response = await fetch(`${deploy_base_url}/qna/${question_id}`,{
        method: 'GET',
    });
    const response_json = await response.json();
    return response_json
}


//답변 작성
async function postComment() {
    const question_id = localStorage.getItem("question_id");
    const comment = document.getElementById("create_comment").value;
    let comment_img = document.getElementById("comment_img").files[0];

    const formdata = new FormData();
    formdata.enctype = "multipart/form-data"
    
    formdata.append('content', comment);
    if (comment_img != undefined){
        formdata.append('image', comment_img);
    }

    const response = await fetch(`${deploy_base_url}/qna/${question_id}/answer/`,{
        headers:{
            Authorization: "Bearer " + localStorage.getItem("access"),
        },
        method: 'POST',
        body: formdata
    })

    const response_json = await response.json()
    
    if (response.status == 200) {
        alert(response_json.message);
    }
    else if(user_id="00"){
        alert("로그인이 필요하다북!");
    }
    else {
        alert(response_json.message);
    }
    window.location.replace(`detail.html`);
}


// 답변 수정
async function updateComment(answer_id) {
    const comment = document.getElementsByClassName(answer_id)[0].childNodes[0].value;
    let comment_img = document.getElementsByClassName(answer_id)[0].childNodes[1].childNodes[0].files[0];

    const formdata = new FormData();
    formdata.enctype = "multipart/form-data"
    
    formdata.append('content', comment);
    if(comment_img != undefined){
        formdata.append('image', comment_img);
    }

    const response = await fetch(`${deploy_base_url}/qna/answer/${answer_id}`,{
        headers:{            
            Authorization: "Bearer " + localStorage.getItem("access"),
            // Accept: "application/json",
            // 'Content-type': 'application/json',
        },
        method: 'PUT',
        body: formdata
    })

    const response_json = await response.json()

    if (response.status == 200) {
        alert(response_json.message);
    }
    else {
        alert(response_json.message);
    }
    window.location.reload();
}


// 답변 삭제
async function deleteComment(answer_id) {
    const comment_data = {
        content: document.getElementsByClassName(answer_id)[0].childNodes[0].value
    }
    if (confirm("정말 삭제하시겠습니까??") == true){
        const response = await fetch(`${deploy_base_url}/qna/answer/${answer_id}`,{
            headers:{
                Authorization: "Bearer " + localStorage.getItem("access"),
                Accept: "application/json",
                'Content-type': 'application/json',
            },
            method: 'DELETE',
            body: JSON.stringify(comment_data)
        })
        const response_json = await response.json()
        if (response.status == 200) {
            alert(response_json.message);
        }
        else {
            alert(response_json.message);
        }
        window.location.reload();
    }}


// 답변 좋아요
async function likeAnswer(answer_id){
    const response = await fetch(`${deploy_base_url}/qna/like/answer/${answer_id}`,{
        headers:{
            Authorization: "Bearer " + localStorage.getItem("access"),
            Accept: "application/json",
            'Content-type': 'application/json',
        },
        method: 'POST',
    })

    const response_json = await response.json()
    if (response.status == 200) {
        alert(response_json.message);
    }
    else {
        alert("로그인이 안됐다북!");
    }
    window.location.reload();
}


//질문 좋아요
async function likeQuestion(question_id){
    const response = await fetch(`${deploy_base_url}/qna/like/question/${question_id}`,{
        headers:{
            Authorization: "Bearer " + localStorage.getItem("access"),
            Accept: "application/json",
            'Content-type': 'application/json',
        },
        method: 'POST',
    })

    const response_json = await response.json()

    if (response.status == 200) {
        alert(response_json.message);
    }
    else {
        alert("로그인이 안됐다북!");
    }
    window.location.reload();
}


// 질문글 추천 시스템
async function ShowRecommend(question_id) {

    const response = await fetch(`${deploy_base_url}/qna/recommend/${question_id}`, {
        method: 'POST',
    })
    const response_json = await response.json();
    return response_json;
}
