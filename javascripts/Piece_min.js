goog.provide('tetris.Piece');tetris.Piece.PATTERNS=[[[[0,20],[20,20],[40,20],[60,20]],[[20,0],[20,20],[20,40],[20,60]],[[0,20],[20,20],[40,20],[60,20]],[[20,0],[20,20],[20,40],[20,60]]],[[[20,0],[20,20],[40,20],[60,20]],[[20,0],[40,0],[20,20],[20,40]],[[0,20],[20,20],[40,20],[40,40]],[[20,0],[20,20],[0,40],[20,40]]],[[[40,0],[0,20],[20,20],[40,20]],[[20,0],[20,20],[20,40],[40,40]],[[0,20],[20,20],[40,20],[0,40]],[[0,0],[20,0],[20,20],[20,40]]],[[[20,0],[40,0],[20,20],[40,20]],[[20,0],[40,0],[20,20],[40,20]],[[20,0],[40,0],[20,20],[40,20]],[[20,0],[40,0],[20,20],[40,20]]],[[[20,20],[40,20],[0,40],[20,40]],[[20,20],[20,40],[40,40],[40,60]],[[20,20],[40,20],[0,40],[20,40]],[[20,20],[20,40],[40,40],[40,60]]],[[[20,0],[0,20],[20,20],[40,20]],[[20,0],[20,20],[40,20],[20,40]],[[0,20],[20,20],[40,20],[20,40]],[[20,0],[0,20],[20,20],[20,40]]],[[[0,0],[20,0],[20,20],[40,20]],[[40,0],[20,20],[40,20],[20,40]],[[0,0],[20,0],[20,20],[40,20]],[[40,0],[20,20],[40,20],[20,40]]]];tetris.Piece.COLORS=[[0,0],[20,0],[40,0],[60,0],[80,0],[100,0],[120,0]];tetris.Piece.startTetromino=function(tetromino){tetromino.pattern=Math.floor(Math.random()*7);tetromino.x=Math.floor(Math.random()*7)*20;tetromino.y=0;tetromino.rotation=0};tetris.Piece.drawTetromino=function(ctx,buffer,buffer_ctx,tetromino,color){var pos,i;buffer_ctx.fillStyle=color;for(i=0;i<4;i++){pos=tetris.Piece.PATTERNS[tetromino.pattern][tetromino.rotation][i];if(color=="black"){buffer_ctx.drawImage(blockImg,tetris.Piece.COLORS[tetromino.pattern][0],tetris.Piece.COLORS[tetromino.pattern][1],20,20,pos[0]+tetromino.x,pos[1]+tetromino.y,20,20)}else buffer_ctx.fillRect(pos[0]+tetromino.x,pos[1]+tetromino.y,20,20)}ctx.drawImage(buffer,0,0)};tetris.Piece.drawProjection=function(ctx,buffer,buffer_ctx,projection,color){var pos,i;buffer_ctx.fillStyle=color;for(i=0;i<4;i++){pos=tetris.Piece.PATTERNS[projection.pattern][projection.rotation][i];if(color=="black"){buffer_ctx.drawImage(projectionImg,0,0,20,20,pos[0]+projection.x,pos[1]+projection.y,20,20)}else buffer_ctx.fillRect(pos[0]+projection.x,pos[1]+projection.y,20,20)}ctx.drawImage(buffer,0,0)};tetris.Piece.redraw=function(ctx,buffer,buffer_ctx){var row,col;var blockColor;buffer_ctx.clearRect(0,0,200,400);ctx.clearRect(0,0,200,400);for(row=0;row<tetris.Board.HEIGHT;row++){for(col=0;col<tetris.Board.WIDTH;col++){if(tetris.blocks[row*tetris.Board.WIDTH+col].isBlocked){blockColor=tetris.Piece.COLORS[tetris.blocks[row*tetris.Board.WIDTH+col].color];buffer_ctx.drawImage(blockImg,blockColor[0],blockColor[1],20,20,col*20,row*20,20,20)}}};ctx.drawImage(buffer,0,0)};tetris.Piece.copy=function(tetromino,tempTetromino){tempTetromino.x=tetromino.x;tempTetromino.y=tetromino.y;tempTetromino.pattern=tetromino.pattern;tempTetromino.rotation=tetromino.rotation};tetris.Piece.rotation=function(ctx,buffer,buffer_ctx,tetromino){var tempTetromino=new tetris.Tetromino();tetris.Piece.copy(tetromino,tempTetromino);tetris.Piece.drawTetromino(ctx,buffer,buffer_ctx,tetromino,"white");tetris.Piece.drawProjection(ctx,buffer,buffer_ctx,projection,"white");tempTetromino.rotation=(tempTetromino.rotation+1)%4;if(tetris.Board.checkMove(tempTetromino)){tetris.Piece.copy(tempTetromino,tetromino);tetris.Piece.copy(tetromino,projection)};tetris.Piece.findProjection();tetris.Piece.drawTetromino(ctx,buffer,buffer_ctx,tetromino,"black");tetris.Piece.drawProjection(ctx,buffer,buffer_ctx,projection,"black")};tetris.Piece.changMove=function(ctx,buffer,buffer_ctx,tetromino,dx,dy){var tempTetromino=new tetris.Tetromino();tetris.Piece.copy(tetromino,tempTetromino);tetris.Piece.drawTetromino(ctx,buffer,buffer_ctx,tetromino,"white");tetris.Piece.drawProjection(ctx,buffer,buffer_ctx,projection,"white");tempTetromino.x+=dx;tempTetromino.y+=dy;if(tetris.Board.checkMove(tempTetromino)){tetris.Piece.copy(tempTetromino,tetromino);tetris.Piece.copy(tetromino,projection)};tetris.Piece.findProjection();tetris.Piece.drawTetromino(ctx,buffer,buffer_ctx,tetromino,"black");tetris.Piece.drawProjection(ctx,buffer,buffer_ctx,projection,"black")};tetris.Piece.dropDown=function(ctx,buffer,buffer_ctx,tetromino){tetris.cannotMove.bool=true;var tempTetromino=new tetris.Tetromino();tetris.Piece.copy(tetromino,tempTetromino);tetris.Piece.drawTetromino(ctx,buffer,buffer_ctx,tetromino,"white");tempTetromino.y+=20;while(tetris.Board.checkMove(tempTetromino)){tetris.Piece.copy(tempTetromino,tetromino);tempTetromino.y+=20};tetris.Piece.drawTetromino(ctx,buffer,buffer_ctx,tetromino,"black")};tetris.Piece.findProjection=function(){var tempTetromino=new tetris.Tetromino();tetris.Piece.copy(projection,tempTetromino);tempTetromino.y+=20;while(tetris.Board.checkMove(tempTetromino)){tetris.Piece.copy(tempTetromino,projection);tempTetromino.y+=20}};tetris.Piece.move=function(ctx,buffer,buffer_ctx,tetromino){var col,i,pos,x,y;var tempTetromino=new tetris.Tetromino();tetris.Piece.copy(tetromino,tempTetromino);tempTetromino.y+=20;tetris.Board.key();tetris.Piece.drawProjection(ctx,buffer,buffer_ctx,projection,"white");tetris.Piece.copy(tetromino,projection);tetris.Piece.findProjection();tetris.Piece.drawProjection(ctx,buffer,buffer_ctx,projection,"black");if(tetris.Board.checkMove(tempTetromino)||tetris.cannotMove==false){tetris.Piece.drawTetromino(ctx,buffer,buffer_ctx,tetromino,"white");tetris.Piece.copy(tempTetromino,tetromino);tetris.Piece.drawTetromino(ctx,buffer,buffer_ctx,tetromino,"black")}else{tetris.cannotMove.bool=false;tetris.Piece.drawTetromino(ctx,buffer,buffer_ctx,tetromino,"black");for(i=0;i<4;i++){pos=tetris.Piece.PATTERNS[tetromino.pattern][tetromino.rotation][i];x=pos[0]/20+tetromino.x/20;y=pos[1]/20+tetromino.y/20;tetris.blocks[y*tetris.Board.WIDTH+x].isBlocked=true;tetris.blocks[y*tetris.Board.WIDTH+x].color=tetromino.pattern};tetris.Board.clearFilledRows(ctx,buffer,buffer_ctx,tetromino);if(!tetris.Board.isEnd()){tetris.Piece.copy(nextTetromino,tetromino);tetris.Piece.copy(tetromino,projection);tetris.Board.showNextPiece();tetris.Piece.drawTetromino(ctx,buffer,buffer_ctx,tetromino,"black")}}};