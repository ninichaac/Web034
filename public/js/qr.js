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

function data() {
    const dtable = document.querySelector('tbody');
    let data = '';
    for (const i of assets) {
        data += `<tr><td><input type = "checkbox" value="${i.id}"></td>`;
        data += `<td>${i.id}</td>`;
        data += `<td>${i.name}</td>`;
        data += `<td>${i.status == 1 ? "Normal" : "Lost"}</td></tr>`;
    }
    dtable.innerHTML = data;
    qrcode();
}

function qrcode() {
    document.querySelector('#qr').onclick = function () {
        const selectedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        const qrcodeContainer = document.getElementById('qrcode');

        if (selectedCheckboxes.length > 0) {
            qrcodeContainer.innerHTML = "";

            selectedCheckboxes.forEach((checkbox) => {
                const assetId = checkbox.value;
                const qrCodeDiv = document.createElement("div");
                qrCodeDiv.style.padding = "16px 0px 16px 0px";

                const idSpan = document.createElement("span");
                idSpan.style.fontSize = "18px";
                idSpan.textContent = assetId;

                const qrcode = new QRCode(qrCodeDiv, {
                    text: `${assetId}`,
                    width: 150,
                    height: 150,
                    colorDark: "#000000",
                    colorLight: "#ffffff",
                    correctLevel: QRCode.CorrectLevel.H,
                });
                qrcodeContainer.appendChild(qrCodeDiv);
                qrCodeDiv.appendChild(idSpan);
            });
        }
        else {
            alert("Please select an ID to generate a QR code.");
        }
    }
}

data();

document.querySelector('#signout').onclick = function () {
    window.location.replace('asset.html');
}
