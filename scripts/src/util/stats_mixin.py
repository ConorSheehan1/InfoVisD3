class StatsMixin:
    def get_stats(self):
        unique_governments = self.df["Government"].unique()
        return len(unique_governments), unique_governments

    # num_msg: str
    # list_msg: str
    def print_stats(self, num_msg="", list_msg=""):
        num_govs, list_of_govs = self.get_stats()
        if num_msg:
            print(f"{num_msg}{num_govs}")
        if list_msg:
            print(f"{list_msg}{list_of_govs}\n")
