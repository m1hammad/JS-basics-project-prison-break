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

document.addEventListener('keydown', logKey);

function logKey(e) {
    console.log(e.code)
    prisonerMovement(e.code)

}

function prisonerMovement(key){
    for(let i = 0; i < assets.y; i++){
        for(let j= 0; j < assets.x; j++){
            const prisonerCurrentLocation = document.getElementById(`_${i}${j}`)
            // console.log('Before loop:',prisonerCurrentLocation)         // FOR TESTING... REMOVE LATER
            // console.log('Before loop:',prisonerCurrentLocation.firstElementChild)   // FOR TESTING... REMOVE LATER

            if(!!prisonerCurrentLocation.lastElementChild && prisonerCurrentLocation.lastElementChild.id === 'prisoner'){

                if (key === "ArrowUp" && i !== 0 /* && !($(`#_${i}${j}`).css('borderTop').includes('solid'))*/){  
                                                   /* ^ above line of code is border collision logic ^ */  
                    prisonerCurrentLocation.removeChild(prisonerCurrentLocation.lastElementChild)
                    const newPrisonerImg = document.createElement('img')
                    newPrisonerImg.src = assets.prisonerImg
                    newPrisonerImg.id = 'prisoner'
                    i -= 1
                    const prisonerNewLocation = document.getElementById(`_${i}${j}`)
                    prisonerNewLocation.prepend(newPrisonerImg)

                    console.log('Arrow up:', prisonerNewLocation)        // FOR TESTING... REMOVE LATER
                    // console.log('in loop with up:', prisonerNewLocation.id)        // FOR TESTING... REMOVE LATER
                    // console.log('in loop with up:', prisonerNewLocation.childElementCount)      // FOR TESTING... REMOVE LATER
                    // console.log('in loop with up:', prisonerNewLocation.firstElementChild)      // FOR TESTING... REMOVE LATER
                    // console.log('in loop with up:', prisonerNewLocation.lastElementChild)      // FOR TESTING... REMOVE LATER

                    winLossLogic(i,j)
                    setTimeout(policeMovement,200,key,i,j)  // Reference: https://developer.mozilla.org/en-US/docs/Web/API/setTimeout
                    key = ''        // reset key to null so it doesn't parse over previous keystroke (issue with down and right key)
                    break
                }

                else if (key === "ArrowDown" && i !== 4 /* && !($(`#_${i+1}${j}`).css('borderTop').includes('solid'))*/){ 
                                                          /* ^ above line of code is border collision logic ^ */     
                    prisonerCurrentLocation.removeChild(prisonerCurrentLocation.lastElementChild)
                    const newPrisonerImg = document.createElement('img')
                    newPrisonerImg.src = assets.prisonerImg
                    newPrisonerImg.id = 'prisoner'
                    i += 1;
                    const prisonerNewLocation = document.getElementById(`_${i}${j}`)
                    prisonerNewLocation.prepend(newPrisonerImg)
                    console.log('Arrow down:', prisonerNewLocation)      // FOR TESTING... REMOVE LATER
                    // console.log('in loop with down:', prisonerNewLocation.id)        // FOR TESTING... REMOVE LATER
                    // console.log('in loop with down:', prisonerNewLocation.childElementCount)      // FOR TESTING... REMOVE LATER
                    // console.log('in loop with down:', prisonerNewLocation.firstElementChild)      // FOR TESTING... REMOVE LATER
                    // console.log('in loop with down:', prisonerNewLocation.lastElementChild)      // FOR TESTING... REMOVE LATER

                    winLossLogic(i,j)
                    setTimeout(policeMovement,200,key,i,j)
                    key = ''
                    break

                }

                else if (key === "ArrowRight" && j !== 4 /* && !($(`#_${i}${j+1}`).css('borderLeft').includes('solid'))*/){     
                                                            /* ^ above line of code is border collision logic ^ */      
                    prisonerCurrentLocation.removeChild(prisonerCurrentLocation.lastElementChild)
                    const newPrisonerImg = document.createElement('img')
                    newPrisonerImg.src = assets.prisonerImg
                    newPrisonerImg.id = 'prisoner'
                    j += 1
                    const prisonerNewLocation = document.getElementById(`_${i}${j}`)
                    prisonerNewLocation.prepend(newPrisonerImg)
                    console.log('Arrow right:', prisonerNewLocation)      // FOR TESTING... REMOVE LATER
                    // console.log('in loop with right:', prisonerNewLocation.id)        // FOR TESTING... REMOVE LATER
                    // console.log('in loop with right:', prisonerNewLocation.childElementCount)      // FOR TESTING... REMOVE LATER
                    // console.log('in loop with right:', prisonerNewLocation.firstElementChild)      // FOR TESTING... REMOVE LATER
                    // console.log('in loop with right:', prisonerNewLocation.lastElementChild)      // FOR TESTING... REMOVE LATER

                    winLossLogic(i,j)
                    setTimeout(policeMovement,200,key,i,j)
                    key = ''
                    break
                }

                else if (key === "ArrowLeft" && j !== 0 /* && !($(`#_${i}${j}`).css('borderLeft').includes('solid'))*/){      
                                                          /* ^ above line of code is border collision logic ^ */     
                    prisonerCurrentLocation.removeChild(prisonerCurrentLocation.lastElementChild)
                    const newPrisonerImg = document.createElement('img')
                    newPrisonerImg.src = assets.prisonerImg
                    newPrisonerImg.id = 'prisoner'
                    j -= 1
                    const prisonerNewLocation = document.getElementById(`_${i}${j}`)
                    prisonerNewLocation.prepend(newPrisonerImg)
                    console.log('Arrow left:', prisonerNewLocation)      // FOR TESTING... REMOVE LATER
                    // console.log('in loop with left:', prisonerNewLocation.id)        // FOR TESTING... REMOVE LATER
                    // console.log('in loop with left:', prisonerNewLocation.childElementCount)      // FOR TESTING... REMOVE LATER
                    // console.log('in loop with left:', prisonerNewLocation.firstElementChild)      // FOR TESTING... REMOVE LATER
                    // console.log('in loop with left:', prisonerNewLocation.lastElementChild)      // FOR TESTING... REMOVE LATER

                    winLossLogic(i,j)
                    setTimeout(policeMovement,200,key,i,j)
                    key = ''
                    break
                }
            }
        }
    }
}

function policeMovement(k,a,b){
   // loop1:                              // Reference: https://stackoverflow.com/questions/183161/whats-the-best-way-to-break-from-nested-loops-in-javascript
    for(let i=0; i < assets.y; i++){
        // loop2:
        for(let j=0; j < assets.y; j++){
            const policeCurrentLocation = document.getElementById(`_${i}${j}`)

            console.log('Function call made', i, j)       // FOR TESTING... REMOVE LATER
            
            if(!!policeCurrentLocation.lastElementChild && policeCurrentLocation.lastElementChild.id === 'police' && i >= 0 && i <= 4  && j <= 4  && j >= 0){

                console.log('Accessed main if statement after for loop in function')       // FOR TESTING... REMOVE LATER

                if(i > a){

                    console.log('Accessed i > a')       // FOR TESTING... REMOVE LATER

                    if(j > b){

                        console.log('Accessed j > b in i > a')       // FOR TESTING... REMOVE LATER

                        if(k === 'ArrowUp'){        // keystroke saved from prisonerMovement() is used to give priority of movement based on prisoner's movement
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            const newPoliceImg = document.createElement('img')
                            newPoliceImg.src = assets.policeImg
                            newPoliceImg.id = 'police'
                            i -= 1
                            const policeNewLocation = document.getElementById(`_${i}${j}`)
                            policeNewLocation.appendChild(newPoliceImg)
    
                            console.log('in i > a and j > b:', policeNewLocation)       // FOR TESTING... REMOVE LATER
    
                            k =''
                            break
                        }
                        else if(k === 'ArrowLeft'){
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            const newPoliceImg = document.createElement('img')
                            newPoliceImg.src = assets.policeImg
                            newPoliceImg.id = 'police'
                            j -= 1
                            const policeNewLocation = document.getElementById(`_${i}${j}`)
                            policeNewLocation.appendChild(newPoliceImg)
    
                            console.log('in i > a and j > b:', policeNewLocation)       // FOR TESTING... REMOVE LATER
    
                            k = ''
                            break
                        }
                        else if(k === 'ArrowRight'){
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            const newPoliceImg = document.createElement('img')
                            newPoliceImg.src = assets.policeImg
                            newPoliceImg.id = 'police'
                            j -= 1
                            const policeNewLocation = document.getElementById(`_${i}${j}`)
                            policeNewLocation.appendChild(newPoliceImg)
    
                            console.log('in i > a and j > b:', policeNewLocation)       // FOR TESTING... REMOVE LATER
    
                            k = ''
                            break
                        }
                        else if(k === 'ArrowDown'){
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            const newPoliceImg = document.createElement('img')
                            newPoliceImg.src = assets.policeImg
                            newPoliceImg.id = 'police'
                            i -= 1
                            const policeNewLocation = document.getElementById(`_${i}${j}`)
                            policeNewLocation.appendChild(newPoliceImg)
    
                            console.log('in i > a and j > b:', policeNewLocation)       // FOR TESTING... REMOVE LATER
    
                            k = ''
                            break
                        }
                    }
                    else if(j < b){

                        console.log('Accessed j < b in i > a')       // FOR TESTING... REMOVE LATER

                        if(k === 'ArrowUp'){        // keystroke saved from prisonerMovement() is used to give priority of movement based on prisoner's movement
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            const newPoliceImg = document.createElement('img')
                            newPoliceImg.src = assets.policeImg
                            newPoliceImg.id = 'police'
                            i -= 1
                            const policeNewLocation = document.getElementById(`_${i}${j}`)
                            policeNewLocation.appendChild(newPoliceImg)
    
                            console.log('in i > a and j < b:', policeNewLocation)       // FOR TESTING... REMOVE LATER
    
                            k =''
                            break
                        }
                        else if(k === 'ArrowLeft'){
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            const newPoliceImg = document.createElement('img')
                            newPoliceImg.src = assets.policeImg
                            newPoliceImg.id = 'police'
                            j += 1
                            const policeNewLocation = document.getElementById(`_${i}${j}`)
                            policeNewLocation.appendChild(newPoliceImg)
    
                            console.log('in i > a and j < b:', policeNewLocation)       // FOR TESTING... REMOVE LATER
    
                            k = ''
                            break
                        }
                        else if(k === 'ArrowRight'){
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            const newPoliceImg = document.createElement('img')
                            newPoliceImg.src = assets.policeImg
                            newPoliceImg.id = 'police'
                            j += 1
                            const policeNewLocation = document.getElementById(`_${i}${j}`)
                            policeNewLocation.appendChild(newPoliceImg)
    
                            console.log('in i > a and j < b:', policeNewLocation)       // FOR TESTING... REMOVE LATER
    
                            k = ''
                            break
                        }
                        else if(k === 'ArrowDown'){
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            const newPoliceImg = document.createElement('img')
                            newPoliceImg.src = assets.policeImg
                            newPoliceImg.id = 'police'
                            i -= 1
                            const policeNewLocation = document.getElementById(`_${i}${j}`)
                            policeNewLocation.appendChild(newPoliceImg)
    
                            console.log('in i > a and j < b:', policeNewLocation)       // FOR TESTING... REMOVE LATER
    
                            k = ''
                            break
                        }
                    }
                    else if(j === b){

                        console.log('Accessed j === b in i > a')       // FOR TESTING... REMOVE LATER

                        if(k === 'ArrowUp' || k === 'ArrowDown' || k === 'ArrowRight' || k === 'ArrowLeft'){
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            const newPoliceImg = document.createElement('img')
                            newPoliceImg.src = assets.policeImg
                            newPoliceImg.id = 'police'
                            i -= 1
                            const policeNewLocation = document.getElementById(`_${i}${j}`)
                            policeNewLocation.appendChild(newPoliceImg)

                            console.log('in i > a and j === b:', policeNewLocation)
                            winLossLogic(i,j)
                            k = ''
                            break
                        }
                    }
                }

                else if(i < a){

                    console.log('Accessed i < a')       // FOR TESTING... REMOVE LATER

                    if(j > b){

                        console.log('Accessed j > b in i < a')       // FOR TESTING... REMOVE LATER

                        if(k === 'ArrowUp'){        // keystroke saved from prisonerMovement() is used to give priority of movement based on prisoner's movement
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            const newPoliceImg = document.createElement('img')
                            newPoliceImg.src = assets.policeImg
                            newPoliceImg.id = 'police'
                            i += 1
                            const policeNewLocation = document.getElementById(`_${i}${j}`)
                            policeNewLocation.appendChild(newPoliceImg)
    
                            console.log('in i < a and j > b:', policeNewLocation)       // FOR TESTING... REMOVE LATER
    
                            k =''
                            break
                        }
                        else if(k === 'ArrowLeft'){
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            const newPoliceImg = document.createElement('img')
                            newPoliceImg.src = assets.policeImg
                            newPoliceImg.id = 'police'
                            j -= 1
                            const policeNewLocation = document.getElementById(`_${i}${j}`)
                            policeNewLocation.appendChild(newPoliceImg)
    
                            console.log('in i < a and j > b:', policeNewLocation)       // FOR TESTING... REMOVE LATER
    
                            k = ''
                            break
                        }
                        else if(k === 'ArrowRight'){
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            const newPoliceImg = document.createElement('img')
                            newPoliceImg.src = assets.policeImg
                            newPoliceImg.id = 'police'
                            j -= 1
                            const policeNewLocation = document.getElementById(`_${i}${j}`)
                            policeNewLocation.appendChild(newPoliceImg)
    
                            console.log('in i < a and j > b:', policeNewLocation)       // FOR TESTING... REMOVE LATER
    
                            k = ''
                            break
                        }
                        else if(k === 'ArrowDown'){
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            const newPoliceImg = document.createElement('img')
                            newPoliceImg.src = assets.policeImg
                            newPoliceImg.id = 'police'
                            i += 1
                            const policeNewLocation = document.getElementById(`_${i}${j}`)
                            policeNewLocation.appendChild(newPoliceImg)
    
                            console.log('in i < a and j > b:', policeNewLocation)       // FOR TESTING... REMOVE LATER
    
                            k = ''
                            break
                        }
                    }
                    else if(j < b){

                        console.log('Accessed j > b in i < a')       // FOR TESTING... REMOVE LATER

                        if(k === 'ArrowUp'){        // keystroke saved from prisonerMovement() is used to give priority of movement based on prisoner's movement
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            const newPoliceImg = document.createElement('img')
                            newPoliceImg.src = assets.policeImg
                            newPoliceImg.id = 'police'
                            i += 1
                            const policeNewLocation = document.getElementById(`_${i}${j}`)
                            policeNewLocation.appendChild(newPoliceImg)
    
                            console.log('in i < a and j < b:', policeNewLocation)       // FOR TESTING... REMOVE LATER
    
                            k =''
                            break
                        }
                        else if(k === 'ArrowLeft'){
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            const newPoliceImg = document.createElement('img')
                            newPoliceImg.src = assets.policeImg
                            newPoliceImg.id = 'police'
                            j += 1
                            const policeNewLocation = document.getElementById(`_${i}${j}`)
                            policeNewLocation.appendChild(newPoliceImg)
    
                            console.log('in i < a and j < b:', policeNewLocation)       // FOR TESTING... REMOVE LATER
    
                            k = ''
                            break
                        }
                        else if(k === 'ArrowRight'){
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            const newPoliceImg = document.createElement('img')
                            newPoliceImg.src = assets.policeImg
                            newPoliceImg.id = 'police'
                            j += 1
                            const policeNewLocation = document.getElementById(`_${i}${j}`)
                            policeNewLocation.appendChild(newPoliceImg)
    
                            console.log('in i < a and j < b:', policeNewLocation)       // FOR TESTING... REMOVE LATER
    
                            k = ''
                            break
                        }
                        else if(k === 'ArrowDown'){
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            const newPoliceImg = document.createElement('img')
                            newPoliceImg.src = assets.policeImg
                            newPoliceImg.id = 'police'
                            i += 1
                            const policeNewLocation = document.getElementById(`_${i}${j}`)
                            policeNewLocation.appendChild(newPoliceImg)
    
                            console.log('in i < a and j < b:', policeNewLocation)       // FOR TESTING... REMOVE LATER
    
                            k = ''
                            break
                        }
                    }
                    else if(j === b){

                        console.log('Accessed j === b in i < a')       // FOR TESTING... REMOVE LATER

                        if(k === 'ArrowUp' || k === 'ArrowDown' || k === 'ArrowRight' || k === 'ArrowLeft'){
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            const newPoliceImg = document.createElement('img')
                            newPoliceImg.src = assets.policeImg
                            newPoliceImg.id = 'police'
                            i += 1
                            const policeNewLocation = document.getElementById(`_${i}${j}`)
                            policeNewLocation.appendChild(newPoliceImg)
                            winLossLogic(i,j)

                            console.log('in i < a and j === b:', policeNewLocation)       // FOR TESTING... REMOVE LATER

                            k = ''
                            break
                        }
                    }
                }

                else if(i === a){

                    console.log('Accessed i === a')       // FOR TESTING... REMOVE LATER

                    if(j > b){

                        console.log('Accessed j > b in i === a')       // FOR TESTING... REMOVE LATER

                        if(k === 'ArrowUp' || k === 'ArrowDown' || k === 'ArrowRight' || k === 'ArrowLeft'){
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            const newPoliceImg = document.createElement('img')
                            newPoliceImg.src = assets.policeImg
                            newPoliceImg.id = 'police'
                            j -= 1
                            const policeNewLocation = document.getElementById(`_${i}${j}`)
                            policeNewLocation.appendChild(newPoliceImg)
                            winLossLogic(i,j)

                            console.log('in i === a and j > b', policeNewLocation)       // FOR TESTING... REMOVE LATER
                            k = ''
                            break
                        }
                    }
                    if(j < b){

                        console.log('Accessed j < b in i === a')       // FOR TESTING... REMOVE LATER

                        if(k === 'ArrowUp' || k === 'ArrowDown' || k === 'ArrowRight' || k === 'ArrowLeft'){
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            const newPoliceImg = document.createElement('img')
                            newPoliceImg.src = assets.policeImg
                            newPoliceImg.id = 'police'
                            j += 1
                            const policeNewLocation = document.getElementById(`_${i}${j}`)
                            policeNewLocation.appendChild(newPoliceImg)
                            winLossLogic(i,j)

                            console.log('in i === a and j < b', policeNewLocation)       // FOR TESTING... REMOVE LATER
                            k = ''
                            break
                        }
                    }
                    if(j === b){
                        winLossLogic(i,j)
                        // console.log('Accessed j === b in i === a')       // FOR TESTING... REMOVE LATER 

                        // console.log('in i === a and j === b', policeCurrentLocation)
                        // console.log(policeCurrentLocation.firstElementChild)
                        // console.log(policeCurrentLocation.lastElementChild)
                        // setTimeout(alert,205,'you lose')              // FOR TESTING... REMOVE LATER
                    }
                }
            }
        }
    }
}

function winLossLogic(x,y){
    console.log('win loss function called')
    const checkLocation = document.getElementById(`_${x}${y}`)
    const prisonerCheck = checkLocation.firstElementChild.id
    const winLossCheck = checkLocation.lastElementChild.id
    console.log(checkLocation.firstElementChild.id)
    console.log(checkLocation.lastElementChild.id)
    if(prisonerCheck === 'prisoner' && winLossCheck === 'police'){
        setTimeout(alert,205,'you lose')              // FOR TESTING... REMOVE LATER
    }
    else if(prisonerCheck === 'prisoner' && winLossCheck === 'key'){
        checkLocation.removeChild(checkLocation.lastElementChild)
        setTimeout(alert,205,'you win')              // FOR TESTING... REMOVE LATER
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


//                     POSSIBLE BUGS....
// 1. Prisoner and Police both move into Key cell. Needs further testing 
