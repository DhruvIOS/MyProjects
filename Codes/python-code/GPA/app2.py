# GPA calculator including weighted and unweighted GPA's.
i = 0

Entry = 0
GradeSum = 0
UnweightedGPA = 0
WeightedGPA = 0
GradeTotal = 0 
Grades = []
QualityPoints = [0.0, 4.0, 3.7, 3.3, 3.0, 2.7, 2.3, 2.0, 1.7, 1.3, 1.0, 0.0]
CourseType = []
 
print("This program will ask you to enter your final course grades and type of course\n")
print("one at a time. Then it will calculate your weighted and unweighted GPA.\n")
 
print('\n')
 
# Have the user enter all the grades and course type.
 
while i >= 0:
    print('Enter the number that corresponds to the letter grade:\n')
    print('\n')
    print('**************************************************************')
    print('1 A, 2 A-, 3 B+, 4 B, 5 B-, 6 C+, 7 C, 8 C-, 9 D+, 10 D, 11 F')
    print('**************************************************************')
    print('\n')
    print('Enter 12 when you have entered all of your courses.')
    Entry = int(input('Enter course grade: '))
    Entry2 = float(input('Enter course weight: Regular=1.0, Honors=1.5, AP=2.0: '))
    Grades.append(Entry)
    CourseType.append(Entry2)

    if len(Grades) and len(CourseType) == 4:
        break



for x in range(0, len(Grades)):
    GradeSum = QualityPoints[Grades[x]] + GradeSum

for x in range (0, len(Grades)):
    GradeTotal = QualityPoints[Grades[x]]*CourseType[x] + GradeTotal



WeightedGPA = GradeTotal/len(Grades)
print(GradeTotal)
print(len(Grades))
UnweightedGPA = GradeSum/len(Grades)
print('UnweightedGPA' + str(UnweightedGPA))
print('WeightedGPA' + str(WeightedGPA))



 
