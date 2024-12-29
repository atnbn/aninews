
const apiUrl =
    'https://api.jikan.moe/v4/seasons/2025/winter';


fetch(apiUrl, {
    method: 'GET',
})
    .then(response => response.json())
    .then(data => { console.log(data.data), renderData(data.data); })
    .catch(error => console.error(error));


;

const renderData = (season) => {
    const row = document.querySelector('.row');

    let htmlTemplate = '';
    for (let anime of season) {
        htmlTemplate += `
        <div class="col px-2 border border-white rounded">
            <h5 class="card-title py-2">${anime.title_english ? anime.title_english : anime.title}</h5>
            <div class='col'>
                        ${renderGenres(anime)}
            </div>
            <div class='row'>
                <div class='col-auto'>
                <span class='countdown ' style='font-size:13px;' id='countdown-${anime.mal_id}'>${initializeCountdown(anime)}</span>

                </div>
                <div class='col'>
                </div>
            </div>
            <img class='p-2' src='${anime.images.jpg.image_url}' alt='${anime.title}'>
            <div class="card-body">
                <div class="col overflow-auto" style="max-height: 100px;"><span>${anime.synopsis}</span></div>
                <a href="${anime.trailer.url}" target='_blank' class="btn btn-primary">Watch the Trailer</a>
            </div>
        </div>
        `;
    }
    row.innerHTML = htmlTemplate;

    for (let anime of season) {
        initializeCountdown(anime);
    }
};

const renderGenres = (anime) => {
    return anime.genres.map(genre => `<span class="badge bg-secondary">${genre.name}</span>`).join(' ');
};

const renderYoutubeVideo = (anime) => {
    return anime.trailer.url;
}


const returnAiringDate = (anime) => {
    const airedString = anime.aired.string
    const result = airedString.split("to")[0].trim();
    return result
}

const initializeCountdown = (anime) => {
    const airedString = returnAiringDate(anime);
    const dateMatch = airedString.match(/^\w+ \d{1,2}, \d{4}/);
    const targetDateStr = dateMatch ? dateMatch[0] : null;

    if (targetDateStr) {
        const targetDate = new Date(targetDateStr);

        const updateCountdown = () => {
            const now = new Date();
            const timeDifference = targetDate - now;

            if (timeDifference > 0) {
                const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                //const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

                const countdownElement = document.getElementById(`countdown-${anime.mal_id}`);
                if (countdownElement) {
                    countdownElement.innerHTML = `${days} Days, ${hours} Hours, ${minutes} Minutes`; // ${seconds} Seconds
                }
            } else {
                const countdownElement = document.getElementById(`countdown-${anime.mal_id}`);
                if (countdownElement) {
                    countdownElement.innerText = "The countdown has ended!";
                }
                clearInterval(countdownInterval);
            }
        };

        const countdownInterval = setInterval(updateCountdown, 1000);
        updateCountdown();
    } else {
        const countdownElement = document.getElementById(`countdown-${anime.mal_id}`);
        if (countdownElement) {
            countdownElement.innerText = "No information about the airing date";
        }
    }
};