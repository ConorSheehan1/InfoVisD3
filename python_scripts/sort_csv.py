import pandas as pd

# sort dataframe by year and write to csv
df = pd.read_csv("../Gapminder_All_Time.csv")
df.sort(["Year"], inplace=True)

df.to_csv('../Gapminder_All_Time.csv', index=False)