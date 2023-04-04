const newPostButton = $('#createNewPost');
const submitPost = $('#postSubmit')
const post = $('.blogpost')
const form = $('#newPostForm');
const deleteButton = $('#deletePostButton')
const updateButton = $('#updatePostButton')
const comment = $('.commentButton')

newPostButton.on('click', async (event) => {
    event.preventDefault();

    console.log('button clicked')
    form.css('display', 'block')
})

post.mouseover(() => {
    post.css('cursor', 'pointer')
})

updateButton.on('click', async (event) => {
    event.preventDefault();
    const postId = comment.attr('id')
    console.log(postId)

    const title = $('#mainPostTitle').text();
    const content = $('#mainPostBody').text();
    console.log(title)
    console.log(content)
    if (!title || !content) {
        return;
    }

    const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({ 
            'name': title, 
            'description': content 
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    })

    if (response.ok) {
        location.reload();
    } else {
        alert(response.statusText)
    }
})

deleteButton.on('click', async (event) => {
    event.preventDefault();
    const postId = comment.attr('id')
    console.log(postId)

    const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    if (response.ok) {
        window.location.pathname = '/dashboard';
    } else {
        alert(response.statusText)
    }
})

post.on('click', (event) => {
    console.log($(event.target).closest('.blogpost').attr('data-post-id'))
    const postNumber = $(event.target).closest('.blogpost').attr('data-post-id')
    window.location.pathname = `/post/${postNumber}`
})

submitPost.on('click', async (event) => {
    event.preventDefault();

    const title = $('#postTitle').val();
    const content = $('#postContent').val();

    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ 
            'name': title, 
            'description': content 
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    })

    if (response.ok) {
        location.reload();
    } else {
        alert(response.statusText)
    }
})

