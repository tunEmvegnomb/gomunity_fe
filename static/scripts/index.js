window.onload = async function loadNotices(){
    const notices = await getNotices();
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

        const signin_box = document.getElementsByClassName("signin_box")[0];
        signin_box.style.display = "none";
        const new_signin_box = document.createElement("div");
        const username_box = document.createElement("h3");
        const welcome_text = document.createElement("h3")
        
        new_signin_box.setAttribute("class", "signin_box signin_logintext");
        username_box.innerText = parsed_payload.username + "님";
        welcome_text.innerText = "즐거운 거뮤니티!";

        signin_box.parentElement.appendChild(new_signin_box);
        new_signin_box.appendChild(username_box);
        new_signin_box.appendChild(welcome_text);

    } else {
        username.innerText = "Guest"
        logoutButton.innerText = "로그인"
        logoutButton.setAttribute("onclick", "location.href='/login.html'")
    }
});