import pandas as pd
import os
from util.stats_mixin import StatsMixin
from config.path_mixin import PathMixin

class GroupGovernments(PathMixin, StatsMixin):
    # val: str
    # replacement: str
    def group_in_place(self, val, replacement=''):
        if not replacement: replacement = val

        selector = self.df.Government.str.contains(val)
        governments = self.df[selector]["Government"].unique()
        governments = self.df[selector]["Government"].unique()

        for gov in governments:
            self.df.replace(gov, replacement, inplace=True)

        self.print_stats(num_msg="number of governments: ")

    def to_csv(self, *args, **kwargs):
        self.print_stats(num_msg="number of governments: ", list_msg="list_of_governments:\n")
        # super(PathMixin, self).to_csv(*args, **kwargs)
        super(GroupGovernments, self).to_csv(*args, **kwargs)
        # super().to_csv(*args, **kwargs)


def governments_grouped():
    govs_obj = GroupGovernments()
    govs_obj.group_in_place("republic")
    govs_obj.group_in_place("monarchy")
    govs_obj.to_csv('governments_grouped')

def governments_grouped_broader():
    govs_obj = GroupGovernments()

    # get rid of territories (puerto rico etc.)
    territory_selector = govs_obj.df.Government.str.contains("territory")
    govs_obj.df = govs_obj.df[territory_selector == False]

    # differentiate between types of republic
    govs_obj.group_in_place("federal republic", "federal rep")
    # exclude people's republic
    govs_obj.group_in_place("people's republic", "people's rep")

    # group monarchies together
    govs_obj.group_in_place("monarchy")
    govs_obj.group_in_place("republic")

    # fix excluded republics
    govs_obj.group_in_place("federal rep", "federal republic")
    govs_obj.group_in_place("people's rep", "people's republic")
    govs_obj.to_csv('governments_grouped_broader')


if __name__ == "__main__":
    governments_grouped()
    governments_grouped_broader()
