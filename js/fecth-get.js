//récupération de la base de donnés des meubles
const getMeuble = async function(){
    let reponse = await fetch ('http://localhost:3000/api/furniture')
    if (reponse.ok){
        return await reponse.json();
    }else{
        alert('erreur resaux');
    }
}

const getMeudleId = async function(id){
    let adresse = 'http://localhost:3000/api/furniture/'+ id
    let reponse = await fetch (adresse);
    if (reponse.ok){
        return await reponse.json();
    }else{
        alert('erreur resaux');
    }
}


//envoi de la commande au serveur et récupération de la réponse
const Post = async function(elementPost, pageRedirection){
    let reponse = await fetch('http://localhost:3000/api/furniture/order',{
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(elementPost)
    });
    if(reponse.ok){
        let repComande = await reponse.text();
        localStorage.setItem('reponsePost', repComande)
        location.href = pageRedirection
    }else{
        alert(reponse)
    }
}
