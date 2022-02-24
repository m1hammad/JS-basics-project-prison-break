const assets = {
    prisonerImg: "./assets/prisoner.png",
    policeImg: "./assets/police.png",
    keyImg: "./assets/key.png",
    winScreenImg: "./assets/youWin.png",
    loseScreenImg: "./assets/youLose.png",
    prisoner: document.getElementById('prisoner'),
    police: document.getElementById('police'),
    key: document.getElementById('key'),
    x : 5,
    y : 5,
    button: document.querySelector('button'),
    priority: true,
    placeHolder: '',
}



assets.button.addEventListener('click', gameStart)

function gameStart(evt){
    if (evt.target.id === 'surrender'){
        reset();
        evt.target.id = 'begin'
        evt.target.innerHTML =   // changes button name
        `<img src="./assets/screwHead.png" class="screwHeadInButton">
        BEGIN
        <img src="./assets/screwHead.png" class="screwHeadInButton">`
    }
    else if (evt.target.id === 'begin'){
        prisonerPrepend(1,3)    // can be randomized in later iterations
        policeAppend(3,2,'')
        keyLocation(4,4)
        evt.target.id = 'surrender'
        evt.target.innerHTML = 
        `<img src="./assets/screwHead.png" class="screwHeadInButton">
        SURRENDER
        <img src="./assets/screwHead.png" class="screwHeadInButton">`
    }
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
                    prisonerPrepend(i,j)    // prisoner is always first element child
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
                        if(i > 0 && !($(`#_${i}${j}`).css('borderTop').includes('solid')) && assets.priority && assets.placeHolder !== `_${i-1}${j}`){                                              /* to check if cop moved to low priority (can't move back to this will go to second priority instead)*/
                            i -= 1
                            assets.placeHolder = policeCurrentLocation.id       // to prevent cop from returning to cell its already been in
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            break
                        }
                        else if(j > 0 && !($(`#_${i}${j}`).css('borderLeft').includes('solid')) && assets.placeHolder !== `_${i}${j-1}`){                                                                     /*checks previous placement and avoids it*/
                            j -= 1                                                        
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            break
                        }
                        else if(j < 4 && !($(`#_${i}${j+1}`).css('borderLeft').includes('solid')) && assets.placeHolder !== `_${i}${j+1}`){
                            j += 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            break
                        }
                        else if(i < 4 && !($(`#_${i+1}${j}`).css('borderTop').includes('solid')) && assets.placeHolder !== `_${i+1}${j}`){
                            i += 1                                                
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = false
                            break
                        }
                        else{   //if no other movement present move back to previous cell
                            const ij = parseInt(assets.placeHolder.replace('_',''))
                            i = parseInt(ij/10)
                            j = ij%10
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = false
                            break
                        }
                    }
                    else if(j < b){
                        if(j < 4 && !($(`#_${i}${j+1}`).css('borderLeft').includes('solid')) && assets.placeHolder !== `_${i}${j+1}`){
                            j += 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            break
                        }
                        else if(i > 0 && !($(`#_${i}${j}`).css('borderTop').includes('solid')) && assets.priority && assets.placeHolder !== `_${i-1}${j}`){
                            i -= 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            break
                        }
                        else if(j > 0 && !($(`#_${i}${j}`).css('borderLeft').includes('solid')) && assets.placeHolder !== `_${i}${j-1}`){
                            j -= 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            break
                        }
                        else if(i < 4 && !($(`#_${i+1}${j}`).css('borderTop').includes('solid')) && assets.placeHolder !== `_${i+1}${j}`){
                            i += 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = false
                            break
                        }
                        else{
                            const ij = parseInt(assets.placeHolder.replace('_',''))
                            i = parseInt(ij/10)
                            j = ij%10
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            break
                        }
                    }
                    else if(j === b){
                        if(i > 0 && !($(`#_${i}${j}`).css('borderTop').includes('solid')) && assets.priority && assets.placeHolder !== `_${i-1}${j}`){
                            i -= 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            break
                        }
                        else if(j < 4 && !($(`#_${i}${j+1}`).css('borderLeft').includes('solid')) && assets.placeHolder !== `_${i}${j+1}`){
                            j += 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            break
                        }
                        else if(j > 0 && !($(`#_${i}${j}`).css('borderLeft').includes('solid')) && assets.placeHolder !== `_${i}${j-1}`){
                            j -= 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            break
                        }
                        else if(i < 4 && !($(`#_${i+1}${j}`).css('borderTop').includes('solid')) && assets.placeHolder !== `_${i+1}${j}`){
                            i += 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = false
                            break
                        }
                        else{
                            const ij = parseInt(assets.placeHolder.replace('_',''))
                            i = parseInt(ij/10)
                            j = ij%10
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = false
                            break
                        }
                    }
                }

                else if(i < a){
                    if(j > b){
                        if(j > 0 && !($(`#_${i}${j}`).css('borderLeft').includes('solid')) && assets.placeHolder !== `_${i}${j-1}`){
                            j -= 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            break
                        }
                        else if(i < 4 && !($(`#_${i+1}${j}`).css('borderTop').includes('solid')) && assets.priority && assets.placeHolder !== `_${i+1}${j}`){
                            i += 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            break
                        }
                        else if(j < 4 && !($(`#_${i}${j+1}`).css('borderLeft').includes('solid')) && assets.placeHolder !== `_${i}${j+1}`){
                            j += 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            break
                        }
                        else if(i > 0 && !($(`#_${i}${j}`).css('borderTop').includes('solid')) && assets.placeHolder !== `_${i-1}${j}`){
                            i -= 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = false
                            break
                        }
                        else{
                            const ij = parseInt(assets.placeHolder.replace('_',''))
                            i = parseInt(ij/10)
                            j = ij%10
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = false
                            break
                        }
                    }
                    else if(j < b){
                        if(j < 4 && !($(`#_${i}${j+1}`).css('borderLeft').includes('solid')) && assets.placeHolder !== `_${i}${j+1}`){
                            j += 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            break
                        }
                        else if(i < 4 && !($(`#_${i+1}${j}`).css('borderTop').includes('solid')) && assets.priority && assets.placeHolder !== `_${i+1}${j}`){
                            i += 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            break
                        }
                        else if(j > 0 && !($(`#_${i}${j}`).css('borderLeft').includes('solid')) && assets.placeHolder !== `_${i}${j-1}`){
                            j -= 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            break
                        }
                        else if(i > 0 && !($(`#_${i}${j}`).css('borderTop').includes('solid')) && assets.placeHolder !== `_${i-1}${j}`){
                            i -= 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = false
                            break
                        }
                        else{
                            const ij = parseInt(assets.placeHolder.replace('_',''))
                            i = parseInt(ij/10)
                            j = ij%10
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = false
                            break
                        }
                    }
                    else if(j === b){
                        if(i < 4 && !($(`#_${i+1}${j}`).css('borderTop').includes('solid')) && assets.priority && assets.placeHolder !== `_${i+1}${j}`){
                            i += 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            break
                        }
                        else if(j < 4 && !($(`#_${i}${j+1}`).css('borderLeft').includes('solid')) && assets.placeHolder !== `_${i}${j+1}`){
                            j += 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            break
                        }
                        else if(j > 0 && !($(`#_${i}${j}`).css('borderLeft').includes('solid')) && assets.placeHolder !== `_${i}${j-1}`){
                            j -= 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            break
                        }
                        else if(i > 0 && !($(`#_${i}${j}`).css('borderTop').includes('solid')) && assets.placeHolder !== `_${i-1}${j}`){
                            i -= 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = false
                            break
                        }
                        else{
                            const ij = parseInt(assets.placeHolder.replace('_',''))
                            i = parseInt(ij/10)
                            j = ij%10
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = false
                            break
                        }
                    }
                }

                else if(i === a){
                    if(j > b){

                        console.log('Accessed j > b in i === a')       // FOR TESTING... REMOVE LATER

                        if(j > 0 && !($(`#_${i}${j}`).css('borderLeft').includes('solid')) && assets.priority && assets.placeHolder !== `_${i}${j-1}`){
                            j -= 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            break
                        }
                        else if(i > 0 && !($(`#_${i}${j}`).css('borderTop').includes('solid')) && assets.placeHolder !== `_${i-1}${j}`){
                            i -= 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            break
                        }
                        else if(i < 4 && !($(`#_${i+1}${j}`).css('borderTop').includes('solid')) && assets.placeHolder !== `_${i+1}${j}`){
                            i += 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            break
                        }
                        else if(j < 4 && !($(`#_${i}${j+1}`).css('borderLeft').includes('solid')) && assets.placeHolder !== `_${i}${j+1}`){
                            j += 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = false
                            break
                        }
                        else{
                            const ij = parseInt(assets.placeHolder.replace('_',''))
                            i = parseInt(ij/10)
                            j = ij%10
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = false
                            break
                        }
                    }
                    if(j < b){

                        console.log('Accessed j < b in i === a')       // FOR TESTING... REMOVE LATER

                        if(j < 4 && !($(`#_${i}${j+1}`).css('borderLeft').includes('solid')) && assets.priority && assets.placeHolder !== `_${i}${j+1}`){
                            j += 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            break
                        }
                        else if(i > 0 && !($(`#_${i}${j}`).css('borderTop').includes('solid')) && assets.placeHolder !== `_${i-1}${j}`){
                            i -= 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            break
                        }
                        else if(i < 4 && !($(`#_${i+1}${j}`).css('borderTop').includes('solid')) && assets.placeHolder !== `_${i+1}${j}`){
                            i += 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            break
                        }
                        else if(j > 0 && !($(`#_${i}${j}`).css('borderLeft').includes('solid')) && assets.placeHolder !== `_${i}${j-1}`){
                            j -= 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = false
                            break
                        }
                        else{
                            const ij = parseInt(assets.placeHolder.replace('_',''))
                            i = parseInt(ij/10)
                            j = ij%10
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = false
                            break
                        }
                        
                    }
                }
            }
        }
    }
}
function keyLocation(a,b){
    const newKeyImg = document.createElement('img')
    newKeyImg.src = assets.keyImg
    newKeyImg.id = 'key'
    const keyNewLocation = document.getElementById(`_${a}${b}`)
    keyNewLocation.appendChild(newKeyImg)
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
    k = ''      // set key back to null so it doesn't run an if statement with the same key input without having key pressed
}

function winLossLogic(x,y){
    const checkLocation = document.getElementById(`_${x}${y}`)
    const prisonerCheck = checkLocation.firstElementChild.id
    const winLossCheck = checkLocation.lastElementChild.id
    if(prisonerCheck === 'prisoner' && winLossCheck === 'police'){
        const loseImg = document.createElement('img')
        loseImg.src = assets.loseScreenImg
        loseImg.id = 'lose'
        const loseMessage = document.createElement('p')
        loseMessage.innerText = 'YOU LOSE'
        loseMessage.id = 'loser'
        $('.grid').css('display', 'none')
        document.getElementById('winLose').appendChild(loseImg)
        document.getElementById('winLose').appendChild(loseMessage)
        $('#winLose').css('display', 'flex')
        document.getElementById('surrender').innerHTML = 
        `<img src="./assets/screwHead.png" class="screwHeadInButton">
        RESTART
        <img src="./assets/screwHead.png" class="screwHeadInButton">`
    }
    else if(prisonerCheck === 'prisoner' && winLossCheck === 'key'){
        checkLocation.removeChild(checkLocation.lastElementChild)
        const winImg = document.createElement('img')
        winImg.src = assets.winScreenImg
        winImg.id = 'win'
        const winMessage = document.createElement('p')
        winMessage.innerText = 'YOU WIN'
        winMessage.id = 'winner'
        $('.grid').css('display', 'none')
        document.getElementById('winLose').appendChild(winImg)
        document.getElementById('winLose').appendChild(winMessage)
        $('#winLose').css('display', 'flex')
        document.getElementById('surrender').innerHTML = 
        `<img src="./assets/screwHead.png" class="screwHeadInButton">
        RESTART
        <img src="./assets/screwHead.png" class="screwHeadInButton">`
    }
}

function reset(){
    for(let i = 0; i < assets.y; i++){
        for(let j = 0; j < assets.x; j++){
            document.getElementById(`_${i}${j}`).innerHTML = ''
        }
    }
    assets.priority = true
    assets.placeHolder = ''
    document.getElementById('winLose').innerHTML = ''
    $('#winLose').css('display', 'none')
    $('.grid').css('display', 'grid')
}