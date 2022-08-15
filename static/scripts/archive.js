window.onload = async function loadArchiveList(){
    const archiveList = await getArchive();

    // 반복문으로 자료게시글 목록에 데이터 넣기
    archiveList.forEach((archive, index) => {
        console.log(archive);
        // 목록에 들어갈 HTML Element 생성
        const archiveDiv = document.createElement("div");
        const archiveTitle = document.createElement("a");
        const archiveCategory = document.createElement("a");
        const archiveAuthor = document.createElement("a");
        const archiveLike = document.createElement("a");

        // HTML Element 값 넣기
        archiveTitle.innerText = archive.title;
        archiveTitle.setAttribute("href", `goArchiveDetail(${index})`);
        archiveCategory.innerText = archive.article_category;
        archiveAuthor.innerText = archive.user_nickname;
        archiveLike.innerText = archive.like.length;


        // HTML Element 구조 생성
        archiveDiv.appendChild(archiveCategory);
        archiveDiv.appendChild(archiveTitle);
        archiveDiv.appendChild(archiveAuthor);
        archiveDiv.appendChild(archiveLike);
        
        // 생성된 HTML Element를 넣어줄 공간 선언 및 Appendchild
        const targetList = document.getElementById(`archive${index}`);
        targetList.appendChild(archiveDiv);


    });

    // localStorage.removeItem("question_id");
}




