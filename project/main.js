

fetch('https://jsonplaceholder.typicode.com/users')
.then (value => value.json())
.then (usersObject =>{
    const container = document.getElementById('users-box');

    for (const user of usersObject) {
        const div = document.createElement('div');
        div.classList.add('newDiv');
        const usersInfo = document.createElement('div');
        usersInfo.innerText =`
                           id: ${user.id},
                           name: ${user.name} 
                           `;
        div.appendChild(usersInfo)

        const linkDetails = document.createElement('a');
        linkDetails.href = `user-details.html?id=${user.id}`;
        linkDetails.innerText = 'More Details';
        div.appendChild(linkDetails);

        container.appendChild(div)
    }
})