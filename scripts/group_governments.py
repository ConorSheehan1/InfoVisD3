import pandas as pd

df = pd.read_csv("../data/Gapminder_All_Time.csv")

print("Before:\nnumber of governments:\n", len(df["Government"].unique()), df["Government"].unique(), "\n")

# get rid of territories (puerto rico etc.)
df = df[df.Government.str.contains("territory") == False]


def rep(df, val):
    govs = df[df.Government.str.contains(val)]["Government"].unique()

    for gov in govs:
        df.replace(gov, val, inplace=True)

# any government containing the word republic or monarchy is grouped together
rep(df, "republic")
rep(df, "monarchy")

print("After:\nnumber of governments:\n", len(df["Government"].unique()), df["Government"].unique())

# export
df.to_csv('../governments_grouped.csv', index=False)
