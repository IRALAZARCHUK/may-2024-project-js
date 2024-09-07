fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(posts => {
        const container = document.getElementById('post-info');

        for (const post of posts) {
            const div = document.createElement('div');
            div.classList.add('newDiv');

            const usersInfo = document.createElement('div');
            usersInfo.innerHTML = `
                <h2>Title: ${post.title}</h2>
                <p>Body: ${post.body}</p>
                <p><strong>User ID:</strong> ${post.userId}</p>
                <p><strong>Post ID:</strong> ${post.id}</p>
            `;

            const buttonPost = document.createElement('button');
            buttonPost.innerText = 'Show Comments';
            buttonPost.setAttribute('data-visible', 'false');

            buttonPost.onclick = () => {
                const isVisible = buttonPost.getAttribute('data-visible') === 'true';

                if (isVisible) {
                    hideUserComments(post.id);
                    buttonPost.innerText = 'Show Comments';
                    buttonPost.setAttribute('data-visible', 'false');
                } else {
                    showUserComments(post.id);
                    buttonPost.innerText = 'Hide Comments';
                    buttonPost.setAttribute('data-visible', 'true');
                }
            };

            div.appendChild(usersInfo);
            div.appendChild(buttonPost);
            container.appendChild(div);
        }
    });


function showUserComments(postId) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        .then(response => response.json())
        .then(comments => {
            const commentContainer = document.getElementById(`comments-container-${postId}`) || document.createElement('div');
            commentContainer.classList.add('comments-div')
            commentContainer.id = `comments-container-${postId}`;
            commentContainer.innerHTML = '';

            comments.forEach(comment => {
                const commentElement = document.createElement('div');
                commentElement.classList.add('comment-el-div')
                commentElement.innerHTML = `
                    <p><strong>${comment.name}</strong> (${comment.email})</p>
                    <p>${comment.body}</p>
                    <hr/>
                `;
                commentContainer.appendChild(commentElement);
            });

            const postDiv = document.querySelector(`#post-info .newDiv:nth-child(${postId})`);
            postDiv.appendChild(commentContainer);
        });
}


function hideUserComments(postId) {
    const commentContainer = document.getElementById(`comments-container-${postId}`);
    if (commentContainer) {
        commentContainer.remove();
    }
}