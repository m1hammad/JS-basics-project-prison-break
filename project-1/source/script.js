const assets = {
    prisonerImg: "./assets/prisoner.png",
    policeImg: "./assets/police.png",
    keyImg: "./assets/key.png",
    winScreenImg: "./assets/youWin.png",
    loseScreenImg: "./assets/youlose.png",
    prisoner: document.getElementById('prisoner'),
    police: document.getElementById('police'),
    key: document.getElementById('key'),
    x : 5,
    y : 5,
    board: []
}
assets.board = Array(assets.x * assets.y).fill("")
console.log(assets.board)   // FOR TESTING... REMOVE LATER


document.addEventListener('keydown', logKey);

function logKey(e) {
    // if (e.code === "ArrowUp"){
    //     
    // }
    console.log(e.code)
    prisonerMovement(e.code)

}

function prisonerMovement(key){
    for(let i = 0; i < assets.y; i++){
        for(let j= 0; j < assets.x; j++){
            const prisonerCurrentLocation = document.getElementById(`_${i}${j}`)
            console.log('Before loop:',prisonerCurrentLocation)         // FOR TESTING... REMOVE LATER
            console.log('Before loop:',prisonerCurrentLocation.firstElementChild)   // FOR TESTING... REMOVE LATER

            if(!!prisonerCurrentLocation.lastElementChild && prisonerCurrentLocation.lastElementChild.id === 'prisoner'){
                if(key === "ArrowUp" && i !== 0 /* && !($(`#_${i}${j}`).css('borderTop').includes('solid'))*/){  
                                                   /* ^ above line of code is border collision logic ^ */     
                    console.log(assets.prisoner)    // FOR TESTING... REMOVE LATER
                    console.log(prisonerCurrentLocation.hasChildNodes())    // FOR TESTING... REMOVE LATER
                    console.log(prisonerCurrentLocation.lastElementChild)  // FOR TESTING... REMOVE LATER
                    prisonerCurrentLocation.removeChild(prisonerCurrentLocation.lastElementChild)
                    // prisonerCurrentLocation.innerHTML = ''
                    const newPrisonerImg = document.createElement('img')
                    newPrisonerImg.src = assets.prisonerImg
                    newPrisonerImg.id = 'prisoner'
                    i -= 1
                    const prisonerNewLocation = document.getElementById(`_${i}${j}`)
                    // prisonerNewLocation.appendChild(newPrisonerImg)
                    prisonerNewLocation.appendChild(newPrisonerImg)
                    console.log('in loop with up:', prisonerNewLocation)        // FOR TESTING... REMOVE LATER
                    console.log('in loop with up:', prisonerNewLocation.id)        // FOR TESTING... REMOVE LATER
                    console.log('in loop with up:', prisonerNewLocation.childElementCount)      // FOR TESTING... REMOVE LATER
                    console.log('in loop with up:', prisonerNewLocation.firstElementChild)      // FOR TESTING... REMOVE LATER
                    console.log('in loop with up:', prisonerNewLocation.lastElementChild)      // FOR TESTING... REMOVE LATER
                    setTimeout(policeMovement,200,key,i,j)  // Reference: https://developer.mozilla.org/en-US/docs/Web/API/setTimeout
                    key = ''        // reset key to null so it doesn't parse over previous keystroke (issue with down and right key)
                }
                else if(key === "ArrowDown" && i !== 4 /* && !($(`#_${i+1}${j}`).css('borderTop').includes('solid'))*/){ 
                                                          /* ^ above line of code is border collision logic ^ */     
                    prisonerCurrentLocation.removeChild(prisonerCurrentLocation.lastElementChild)
                    // prisonerCurrentLocation.innerHTML = ''
                    const newPrisonerImg = document.createElement('img')
                    newPrisonerImg.src = assets.prisonerImg
                    newPrisonerImg.id = 'prisoner'
                    i += 1;
                    const prisonerNewLocation = document.getElementById(`_${i}${j}`)
                    prisonerNewLocation.appendChild(newPrisonerImg)
                    console.log('in loop with down:', prisonerNewLocation)      // FOR TESTING... REMOVE LATER
                    console.log('in loop with down:', prisonerNewLocation.id)        // FOR TESTING... REMOVE LATER
                    console.log('in loop with down:', prisonerNewLocation.childElementCount)      // FOR TESTING... REMOVE LATER
                    console.log('in loop with down:', prisonerNewLocation.firstElementChild)      // FOR TESTING... REMOVE LATER
                    console.log('in loop with down:', prisonerNewLocation.lastElementChild)      // FOR TESTING... REMOVE LATER
                    setTimeout(policeMovement,200,key,i,j)
                    key = ''

                }
                else if(key === "ArrowRight" && j !== 4 /* && !($(`#_${i}${j+1}`).css('borderLeft').includes('solid'))*/){     
                                                            /* ^ above line of code is border collision logic ^ */      
                    prisonerCurrentLocation.removeChild(prisonerCurrentLocation.lastElementChild)
                    // prisonerCurrentLocation.innerHTML = ''
                    const newPrisonerImg = document.createElement('img')
                    newPrisonerImg.src = assets.prisonerImg
                    newPrisonerImg.id = 'prisoner'
                    j += 1
                    const prisonerNewLocation = document.getElementById(`_${i}${j}`)
                    prisonerNewLocation.appendChild(newPrisonerImg)
                    console.log('in loop with right:', prisonerNewLocation)      // FOR TESTING... REMOVE LATER
                    console.log('in loop with right:', prisonerNewLocation.id)        // FOR TESTING... REMOVE LATER
                    console.log('in loop with right:', prisonerNewLocation.childElementCount)      // FOR TESTING... REMOVE LATER
                    console.log('in loop with right:', prisonerNewLocation.firstElementChild)      // FOR TESTING... REMOVE LATER
                    console.log('in loop with right:', prisonerNewLocation.lastElementChild)      // FOR TESTING... REMOVE LATER
                    setTimeout(policeMovement,200,key,i,j)
                    key = ''
                }
                else if(key === "ArrowLeft" && j !== 0 /* && !($(`#_${i}${j}`).css('borderLeft').includes('solid'))*/){      
                                                          /* ^ above line of code is border collision logic ^ */     
                    prisonerCurrentLocation.removeChild(prisonerCurrentLocation.lastElementChild)
                    // prisonerCurrentLocation.innerHTML = ''
                    const newPrisonerImg = document.createElement('img')
                    newPrisonerImg.src = assets.prisonerImg
                    newPrisonerImg.id = 'prisoner'
                    j -= 1
                    const prisonerNewLocation = document.getElementById(`_${i}${j}`)
                    prisonerNewLocation.appendChild(newPrisonerImg)
                    console.log('in loop with left:', prisonerNewLocation)      // FOR TESTING... REMOVE LATER
                    console.log('in loop with left:', prisonerNewLocation.id)        // FOR TESTING... REMOVE LATER
                    console.log('in loop with left:', prisonerNewLocation.childElementCount)      // FOR TESTING... REMOVE LATER
                    console.log('in loop with left:', prisonerNewLocation.firstElementChild)      // FOR TESTING... REMOVE LATER
                    console.log('in loop with left:', prisonerNewLocation.lastElementChild)      // FOR TESTING... REMOVE LATER
                    setTimeout(policeMovement,200,key,i,j)
                    key = ''
                }
                
                console.log(`After iff:`, prisonerCurrentLocation.firstElementChild)       // FOR TESTING... REMOVE LATER
            }
            console.log(`After loop:`, prisonerCurrentLocation.firstElementChild)       // FOR TESTING... REMOVE LATER
        }
    }
}

function policeMovement(k,a,b){
    for(let i=0; i < assets.y; i++){
        for(let j=0; j < assets.y; j++){
            const policeCurrentLocation = document.getElementById(`_${i}${j}`)
            if(!!policeCurrentLocation.lastElementChild && policeCurrentLocation.lastElementChild.id === 'police' && i >= 0 && i <= 4  && j <= 4  && j >= 0){
                // if(i === a && j > b){

                //     policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                //     const newPoliceImg = document.createElement('img')
                //     newPoliceImg.src = assets.policeImg
                //     newPoliceImg.id = 'police'
                //     const policeNewLocation = document.getElementById(`_${i}${j-1}`)
                //     policeNewLocation.appendChild(newPoliceImg)
                //     break
                // }

                // if(i === a && j < b){
                //     policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                //     const newPoliceImg = document.createElement('img')
                //     newPoliceImg.src = assets.policeImg
                //     newPoliceImg.id = 'police'
                //     const policeNewLocation = document.getElementById(`_${i}${j+1}`)
                //     policeNewLocation.appendChild(newPoliceImg)
                //     break
                // }
                // // else if(j === b && i > a){
                //     policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                //     const newPoliceImg = document.createElement('img')
                //     newPoliceImg.src = assets.policeImg
                //     newPoliceImg.id = 'police'
                //     const policeNewLocation = document.getElementById(`_${i-1}${j}`)
                //     policeNewLocation.appendChild(newPoliceImg)
                //     break
                // }
                // else if(j === b && i < a){
                //     policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                //     const newPoliceImg = document.createElement('img')
                //     newPoliceImg.src = assets.policeImg
                //     newPoliceImg.id = 'police'
                //     const policeNewLocation = document.getElementById(`_${i+1}${j}`)
                //     policeNewLocation.appendChild(newPoliceImg)
                //     break
                // }
                if((i < a && j < b) || (i === a && j < b) || (j === b && i < a)){
                    if(k === 'ArrowUp'){        // keystroke saved from prisonerMovement() is used to give priority of movement based on prisoner's movement
                        policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                        const newPoliceImg = document.createElement('img')
                        newPoliceImg.src = assets.policeImg
                        newPoliceImg.id = 'police'
                        const policeNewLocation = document.getElementById(`_${i+1}${j}`)
                        policeNewLocation.appendChild(newPoliceImg)
                        k =''
                        break
                    }
                    else if(k === 'ArrowLeft'){
                        policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                        const newPoliceImg = document.createElement('img')
                        newPoliceImg.src = assets.policeImg
                        newPoliceImg.id = 'police'
                        const policeNewLocation = document.getElementById(`_${i}${j+1}`)
                        policeNewLocation.appendChild(newPoliceImg)
                        k = ''
                        break
                    }
                    else if(k === 'ArrowRight'){
                        policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                        const newPoliceImg = document.createElement('img')
                        newPoliceImg.src = assets.policeImg
                        newPoliceImg.id = 'police'
                        const policeNewLocation = document.getElementById(`_${i}${j+1}`)
                        policeNewLocation.appendChild(newPoliceImg)
                        k = ''
                        break
                    }
                    else if(k === 'ArrowDown'){
                        policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                        const newPoliceImg = document.createElement('img')
                        newPoliceImg.src = assets.policeImg
                        newPoliceImg.id = 'police'
                        const policeNewLocation = document.getElementById(`_${i+1}${j}`)
                        policeNewLocation.appendChild(newPoliceImg)
                        k = ''
                        break
                    }
                }
                else if((i > a && j > b) || (i === a && j > b) || (j === b && i > a)){
                    if(k === 'ArrowUp'){        // keystroke saved from prisonerMovement() is used to give priority of movement based on prisoner's movement
                        policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                        const newPoliceImg = document.createElement('img')
                        newPoliceImg.src = assets.policeImg
                        newPoliceImg.id = 'police'
                        const policeNewLocation = document.getElementById(`_${i-1}${j}`)
                        policeNewLocation.appendChild(newPoliceImg)
                        k =''
                        break
                    }
                    else if(k === 'ArrowLeft'){
                        policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                        const newPoliceImg = document.createElement('img')
                        newPoliceImg.src = assets.policeImg
                        newPoliceImg.id = 'police'
                        const policeNewLocation = document.getElementById(`_${i}${j-1}`)
                        policeNewLocation.appendChild(newPoliceImg)
                        k = ''
                        break
                    }
                    else if(k === 'ArrowRight'){
                        policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                        const newPoliceImg = document.createElement('img')
                        newPoliceImg.src = assets.policeImg
                        newPoliceImg.id = 'police'
                        const policeNewLocation = document.getElementById(`_${i}${j-1}`)
                        policeNewLocation.appendChild(newPoliceImg)
                        k = ''
                        break
                    }
                    else if(k === 'ArrowDown'){
                        policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                        const newPoliceImg = document.createElement('img')
                        newPoliceImg.src = assets.policeImg
                        newPoliceImg.id = 'police'
                        const policeNewLocation = document.getElementById(`_${i-1}${j}`)
                        policeNewLocation.appendChild(newPoliceImg)
                        k = ''
                        break
                    }
                }
                // else if(i > a && j < b){
                //     if(k === 'ArrowUp'){        // keystroke saved from prisonerMovement() is used to give priority of movement based on prisoner's movement
                //         policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                //         const newPoliceImg = document.createElement('img')
                //         newPoliceImg.src = assets.policeImg
                //         newPoliceImg.id = 'police'
                //         const policeNewLocation = document.getElementById(`_${i-1}${j}`)
                //         policeNewLocation.appendChild(newPoliceImg)
                //         k =''
                //         break
                //     }
                //     else if(k === 'ArrowRight'){
                //         policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                //         const newPoliceImg = document.createElement('img')
                //         newPoliceImg.src = assets.policeImg
                //         newPoliceImg.id = 'police'
                //         const policeNewLocation = document.getElementById(`_${i}${j-1}`)
                //         policeNewLocation.appendChild(newPoliceImg)
                //         k = ''
                //         break
                //     }
                // }
                // else if(i < a && j > b){}
            }
        }
    }
}

//                   GENERAL TESTING... 
// console.log(!!document.getElementById('_12').childNodes[1])
// console.log(document.getElementById('_12').firstElementChild.id)
// document.getElementById('_12').removeChild(assets.prisoner)
// console.log(!!document.getElementById('_12').firstElementChild)
// newPrisonerImg = document.createElement('img')
// newPrisonerImg.src = assets.prisonerImg
// newPrisonerImg.id = 'prisoner'
// document.getElementById('_11').appendChild(newPrisonerImg)
// console.log(document.getElementById('_11').firstElementChild)
// console.log(document.getElementById('_11').firstElementChild.id)
// console.log(document.getElementById('_11').style.borderLeft)
//         // non jQuery method
// const test = document.getElementById('_11')
// const test2  = window.getComputedStyle(test)
// console.log(test2.borderLeft.includes('solid'))
//         // jQuery method
// console.log($('#_11').css('borderLeft').includes('solid'))
