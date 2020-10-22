const server = "http://192.168.1.128:80";
const xhr = new XMLHttpRequest();

function zipRequest(file) {
    if (!file) {
        return document.getElementById('status').textContent = 'Выберите файл! Пожалуйста... ♥';
    }
    let formData = new FormData();
    formData.append('userfile', file);
    xhr.open('POST', server + '/fileDown', true);
    xhr.setRequestHeader("Accept","multipart/form-data");
    xhr.send(formData);
    xhr.onload = () => {
        document.getElementById('download').style.display = 'flex';
        document.getElementById('download').firstElementChild.setAttribute('href', `${xhr.response}`);
        document.getElementById('download').firstElementChild.setAttribute('download', '');
    }
    xhr.onerror = () => {
        document.getElementById('status').textContent = 'Ошибка соединения... Т_Т';
    }
    xhr.onprogress = (e) => {
        document.getElementById('status').textContent = `Загрузка... ${e.loaded} из ${e.total}`;
    }
}
function unzipRequest(file) {
    if (!file) {
        return document.getElementById('status').textContent = 'Выберите файл! Пожалуйста... ♥';
    }
    xhr.open('POST', server + '/decode', true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(`file=${file}`);
    xhr.onload = () => {

    }
    xhr.onerror = () => {
        document.getElementById('status').textContent = 'Ошибка соединения... Т_Т';
    }
    xhr.onprogress = (e) => {
        document.getElementById('status').textContent = `Загрузка... ${e.loaded} из ${e.total}`;
    }
}

