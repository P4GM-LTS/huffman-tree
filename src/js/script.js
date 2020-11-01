const server = "http://192.168.1.128:80";
const xhr = new XMLHttpRequest();

function zipRequest(file) {
    if (!file) {
        return document.getElementById('status').textContent = 'Выберите файл! Пожалуйста... ♥';
    }
    let formData = new FormData();
    formData.append('userfile', file);
    xhr.open('POST', server + '/zip', true);
    xhr.setRequestHeader("Accept","multipart/form-data");
    xhr.send(formData);
    xhr.onload = () => {
        document.getElementById('download').style.display = 'flex';
        document.getElementById('download').firstElementChild.setAttribute('href', `${server}` + '/downloads/' + `${xhr.response}`);
        document.getElementById('download').firstElementChild.setAttribute('download', '');
        document.getElementById('status').textContent = '';
    }
    xhr.onerror = () => {
        document.getElementById('status').textContent = 'Ошибка соединения... Т_Т';
    }
}
function unzipRequest(file) {
    if (!file) {
        return document.getElementById('status').textContent = 'Выберите файл! Пожалуйста... ♥';
    }
    let formData = new FormData();
    formData.append('userfile', file);
    xhr.open('POST', server + '/unzip', true);
    xhr.setRequestHeader("Accept","multipart/form-data");
    xhr.send(formData);
    xhr.onload = () => {
        document.getElementById('download').style.display = 'flex';
        document.getElementById('download').firstElementChild.setAttribute('href', `${server}` + '/downloads/' + `${xhr.response}`);
        document.getElementById('download').firstElementChild.setAttribute('download', '');
        document.getElementById('status').textContent = '';
    }
    xhr.onerror = () => {
        document.getElementById('status').textContent = 'Ошибка соединения... Т_Т';
    }
}

