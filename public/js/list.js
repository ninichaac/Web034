const assets = [
    {
        "id": 662500200564001, "name": "laptop", "status": 1, "image": "1665382383102.jpg"
    },
    {
        "id": 673000100364002, "name": "projector", "status": 0, "image": "1665566532088.jpg"
    },
    {
        "id": 744001200561020, "name": "UPS", "status": 0, "image": "1665544789222.jpg"
    }
];

function output() {
    const dtable = document.querySelector('tbody');
    let data = '';
    for (const i of assets) {
        data += `<tr><td><input type = "checkbox""></td>`;
        data += `<td>${i.id}</td>`;
        data += `<td>${i.name}</td>`;
        data += `<td>${i.status == 1 ? "Normal" : "Lost"}</td></tr>`;
    }
    dtable.innerHTML = data;
}

output();

document.querySelector('#signout').onclick = function () {
    window.location.replace('asset.html');
}