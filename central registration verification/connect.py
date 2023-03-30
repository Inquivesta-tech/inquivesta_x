import gspread
from oauth2client.service_account import ServiceAccountCredentials


# Connect to Google Sheets
scope = ['https://www.googleapis.com/auth/spreadsheets',
         "https://www.googleapis.com/auth/drive"]

credentials = ServiceAccountCredentials.from_json_keyfile_name("key_gen.json", scope)
client = gspread.authorize(credentials)

# sheet = client.create("NewDatabase")

# sheet.share('sg21ms204@iiserkol.ac.in', perm_type='user', role='writer')

sheet = client.open("Copy of EventReg'23").sheet1
data = sheet.get_all_records()
for k in data:
    if "gmail" in k["Player\'s Email"]:
        print(k["Team Id"]) 