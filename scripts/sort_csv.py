import pandas as pd

# sort dataframe by year and write to csv
df = pd.read_csv("../data/Gapminder_All_Time.csv")
df.sort(["Year"], inplace=True)*/87

df.to_csv('../data/Gapminder_All_Time_Sorted.csv', index=False)
