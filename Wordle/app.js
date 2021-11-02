const searchInput = document.getElementById('search');
const dico = [
    {name: 'hgiguiui'},
    {name: 'ourbfhrgfyfre'},
    {name: 'beurkkkkkkkkk'},
    {name: 'azerty'},
]
searchInput.addEventListener('keyup',function () {
    const input =searchInput.value;
    //console.log(input);  tout est ok :)

    let result = dico.filter(item => item.name.toLocaleLowerCase().includes(input.toLocaleLowerCase()));
    let suggestion = "";
if(input!= '') {
    result.forEach(resultItem =>
        suggestion += `
        <div class='suggestion>${resultItem.name}</div>
    `)
}
    document.getElementById('suggestions').innerHTML = suggestion;
    console.log(result);
})