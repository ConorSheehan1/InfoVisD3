import pandas as pd

df = pd.read_csv("../data/Gapminder_All_Time.csv")

print("Before:\nnumber of governments:\n", len(df["Government"].unique()), df["Government"].unique(), "\n")

# get rid of territories (puerto rico etc.)
df = df[df.Government.str.contains("territory") == False]


def rep(df, val, replacement=None):
    if not replacement:
        replacement = val

    govs = df[df.Government.str.contains(val)]["Government"].unique()

    for gov in govs:
        df.replace(gov, replacement, inplace=True)

# exclude federal republics from general republics
rep(df, "federal republic", "federal rep")
# exclude people's republic
rep(df, "people's republic", "people's rep")

# group monarchies together
rep(df, "monarchy")
rep(df, "republic")

# fix excluded republics
rep(df, "federal rep", "federal republic")
rep(df, "people's rep", "people's republic")

print("After:\nnumber of governments:\n", len(df["Government"].unique()), df["Government"].unique())

# export
df.to_csv('../governments_grouped_broader.csv', index=False)
