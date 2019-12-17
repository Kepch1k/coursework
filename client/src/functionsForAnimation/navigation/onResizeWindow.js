import siteFooter from "./setSiteFooter";

const onResizeWindow = () => {
    const mainPiece = document.getElementById("mainPiece");
    const navigationWidth = document.getElementById("navigation").offsetWidth;//+15;
    const screenWidth = window.innerWidth;
    //console.log((mainPiece.offsetWidth === (screenWidth - navigationWidth)),mainPiece.offsetWidth,(screenWidth - navigationWidth));
    mainPiece.style.width = (screenWidth - navigationWidth) + "px";
    siteFooter();
};

export default onResizeWindow;