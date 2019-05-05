import pandas as pd
import os


class GroupGovernments:
    def __init__(self):
        self.current_path = os.path.abspath(os.path.dirname(__file__))
        self.data_dir = os.path.join(self.current_path, '..', 'data')
        self.gapminder_path = os.path.join(self.data_dir, 'Gapminder_All_Time.csv')
        self.df = pd.read_csv(self.gapminder_path)
        self.print_stats(num_msg="number of governments")

    def get_stats(self):
        unique_governments = self.df["Government"].unique()
        return len(unique_governments), unique_governments

    # num_msg: str
    # list_msg: str
    def print_stats(self, num_msg="", list_msg=""):
        num_govs, list_of_govs = self.get_stats()
        if num_msg: print(f"{num_msg}: {num_govs}")
        if list_msg: print(f"{list_msg}: {list_of_govs}\n")

    # val: str
    def group_in_place(self, val):
        selector = self.df.Government.str.contains(val)
        governments = self.df[selector]["Government"].unique()

        for gov in governments:
            self.df.replace(gov, val, inplace=True)

        self.print_stats(num_msg="number of governments")

    # file_name: str
    def to_csv(self, file_name='governments_grouped'):
        output_path = os.path.join(self.data_dir, f"{file_name}.csv")
        self.df.to_csv(output_path, index=False)


if __name__ == "__main__":
    govs_obj = GroupGovernments()
    govs_obj.group_in_place("republic")
    govs_obj.group_in_place("monarchy")
    govs_obj.to_csv('governments_grouped')
