import numpy as np 
import pandas as pd

# Create a 2D array of 5 rows and 3 columns
# Each row represents a student, and each column represents a subject
# The values are the marks obtained by the student in that subject
marks = np.array([[80, 90, 70], [60, 70, 80], [90, 80, 70], [80, 70, 60], [70, 60, 50]])
# Create a DataFrame from the 2D array
# The first argument is the 2D array, and the second argument is the list of column names
df = pd.DataFrame(marks, columns=["Maths", "Physics", "Chemistry"])
# Print the DataFrame
print(df)