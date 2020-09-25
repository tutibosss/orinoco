//recuperation des donnai pour la conception de la page

let idElementSelect;

const creePageIndex = function(){
    let dataMeuble = JSON.parse(localStorage.getItem('dataMeuble'));

    //conception de chaque aticle dans la pages
    
    for (let i = 0; i < dataMeuble.length; i++){

        const conteneur_article = document.getElementById("conteneur-article");

        const new_article = document.createElement("a");
        conteneur_article.appendChild(new_article);
        new_article.className = 'article';
        new_article.id = dataMeuble[i]._id;
        new_article.setAttribute("href", "./article.html");


        let elmentEnCour = document.getElementById(dataMeuble[i]._id);

        elmentEnCour.appendChild(document.createElement("h2")).innerText = dataMeuble[i].name;
        elmentEnCour.appendChild(document.createElement("img")).setAttribute("src", dataMeuble[i].imageUrl);
        elmentEnCour.appendChild(document.createElement("p")).innerText = dataMeuble[i].description;
        elmentEnCour.appendChild(document.createElement("h3")).innerText = dataMeuble[i].price + "€";

        //ajout de l'event qui lit le click sur larticle que lon veut en detail

        document.getElementById(dataMeuble[i]._id).addEventListener('click', function(){
            localStorage.setItem('articleChoisi', idElementSelect = i);
        });
    }
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