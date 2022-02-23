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
    priority: true,
    placeHolder: '',
}

document.addEventListener('keydown', logKey);

function logKey(currentKey) {
    console.log(currentKey.code)
    prisonerMovement(currentKey.code)

}

function prisonerMovement(key){
    for(let i = 0; i < assets.y; i++){
        for(let j= 0; j < assets.x; j++){
            const prisonerCurrentLocation = document.getElementById(`_${i}${j}`)

            if(!!prisonerCurrentLocation.lastElementChild && prisonerCurrentLocation.lastElementChild.id === 'prisoner'){

                if (key === "ArrowUp" && i !== 0 && !($(`#_${i}${j}`).css('borderTop').includes('solid'))){  
                                                   /* ^ above line of code is border collision logic ^ */  
                    i -= 1
                    prisonerCurrentLocation.removeChild(prisonerCurrentLocation.lastElementChild)
                    prisonerPrepend(i,j)
                    winLossLogic(i,j)
                    setTimeout(policeMovement,200,key,i,j)  // Reference: https://developer.mozilla.org/en-US/docs/Web/API/setTimeout
                    break
                }

                else if (key === "ArrowDown" && i !== 4 && !($(`#_${i+1}${j}`).css('borderTop').includes('solid'))){ 
                                                          /* ^ above line of code is border collision logic ^ */     
                    i += 1;
                    prisonerCurrentLocation.removeChild(prisonerCurrentLocation.lastElementChild)
                    prisonerPrepend(i,j)
                    winLossLogic(i,j)
                    setTimeout(policeMovement,200,key,i,j)
                    break

                }

                else if (key === "ArrowRight" && j !== 4 && !($(`#_${i}${j+1}`).css('borderLeft').includes('solid'))){     
                                                            /* ^ above line of code is border collision logic ^ */  
                    j += 1    
                    prisonerCurrentLocation.removeChild(prisonerCurrentLocation.lastElementChild)
                    prisonerPrepend(i,j)
                    winLossLogic(i,j)
                    setTimeout(policeMovement,200,key,i,j)
                    break
                }

                else if (key === "ArrowLeft" && j !== 0 && !($(`#_${i}${j}`).css('borderLeft').includes('solid'))){      
                                                          /* ^ above line of code is border collision logic ^ */     
                    j -= 1
                    prisonerCurrentLocation.removeChild(prisonerCurrentLocation.lastElementChild)
                    prisonerPrepend(i,j)
                    winLossLogic(i,j)
                    setTimeout(policeMovement,200,key,i,j)
                    break
                }
            }
        }
    }
}

function policeMovement(k,a,b){
    for(let i=0; i < assets.y; i++){
        for(let j=0; j < assets.y; j++){
            const policeCurrentLocation = document.getElementById(`_${i}${j}`)
            if(!!policeCurrentLocation.lastElementChild && policeCurrentLocation.lastElementChild.id === 'police' && i >= 0 && i <= 4  && j <= 4  && j >= 0){
                if(i > a){
                    if(j > b){

                        console.log('Accessed j > b in i > a')       // FOR TESTING... REMOVE LATER
                        
                        
                        if(!($(`#_${i}${j}`).css('borderTop').includes('solid')) && i > 0 && assets.priority && assets.placeHolder !== `_${i-1}${j}`){
                            i -= 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            console.log('up')       // FOR TESTING... REMOVE LATER
                            break
                        }
                        else if(!($(`#_${i}${j}`).css('borderLeft').includes('solid')) && j > 0 && assets.placeHolder !== `_${i}${j-1}`){
                            j -= 1                                                        /*checks previous placement and avoids it*/
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            console.log('left')       // FOR TESTING... REMOVE LATER
                            break
                        }
                        else if(!($(`#_${i}${j+1}`).css('borderLeft').includes('solid')) && j < 4 && assets.placeHolder !== `_${i}${j+1}`){
                            j += 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            console.log('right')       // FOR TESTING... REMOVE LATER
                            break
                        }
                        else if(!($(`#_${i+1}${j}`).css('borderTop').includes('solid')) && i < 4 && assets.placeHolder !== `_${i+1}${j}`){
                            i += 1                                                
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = false
                            console.log('down')       // FOR TESTING... REMOVE LATER
                            break
                        }
                    }
                    else if(j < b){

                        console.log('Accessed j < b in i > a')       // FOR TESTING... REMOVE LATER

                        
                        if(!($(`#_${i}${j+1}`).css('borderLeft').includes('solid')) && j < 4 && assets.placeHolder !== `_${i}${j+1}`){
                            j += 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            console.log('rignt')       // FOR TESTING... REMOVE LATER
                            break
                        }
                        else if(!($(`#_${i}${j}`).css('borderTop').includes('solid')) && i > 0 && assets.priority && assets.placeHolder !== `_${i-1}${j}`){
                            i -= 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            console.log('up')       // FOR TESTING... REMOVE LATER
                            break
                        }
                        else if(!($(`#_${i}${j}`).css('borderLeft').includes('solid')) && j > 0 && assets.placeHolder !== `_${i}${j-1}`){
                            j -= 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            console.log('left')       // FOR TESTING... REMOVE LATER
                            break
                        }
                        else if(!($(`#_${i+1}${j}`).css('borderTop').includes('solid')) && i < 4 && assets.placeHolder !== `_${i+1}${j}`){
                            i += 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = false
                            console.log('down')       // FOR TESTING... REMOVE LATER
                            break
                        }
                    }
                    else if(j === b){

                        console.log('Accessed j === b in i > a')       // FOR TESTING... REMOVE LATER

                        if(!($(`#_${i}${j}`).css('borderTop').includes('solid')) && i > 0 && assets.priority && assets.placeHolder !== `_${i-1}${j}`){
                            i -= 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            console.log('up')       // FOR TESTING... REMOVE LATER
                            break
                        }
                        else if(!($(`#_${i}${j+1}`).css('borderLeft').includes('solid')) && j < 4 && assets.placeHolder !== `_${i}${j+1}`){
                            j += 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            console.log('right')       // FOR TESTING... REMOVE LATER
                            break
                        }
                        else if(!($(`#_${i}${j}`).css('borderLeft').includes('solid')) && j > 0 && assets.placeHolder !== `_${i}${j-1}`){
                            j -= 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            console.log('left')       // FOR TESTING... REMOVE LATER
                            break
                        }
                        else if(!($(`#_${i+1}${j}`).css('borderTop').includes('solid')) && i < 4 && assets.placeHolder !== `_${i+1}${j}`){
                            i += 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = false
                            console.log('down')       // FOR TESTING... REMOVE LATER
                            break
                        }
                    }
                }

                else if(i < a){
                    if(j > b){

                        console.log('Accessed j > b in i < a')       // FOR TESTING... REMOVE LATER

                        if(!($(`#_${i}${j}`).css('borderLeft').includes('solid')) && j > 0 && assets.placeHolder !== `_${i}${j-1}`){
                            j -= 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            console.log('left')       // FOR TESTING... REMOVE LATER
                            break
                        }
                        else if(!($(`#_${i+1}${j}`).css('borderTop').includes('solid')) && i < 4 && assets.priority && assets.placeHolder !== `_${i+1}${j}`){
                            i += 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            console.log('down')       // FOR TESTING... REMOVE LATER
                            break
                        }
                        else if(!($(`#_${i}${j+1}`).css('borderLeft').includes('solid')) && j < 4 && assets.placeHolder !== `_${i}${j+1}`){
                            j += 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            console.log('right')       // FOR TESTING... REMOVE LATER
                            break
                        }
                        else if(!($(`#_${i}${j}`).css('borderTop').includes('solid')) && i > 0 && assets.placeHolder !== `_${i-1}${j}`){
                            i -= 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = false
                            console.log('up')       // FOR TESTING... REMOVE LATER
                            break
                        }
                    }
                    else if(j < b){

                        console.log('Accessed j > b in i < a')       // FOR TESTING... REMOVE LATER

                        if(!($(`#_${i}${j+1}`).css('borderLeft').includes('solid')) && j < 4 && assets.placeHolder !== `_${i}${j+1}`){
                            j += 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            console.log('right')       // FOR TESTING... REMOVE LATER
                            break
                        }
                        else if(!($(`#_${i+1}${j}`).css('borderTop').includes('solid')) && i < 4 && assets.priority && assets.placeHolder !== `_${i+1}${j}`){
                            i += 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            console.log('down')       // FOR TESTING... REMOVE LATER
                            break
                        }
                        else if(!($(`#_${i}${j}`).css('borderLeft').includes('solid')) && j > 0 && assets.placeHolder !== `_${i}${j-1}`){
                            j -= 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            console.log('left')       // FOR TESTING... REMOVE LATER
                            break
                        }
                        else if(!($(`#_${i}${j}`).css('borderTop').includes('solid')) && i > 0 && assets.placeHolder !== `_${i-1}${j}`){
                            i -= 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = false
                            console.log('up')       // FOR TESTING... REMOVE LATER
                            break
                        }
                    }
                    else if(j === b){

                        console.log('Accessed j === b in i < a')       // FOR TESTING... REMOVE LATER

                        if(!($(`#_${i+1}${j}`).css('borderTop').includes('solid')) && i < 4 && assets.priority && assets.placeHolder !== `_${i+1}${j}`){
                            i += 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            console.log('down')       // FOR TESTING... REMOVE LATER
                            break
                        }
                        else if(!($(`#_${i}${j+1}`).css('borderLeft').includes('solid')) && j < 4 && assets.placeHolder !== `_${i}${j+1}`){
                            j += 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            console.log('right')       // FOR TESTING... REMOVE LATER
                            break
                        }
                        else if(!($(`#_${i}${j}`).css('borderLeft').includes('solid')) && j > 0 && assets.placeHolder !== `_${i}${j-1}`){
                            j -= 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            console.log('left')       // FOR TESTING... REMOVE LATER
                            break
                        }
                        else if(!($(`#_${i}${j}`).css('borderTop').includes('solid')) && i > 0 && assets.placeHolder !== `_${i-1}${j}`){
                            i -= 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = false
                            console.log('up')       // FOR TESTING... REMOVE LATER
                            break
                        }
                    }
                }

                else if(i === a){
                    if(j > b){

                        console.log('Accessed j > b in i === a')       // FOR TESTING... REMOVE LATER

                        if(!($(`#_${i}${j}`).css('borderLeft').includes('solid')) && j > 0 && assets.priority && assets.placeHolder !== `_${i}${j-1}`){
                            j -= 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            console.log('left')       // FOR TESTING... REMOVE LATER
                            break
                        }
                        else if(!($(`#_${i}${j}`).css('borderTop').includes('solid')) && i > 0 && assets.placeHolder !== `_${i-1}${j}`){
                            i -= 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            console.log('down')       // FOR TESTING... REMOVE LATER
                            break
                        }
                        else if(!($(`#_${i+1}${j}`).css('borderTop').includes('solid')) && i < 4 && assets.placeHolder !== `_${i+1}${j}`){
                            i += 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            console.log('up')       // FOR TESTING... REMOVE LATER
                            break
                        }
                        else if(!($(`#_${i}${j+1}`).css('borderLeft').includes('solid')) && j < 4 && assets.placeHolder !== `_${i}${j+1}`){
                            j += 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = false
                            console.log('right')       // FOR TESTING... REMOVE LATER
                            break
                        }
                    }
                    if(j < b){

                        console.log('Accessed j < b in i === a')       // FOR TESTING... REMOVE LATER

                        if(!($(`#_${i}${j+1}`).css('borderLeft').includes('solid')) && j < 4 && assets.priority && assets.placeHolder !== `_${i}${j+1}`){
                            j += 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            console.log('right')       // FOR TESTING... REMOVE LATER
                            break
                        }
                        else if(!($(`#_${i}${j}`).css('borderTop').includes('solid')) && i > 0 && assets.placeHolder !== `_${i-1}${j}`){
                            i -= 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            console.log('up')       // FOR TESTING... REMOVE LATER
                            break
                        }
                        else if(!($(`#_${i+1}${j}`).css('borderTop').includes('solid')) && i < 4 && assets.placeHolder !== `_${i+1}${j}`){
                            i += 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            console.log('down')       // FOR TESTING... REMOVE LATER
                            break
                        }
                        else if(!($(`#_${i}${j}`).css('borderLeft').includes('solid')) && j > 0 && assets.placeHolder !== `_${i}${j-1}`){
                            j -= 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = false
                            console.log('left')       // FOR TESTING... REMOVE LATER
                            break
                        }
                    }
                }
            }
        }
    }
}

function prisonerPrepend(a,b){
    const newPrisonerImg = document.createElement('img')
    newPrisonerImg.src = assets.prisonerImg
    newPrisonerImg.id = 'prisoner'
    const prisonerNewLocation = document.getElementById(`_${a}${b}`)
    prisonerNewLocation.prepend(newPrisonerImg)
}

function policeAppend(a,b,k){
    const newPoliceImg = document.createElement('img')
    newPoliceImg.src = assets.policeImg
    newPoliceImg.id = 'police'
    const policeNewLocation = document.getElementById(`_${a}${b}`)
    policeNewLocation.appendChild(newPoliceImg)
    k = ''
}

function winLossLogic(x,y){
    const checkLocation = document.getElementById(`_${x}${y}`)
    const prisonerCheck = checkLocation.firstElementChild.id
    const winLossCheck = checkLocation.lastElementChild.id
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
// !console.log($('#_11').css('borderLeft').includes('solid'))
