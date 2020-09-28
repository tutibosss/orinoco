//fonction pour la cration de la liste d'article
const creeListeArticleIndex = function(conteneur, dataListe){
    for (let i = 0; i < dataListe.length; i++){

        data = dataListe[i]

        creeLien(conteneur, data._id, "./article.html", "");
        document.getElementById(data._id).className = "article";

        let elmentEnCour = document.getElementById(data._id);
        creeArticle(elmentEnCour, data.name, data.imageUrl, data.description, data.price);

        let idElementSelect
        document.getElementById(data._id).addEventListener('click', function(){
            localStorage.setItem('articleChoisi', idElementSelect = i);
        });
    }
}

//fonction de la creation de la page

const creePageIndex = function(){
    let dataMeuble = JSON.parse(localStorage.getItem('dataMeuble'));

    let conteneur = document.getElementById("conteneur-article");
    creeListeArticleIndex(conteneur, dataMeuble);
}

//fonction du premier chargement de la page
const chargementPagePremierFois = async function(){
    await getMeuble();
    creePageIndex();
}

//fonction de verif ci la base de donne na pas etait modifier
const verif = async function(){
    let ancienneData = localStorage.getItem('dataMeuble');
    await getMeuble();
    let newData = localStorage.getItem('dataMeuble');
    if (ancienneData != newData){
        return true
    }else{
        return false
    }
}

//Action ci la base e donne et modifier
const verifMiseJourAction = async function(){
    let reponse = await verif()
    console.log(reponse)
    if(reponse === true){
            window.location.reload()
    }
}

//Chargement final de la page index

if(localStorage.getItem('dataMeuble')=== null){
    chargementPagePremierFois();
}else{
    creePageIndex();
    verifMiseJourAction();
}