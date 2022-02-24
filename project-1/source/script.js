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
    button: document.querySelector('button'),
    priority: true,
    placeHolder: '',
}



assets.button.addEventListener('click', logger)

function logger(evt){
    if (evt.target.id === 'surrender'){
        reset();
        evt.target.id = 'begin'
        evt.target.innerHTML = 
        `<img src="./assets/screwHead.png" class="screwHeadInButton">
        BEGIN
        <img src="./assets/screwHead.png" class="screwHeadInButton">`
    }
    else if (evt.target.id === 'begin'){
        prisonerPrepend(1,3)
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
                        
                        
                        if(i > 0 && !($(`#_${i}${j}`).css('borderTop').includes('solid')) && assets.priority && assets.placeHolder !== `_${i-1}${j}`){
                            i -= 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            console.log('up')       // FOR TESTING... REMOVE LATER
                            break
                        }
                        else if(j > 0 && !($(`#_${i}${j}`).css('borderLeft').includes('solid')) && assets.placeHolder !== `_${i}${j-1}`){
                            j -= 1                                                        /*checks previous placement and avoids it*/
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            console.log('left')       // FOR TESTING... REMOVE LATER
                            break
                        }
                        else if(j < 4 && !($(`#_${i}${j+1}`).css('borderLeft').includes('solid')) && assets.placeHolder !== `_${i}${j+1}`){
                            j += 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            console.log('right')       // FOR TESTING... REMOVE LATER
                            break
                        }
                        else if(i < 4 && !($(`#_${i+1}${j}`).css('borderTop').includes('solid')) && assets.placeHolder !== `_${i+1}${j}`){
                            i += 1                                                
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = false
                            console.log('down')       // FOR TESTING... REMOVE LATER
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

                        console.log('Accessed j < b in i > a')       // FOR TESTING... REMOVE LATER

                        
                        if(j < 4 && !($(`#_${i}${j+1}`).css('borderLeft').includes('solid')) && assets.placeHolder !== `_${i}${j+1}`){
                            j += 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            console.log('rignt')       // FOR TESTING... REMOVE LATER
                            break
                        }
                        else if(i > 0 && !($(`#_${i}${j}`).css('borderTop').includes('solid')) && assets.priority && assets.placeHolder !== `_${i-1}${j}`){
                            i -= 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            console.log('up')       // FOR TESTING... REMOVE LATER
                            break
                        }
                        else if(j > 0 && !($(`#_${i}${j}`).css('borderLeft').includes('solid')) && assets.placeHolder !== `_${i}${j-1}`){
                            j -= 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            console.log('left')       // FOR TESTING... REMOVE LATER
                            break
                        }
                        else if(i < 4 && !($(`#_${i+1}${j}`).css('borderTop').includes('solid')) && assets.placeHolder !== `_${i+1}${j}`){
                            i += 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = false
                            console.log('down')       // FOR TESTING... REMOVE LATER
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

                        console.log('Accessed j === b in i > a')       // FOR TESTING... REMOVE LATER

                        if(i > 0 && !($(`#_${i}${j}`).css('borderTop').includes('solid')) && assets.priority && assets.placeHolder !== `_${i-1}${j}`){
                            i -= 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            console.log('up')       // FOR TESTING... REMOVE LATER
                            break
                        }
                        else if(j < 4 && !($(`#_${i}${j+1}`).css('borderLeft').includes('solid')) && assets.placeHolder !== `_${i}${j+1}`){
                            j += 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            console.log('right')       // FOR TESTING... REMOVE LATER
                            break
                        }
                        else if(j > 0 && !($(`#_${i}${j}`).css('borderLeft').includes('solid')) && assets.placeHolder !== `_${i}${j-1}`){
                            j -= 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            console.log('left')       // FOR TESTING... REMOVE LATER
                            break
                        }
                        else if(i < 4 && !($(`#_${i+1}${j}`).css('borderTop').includes('solid')) && assets.placeHolder !== `_${i+1}${j}`){
                            i += 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = false
                            console.log('down')       // FOR TESTING... REMOVE LATER
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

                        console.log('Accessed j > b in i < a')       // FOR TESTING... REMOVE LATER

                        if(j > 0 && !($(`#_${i}${j}`).css('borderLeft').includes('solid')) && assets.placeHolder !== `_${i}${j-1}`){
                            j -= 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            console.log('left')       // FOR TESTING... REMOVE LATER
                            break
                        }
                        else if(i < 4 && !($(`#_${i+1}${j}`).css('borderTop').includes('solid')) && assets.priority && assets.placeHolder !== `_${i+1}${j}`){
                            i += 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            console.log('down')       // FOR TESTING... REMOVE LATER
                            break
                        }
                        else if(j < 4 && !($(`#_${i}${j+1}`).css('borderLeft').includes('solid')) && assets.placeHolder !== `_${i}${j+1}`){
                            j += 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            console.log('right')       // FOR TESTING... REMOVE LATER
                            break
                        }
                        else if(i > 0 && !($(`#_${i}${j}`).css('borderTop').includes('solid')) && assets.placeHolder !== `_${i-1}${j}`){
                            i -= 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = false
                            console.log('up')       // FOR TESTING... REMOVE LATER
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

                        console.log('Accessed j > b in i < a')       // FOR TESTING... REMOVE LATER

                        if(j < 4 && !($(`#_${i}${j+1}`).css('borderLeft').includes('solid')) && assets.placeHolder !== `_${i}${j+1}`){
                            j += 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            console.log('right')       // FOR TESTING... REMOVE LATER
                            break
                        }
                        else if(i < 4 && !($(`#_${i+1}${j}`).css('borderTop').includes('solid')) && assets.priority && assets.placeHolder !== `_${i+1}${j}`){
                            i += 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            console.log('down')       // FOR TESTING... REMOVE LATER
                            break
                        }
                        else if(j > 0 && !($(`#_${i}${j}`).css('borderLeft').includes('solid')) && assets.placeHolder !== `_${i}${j-1}`){
                            j -= 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            console.log('left')       // FOR TESTING... REMOVE LATER
                            break
                        }
                        else if(i > 0 && !($(`#_${i}${j}`).css('borderTop').includes('solid')) && assets.placeHolder !== `_${i-1}${j}`){
                            i -= 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = false
                            console.log('up')       // FOR TESTING... REMOVE LATER
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

                        console.log('Accessed j === b in i < a')       // FOR TESTING... REMOVE LATER

                        if(i < 4 && !($(`#_${i+1}${j}`).css('borderTop').includes('solid')) && assets.priority && assets.placeHolder !== `_${i+1}${j}`){
                            i += 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            console.log('down')       // FOR TESTING... REMOVE LATER
                            break
                        }
                        else if(j < 4 && !($(`#_${i}${j+1}`).css('borderLeft').includes('solid')) && assets.placeHolder !== `_${i}${j+1}`){
                            j += 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            console.log('right')       // FOR TESTING... REMOVE LATER
                            break
                        }
                        else if(j > 0 && !($(`#_${i}${j}`).css('borderLeft').includes('solid')) && assets.placeHolder !== `_${i}${j-1}`){
                            j -= 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            console.log('left')       // FOR TESTING... REMOVE LATER
                            break
                        }
                        else if(i > 0 && !($(`#_${i}${j}`).css('borderTop').includes('solid')) && assets.placeHolder !== `_${i-1}${j}`){
                            i -= 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = false
                            console.log('up')       // FOR TESTING... REMOVE LATER
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
                            console.log('left')       // FOR TESTING... REMOVE LATER
                            break
                        }
                        else if(i > 0 && !($(`#_${i}${j}`).css('borderTop').includes('solid')) && assets.placeHolder !== `_${i-1}${j}`){
                            i -= 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            console.log('down')       // FOR TESTING... REMOVE LATER
                            break
                        }
                        else if(i < 4 && !($(`#_${i+1}${j}`).css('borderTop').includes('solid')) && assets.placeHolder !== `_${i+1}${j}`){
                            i += 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            console.log('up')       // FOR TESTING... REMOVE LATER
                            break
                        }
                        else if(j < 4 && !($(`#_${i}${j+1}`).css('borderLeft').includes('solid')) && assets.placeHolder !== `_${i}${j+1}`){
                            j += 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = false
                            console.log('right')       // FOR TESTING... REMOVE LATER
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
                            console.log('right')       // FOR TESTING... REMOVE LATER
                            break
                        }
                        else if(i > 0 && !($(`#_${i}${j}`).css('borderTop').includes('solid')) && assets.placeHolder !== `_${i-1}${j}`){
                            i -= 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            console.log('up')       // FOR TESTING... REMOVE LATER
                            break
                        }
                        else if(i < 4 && !($(`#_${i+1}${j}`).css('borderTop').includes('solid')) && assets.placeHolder !== `_${i+1}${j}`){
                            i += 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = true
                            console.log('down')       // FOR TESTING... REMOVE LATER
                            break
                        }
                        else if(j > 0 && !($(`#_${i}${j}`).css('borderLeft').includes('solid')) && assets.placeHolder !== `_${i}${j-1}`){
                            j -= 1
                            assets.placeHolder = policeCurrentLocation.id
                            policeCurrentLocation.removeChild(policeCurrentLocation.lastElementChild)
                            policeAppend(i,j,k)
                            assets.priority = false
                            console.log('left')       // FOR TESTING... REMOVE LATER
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
    k = ''
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