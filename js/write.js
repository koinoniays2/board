const write = async (title, content) => {
    try {
        const data = {
            title,
            description: content,
            writer: '비회원'
        };
        await fetch(' http://localhost:3000/board/write', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }catch(e) {
        console.log(e);
    }
}

document.getElementById('submit').addEventListener('click', async (event) => {
    event.preventDefault();

    const titleInput = document.getElementById('title');
    const contentTextarea = document.getElementById('content');

    const title = titleInput.value;
    const content = contentTextarea.value;

    await write(title, content);

    titleInput.value = '';
    contentTextarea.value = '';
    window.location.href = 'index.html';
});

/*
document.getElementById('form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const titleInput = document.getElementById('title');
    const contentTextarea = document.getElementById('content');

    const title = titleInput.value;
    const content = contentTextarea.value;

    await write(title, content);

    // 폼을 초기화하거나 다른 작업을 수행할 수 있습니다.
    titleInput.value = '';
    contentTextarea.value = '';
    window.location.href = 'index.html';
});
*/