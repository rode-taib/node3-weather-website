console.log('Client side javaScript file is loaded');



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const massage1 = document.querySelector('#massage_1')
const massage2 = document.querySelector('#massage_2')

weatherForm.addEventListener('submit', (e)=>{
  e.preventDefault()
  const address = search.value
  
  const url = "/weather?address="+address
massage1.textContent = 'Loading..'
massage2.textContent=''
fetch(url).then((response)=>{
  response.json().then((data)=>{
      if(data.error){
        massage1.textContent =data.error
          console.log(data.error);
      }else{
        massage1.textContent = search.value
        console.log(data)
        massage2.textContent = 'Temprature is '+data.temprature+' and it feels like '+data.feelsLike;
       
        
      } 
  })
});
})
