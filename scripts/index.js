
// const notice_list = getNotices();
// console.log(notice_list)

window.onload = async function loadNotices(){
    const notices = await getNotices();
    console.log(notices);
    const notice_list = document.getElementById("notices")

    notices.forEach(notice => {
        // const newNotice = document.createElement("div");
        const noticeTitle = document.createElement("h1");
        const noticeContent = document.createElement("p");
        noticeTitle.innerText = notice.title;
        noticeContent.innerText = notice.content;
        notice_list.appendChild(noticeTitle);
        notice_list.appendChild(noticeContent);

    })
}

// window.onload = async function loadArticles(){
//     articles = await getArticles()
//     console.log(articles)
//     const article_list = document.getElementById("articles")

//     articles.forEach(article => {
//         const newArticle = document.createElement("div");
//         const articleImage = document.createElement("img")
//         articleImage.setAttribute("src", `${backend_base_url}${article.image}`)
//         newArticle.setAttribute("id", article.id) //모달
//         newArticle.innerText = article.title
//         newArticle.setAttribute("onclick", "articleDetail(this.id)") //모달
//         newArticle.appendChild(articleImage)
//         article_list.appendChild(newArticle)
//     });
// }