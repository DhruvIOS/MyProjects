from tkinter import *
from tkinter import filedialog
from tkinter import font
from tkinter import messagebox


root = Tk()
root.title(" Python IDLE")
root.iconbitmap('/Users/dhruvshah/Desktop/Codes/School Code/image/Mylogo.jpg')
root.geometry("1200x660")

global open_status_name
open_status_name = False

global selected
selected = False

#New File Command

def new_file():
	my_text.delete("1.0", END)
	root.title("Untitled - Python IDLE")
	status_bar.config(text="New File      ")
	global open_status_name 
	open_status_name =  False 

#Open Files

def open_file():
	my_text.delete("1.0", END)
	text_file = filedialog.askopenfilename(initialdir="/Users/dhruvshah/Desktop/Codes/Python-IDLE" , title="Choose File" , )
	
	if text_file:
		global open_status_name
		open_status_name = text_file


	name = text_file
	name = name.replace("/Users/dhruvshah/Desktop/Codes/Python-IDLE/" , "")
	root.title(f'{name} - Python IDLE')
	status_bar.config(text=f'{name}      ')


	#Open  the Files

	text_file = open(text_file , 'r')
	stuff = text_file.read()

	my_text.insert(END , stuff)
	#Close the opended file
	text_file.close()

	


#SaveAs Files

def saveas_file():
	text_file = filedialog.asksaveasfilename(defaultextension=".*" , initialdir="/Users/dhruvshah/Desktop/Codes/Python-IDLE" , title="Save File")
	global open_status_name 
	open_status_name = text_file
	if text_file:
		name = text_file
		name = name.replace("/Users/dhruvshah/Desktop/Codes/Python-IDLE/" , "")
		root.title(f'{name} - Python IDLE')
		status_bar.config(text=f'Saved: {name}      ')

		#Save the file

		text_file = open(text_file , 'w')
		text_file.write(my_text.get(1.0 , END))
		text_file.close()
		messagebox.showinfo("New Filed Saved" , 'You successfully saved this file')


#Save A File

def save_file():
	
	global open_status_name 
	if open_status_name:
		text_file = open(open_status_name , 'w')
		text_file.write(my_text.get(1.0 , END))
		text_file.close()
		status_bar.config(text=f'Saved: {open_status_name}      ')
		messagebox.showinfo("New Filed Saved" , 'You successfully saved this file')


	else:
		saveas_file()



#Cut Command
def Cut(e):
 global selected
 if e:
 	selected = root.clipboard_get()
 else:
 	if my_text.selection_get():
 		selected = my_text.selection_get()
 		my_text.delete("sel.first" , "sel.last")
 		root.clipboard_clear()
 		root.clipboard_append(selected)

#Copy Command
def Copy(e):
 global selected
 if e:
 	selected = root.clipboard_get()
 if my_text.selection_get():
 	selected = my_text.selection_get()
 	root.clipboard_clear()
 	root.clipboard_append(selected)


 	

#Pate Command
def Paste(e):
 global selected
 if e:
 	selected = root.clipboard_get()
 else:
 	if selected:
 		place = my_text.index(INSERT)
 		my_text.insert(place, selected)
 	

#Create Main Frame

my_frame = Frame(root)
my_frame.pack(pady=20)

text_scroll = Scrollbar(my_frame)
text_scroll.pack(side=RIGHT, fill=Y)

my_text = Text(my_frame, width=600, height=25, font=("Helvetica", 20) , selectbackground="#8893A5" , selectforeground="white",insertbackground="white" , fg="white" , undo=True , yscrollcommand=text_scroll.set , background="#2E2E2E")
my_text.pack()

text_scroll.config(command=my_text.yview)

#Menu Config

my_menu = Menu(root)
root.config(menu=my_menu)


#File Menu


file_menu = Menu(my_menu)
my_menu.add_cascade(label="File", menu=file_menu)
file_menu.add_command(label="New", command=new_file)
file_menu.add_command(label="Open" , command=open_file)
file_menu.add_command(label="Save" , command=save_file )
file_menu.add_command(label="Save As", command=saveas_file)

file_menu.add_separator()
file_menu.add_command(label="Exit", command=root.quit)

#Edit Menu
edit_menu = Menu(my_menu)
my_menu.add_cascade(label="Edit", menu=edit_menu)
edit_menu.add_command(label="Cut     Cmd+x" ,command=lambda: Cut(False))
edit_menu.add_command(label="Copy    Cmd+c" , command=lambda: Copy(False))
edit_menu.add_command(label="Paste   Cmd+v" , command=lambda: Paste(False))
edit_menu.add_command(label="Undo")
edit_menu.add_command(label="Redo")




#Status Bar Botton

status_bar = Label(root , text='Ready      ' , anchor=E)
status_bar.pack(fill=X, side=BOTTOM , ipady=5 )





#Edit Binding

root.bind('<Command-Key-x>' , Cut)
root.bind('<Command-Key-c>' , Copy)
root.bind('<Command-Key-v>' , Paste)










root.mainloop()