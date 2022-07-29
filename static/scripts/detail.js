console.log('here detail.js');

window.onload = async function loadDetails(){
    const question_id = localStorage.getItem("question_id");
    const details = await QuestionDetail(question_id);
    console.log(details);
    
    document.getElementById("user_name").innerText = details.user;
    document.getElementById("created_at").innerText = details.created_at;
    document.getElementById("question_main_title").innerText = details.title;
    document.getElementsByClassName("question_post")[0].innerText = details.content;

    const button_like_question = document.getElementsByClassName("title_like_box")[0];
    button_like_question.setAttribute("onclick", `likeQuestion(${question_id})`);

    if (details.like.length == 0){
        button_like_question.setAttribute("class", "btn btn-primary");
    } else {
        button_like_question.setAttribute("class", "btn btn-danger");
    }

    // 댓글
    console.log(details.user);
    console.log(details.answer);
    const comments = details.answer;
    console.log(comments.length);
    const div_answer_list = document.getElementsByClassName("answer_list")[0];

    const payload_token = localStorage.getItem("payload");
    const username = JSON.parse(payload_token).username;
    
        
    comments.forEach((comment)=>{

        const div_answer_box = document.createElement("div");
        const div_answer_profile_image = document.createElement("div");
        const profile_image = document.createElement("img");
        const div_answer_comment = document.createElement("div");
        const div_answer_user = document.createElement("div");
        const div_answer_text = document.createElement("div");
        const div_answer_like = document.createElement("div");
        const button_answer_like = document.createElement("button");
        const div_answer_edit = document.createElement("div");
        const button_answer_edit = document.createElement("button");
        const button_answer_delete = document.createElement("button");
        const hr_underbar = document.createElement("hr");

        const hidden_edit_box = document.createElement("div");
        const hidden_input = document.createElement("textarea");
        const hidden_edit_button = document.createElement("button");
        
        
        div_answer_box.setAttribute("class", "answer_box");
        div_answer_profile_image.setAttribute("class", "answer_profile_image");
        profile_image.setAttribute("src", "../profile.png");
        div_answer_comment.setAttribute("class", "answer_comment");
        div_answer_user.setAttribute("class","answer_user");
        div_answer_text.setAttribute("class","answer_text");
        div_answer_like.setAttribute("class","answer_like");
        div_answer_edit.setAttribute("class", "answer_edit");
        button_answer_edit.setAttribute("class", "btn btn-warning answer-btn");
        button_answer_edit.setAttribute("onclick", `openEditBox(${comment.id})`);
        button_answer_edit.setAttribute("type", "button");
        button_answer_edit.innerText = "수정"
        button_answer_delete.setAttribute("class", "btn btn-danger answer-btn");
        button_answer_delete.setAttribute("type", "button");
        button_answer_delete.setAttribute("onclick", `deleteComment(${comment.id})`);
        button_answer_delete.innerText = "삭제";

        hidden_edit_box.setAttribute("id", "answer_edit_box");
        hidden_edit_box.setAttribute("class", comment.id);
        hidden_input.setAttribute("class", "answer_edit_input");
        hidden_edit_button.setAttribute("class", "btn btn-success answer-btn");
        hidden_edit_button.setAttribute("onclick", `updateComment(${comment.id})`);
        hidden_edit_button.innerText = "수정완료";

        button_answer_like.setAttribute("type", "button");
        if (comment.like.length === 0){
            console.log("좋아요가 있다", comment.like);
            button_answer_like.setAttribute("class", "btn btn-success");
        } else {
            button_answer_like.setAttribute("class", "btn btn-danger");
        }
        
        button_answer_like.setAttribute("onclick", `likeAnswer(${comment.id})`);
        

        div_answer_user.innerText = comment.user;
        div_answer_text.innerText = comment.content;
        div_answer_like.innerText = comment.like;        

        div_answer_list.appendChild(div_answer_box);

        div_answer_box.appendChild(div_answer_profile_image);
        div_answer_profile_image.appendChild(profile_image);
        
        div_answer_box.appendChild(div_answer_comment);
        div_answer_comment.appendChild(div_answer_user);
        
        div_answer_comment.appendChild(hidden_edit_box);

        hidden_edit_box.appendChild(hidden_input);
        hidden_edit_box.appendChild(hidden_edit_button);
        div_answer_comment.appendChild(div_answer_text);
        div_answer_comment.appendChild(div_answer_like);

        div_answer_box.appendChild(div_answer_edit);
        div_answer_edit.appendChild(button_answer_edit);
        div_answer_edit.appendChild(button_answer_delete);

        div_answer_list.appendChild(hr_underbar);

        div_answer_like.appendChild(button_answer_like);

        hidden_edit_box.style.visibility = 'hidden';

        if (username !== comment.user) {
            div_answer_edit.style.visibility = 'hidden';
        }
    })
}

function openEditBox(answer_number) {
    console.log(answer_number);
    const hidden_edit_box = document.getElementsByClassName(answer_number)[0];
    hidden_edit_box.style.visibility = 'visible';
    let find_comment_text = hidden_edit_box.parentElement;
    find_comment_text = find_comment_text.childNodes[2];
    const find_comment_text_value = find_comment_text.innerText;
    find_comment_text.style.visibility = 'hidden';
    hidden_edit_box.childNodes[0].innerText = find_comment_text_value;
    console.log(hidden_edit_box.childNodes[0].value)
}
