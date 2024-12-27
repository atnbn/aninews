
const card = document.getElementById('card');
const apiUrl =
    'https://api.myanimelist.net/v2/anime/season/2025/winter'
fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('test', data)
    })
    .catch(error => {
        console.error(error)
    });
;

const createImage = (url) => {


    let img = document.createElement(
        'img'
    )

    img.src = url


    document.getElementById('card').append(img)

}