import sys
from tkinter import*
from tkinter import font
from PIL import Image, ImageTk
import random
from playsound import playsound
import tkinter as tk



# main window
root = Tk()
root.title('Rock Paper Scissor')
root.config(background='#B9C2DC')


# logos
rock_img = ImageTk.PhotoImage(Image.open("rock.png"))
paper_img = ImageTk.PhotoImage(Image.open("paper.png"))
scissors_img = ImageTk.PhotoImage(Image.open("scissors.png"))
rock_comp = ImageTk.PhotoImage(Image.open("rock.png"))
paper_comp = ImageTk.PhotoImage(Image.open("paper.png"))
scissors_comp = ImageTk.PhotoImage(Image.open("scissors.png"))
# insert image
user_label = Label(root, image=rock_img, bg='#B9C2DC')
comp_label = Label(root, image=paper_comp, bg='#B9C2DC')
comp_label.grid(row=1, column=0)
user_label.grid(row=1, column=4)


# score
PlayerScore = Label(root, text=0, font=100, bg='#B9C2DC', fg='white')
CompScore = Label(root, text=0, font=100, bg='#B9C2DC', fg='white')
CompScore.grid(row=1, column=1)
PlayerScore.grid(row=1, column=3)
#indicators
user_indicators = Label(root, font=100, text='HUMAN',bg='#B9C2DC', fg='white')
comp_indicators = Label(root, font=100, text='AI', bg='#B9C2DC', fg='white')
user_indicators.grid(row=0,column=3)
comp_indicators.grid(row=0,column=1)


#checkWinter

def checkWinner(player, computer):
    if player == computer:
        UpdateMessage("It's a tie")
    elif player == 'rock':
        if computer == 'paper':
            UpdateMessage('You lost to an AI')
            updateCompScore()
        else:
            UpdateMessage('You won')
            updateUserScore()
    elif player == 'paper':
        if computer == 'scissors':
            UpdateMessage('You lost to an AI')
            updateCompScore()
        else:
            UpdateMessage('You won')
            updateUserScore()
    elif player == 'scissors':
        if computer == 'rock':
            UpdateMessage('You lost to an AI')
            updateCompScore()
        else:
            UpdateMessage('You won')
            updateUserScore()

#update
def upDateChoice(x):
    choices =['rock','paper', 'scissors']
    #for comp
    compChoice = choices [random.randint(0,2)]
    if compChoice == 'rock':
        comp_label.configure(image=rock_comp)
    elif compChoice == 'paper':
        comp_label.configure(image=paper_comp)
    else:
        comp_label.configure(image=scissors_comp)
 
    #for user
    if x == 'rock':
        user_label.configure(image=rock_img)
        
    elif x =='paper':
        user_label.configure(image=paper_img)
        
    else:
        user_label.configure(image=scissors_comp)
        


    
    checkWinner(x,compChoice)
    

# buttons
rock = Button(root, width=20, height=2, text='ROCK',
              highlightbackground='RED', fg="white", command= lambda:upDateChoice("rock")).grid(row=2, column=1)
paper = Button(root, width=20, height=2, text='PAPER',
               highlightbackground="GREEN", fg="white", command= lambda:upDateChoice('paper')).grid(row=2, column=2)
scissors = Button(root, width=20, height=2, text='SCISSORS',
                  highlightbackground="BLUE", fg="white", command= lambda:upDateChoice('scissors')).grid(row=2, column=3)




#message
msg = Label(root,font=50,fg='white',bg='#B9C2DC', text='Click on any button to start the game')
msg.grid(row=3,column=2)


#updateMessage
def UpdateMessage(x):
    msg['text'] = x

#updateUserScore
def updateUserScore():
    score = int(PlayerScore['text'])
    score += 1
    PlayerScore['text'] = str(score)

#updateCompScore
def updateCompScore():
    score = int(CompScore['text'])
    score += 1
    CompScore['text'] = str(score)
root.mainloop()



