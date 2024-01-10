# Import necessary libraries
import matplotlib.pyplot as plt
import numpy as np

# Basic Plotting
# Generate a sequence of numbers from 0 to 10 with 100 steps in between
x = np.linspace(0, 10, 100)

# Calculate the sine of each x point
y = np.sin(x)

# Create a basic line plot
plt.plot(x, y)
plt.xlabel('X Axis Label (Time)')
plt.ylabel('Y Axis Label (Sine of Time)')
plt.title('Basic Line Plot in Matplotlib')
plt.show()

# Plotting multiple lines on the same graph
y2 = np.cos(x)
plt.plot(x, y, label='Sine')
plt.plot(x, y2, label='Cosine')
plt.xlabel('X Axis Label (Time)')
plt.ylabel('Y Axis Label')
plt.title('Sine and Cosine Curves')
plt.legend()
plt.show()

# Scatter Plot
# Generate random data for scatter plot
x_scatter = np.random.rand(50)
y_scatter = np.random.rand(50)

# Create a scatter plot
plt.scatter(x_scatter, y_scatter)
plt.xlabel('Random X Values')
plt.ylabel('Random Y Values')
plt.title('Basic Scatter Plot')
plt.show()

# Bar Chart
# Generate a simple bar chart
categories = ['Category A', 'Category B', 'Category C', 'Category D']
values = [10, 20, 15, 5]

plt.bar(categories, values)
plt.xlabel('Categories')
plt.ylabel('Values')
plt.title('Basic Bar Chart')
plt.show()

# Histogram
# Generate data and create a histogram
data = np.random.randn(1000)
plt.hist(data, bins=30)
plt.xlabel('Data')
plt.ylabel('Frequency')
plt.title('Histogram')
plt.show()

# Save a figure
# Let's save the sine curve figure
plt.plot(x, y)
plt.xlabel('X Axis Label (Time)')
plt.ylabel('Y Axis Label (Sine of Time)')
plt.title('Figure to be Saved')
plt.savefig('sine_curve.png')  # Save the figure
plt.close()  # Close the plotting window

# This script demonstrates various basic plotting capabilities in Matplotlib.
# Users can run this script to generate different types of plots and visualize data in Python.
