const users = [
    { "id": 1, "username": "admin", "password": "1111", "role": 1 },
    { "id": 2, "username": "aaa", "password": "2222", "role": 2 },
    { "id": 3, "username": "bbb", "password": "333", "role": 2 }
];

document.querySelector('button').onclick = function () {
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;

    for (const i of users) {
        if (username == i.username && password == i.password) {
            //alert
            window.location.replace('list2.html');
            break;
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Login failed, try again!',
            })
        }
    }

}