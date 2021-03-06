function level1Mechanics() {
  // good datas
  // compteur de bonnes data en haut a droite
  context.drawImage(imgGoodData, 65*tileSize-totalTranslateCameraX, 3*tileSize,tileSize*3,tileSize*3);
  context.fillStyle = "rgba(0, 0, 0, 0.2)";
  context.fillText("X "+nbGoodData,68*tileSize-totalTranslateCameraX, 6*tileSize);

  for (k=0; k<goodDataRow.length; k++) {
    context.drawImage(imgGoodData, (goodDataCol[k]-randPositionGoodData[k])*tileSize,goodDataRow[k]*tileSize,tileSize*3,tileSize*3);
     if (isNear(goodDataRow[k],goodDataCol[k]-randPositionGoodData[k])) {
      points.goodData=true;
      score+=10;
      nbGoodData++;
      goodDataRow.splice(k,1);
      goodDataCol.splice(k,1);
    }
  }

  //changement de niveau
  if(nbGoodData>=nbGoodDataNeeded && currentLevel[~~(playerYPos/tileSize)][~~(playerXPos/tileSize)]===5) {
    currentLevel=level2;
    levelChanged=true;
  }

  // bad datas
  for (k=0; k<badDataRow.length; k++) {
    context.drawImage(imgBadData, badDataCol[k]*tileSize,badDataRow[k]*tileSize,tileSize*3,tileSize*3);
    if(isNear(badDataRow[k],badDataCol[k])) {
      touched = true;
      isHurt(badDataCol[k]);
      beatBackPlayer(badDataCol[k])
    }
    if (cruchBadData(badDataRow[k],badDataCol[k])) {
      touched = true;
      badDataRow.splice(k,1);
      badDataCol.splice(k,1);
      score+=3;
      points.killBadData=true;
    }
  }
}

function displayAnomaly() {
  anomaly=true;
  setTimeout(() => {
    anomaly=false;
    pause=false;
    currentLevel=level3;
    levelChanged=true;
  },5000); // durée d'affichage de l'anomalie
}

function level2Mechanics() {
  context.drawImage(imgBigObstacle, (60+73)*tileSize,15*tileSize,tileSize*7,tileSize*7);

  for (k=0; k<obstacleRow.length; k++) {
    if(obstacleCol[k]>50 && obstacleCol[k]<90) {
      context.drawImage(imgStone, (obstacleCol[k])*tileSize,(obstacleRow[k])*tileSize,tileSize*2,tileSize*3);
    } else {
      context.drawImage(imgWheel, (obstacleCol[k])*tileSize,(obstacleRow[k])*tileSize,tileSize*2,tileSize*2);
    }
    if(isNear(obstacleRow[k],obstacleCol[k])) {
      beatBackPlayer(obstacleCol[k]);
      isHurt(obstacleCol[k]);

    }
  }
  if(isNear(19,60+73) && !anomaly) // position du gros obstacle
    displayAnomaly();
}

function level3Mechanics() {

  for (k=0; k<heartRow.length; k++) {
    context.drawImage(imgHeart,heartCol[k]*tileSize,heartRow[k]*tileSize,tileSize,tileSize);
  if(isNear(heartRow[k],heartCol[k])) {
    heartRow.splice(k,1);
    heartCol.splice(k,1);
    points.heart=true;
    nbHeart++;
    score+=10;
    }
  }
  context.fillStyle = "rgba(0, 0, 0, 0.2)";
  context.font="16px Arial";
  context.drawImage(imgHeart, 65*tileSize-totalTranslateCameraX, 4.5*tileSize,tileSize*2,tileSize*2);
  context.fillText("X "+nbHeart,68*tileSize-totalTranslateCameraX, 6*tileSize);
}
