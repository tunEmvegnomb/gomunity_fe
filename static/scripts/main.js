window.onload = async function loadQuestions(){
    const questions = await getQuestions();
    console.log(questions);
    const div_cards = document.getElementsByClassName("cards")[0];
   
   questions.forEach((question) => {
    const div_col = document.createElement("div");
    const div_h100 = document.createElement("div");
    const imagecard = document.createElement("img");
    const div_card_body = document.createElement("div");
    const h5_title = document.createElement("h5");
    const a_title = document.createElement("a");
    const p_text = document.createElement("p");
    
    div_col.setAttribute("class", "col");
    div_h100.setAttribute("class", "card h-100")

    if(question.image == null){
        imagecard.setAttribute("src", `https://s3.ap-northeast-2.amazonaws.com/gomunity.shop/media/gomunity.png`);
    } else {
        imagecard.setAttribute("src", `https://s3.ap-northeast-2.amazonaws.com/gomunity.shop${question.image}`);
    }

    imagecard.setAttribute("onclick", `goDetail(${question.id})`)
    div_card_body.setAttribute("class", "card-body")
    h5_title.setAttribute("class", "card-title title")
    a_title.setAttribute("class", "font_title")
    a_title.setAttribute("onclick", `goDetail(${question.id})`)
    p_text.setAttribute("class", "card-text")
    

    a_title.innerText = question.title;
    p_text.innerText = question.content;

    div_cards.appendChild(div_col);
    div_col.appendChild(div_h100);
    div_h100.appendChild(imagecard);
    div_h100.appendChild(div_card_body);
    div_card_body.appendChild(h5_title);
    div_card_body.appendChild(p_text);
    h5_title.appendChild(a_title);
 
   })
   localStorage.removeItem("question_id")
}

