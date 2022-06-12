way = 'way'
ay = 'ay'
used = 0 
Vowels = ['a','e','i','o','u']

language = input('Enter a word: ')

#for index, item in enumerate(items):
for x in range(0, 5, 1):
   
    NewAlpha = language[1:]

    
    if language[0] == Vowels[x]:
    
        print(language + way)
        break
    elif x == 4 and language[0] != Vowels[x]:
        print(NewAlpha + language[0] + ay)