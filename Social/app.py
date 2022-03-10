from tkinter import *
from PIL import Image, ImageTk
import pyglet
window = Tk()

pyglet.font.add_file('fonts/Longhaul.ttf')
images = Image.open("images/peacock.jpeg")



TotalDislike = 0
TotalLiks = 0


def LikeDisplay():


    global TotalLiks

    TotalLiks += 1
    LikeLabel.config(text=TotalLiks)


def DislikeDisplay():
    global TotalDislike

    TotalDislike += 1
    DisLikeLabel.config(text=TotalDislike)





mainImage = ImageTk.PhotoImage(images)
# add widgets here
text = Label(window, text='INSTAGRAM', fg='white', font=("Longhaul", 50))
post = Label(image=mainImage, width=225, height=175)
Like = Button(window, text='LIKE', fg='blue', bg='green', font=(
    "Helvetica", 20), width=4, height=1, command=LikeDisplay)
Dislike = Button(window, text='DISLIKE', fg='RED', bg='green', font=(
    "Helvetica", 20), width=4, height=1, command=DislikeDisplay)


LikeLabel = Label(
    window, text=f' Likes {TotalLiks}', fg='white', font=("Arial", 15))
DisLikeLabel = Label(
    window, text=f' Dislike {TotalDislike}', fg='white', font=("Arial", 15))




post.image = mainImage
text.place(x=116, y=2)
post.place(x=118, y=150)
Like.place(x=265, y=350)
Dislike.place(x=120, y=350)

LikeLabel.place(x=275, y=400)
DisLikeLabel.place(x=120, y=400)




window.title('Hello Python')
window.geometry("450x700+10+20")
window.mainloop()



