//add active class in selected tab
const li = document.querySelectorAll('.menuList');

function activeLink() {
    li.forEach((item)=> item.classList.remove('active'));
    this.classList.add('active');
}

li.forEach((item)=>item.addEventListener('click',activeLink) )