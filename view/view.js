// params from query string
let {
    teamAName,
    teamBName,
    teamATheme,
    teamBTheme,
    bestOf,
    maps,
    tournamentName,
} = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
})

// set team logos from localStorage if they exists. Otherwise set default angular logo.
const teamALogo = localStorage.getItem('teamALogo')
const teamBLogo = localStorage.getItem('teamBLogo')

if (teamALogo) {
    document.querySelector('#teamA .teamLogo').src = teamALogo
}
if (teamBLogo) {
    document.querySelector('#teamB .teamLogo').src = teamBLogo
}

// redirect to home if no params
if (
    !teamAName ||
    !teamBName ||
    !teamATheme ||
    !teamBTheme ||
    !bestOf ||
    !tournamentName
) {
    location.href = '/'
}

if (maps === undefined) {
    maps = []
}

// set tournament names
document.getElementById('tournamentName').innerText = tournamentName

// set team names
document.querySelector('#teamA .teamName').innerText = teamAName
document.querySelector('#teamB .teamName').innerText = teamBName

// set css team color variables for each team
document.documentElement.style.setProperty('--team-a-color', teamATheme)
document.documentElement.style.setProperty('--team-b-color', teamBTheme)

// show best of text
document.getElementById('bestOf').innerText = `Best of ${bestOf}`

// add bestOf logic
const totalMaps = maps.length
let numberOfVotes = totalMaps - bestOf

const mapDivs = document.querySelectorAll('.map')

// remove divs from mapDivs if maps don't include them
mapDivs.forEach((map) => {
    const mapName = map
        .getElementsByClassName('mapName')[0]
        .innerText.toLowerCase()
    if (!maps.includes(mapName)) {
        map.remove()
    }
})

// change banX color in serial to match team theme color
let currentColor = teamATheme
mapDivs.forEach(function (map) {
    map.addEventListener('click', () => {
        const banX = map.getElementsByClassName('banX')[0]

        if (!map.classList.contains('checked')) {
            if (numberOfVotes > 0) {
                if (currentColor === teamATheme) {
                    banX.style.color = teamATheme
                    currentColor = teamBTheme
                } else {
                    banX.style.color = teamBTheme
                    currentColor = teamATheme
                }
                map.classList.add('checked')
                numberOfVotes--
            }
        }
    })
})
