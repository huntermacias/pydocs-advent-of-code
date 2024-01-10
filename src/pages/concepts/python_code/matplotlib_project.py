# matplotlib_project.py
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

# Simulate some sales data
np.random.seed(0)  # For reproducible results
dates = pd.date_range('20210101', periods=100)
data = pd.DataFrame(np.random.randn(100, 4), index=dates, columns=list('ABCD'))
data['Total Sales'] = data.sum(axis=1)

# Plotting a line graph of total sales over time
plt.figure(figsize=(10,6))
plt.plot(data.index, data['Total Sales'], color='blue', marker='o')
plt.title('Total Sales Over Time')
plt.xlabel('Date')
plt.ylabel('Total Sales')
plt.xticks(rotation=45)
plt.tight_layout()  # Adjusts plot to ensure everything fits without overlapping
plt.savefig('total_sales_over_time.png')
plt.show()

# Creating a bar chart of average sales per column
average_sales = data.mean()
plt.figure(figsize=(8,6))
average_sales[:-1].plot(kind='bar')  # Exclude 'Total Sales' from average calculation
plt.title('Average Sales Per Category')
plt.xlabel('Category')
plt.ylabel('Average Sales')
plt.tight_layout()
plt.savefig('average_sales_per_category.png')
plt.show()

# Creating a histogram of total sales
plt.figure(figsize=(8,6))
data['Total Sales'].plot(kind='hist', bins=20, edgecolor='black')
plt.title('Distribution of Total Sales')
plt.xlabel('Total Sales')
plt.ylabel('Frequency')
plt.tight_layout()
plt.savefig('distribution_of_total_sales.png')
plt.show()

# Creating a scatter plot comparing two categories
plt.figure(figsize=(8,6))
plt.scatter(data['A'], data['B'], alpha=0.5)
plt.title('Sales Comparison Between Category A and B')
plt.xlabel('Category A Sales')
plt.ylabel('Category B Sales')
plt.tight_layout()
plt.savefig('sales_comparison_a_b.png')
plt.show()

# This script demonstrates various ways to visualize sales data using Matplotlib.
# Users can adapt and extend this script to visualize different types of data.
