const searchBar=document.querySelector('.bookSearch')

searchBar.addEventListener('keyup', function(event) {
    const search = event.target.value;
    const cards=document.querySelectorAll('.card')
    cards.forEach((card)=>{
        const title = card.querySelector('h3').textContent.toLocaleLowerCase()
        if(title.includes(search)){
            card.style.display='';
        }else{
            card.style.display='none'
        }
    })
    console.log(char);
});

