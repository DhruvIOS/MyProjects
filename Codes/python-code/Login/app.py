from tkinter import *
from tkinter import messagebox
import os 
from itertools import islice
import linecache



global root
root = Tk()
root.geometry('425x285+700+300')

root.grid_columnconfigure((0,1), weight=1)


#Getting information

def information():

    global NewPass
    global emailAddress

    NewUsername = userEntry1.get()


    NewPass = passwordEntry1.get()



    emailAddress = emailEntry1.get()



    try:

        if len(userEntry1.get()) == 0:
            messagebox.showwarning("Warming", "Please entry a username")

        elif len(passwordEntry1.get()) == 0:
            messagebox.showwarning("Warming", "Please entry a password")

        elif len(emailEntry1.get()) == 0:
            messagebox.showwarning("Warming", "Please entry a email address")

        else:
            with open(f'../Login/userDatabase/{NewUsername}', 'w') as f:
                f.write(f'Username: {NewUsername}\n')
                f.write(f'Password: {NewPass}\n')
                f.write(f'Email: {emailAddress}\n')
                f.close()

                messagebox.showinfo("Accouont Created", f'You successfully created your account {NewUsername}')

    except:

        messagebox.showerror("Error", "Something went wrong try again later.")








    

##Show password
def toggle_password():
    if passwordEntry.cget('show') == '':
        passwordEntry.config(show='*')
        toggle_btn.config(text='Show Password')

    else:
        passwordEntry.config(show='')
        toggle_btn.config(text='Hide Password')


def showPassword():
    if passwordEntry1.cget('show') == '':
        passwordEntry1.config(show='*')
        toggle_btn1.config(text='Show Password')


    else:
        passwordEntry1.config(show='')
        toggle_btn1.config(text='Hide Password')






##new window


def makeUser():

    userWin = Toplevel(root)
    userWin.title('Registration')
    userWin.geometry('425x285+700+300')
    userWin.grid_columnconfigure((0,1), weight=1)


    lbl = Label(userWin, text="REGISTER YOUR ACCOUNT", fg='white', bg='black')



    username = Label(userWin, text="Username:", bg='#666666',fg='white')
    password = Label(userWin, text="Password:",bg='#666666',fg='white')
    global toggle_btn1
    toggle_btn1= Radiobutton ( userWin, text='Show Password',value='Show password',command=showPassword)

    email = Label(userWin, text="Email Address:",bg='#666666',fg='white')
    # submitBtn = Button(userWin, text="submit",bg='blue')
    submitBtn = Button(userWin, text = 'Click me !!', fg='blue', command=information)



    global userEntry1 
    global passwordEntry1 
    global emailEntry1 


    userEntry1 = Entry(userWin)
    passwordEntry1 = Entry(userWin, show='*')
    emailEntry1 = Entry(userWin)




    lbl.place(x=130 ,y=0)
    lbl.config(font=('Helvatical bold',15))
    username.grid(row=5, column=0, pady=50)
    userEntry1.grid(row=5, column=1)

    password.grid(row=6, column=0)
    passwordEntry1.grid(row=6, column=1)
    toggle_btn1.grid(row=6, column=2)


    email.grid(row=7, column=0,pady=50 )
    emailEntry1.grid(row=7, column=1)

    submitBtn.place(x=170 ,y=250)

    




    print('Account Window')
   


##Loged in screen

def logedIn():
    global loggedInUser
    loggedInUser = userEntry.get()
    userIn = Toplevel(root)
    userIn.grid_columnconfigure((0,1), weight=1)

    userIn.title('Todo List')

    userIn.geometry('425x485+700+300')
    userIn.grid_columnconfigure((0,1), weight=1)

    welcome = Label(userIn, text=f"Welcome {loggedInUser}", fg='black', bg='white')
    welcome.place(x=170 ,y=0)
    welcome.config(font=('Helvatical bold',15))

    addButton = Button(userIn, text="Add Task", command=dataWrite)


    deleteButton = Button(userIn, text="Delete Task", command=deleteTask)




    global List
    List = Listbox(userIn, bg='blue')







    global Task

    Task = Entry(userIn)

    Task.grid(row=5, column=0, pady=50)

    addButton.place(x=50 ,y=170)
    deleteButton.place(x=50, y=200)

    List.grid(row=6, column=1)


    userTaskCheck = os.listdir('../Login/userTask/')
    print(userTaskCheck)

    size = List.size()
    if size == 0 and loggedInUser in userTaskCheck:
        with open(f'../Login/userTask/{loggedInUser}', 'r') as f:

            for x in f:
                List.insert(1, x)


    else:
        pass





def deleteTask():




    
    selected = List.get(ANCHOR)
    print(selected)

    with open(f'../Login/userTask/{loggedInUser}', 'r') as f:
        data = f.readlines()






    with open(f'../Login/userTask/{loggedInUser}', 'w') as f:
        for line in data:
            if line.strip("\n") != selected:
                f.write(line)


    List.delete(ANCHOR)

    # with open(f'../Login/userTask/{loggedInUser}', 'w') as f:
    #      for line in data:
    #         if line.strip("\n") != selected:
    #             f.write(line)


    








def dataWrite():
    DataBaseUser = userEntry.get()
    dataTask = Task.get()




    # ListTask = 

    List.insert(1, dataTask)



    try:
        with open(f'../Login/userTask/{DataBaseUser}', 'a') as f:

            f.write(f'{dataTask}\n')
            f.close()

    except:
        print('err')
















#user auth
database = os.listdir('../Login/userDatabase/')

def login():
    usernameInfo = userEntry.get() 
    passwordInfo = passwordEntry.get()

    userLine = linecache.getline(f'../Login/userDatabase/{usernameInfo}', 1)

    passwordLine = linecache.getline(f'../Login/userDatabase/{usernameInfo}', 2)
    emailLine = linecache.getline(f'../Login/userDatabase/{usernameInfo}', 3)


    newUserLine = userLine.split()
    newPassLine = passwordLine.split()
    newemailLine = emailLine.split()



    if usernameInfo == newUserLine[1] and passwordInfo == newPassLine[1]:

        logedIn()
        


    else:
        messagebox.showerror("Wrong Info", "Invalid Username or Password")


##login screen



root.title('Login')

lbl = Label(root, text="LOGIN SYSTEM", fg='black', bg='white')




username = Label(root, text="Username:",bg='#666666',fg='white')
password = Label(root, text="Password:",bg='#666666',fg='white')
# toggle_btn = Button(root, text='Show Password', width=5, command=toggle_password)
toggle_btn= Radiobutton ( root, text='Show Password',value='Show password',command=toggle_password)

loginBtn = Button(root, text="Login", command=login)
createuser = Button(root, text="Make Account", command=makeUser)


global userEntry
global passwordEntry
userEntry = Entry(root)
passwordEntry = Entry(root, show='*')




# lbl.grid(row=1, column=1)
toggle_btn.grid(row=6, column=2)
lbl.place(x=170 ,y=0)
lbl.config(font=('Helvatical bold',15))
username.grid(row=5, column=0, pady=50)
userEntry.grid(row=5, column=1)
password.grid(row=6, column=0 )
passwordEntry.grid(row=6, column=1)
loginBtn.place(x=50 ,y=170)
createuser.place(x=240 ,y=170)








root.mainloop()





