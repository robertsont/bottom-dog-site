import csv
import json

csvfile = open('../bottom-dog/players_singles.csv', 'r', newline='')
jsonfile = open('data/players_singles.js', 'w+')

fieldnames = ["rank", "type", "grade", "name", "code", "association", "club", "lastPlayed"]
reader = csv.DictReader( csvfile, fieldnames)
next(reader)
jsonfile.write('[')
for row in reader:
    json.dump(row, jsonfile)
    jsonfile.write(',\n')
jsonfile.write(']')