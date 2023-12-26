
const searchInput = document.querySelector('.search')
const searchOptions = document.querySelector('.options')

const api = 
`https://gist.githubusercontent.com/VasilyMur
/43ef6df83bba694f871f11a16ed7556d/raw/
b6edff674e35452d6c57ec64177a558f7adb432e/moscowSubway.json`;

const stations = [];

fetch(api)
    .then((response, reject) => response.json())
    .then( data => {
        
        data.forEach( line => {
            stations.push(...line.stations)
        })
        
        // console.log('station>>>>>', stations)
    }) 



function getOptions(word, stations) {
    return stations.filter( station => {
        const regex = new RegExp (word, 'gi')
        return station.name.match(regex)
    })
}


function displayOptions() {
    // console.log('this.value ->', this.value)
    const options = getOptions(this.value, stations)
    // console.log(options)

    const markup = options.map(option => {

        // проверка и подмена ввода на спан с таким же текстом но с желтым фоном
        const regex = new RegExp(this.value, 'gi')
        const stationNameIncludes = option.name.replace(regex, `
            <span style="background-color: yellow">${regex}</span>
            `
            )
        return `<li><span>${stationNameIncludes}</span></li>`
        
        // return `<li><span>${option.name}</span></li>`
    }).slice(0,10).join('')
//join для того,ч тобы между элементами не было запятой, преоб-м массив в строку
// slice  показывает нам только 10 элементов из всего массива, чтобы список не был оч большим
searchOptions.innerHTML = this.value ? markup : null
// можно было бы написать просто markup и все бы работало, проблема в том ,что когда значение в поле ввода стерли, все равно показываются какие-то варианты. Для этого добавлили проверку, если поле ввода пустое - ничего не показываем.

}


searchInput.addEventListener('keyup', displayOptions)
