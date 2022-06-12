
import random



R_EATING = "I don't like eating anything because I'm a bot obviously!"
R_SHOP ='We host discord bots, make discord bots, front-end website, back-end website, full stack website.'




def unknown():
    response = ["Could you please re-phrase that? ",
                "...",
                "Sounds about right.",
                "What does that mean?"][
        random.randrange(4)]
    return response