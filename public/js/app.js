console.log("hi there in app.js")



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log(search.value)
    fetch('http://localhost:3000/weather?address='+search.value).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log('error while fetching data')
        }else{
            console.log(data.forecast)
        }
    })

})
})

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         if(data.error){
//             console.log('error while fetching data')
//         }else{
//             console.log(data)
//         }
//     })

// })