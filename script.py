import calcs as c
import os
import json

data_path = os.path.join(os.getcwd(), 'public', 'data')

with open (os.path.join(data_path, 'keplar.json'), 'r') as f:
    data = json.load(f)

print(data)