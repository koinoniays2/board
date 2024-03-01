const params = new URLSearchParams(window.location.search);
const clickedDataId = params.get("dataId");
console.log(clickedDataId);

const title = document.querySelector("#title");
const writer = document.querySelector("#writer");
const date = document.querySelector("#date");
const content = document.querySelector("#content");
const detail = async (clickedDataId) => {
    try {
        const response = await fetch(`https://test-koinonia.koyeb.app/board/${clickedDataId}`);
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