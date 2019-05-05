import pandas as pd

df = pd.read_csv("../data/Gapminder_All_Time.csv")
countries = df.Country.unique()
# print(countries)

# print unique governments
# print("governments\n", df["Government"].unique(), "length: ", len(df["Government"].unique()))

print(df.loc[df['Country'] == "Puerto Rico"]["Government"].unique())
print(sorted(df.loc[df['Country'] == "Puerto Rico"]["Year"]))
print(sorted(df.loc[df['Country'] == "Greenland"]["Year"]))

# df2 = df.groupby(["Country"])
# print(df2.head())
# print(df.head)
#
# # in 2005 territory of the us disappears from dataset
# print(df.loc[df['Government'] == "territory of the United States"])
#
# # same for autonomous territory of the Netherlands
# print(df.loc[df['Government'] == "autonomous territory of the Netherlands"])
