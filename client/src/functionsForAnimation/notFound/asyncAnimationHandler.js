import style from "../../components/NotFoundPage/NotFound/NotFound.module.scss";

const asyncAnimationHandler = async ()=>{
    const sleep = m => new Promise(r => setTimeout(r, m));
    const timeSleep=500;
    try{
        await sleep(timeSleep);
        document.querySelector(`.one`).className+=` ${style.selected}`;
        await sleep(timeSleep);
        document.querySelector(`.two`).className+=` ${style.selected}`;
        await sleep(timeSleep);
        document.querySelector(`.three`).className+=` ${style.selected}`;
        await sleep(timeSleep);
        document.querySelector(`.four`).className+=` ${style.selected}`;
        await sleep(timeSleep);
        document.querySelector(`.five`).className+=` ${style.selected}`;
        await sleep(timeSleep);
        document.querySelector(`.six`).className+=` ${style.selected}`;
        await sleep(timeSleep);
        document.querySelector(`.seven`).className+=` ${style.selected}`;
        await sleep(timeSleep);
        document.querySelector(`.eight`).className+=` ${style.selected}`;
        await sleep(timeSleep);
        document.querySelector(`.nine`).className+=` ${style.selected}`;
        await sleep(timeSleep);
        document.querySelector(`.ten`).className+=` ${style.selected}`;
        await sleep(timeSleep);
        document.querySelector(`.eleven`).className+=` ${style.selected}`;
        await sleep(timeSleep);
        document.querySelector(`.twelve`).className+=` ${style.selected}`;
        await sleep(timeSleep);
        document.querySelector(`.thirteen`).className+=` ${style.selected}`;
        await sleep(timeSleep);
        document.querySelector(`.fourteen`).className+=` ${style.selected}`;
        await sleep(timeSleep);
        document.querySelector(`.fifteen`).className+=` ${style.selected}`;
    }
    catch (e) {

    }
};

export default asyncAnimationHandler;