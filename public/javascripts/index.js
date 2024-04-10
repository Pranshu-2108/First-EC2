window.onload = () => {
    init();
};

const init = () => {
    const uploadlist = document.querySelector("#uploadlist")

    listUploads();
}

const listUploads = () => {
    fetch('/listfiles', {
        method: 'GET'
    })
    .then(res => res.json())
    .then(res => {
        console.log(res);
        if(res.Contents) {
            console.log("Hii 2");
            uploadlist.innerHTML = res.Contents.map(f => 
            `<li>
                ${f.Key}
                <button onClick="deleteFile('${f.Key}')">Delete</button>
            </li>`).join('');
        }
    })
    .catch(err => {
        console.log(err);
        alert('error');
    })
}

const deleteFile = (key) => {
    fetch(`/deleteFile/${encodeURIComponent(key)}`, {
        method: "DELETE",
        body : JSON.stringify(key)
    })
    .then(res => res.json())
    .then(res => {
        console.log(res)
        listUploads();
    }
    )
    .catch(err => {
        console.log(err)
        alert("error");
    })
}