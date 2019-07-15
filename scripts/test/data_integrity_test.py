import unittest
import pandas as pd
import os

module_path = os.path.abspath(os.path.dirname(__file__))
data_dir = os.path.join(module_path, "..", "..", "data")


class CountriesTest(unittest.TestCase):

    def setUp(self):
        self.df_all_time = pd.read_csv(os.path.join(data_dir, "Gapminder_All_Time.csv"))
        self.df_grouped = pd.read_csv(os.path.join(data_dir, "governments_grouped.csv"))
        self.df_grouped_broader = pd.read_csv(os.path.join(data_dir, "governments_grouped_broader.csv"))

    def test_data_integrity_all_time(self):
        assert self.df_all_time.loc[self.df_all_time['Country'] == "Puerto Rico"]["Government"].unique()
        assert sorted(self.df_all_time.loc[self.df_all_time['Country'] == "Puerto Rico"]["Year"])
        assert sorted(self.df_all_time.loc[self.df_all_time['Country'] == "Greenland"]["Year"])

    def test_data_integrity_grouped(self):
        expected_govs = ['republic', 'monarchy', 'autonomous region of Denmark', 'federation']
        self.assertEqual(self.df_grouped['Government'].unique().tolist(), expected_govs)

    def test_data_integrity_grouped_broader(self):
        expected_govs = [
            'republic', 'monarchy', 'federal republic', "people's republic",
            'autonomous region of Denmark', 'federation'
        ]
        self.assertEqual(self.df_grouped_broader['Government'].unique().tolist(), expected_govs)

if __name__ == '__main__':
    unittest.main()


# print unique governments
# print("governments\n", df["Government"].unique(), "length: ", len(df["Government"].unique()))


# df2 = df.groupby(["Country"])
# print(df2.head())
# print(df.head)
#
# # in 2005 territory of the us disappears from dataset
# print(df.loc[df['Government'] == "territory of the United States"])
#
# # same for autonomous territory of the Netherlands
# print(df.loc[df['Government'] == "autonomous territory of the Netherlands"])
