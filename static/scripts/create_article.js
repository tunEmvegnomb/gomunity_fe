window.addEventListener('load', async function updatearticle() {
    const question_id = localStorage.getItem("question_id");
    let user_id = "";
    let username = "";

    try{
        const payload_token = localStorage.getItem("payload");
         user_id = JSON.parse(payload_token).user_id;
         username = JSON.parse(payload_token).username;
    } catch {
         user_id = "00";
         username = "익명유저";
         alert("로그인을 해주라북!")
         window.location.href="/login.html"
    }

    if(!question_id){
        document.getElementById("btn_create_article").setAttribute("onclick",`createQuestion()`)    

    } else{
        document.getElementById("btn_create_article").setAttribute("onclick",`updateQuestion(${question_id})`)
        const question_data = await QuestionDetail(question_id)
        let title = question_data.title
        let hashtag = question_data.hashtag
        let content = question_data.content

        editor.setHTML(content);
        
        document.getElementById("article_title").value = title
        document.getElementById("hashtag").value = hashtag
    }
})
