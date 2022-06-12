import random



Letter = ['A', 'B', 'C', 'D', 'E', 'F', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

randomPassword = random.choices(Letter, k=4)

randomString = ''.join(randomPassword)



CapLetter = ['A', 'B', 'C', 'D', 'E', 'F', 'E', 'F', 'G', 'H', 'I', 'J','K', 'L', 'M', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']



crack = 0
while crack < 100000000000:


    randomPassword = random.choices(Letter, k=4)

    randomString = ''.join(randomPassword)


    CapRandom = random.choices(CapLetter, k=4)
    BigStringLetter = ''.join(CapRandom)

    if BigStringLetter == randomString:

        print(randomString)
        print(BigStringLetter)

    crack = crack + 1
