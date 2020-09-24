let idElementSelect;

const creePageIndex = function(){
    let dataMeuble = JSON.parse(localStorage.getItem('dataMeuble'));
    
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

        document.getElementById(dataMeuble[i]._id).addEventListener('click', function(){
            localStorage.setItem('articleChoisi', idElementSelect = i);
        });
    }
}

if (localStorage.getItem('dataMeuble') === null){
    const premierUtilisation = async function(){
        await getMeuble();
        creePageIndex();
    }
    premierUtilisation();
}else{
    creePageIndex();
}