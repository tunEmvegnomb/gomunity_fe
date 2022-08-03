console.log('here detail.js');


window.onload = async function loadDetails() {
    // 게시글
    const question_id = localStorage.getItem("question_id");
    const details = await QuestionDetail(question_id);
    let user_id = "";
    let username = "";
    try{
        const payload_token = localStorage.getItem("payload");
         user_id = JSON.parse(payload_token).user_id;
         username = JSON.parse(payload_token).username;
    } catch {
         user_id = "00";
         username = "익명유저";
    }

    const questionlike = details.like;
    
    document.getElementById("user_name").innerText = "작성자" + " : " + details.user;
    document.getElementById("created_at").innerText = (details.created_at).split("T")[0] +" "+ ((details.created_at).split("T")[1]).split(".")[0];
    document.getElementById("question_main_title").innerText = details.title;
        
    if (details.image != null){
        document.getElementById("image").setAttribute("src", `https://s3.ap-northeast-2.amazonaws.com/gomunity.shop${details.image}`);
    } else {
        document.getElementById("image").setAttribute("src", `https://s3.ap-northeast-2.amazonaws.com/gomunity.shop/media/gomunity.png`)
    }
    document.getElementById("question_post").innerText = details.content;

    document.getElementById("deletequestion").setAttribute("onclick",`deleteQuestion(${question_id})`)
    document.getElementById("updatequestion").setAttribute("onclick",`goarticle(${question_id})`)
    document.getElementById("hashtag").innerText = details.hashtag;
    
    const button_like_question = document.getElementsByClassName("title_like_box")[0];
    button_like_question.setAttribute("class", "btn btn-primary");
    button_like_question.innerText = " ♥  " + details.like.length;
    button_like_question.setAttribute("onclick", `likeQuestion(${question_id})`);
    if (questionlike.includes(user_id) != true) {
        button_like_question.setAttribute("class", "btn btn-primary");
        button_like_question.innerText = " ♥  " + details.like.length;
    } else {
        button_like_question.setAttribute("class", "btn btn-danger");
        button_like_question.innerText = " ♡  " + details.like.length;
    }
    
    const edit_btn = document.getElementById("hidden_edit_btn")

    if(username !== details.user){
        edit_btn.style.visibility = 'hidden';
    }

    // 댓글
    const comments = details.answer;
    const div_answer_list = document.getElementsByClassName("answer_list")[0];
    

    comments.forEach((comment) => {

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
        const div_answer_image = document.createElement("div");
        const answer_image = document.createElement("img");

        div_answer_box.setAttribute("class", "answer_box");
        div_answer_profile_image.setAttribute("class", "answer_profile_image");
        profile_image.setAttribute("src", "../static/image/profile.png");
        div_answer_comment.setAttribute("class", "answer_comment");
        div_answer_user.setAttribute("class", "answer_user");
        div_answer_image.setAttribute("class", "answer_image")

        div_answer_text.setAttribute("class", "answer_text");
        div_answer_like.setAttribute("class", "answer_like");
        div_answer_edit.setAttribute("class", "answer_edit");
        button_answer_edit.setAttribute("class", "btn btn-warning answer-btn");
        button_answer_edit.setAttribute("onclick", `openEditBox(${comment.id})`);
        button_answer_edit.setAttribute("type", "button");
        button_answer_edit.innerText = "수정"
        button_answer_delete.setAttribute("class", "btn btn-danger answer-btn");
        button_answer_delete.setAttribute("type", "button");
        button_answer_delete.setAttribute("onclick", `deleteComment(${comment.id})`);
        button_answer_delete.innerText = "삭제";
        
        button_answer_like.setAttribute("type", "button");
        button_answer_like.setAttribute("class", "btn btn-primary");
        button_answer_like.innerText = " ♥  " + comment.like.length;
        if (comment.like.includes(user_id) != true) {
            button_answer_like.setAttribute("class", "btn btn-primary");
            button_answer_like.innerText = " ♥  " + comment.like.length;
        } else {
            button_answer_like.setAttribute("class", "btn btn-danger");
            button_answer_like.innerText = " ♡  " + comment.like.length;
        }
        button_answer_like.setAttribute("id", "Answer_like");
        button_answer_like.setAttribute("onclick", `likeAnswer(${comment.id})`);

        div_answer_user.innerText = comment.user;
        div_answer_text.innerText = comment.content;

        div_answer_list.appendChild(div_answer_box);
        div_answer_box.appendChild(div_answer_profile_image);
        div_answer_profile_image.appendChild(profile_image);
        
        
        div_answer_box.appendChild(div_answer_comment);
        div_answer_comment.appendChild(div_answer_user);
        div_answer_comment.appendChild(div_answer_image);
        div_answer_comment.appendChild(div_answer_text);
        div_answer_comment.appendChild(div_answer_like);

        

        div_answer_box.appendChild(div_answer_edit);
        div_answer_edit.appendChild(button_answer_edit);
        div_answer_edit.appendChild(button_answer_delete);

        div_answer_list.appendChild(hr_underbar);

        div_answer_like.appendChild(button_answer_like);


        //답변 이미지
        if (comment.image == null) {
            answer_image.setAttribute("class", "no-image");
            console.log(comment.image)
        } else {
            answer_image.setAttribute("src", `https://s3.ap-northeast-2.amazonaws.com/gomunity.shop${comment.image}`)
            div_answer_image.appendChild(answer_image);
        }
        if (username !== comment.user) {
            div_answer_edit.style.visibility = 'hidden';
        }

        //히든 인풋 박스 요소
        const hidden_edit_box = document.createElement("div");
        const hidden_input = document.createElement("textarea");
        const hidden_btn_list = document.createElement("div");
        const hidden_input_img = document.createElement("input")
        const hidden_edit_button = document.createElement("button");

        hidden_edit_box.setAttribute("id", "answer_edit_box");
        hidden_edit_box.setAttribute("class", comment.id);
        hidden_input.setAttribute("class", "answer_edit_input");
        hidden_edit_button.setAttribute("class", "btn btn-success answer-btn");
        hidden_edit_button.setAttribute("onclick", `updateComment(${comment.id})`);
        hidden_edit_button.innerText = "수정완료";
        hidden_btn_list.setAttribute("class", "comment_edit_photo");
        hidden_input_img.setAttribute("type", "file");

        div_answer_comment.appendChild(hidden_edit_box);
        hidden_edit_box.appendChild(hidden_input);
        hidden_edit_box.appendChild(hidden_btn_list);
        hidden_btn_list.appendChild(hidden_input_img);
        hidden_btn_list.appendChild(hidden_edit_button);
        hidden_edit_box.style.visibility = 'hidden';
    })
}
// 답변 수정할 때 나오는 박스
function openEditBox(answer_number) {
    const hidden_edit_box = document.getElementsByClassName(answer_number)[0];
    hidden_edit_box.style.visibility = 'visible';
    let find_comment_text = hidden_edit_box.parentElement;
    find_comment_text = find_comment_text.childNodes[1];
    const find_comment_text_value = find_comment_text.innerText;
    find_comment_text.style.visibility = 'hidden';
    hidden_edit_box.childNodes[0].innerText = find_comment_text_value;
}
