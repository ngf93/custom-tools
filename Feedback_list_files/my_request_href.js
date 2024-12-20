
if (document.querySelectorAll('.cardib') != null){
     document.querySelectorAll('.cardib').forEach((c)=>{
        c.querySelector('.rogs>.dlock>.gapler>.btonchik').onclick = ()=>{
            document.querySelector('#openform').href = c.querySelector('.rogs>.dlock>.gapler>.fbs').href
        }
    })
}
if (document.querySelectorAll('.cardibread') != null){
 document.querySelectorAll('.cardibread').forEach((c)=>{
     if (c.querySelector('.rogs>.dlock>.gapler>#TaskHasBeenDone') != null) {
         c.querySelector('.rogs>.dlock>.gapler>#TaskHasBeenDone').onclick = () => {
             document.querySelector('.SureT').innerText = 'Would you like to leave a review ?'
             document.querySelector('#openform').href = c.querySelector('.rogs>.dlock>.gapler>.fbs').href
         }
     }
})
}

