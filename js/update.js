const params = new URLSearchParams(window.location.search);
const clickedDataId = params.get("dataId");
console.log(clickedDataId);

const titleInput = document.querySelector("#title");
const contentArea = document.querySelector("#content");
const update = document.querySelector("#submit");

const detail = async (clickedDataId) => {
    try {
        const response = await fetch(`http://localhost:3000/board/${clickedDataId}`);
        const data = await response.json();
        console.log(data);
        titleInput.value = data?.data?.title;
        contentArea.value = data?.data?.description;
    }catch(e) {
        console.log(e);
    }
}

let requestData;
detail(clickedDataId).then(() => {
    requestData = {title:titleInput.value, description:contentArea.value};
    console.log(requestData);
    update.addEventListener("click", async function(e) {
        e.preventDefault();
        try {
            // 제출 시 현재 값으로 업데이트
            requestData.title = titleInput.value;
            requestData.description = contentArea.value;
            const response = await fetch(`http://localhost:3000/board/${clickedDataId}/update`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });
            const responseData = await response.json();
            console.log("Server response:", responseData);
            
            window.location.href = `detail.html?dataId=${clickedDataId}`;
        } catch (error) {
            console.error('Error occurred:', error);
        }
    });
});

