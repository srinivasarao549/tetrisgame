goog.provide('tetris.Board');tetris.Board.WIDTH=10;tetris.Board.HEIGHT=20;tetris.Board.isBlocked=function(x,y){if(x<0||x>=tetris.Board.WIDTH||y<0||y>=tetris.Board.HEIGHT||tetris.blocks[y*tetris.Board.WIDTH+x].isBlocked){return true}else{return false}};tetris.Board.checkMove=function(tetromino){var pos,i,isValid,x,y;for(i=0;i<4;i++){pos=tetris.Piece.PATTERNS[tetromino.pattern][tetromino.rotation][i];x=pos[0]/20+tetromino.x/20;y=pos[1]/20+tetromino.y/20;if(tetris.Board.isBlocked(x,y)){return 0}};return 1};tetris.Board.clearFilledRows=function(ctx,buffer,buffer_ctx,tetromino){var row,col,row2,nextLevel;nextLevel=1;var fillRows=0;for(row=20;row>=0;){for(col=0;col<10;++col){if(!(tetris.blocks[row*tetris.Board.WIDTH+col].isBlocked)){break}};if(col==10){tetris.Score.score+=tetris.Level.level*[40,100,300,1200][fillRows];fillRows++;for(row2=row-1;row2>=0;row2--){for(col=0;col<10;++col){tetris.blocks[(row2+1)*tetris.Board.WIDTH+col].isBlocked=tetris.blocks[row2*tetris.Board.WIDTH+col].isBlocked;tetris.blocks[(row2+1)*tetris.Board.WIDTH+col].color=tetris.blocks[row2*tetris.Board.WIDTH+col].color}};for(col=0;col<=tetris.Board.WIDTH;col++){tetris.blocks[col].isBlocked=false};tetris.Piece.redraw(ctx,buffer,buffer_ctx);tetris.Board.updateScore()}else{row--}};tetris.rowsCleared.num=tetris.rowsCleared.num+fillRows;nextLevel=1+Math.floor(tetris.rowsCleared.num/4);tetris.Level.level=nextLevel;tetris.Board.updateLevel();tetris.Board.updateSpeed()};tetris.Board.showNextPiece=function(){var x,y;var pos,i;var aryColor=[];preview_ctx.clearRect(0,0,80,80);tetris.Piece.startTetromino(nextTetromino);x=nextTetromino.x;y=nextTetromino.y;nextTetromino.x=0;nextTetromino.y=0;preview_ctx.fillStyle="black";for(i=0;i<4;i++){pos=tetris.Piece.PATTERNS[nextTetromino.pattern][nextTetromino.rotation][i];preview_ctx.fillRect(pos[0]+nextTetromino.x,pos[1]+nextTetromino.y,20,20);preview_ctx.drawImage(blockImg,tetris.Piece.COLORS[nextTetromino.pattern][0],tetris.Piece.COLORS[nextTetromino.pattern][1],20,20,pos[0]+nextTetromino.x,pos[1]+nextTetromino.y,20,20)};nextTetromino.x=x;nextTetromino.y=y};tetris.Board.isEnd=function(){var col;for(col=0;col<10&&tetris.isEnd.end==false;col++){if(tetris.Board.isBlocked(col,0)){clearInterval(tetris.intervalInt.i);tetris.Score.allScores.push(tetris.Score.score);tetris.localStorage.store();tetris.localStorage.list();tetris.isEnd.end=true}}};tetris.Board.updateScore=function(){gameScore.innerHTML=tetris.Score.score};tetris.Board.updateLevel=function(){gameLevel.innerHTML=tetris.Level.level};tetris.Board.updateSpeed=function(){var speedup=100;var temp=0;if(tetris.Level.level>=5){speedup=10;tetris.gameSpeed.num=200-(tetris.Level.level-4)*speedup}else{tetris.gameSpeed.num=800-(tetris.Level.level-1)*speedup};gameSpeed.innerHTML=tetris.gameSpeed.num;clearInterval(tetris.intervalInt.i);tetris.intervalInt.i=setInterval("tetris.Piece.move(ctx, buffer, buffer_ctx, tetromino)",tetris.gameSpeed.num)};tetris.Board.sleep=function(ms){var dt=new Date();dt.setTime(dt.getTime()+ms);while(new Date().getTime()<dt.getTime()){tetris.Board.key()}};tetris.Board.key=function(){document.onkeydown=function(event){var keyCode;if(event==null){keyCode=window.event.keyCode}else{keyCode=event.keyCode};switch(keyCode){case 37:tetris.Piece.changMove(ctx,buffer,buffer_ctx,tetromino,-20,0);break;case 38:tetris.Piece.rotation(ctx,buffer,buffer_ctx,tetromino);break;case 39:tetris.Piece.changMove(ctx,buffer,buffer_ctx,tetromino,20,0);break;case 40:tetris.Piece.changMove(ctx,buffer,buffer_ctx,tetromino,0,20);break;case 32:tetris.Piece.dropDown(ctx,buffer,buffer_ctx,tetromino);break;case 80:tetris.pausegame();break;case 82:tetris.restartgame();break;default:break}}};