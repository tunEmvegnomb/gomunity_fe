
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
window.addEventListener('load', async function checkLogin() {
    const payload = localStorage.getItem("payload")
    const parsed_payload = await JSON.parse(payload)
    const username = document.getElementById("username")
    const logoutButton = document.getElementById("logout")
    const logoutButton2 = document.getElementById("logout2")
    const registerButton = document.getElementById("register")
    if (parsed_payload) {
        username.innerText = parsed_payload.username
        logoutButton.innerText = "로그아웃"
        logoutButton.setAttribute("onclick", "logout()")
        logoutButton2.innerText = "sign-out"
        logoutButton2.setAttribute("onclick", "logout()")
        registerButton.innerText = "Hello"+" "+"World!"
        registerButton.setAttribute("onclick", "location.href='/main.html'")
    } else {
        username.innerText = "Guest"
        logoutButton.innerText = "로그인"
        logoutButton.setAttribute("onclick", "location.href='/login.html'")
    }
});
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