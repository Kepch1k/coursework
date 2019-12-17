const siteFooter = () => {
    if(document.getElementById('content') && document.getElementById('footer')){
        const siteContent = document.getElementById('content');
        const siteFooterHeight = document.getElementById('footer').offsetHeight;
        siteContent.style.marginBottom=(siteFooterHeight)+"px";
    }
};

export default siteFooter;