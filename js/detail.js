const params = new URLSearchParams(window.location.search);
const clickedDataId = params.get("dataId");
console.log(clickedDataId);

const title = document.querySelector("#title");
const writer = document.querySelector("#writer");
const date = document.querySelector("#date");
const content = document.querySelector("#content");
const update = document.querySelector("#update");
const detail = async (clickedDataId) => {
    try {
        const response = await fetch(`http://localhost:3000/board/${clickedDataId}`);
        const data = await response.json();
        console.log(data);
        title.textContent = data?.data?.title;
        writer.textContent = data?.data?.writer;
        date.textContent = data?.data?.createdAt.substring(0, 10);
        // 연속 공백, 줄바꿈 표시
        const description = data?.data?.description;
        const formattedDescription = description.replace(/\n/g, '<br>').replace(/\s/g, '&nbsp;');
        content.innerHTML = formattedDescription;
    }catch(e) {
        console.log(e);
    }
}
detail(clickedDataId);

// 수정페이지 이동
update.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(`http://localhost:3000/board/${clickedDataId}`);
        const data = await response.json();
        window.location.href = `update.html?dataId=${clickedDataId}`;
    } catch (error) {
        console.error(error);
    }
});