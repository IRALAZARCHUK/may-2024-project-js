
fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => {
        const container = document.getElementById('full-info');

        for (const user of users) {
            const div = document.createElement('div');
            div.classList.add('newDiv');
            const usersInfo = document.createElement('div');
            usersInfo.innerHTML = `
                <p>id: ${user.id}</p>
                <p>name: ${user.name}</p>
                <p>username: ${user.username}</p>
                <p>email: ${user.email}</p>
                <p>address: 
                  street: ${user.address.street}, 
                  suite: ${user.address.suite}, 
                  city: ${user.address.city}, 
                  zipcode: ${user.address.zipcode},
                  geo: lat: ${user.address.geo.lat}, lng: ${user.address.geo.lng}
                </p>
                <p>phone: ${user.phone}</p>
                <p>website: ${user.website}</p>
                <p>company: 
                  name: ${user.company.name}, 
                  catchPhrase: ${user.company.catchPhrase}, 
                  bs: ${user.company.bs}
                </p>
            `;
            const buttonPost = document.createElement('button');
            buttonPost.innerText = 'Post of current user';
            buttonPost.setAttribute('data-visible', 'false');

            buttonPost.onclick = () => {
                const isVisible = buttonPost.getAttribute('data-visible') === 'true';

                if (isVisible) {
                    hideUserPosts(user.id);
                    buttonPost.innerText = 'Post of current user';
                    buttonPost.setAttribute('data-visible', 'false');
                } else {
                    showUserPosts(user.id);
                    buttonPost.innerText = 'Hide Posts';
                    buttonPost.setAttribute('data-visible', 'true');
                }
            };

            div.appendChild(usersInfo);
            div.appendChild(buttonPost);
            container.appendChild(div);
        }
    });


function showUserPosts(userId) {
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then(response => response.json())
        .then(posts => {
            const postsContainer = document.createElement('div');
            postsContainer.id = `posts-container-${userId}`;
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.innerHTML = `
                    <p>Title: ${post.title}</p>
                    <a href="post-details.html?postId=${post.id}">View Post Details</a>
                `;
                postsContainer.appendChild(postElement);
            });

            const userDiv = document.querySelector(`#full-info .newDiv:nth-child(${userId})`);
            userDiv.appendChild(postsContainer);
        });
}


function hideUserPosts(userId) {
    const postsContainer = document.getElementById(`posts-container-${userId}`);
    if (postsContainer) {
        postsContainer.remove();
    }
}
