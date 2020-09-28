//recuperation de la base de donnes

const getMeuble = async function(){
    let reponse = await fetch ('http://localhost:3000/api/furniture')
    if (reponse.ok){
        localStorage.setItem('dataMeuble', await reponse.text());
    }else{
        console.log('erreur resaux');
    }
}

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
        console.log(reponse)
    }
}
