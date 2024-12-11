
document.addEventListener("DOMContentLoaded", ()=>{
    const username = window.api.name.env.USERNAME
    document.querySelector('span').textContent = username

    let text = document.getElementById('text')

    const saveButton = document.getElementById('save')
    saveButton.addEventListener('click',()=>{
        window.api.save(text.value)
    })
    const cancelButton = document.getElementById('cancel')
    cancelButton.addEventListener('click',()=>{
        window.api.cancel()
    })
    
    window.api.successStatus((res)=> {
        text.value = ""
    })
    
    window.api.failStatus((res)=> {
        alert(res)
    })

})