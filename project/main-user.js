fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => {
        const container = document.getElementById('full-info');


        let currentUserId = null;

        for (const user of users) {
            const div = document.createElement('div');
            div.classList.add('newDiv');
            const usersInfo = document.createElement('div');
            usersInfo.innerText = `
                id: ${user.id},
                name: ${user.name},
                username: ${user.username},
                email: ${user.email},
                address: 
                  street: ${user.address.street},
                  suite: ${user.address.suite},
                  city: ${user.address.city},
                  zipcode: ${user.address.zipcode},
                  geo:
                    lat: ${user.address.geo.lat},
                    lng: ${user.address.geo.lng},
                phone: ${user.phone},
                website: ${user.website},
                company: 
                  name: ${user.company.name},
                  catchPhrase: ${user.company.catchPhrase},
                  bs: ${user.company.bs}
            `;
            div.appendChild(usersInfo);

            const button = document.createElement('button');
            button.innerText = 'Show Posts';
            button.addEventListener('click', () => {
                currentUserId = user.id;
                fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`)
                    .then(response => response.json())
                    .then(posts => {
                        const postsBox = document.getElementById('posts');
                        postsBox.innerHTML = '';

                        posts.forEach(post => {
                            const postDiv = document.createElement('div');
                            postDiv.classList.add('post');
                            postDiv.innerHTML = `
                                <h2>${post.title}</h2>  
                                <button data-post-id="${post.id}">
                                    Post Details
                                </button>
                            `;
                            postsBox.appendChild(postDiv);
                        });
                    })

            });

            div.appendChild(button);
            container.appendChild(div);
        }

    })
