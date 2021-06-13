![Website](https://img.shields.io/website?down_color=grey&down_message=offline&style=for-the-badge&up_color=red&up_message=sefifoxapps.it&url=https%3A%2F%2Fstefifoxapps.it) ![GitHub](https://img.shields.io/github/license/stefifox/WifiKeyboard-Server?style=for-the-badge)

# WifiKeyboard-Server
## By Stefifox

Official Android App on [PlayStore](https://play.google.com/store/apps/details?id=dev.stefifox.commander)

## Make your own app

Everyone are welcome!
You can build your app, first use this table to know how server works

| URL | METHOD | Paramethers |DESCRIPTION |
| --- | --- | --- | --- |
| / | GET | null | Home page of server |
| /connect | GET | null | JSON response with list of buttons and server version informations. Used for verify if all are updated and preparing list of buttons in Andoird app |
| /reload | GET | null |Reload config.json in memory to apply changes |
| /key | GET | id | Call the key saved at certain id in config file |
| /addbutton | GET | id,name,key | Add new button in config file |

Now you can use /connect to verify the connection with the server and get all buttons array. To send any key command use /key?id= 