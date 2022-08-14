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

// 이미지 업로드 API
editor.addHook("addImageBlobHook", async function (blob, callback) {
    console.log("블랍", blob)

    const formdata = new FormData();
    formdata.append("file", blob)
    
    const response_json = await editorImageUpload(formdata);
    callback(response_json.url, "image")
});

// 썸네일 미리보기
function thumnailImagePreview(input) {
    const base_div = document.querySelector("#preview");
    base_div.innerHTML = `<img src="" id="preview_thumbnail" class="base-img" height="200" width="200" style="margin-bottom:20px">`

    if (input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById('preview_thumbnail').src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
    } else {
    document.getElementById('preview_thumbnail').src = "";
    }
}

// 질의응답/자료 옵션선택
function showCategory() {
    const articleOption = document.querySelector(".article_category").value;
    console.log(articleOption);
    
    // 질의응답 선택
    if (articleOption === "qnaboard") {
        const thumbnail = document.getElementById("thumbnail-label");
        thumbnail.style.display = "block";
        const archiveCategory = document.getElementById("archive-category");
        archiveCategory.style.display = "none";
    }
    else if (articleOption === "docboard") {
        const thumbnail = document.getElementById("thumbnail-label");
        thumbnail.style.display = "none";
        const archiveCategory = document.getElementById("archive-category");
        archiveCategory.style.display = "block";
    }
    


}