import fileInfo from "./fileInfo.js"

const containerCards = document.querySelector("#cardContainer")

// "something.format" => ["something", "format"] => "format"
const getFormat = (link) => link.split(".")[link.split(".").length - 1].trim()

const getIcon = function (link) {
    const format = getFormat(link);
    return fileInfo.find(({ formats }) => formats.some(f => f === format)).className
}

const generateCard = el => `
    <div class="card mb-3" style="max-width: 540px">
        <div class="row g-0">
            <div class="col-md-4">
                <div
                class="h-100 w-100 d-flex justify-content-center align-items-center"
                >
                <i class="${getIcon(el.link)} display-1"></i>
                </div>
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${el.title}</h5>
                    <p class="card-text">
                        This is a wider card with supporting text below as a natural
                        lead-in to additional content. This content is a little bit
                        longer.
                    </p>
                    <a download href="${el.link}" class="card-text btn btn-outline-secondary">
                        ${el.title}
                    </a>
                </div>
            </div>
        </div>
    </div>

`

const generateMarkup = function (data) {
    const markup = data.map(generateCard)
    containerCards.insertAdjacentHTML("afterbegin", markup)
}

const getFilsInfo = async function () {
    const res = await fetch(" http://localhost:3000/files");
    const data = await res.json();
    generateMarkup(data)
}

getFilsInfo()