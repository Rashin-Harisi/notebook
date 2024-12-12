
document.addEventListener("DOMContentLoaded", ()=>{
    const username = window.api.name.env.USERNAME
    document.querySelector('span').textContent = username

    let text = document.getElementById('text')

    const saveButton = document.getElementById('save')
    saveButton.addEventListener('click',()=>{
        window.api.save(text.value)
    })
    const openButton = document.getElementById('open')
    openButton.addEventListener('click',()=>{
        window.api.open()
    })
    
    window.api.successStatus((res)=> {
        text.value = ""
    })
    
    window.api.failStatus((res)=> {
        alert(res)
    })

    window.api.openFile((res)=>{
        text.value = res
    })

})