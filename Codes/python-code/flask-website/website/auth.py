from flask import Blueprint, render_template, request, flash

auth  = Blueprint('auth', __name__)

@auth.route('/login' , methods=['GET', 'POST'])
def login():
    return render_template("login.html")


@auth.route('/logout')

def logout():
    return"<p> Logout </p>"


@auth.route('/SignUp' , methods=['GET', 'POST'])
def SignUp():
    if request.method == 'POST':
        email = request.form.get('email')
        firstName = request.form.get('firstName')
        passWord1 = request.form.get('passWord1')
        passWord2 = request.form.get('passWord2')

        if len(email) < 4:
            flash('Email must be greater than 3 characters.', category='error')
        elif len(firstName) < 2:
            flash('Your first name must be greater than 1 characters', category='error')
            
        elif passWord1 != passWord2:
            flash('Your password does not match please check your password ', category='error')
        elif len(passWord1) < 7:
            flash('Your password is not strong enough (Greater than 6 characters.)', category='error')

        else:
            flash('Account Successful created' ,category='success')

    return render_template("signUp.html")


