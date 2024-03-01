const list = async () => {
    try {
        const response = await fetch('http://localhost:3000/board');
        const data = await response.json();
        console.log(data);
        const listNumDiv = document.querySelector(".content-num");
        const listTitleDiv = document.querySelector(".content-title");
        const listWriterDiv = document.querySelector(".content-writer");
        const listDateDiv = document.querySelector(".content-date");
        data?.data?.forEach((item) => {
            const listNum = document.createElement("p");
            const listTitle = document.createElement("p");
            const listWriter = document.createElement("p");
            const listDate = document.createElement("p");

            listNum.textContent = item.boardNumber;
            listTitle.innerHTML = 
            `<a href="detail.html?dataId=${item._id}">
                ${item.title}
            </a>`;
            listWriter.textContent = item.writer;
            listDate.textContent = item.createdAt.substring(5, 10);

            listNumDiv.appendChild(listNum);
            listTitleDiv.appendChild(listTitle);
            listWriterDiv.appendChild(listWriter);
            listDateDiv.appendChild(listDate);
        })
    }catch(e) {
        console.log(e);
    }
}
list();