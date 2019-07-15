import os
import pandas as pd
from config.path_mixin import PathMixin

class SortGapminder(PathMixin):
    def do_sort(self):
        # sort dataframe by year and write to csv
        self.df.sort_values(["Year"], inplace=True)

if __name__ == "__main__":
    s = SortGapminder()
    s.do_sort()
    s.to_csv("gapminder_all_time_sorted")
