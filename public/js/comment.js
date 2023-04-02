const blogPost = $('.blog-post');
const commentButton = $('.comment-button')
const submitButton = $('#submitButton');

submitButton.on('click', async (event) => {
    event.preventDefault();

    console.log(event)
    const textArea = $('#textArea').val()

    const response = await fetch('/api/users/comment', {
        method: 'POST',
        body: JSON.stringify({'content': textArea}),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        location.reload()
    } else {
        alert(response.statusText);
    }
})

commentButton.on('click', (event) => {
    event.stopPropagation();
    
    const commentArea = $('.comment-area')
    commentArea.css('display', 'block')
})

blogPost.mouseover(() => {
    blogPost.css('cursor', 'pointer')
})

blogPost.on('click', (event) => {
    const postNumber = $(event.target).closest('.blog-post').attr('data-post-id')
    window.location.pathname = `/post/${postNumber}`
})