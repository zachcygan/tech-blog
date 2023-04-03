const newPostButton = $('#createNewPost');
const submitPost = $('#postSubmit')

newPostButton.on('click', async (event) => {
    event.preventDefault();
    console.log('button clicked')
    const form = $('#newPostForm');
    form.css('display', 'block')
})



submitPost.on('click', async (event) => {
    event.preventDefault();

    const title = $('#postTitle').val();
    const description = $('#postContent').val();

    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ 
            'name': title, 
            'description': description 
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

