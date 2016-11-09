# paste list from link below into console
# https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3
y = input()
output = ""
while y != "":
    # include an extra space between each value to account for countries with a a comma in their name
    output += '"' + y.split("\t")[1].split(",")[0] + '"' + ":" + '"' + y.split("\t")[0] + '"' + ",  "
    y = input()

# remove last trailing comma
# fix space formatting in print
print("var codes = {" + output[:-3].replace(",  ", ", ") + "};")
