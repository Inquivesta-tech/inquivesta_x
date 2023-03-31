import gspread
from oauth2client.service_account import ServiceAccountCredentials
import json


# Connect to Google Sheets
scope = ['https://www.googleapis.com/auth/spreadsheets',
         "https://www.googleapis.com/auth/drive"]

credentials = ServiceAccountCredentials.from_json_keyfile_name("key_gen.json", scope)
client = gspread.authorize(credentials)

# sheet = client.create("NewDatabase")

# sheet.share('sg21ms204@iiserkol.ac.in', perm_type='user', role='writer')

sheet = client.open("Copy of EventReg'23")
# data = sheet.get_all_records()
# print(data)

worksheet_list = sheet.worksheets()

def find(email):
    k = []
    for temp in worksheet_list:
        name = temp.title
        data = sheet.worksheet(name).get_all_records()
        # print(name)
        for line in data:
            if line["Email"] == email:
                k.append(name)
    authObj = {
        "email":email,
        "onspot": False,
        "events" : k
    } 
    return json.dumps(authObj)

email = "srijita2825@gmail.com"
print(find(email))

#  make list of list of emails

loloe = []
for wksheet in worksheet_list:
    data = sheet.worksheet(wksheet).get

# for temp in worksheet_list:
#     name = temp.title
#     email = "srijita2825@gmail.com"
#     data = sheet.worksheet(name).get_all_records()
#     # print(name)
#     for line in data:
#         if line["Email"] == email:
#             k.append(name)

print(worksheet_list[0].title)
