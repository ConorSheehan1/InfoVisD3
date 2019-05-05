import os
import pandas as pd

module_path = os.path.abspath(os.path.dirname(__file__))
data_dir = os.path.join(module_path, "..", "..", "data")
gapminder_path = os.path.join(data_dir, "Gapminder_All_Time.csv")

class PathMixin:
    def __init__(self):
        self.data_dir = data_dir
        self.gapminder_path = gapminder_path
        self.df = pd.read_csv(self.gapminder_path)

    # file_name: str
    def to_csv(self, file_name='governments_grouped'):
        output_path = os.path.abspath(os.path.join(self.data_dir, f"{file_name}.csv"))
        print(f"saving to {output_path}\n\n")
        self.df.to_csv(output_path, index=False)
