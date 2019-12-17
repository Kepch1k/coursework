const checkNeedReAnimation = () => {
    if(document.getElementById("navigation")&&document.getElementById("mainPiece")) {
        const mainPiece = document.getElementById("mainPiece");
        const navigationWidth = document.getElementById("navigation").offsetWidth;//+15;
        const screenWidth = window.innerWidth;
        //console.log((mainPiece.offsetWidth !== (screenWidth - navigationWidth)),mainPiece.offsetWidth,(screenWidth - navigationWidth));
        return (mainPiece.offsetWidth !== (screenWidth - navigationWidth));
    }else{
        return false;
    }
};

export default checkNeedReAnimation;