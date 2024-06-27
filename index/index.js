const adminForm = document.getElementById('adminForm')

// clear team logos from localStorage if they exist
window.onload = () => {
    if (localStorage.getItem('teamALogo')) {
        localStorage.removeItem('teamALogo')
    }
    if (localStorage.getItem('teamBLogo')) {
        localStorage.removeItem('teamBLogo')
    }
}

// convert image to base64 string
const toBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
    })

// save teamALogo and teamBLogo in the localStorage when adminForm submitted
adminForm.addEventListener('submit', async (e) => {
    const teamALogoForm = document.getElementById('teamALogo')
    const teamBLogoForm = document.getElementById('teamBLogo')

    if (teamALogoForm.files[0]) {
        const teamALogo = await toBase64(teamALogoForm.files[0])
        localStorage.setItem('teamALogo', teamALogo)
    }
    if (teamBLogoForm.files[0]) {
        const teamBLogo = await toBase64(teamBLogoForm.files[0])
        localStorage.setItem('teamBLogo', teamBLogo)
    }
})
