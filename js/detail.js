import { timeFormat } from "../lib/timeFormat.js";

const params = new URLSearchParams(window.location.search);
const clickedDataId = params.get("dataId");
// console.log(clickedDataId);

const title = document.querySelector("#title");
const writer = document.querySelector("#writer");
const date = document.querySelector("#date");
const content = document.querySelector("#content");
const update = document.querySelector("#update");
const detail = async (clickedDataId) => {
    try {
        const response = await fetch(`http://localhost:3000/board/${clickedDataId}`);
        const data = await response.json();
        // console.log(data);
        title.textContent = data?.data?.title;
        writer.textContent = data?.data?.writer;
        if(data?.data?.updatedAt) {
            date.textContent = `수정일자 ${timeFormat(data?.data?.updatedAt)}`
        } else {
            date.textContent =`작성일자 ${timeFormat(data?.data?.createdAt)}`
        }
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
update.addEventListener('click', (e) => {
    e.preventDefault();
        window.location.href = `update.html?dataId=${clickedDataId}`;
});

// 삭제
const deleteWrite = async (clickedDataId) => {
    try{
        return await fetch(`http://localhost:3000/board/${clickedDataId}/delete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => res.json());
    }catch(e){
        console.log(e);
    }
}
const deleteBtn = document.querySelector("#delete");
deleteBtn.addEventListener("click", () => {
    let deleteOk = confirm("삭제하시겠습니까?");
    if(deleteOk) {
        deleteWrite(clickedDataId);
        window.location.href = 'index.html';
    }
})