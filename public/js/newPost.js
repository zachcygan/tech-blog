const newPostButton = $('#createNewPost');
const submitPost = $('#postSubmit')
const post = $('.blogpost')
const form = $('#newPostForm');

newPostButton.on('click', async (event) => {
    event.preventDefault();

    console.log('button clicked')
    form.css('display', 'block')
})

post.mouseover(() => {
    post.css('cursor', 'pointer')
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

    console.log(response)

    if (response.ok) {
        location.reload();
    } else {
        alert(response.statusText)
    }
})

