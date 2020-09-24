let dataMeuble = JSON.parse(localStorage.getItem('dataMeuble'));
let articleID = localStorage.getItem('articleChoisi');

const conteneur = document.getElementById('detail-article');

conteneur.appendChild(document.createElement("h2")).innerText = dataMeuble[articleID].name;
conteneur.appendChild(document.createElement("img")).setAttribute("src", dataMeuble[articleID].imageUrl);
conteneur.appendChild(document.createElement("p")).innerText = dataMeuble[articleID].description;
conteneur.appendChild(document.createElement("h3")).innerText = dataMeuble[articleID].price + "€";

conteneur.appendChild(document.createElement('select')).setAttribute('id', 'listeOption');
for(i = 0; i < dataMeuble[articleID].varnish.length; i++){
    document.getElementById('listeOption').appendChild(document.createElement("option")).innerText = dataMeuble[articleID].varnish[i];
}

let button = document.createElement('button');
conteneur.appendChild(button).setAttribute('id', 'retour');
button.innerText = "retour";

button = document.createElement('button');
conteneur.appendChild(button).setAttribute('id', 'ajoutPanier');
button.innerText = "ajoute au panier";

document.getElementById('ajoutPanier').addEventListener('click',function(){
    if(localStorage.getItem('panier') === null){
        let Panier = [{
            name: articleID,
            quantiter: 1,
        }]
        let AjouterPanier = JSON.stringify(Panier);
        localStorage.setItem('panier', AjouterPanier);
    }else{
        let Panier = JSON.parse(localStorage.getItem('panier'));
        let reponse;
        let reponseID;

        for(let i = 0; i<Panier.length; i++){
            if(articleID === Panier[i].name){
                reponse = true;
                reponseID = i
                }
            }

        if(reponse === true){
            let quantiter = Panier[reponseID].quantiter;
            quantiter = quantiter + 1;
            Panier[reponseID].quantiter = quantiter;
            localStorage.setItem('panier', JSON.stringify(Panier));
        }else{
            let nouvPanier = {
                name: articleID,
                quantiter: 1,
            }
            Panier.push(nouvPanier)
            let AjouterPanier = JSON.stringify(Panier);
            localStorage.setItem('panier', AjouterPanier);
        }
    }
})