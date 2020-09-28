const creePageIndex = function(){
    let dataMeuble = JSON.parse(localStorage.getItem('dataMeuble'));

    //conception de chaque aticle dans la pages
    let conteneur = document.getElementById("conteneur-article");
    creeListeArticleIndex(conteneur, dataMeuble);
}

//pour un chargement plus rapide d l'index creation de fonction
//ci c'est la premier fois recupere la base de donne puis cree la page
const chargementPagePremierFois = async function(){
    await getMeuble();
    creePageIndex();
}

//ci ca ne les pas cree la page et verifier ci la base de donne na pas etait mise a jour, ci c'est le cas reload la page
const verif = async function(){
    let ancienneData = localStorage.getItem('dataMeuble');
    await getMeuble();
    let newData = localStorage.getItem('dataMeuble');
    if (ancienneData != newData){
        window.location.reload();
    }
}

//pour un chargement plus rapide de lindex 

if(localStorage.getItem('dataMeuble')=== null){
    chargementPagePremierFois();
}else{
    creePageIndex();
    verif();
}