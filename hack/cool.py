import http.client

conn = http.client.HTTPConnection("890407d7-e617-4d70-985f-01792d693387/predix-uaa/run/aws-usw02-pr/ice/predix,io")

payload = "username=ic.admin&password=admin"

headers = {
    'Authorization': "Basic aGFja2F0aG9uOkBoYWNrYXRob24=",
    'Cache-Control': "no-cache",
    'Postman-Token': "91622e66-663c-f1b6-f5f3-f0c03176f7f1"
    }

conn.request("GET", "oauth,token", payload, headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))