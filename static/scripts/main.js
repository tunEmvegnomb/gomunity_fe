window.onload = async function loadQuestions(){
    const questions = await getQuestions();
    const div_cards = document.getElementsByClassName("cards")[0];
   
   questions.forEach((question) => {
    const div_col = document.createElement("div");
    div_col.setAttribute("class", "col");
    div_cards.appendChild(div_col);

    const div_h100 = document.createElement("div");
    div_h100.setAttribute("class", "card h-100")
    div_col.appendChild(div_h100);

    const imagecard = document.createElement("img");
    imagecard.setAttribute("class", "card-image")
    imagecard.setAttribute("onclick", `goDetail(${question.id})`)
    div_h100.appendChild(imagecard);
    
    const div_card_body = document.createElement("div");
    div_card_body.setAttribute("class", "card-body")
    div_h100.appendChild(div_card_body);
    
    const h5_title = document.createElement("h5");
    h5_title.setAttribute("class", "card-title title")
    div_card_body.appendChild(h5_title);
    
    const a_title = document.createElement("a");
    a_title.setAttribute("class", "font_title")
    a_title.setAttribute("onclick", `goDetail(${question.id})`)
    a_title.innerText = question.title;
    h5_title.appendChild(a_title);

    const p_text = document.createElement("p");
    p_text.setAttribute("class", "card-text")
    p_text.innerText = question.content;
    div_card_body.appendChild(p_text);
    
    if(question.image == null){
        imagecard.setAttribute("src", `https://s3.ap-northeast-2.amazonaws.com/gomunity.shop/media/gomunity.png`);
    } else {
        imagecard.setAttribute("src", `https://s3.ap-northeast-2.amazonaws.com/gomunity.shop${question.image}`);
    }

   })
   localStorage.removeItem("question_id")
}

