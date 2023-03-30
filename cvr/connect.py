import gspread
from oauth2client.service_account import ServiceAccountCredentials


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
k = []

for temp in worksheet_list:
    name = temp.title
    email = "srijita2825@gmail.com"
    data = sheet.worksheet(name).get_all_records()
    # print(name)
    for line in data:
        if line["Email"] == email:
            k.append(name)

print(worksheet_list[0].title)
print(k)