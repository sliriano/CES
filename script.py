import requests

url = "https://api.coingecko.com/api/v3/coins/categories/list"

r = requests.get(url)

eco_list = r.json()
print(len(eco_list))
for i in eco_list:
    print('<option value="{}">{}</option>'.format(i["category_id"], i["name"]))