console.log('here detail.js');

window.onload = async function loadDetails(){
    const question_id = localStorage.getItem("question_id");
    const details = await QuestionDetail(question_id);
    console.log(details);
    
    document.getElementById("question_main_title").innerText = details.title;
    document.getElementsByClassName("question_post")[0].innerText = details.content;

    // 댓글
    console.log(details.user);
    console.log(details.answer);
    const comments = details.answer;
    console.log(comments.length);
    const div_answer_list = document.getElementsByClassName("answer_list")[0];
        
    comments.forEach((comment)=>{
        // 1. 기존에 만들어놓은것과 똑같은 html 태그요소 만들기
        const div_answer_box = document.createElement("div");
        const div_answer_profile_image = document.createElement("div");
        const profile_image = document.createElement("img");
        const div_answer_comment = document.createElement("div");
        const div_answer_user = document.createElement("div");
        const div_answer_text = document.createElement("div");
        const div_answer_like = document.createElement("div");
        
        // 2. 해당 태그에 들어갈 데이터를 동적으로 입력
        div_answer_box.setAttribute("class", "answer_box");
        div_answer_profile_image.setAttribute("class", "answer_profile_image");
        profile_image.setAttribute("src", "../profile.png");
        div_answer_comment.setAttribute("class", "answer_comment");
        div_answer_user.setAttribute("class","answer_user");
        div_answer_text.setAttribute("class","answer_text");
        div_answer_like.setAttribute("class","answer_like");

        div_answer_user.innerText = comment.user;
        div_answer_text.innerText = comment.content;
        div_answer_like.innerText = comment.like;        

        // 3. 만들어진 태그를 html 코드 아래에 붙이기
        // 자 그 다음에는 answer_box 안에다가 요소를 넣어야 합니다
        // 1. div_answer_profile_image
        // 2. div_answer_comment
        div_answer_list.appendChild(div_answer_box);
        div_answer_box.appendChild(div_answer_profile_image);
        div_answer_profile_image.appendChild(profile_image);
        div_answer_box.appendChild(div_answer_comment);
        div_answer_comment.appendChild(div_answer_user);
        div_answer_comment.appendChild(div_answer_text);
        div_answer_comment.appendChild(div_answer_like);
    })
}