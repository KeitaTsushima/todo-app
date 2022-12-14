const getPuzzle = async wordCount => {
    const response = await fetch(`//puzzle.mead.io/puzzle?wordCount=${wordCount}`)

    if (response.status === 200) {
        const data = await response.json()
        return data.puzzle
    } else {
        throw new Error('Unable to get puzzle')
    }
}

// const getPuzzleOld = (wordCount) => {
//     return fetch(`https://puzzle.mead.io/puzzle?wordCount=${wordCount}`, {}).then((response) => {
//         if(response.status === 200) {
//             return response.json()
//         } else {
//             throw new Error('Unable to fetch puzzle')
//         }
//     }).then((data) => {
//         return data.puzzle
//     })
// }


const getCountry = async countryCode => {
    const response = await fetch('//restcountries.com/v3.1/all')

    if (response.status === 200) {
        const data = await response.json()
        return data.find(country => country.cca2 === countryCode)
    } else {
        throw new Error('Shame!!!!!')
    }
}


const getCountryOld = (countryCode) => {
    return fetch('//restcountries.com/v3.1/all').then(response => {
        if(response.status === 200) {
            return response.json()
        } else {
            throw new Error('Shame!!!!!')
        }
    }).then(data => {
        return data.find(country => country.cca2 === countryCode)
    })
}


const getLocation = async () => {
    const response = await fetch('//ipinfo.io/json?token=03f9d39707a0bf')
    if (response.status === 200) {
        return data = await response.json()
    } else {
        throw new Error('Something is being missed!')
    }
}


const getLocationOld = () => {
    return fetch('//ipinfo.io/json?token=03f9d39707a0bf').then(response => {
        if (response.status === 200) {
            return response.json()
        } else {
            throw new Error('Something is being missed!')
        }
    })
}


const getCurrentCountryOld = async () => {
    const responseOne = await fetch('//ipinfo.io/json?token=03f9d39707a0bf')
    const responseTwo = await fetch('//restcountries.com/v3.1/all')

    if (responseOne.status === 200 && responseTwo.status === 200) {
        const location = await responseOne.json()
        const countryCode = await location.country
        const countries = await responseTwo.json()
        const myCountry = await countries.find(country => country.cca2 === countryCode)
        return myCountry
    } else {
        throw new Error('Zannnenn!')
    }
}


const getCurrentCountry = async () => {
    const location = await getLocation()
    return getCountry(location.country)
}
