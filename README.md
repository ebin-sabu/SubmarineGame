# Submarine Game
A game about Submarines Developed using Javascript.

## Setting up the Game:
The game always starts in the setup stage. During the setup stage, the user is shown the grid and can place four different types of objects on the cells of the grid:

by clicking on a cell and typing a number between 5 and 9, a fuel cell is placed on a grid cell, and the number indicates the amount of fuel in the fuel cell;
by clicking on a cell and typing the letter "o", an obstacle is placed on a cell;
by clicking on a cell and typing the letter "u", the user's submarine is placed on a cell.
by clicking on a cell and typing the letter "k", a robotic killer submarine is placed on a cell.


## Playing the Game:
While in the play stage, the game proceeds in rounds, each round starting with the user's turn followed by the computer's turn. At the start of a round, the number of rounds played is increased by one, and the information shown to the user is updated.

During his/her turn, if the number of units of fuel of the user's submarine is zero at the start of the turn, then the user's submarine cannot move, a message should be shown indicating that the submarine is out of fuel and the user's turn then ends.

If the number of units of fuel in the user's submarine is greater than zero at the start of the turn, the user can attempt to move his/her submarine horizontally or vertically on the grid by typing one of four letters:

"a" attempts to move the user's submarine one grid cell to the left,
"d" attempts to move the user's submarine one grid cell to the right,
"w" attempts to move the user's submarine one grid cell up,
"s" attempts to move the user's submarine one grid cell down.
If the user types any other character, then an error message should be shown and the user has the possibility to type another character.

## End of Game:

The play stage ends if one of the following conditions becomes true

the user ends the play stage (by pressing the button provided for that);
the user's submarine is destroyed;
there are no robotic killer submarines on the grid;
there are no fuel cells left on the grid.
Once the play stage has ended, the game is in the end stage. In the end stage, the program determines the outcome of the game. 
The outcome is a win for the user if there are no robotic killer submarines left on the grid or the user's score is higher than the computer's score; 
the outcome is a win for the computer if the user's submarine has been destroyed or the computer's score is higher than the user's score; otherwise, the outcome is a draw. 
The program should display a message indicating the outcome of the game and then stop. 


