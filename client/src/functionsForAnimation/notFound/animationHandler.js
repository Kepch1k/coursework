import style from "../../components/NotFoundPage/NotFound/NotFound.module.scss";

const animationHandler = ()=>{
    let li = document.querySelector("li");
    let liWidth = li.offsetWidth;
    for(let li of document.querySelectorAll("li")){
        li.style.height=liWidth+"px";
    }
    for(let li of document.querySelectorAll("li")){
        li.style.lineHeight=liWidth+"px";
    }
    let wordsearch = document.querySelector(`#${style.wordsearch}`);
    let totalHeight = wordsearch.offsetWidth;
    document.querySelector(`#${style.wordsearch}`).style.height=totalHeight+"px";
};

export default animationHandler;