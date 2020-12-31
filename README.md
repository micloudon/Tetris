Tetris was originally created behind the Iron Curtain by Russian software engineer Alexey Pajitnov in 1984.  
It has gone on to be one the most successful and iconic games in all of history.  
  
I have recreated Tetris using Javascript, HTML and CSS.  
A series of divs make up each square on the grid, they also make up the tetris pieces.  
For every line cleared the players score increases by 10.  
For every line cleared the tetris pieces fall slightly faster.
If the tetris pieces reach the top, the game will be over.  
The game is controlled using the arrowkeys.  
Music and sound effects will play thoughout the game.  
Link to live site:
https://micloudon.github.io/Tetris/
 
    
      
         
           
Bugs: 
While the game behaves pretty well, sometimes in very unique circumstances a tetris piece can rotate off the grid or into already fallen tetrominoes (tetris pieces), this bug is rare, but if a player were to play the game very irresponsibly they could trigger it. Please play irresponsibly and see if you can trigger a bug.  

The Line piece can only be rotated once, this stops it from being temperamental, but is very much unideal.  

Sometimes the color of a tetromino will be left behind on the grid, this does not effect game play and will go away when another tetromino passes over it (I guess this is what I get for using CSS).  

If you have any fixes for these bugs please let me know.
