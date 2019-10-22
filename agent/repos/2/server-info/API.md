```
curl -X Put -d "{\"params\": [{paramsData}]}" https://fireBaseUrl/192_1_1_2.json
```

examples:

```
curl -X PUT -d "{ \"params\": [ { \"name\": \"HDD\", \"value\": \"2\", \"measureUnit\": \"pieces\", \"description\": \"Hard drives\", \"groupId\": [ 1 ], \"relations\": [ \"HDD samsung 1\", \"HDD samsung 2\" ] }, { \"name\": \"HDD samsung 1\", \"value\": \"4\", \"measureUnit\": \"Celsius\" }, { \"name\": \"HDD samsung 2\", \"value\": \"4\", \"measureUnit\": \"Celsius\" } ]}" https://server-info-ea885.firebaseio.com/192_1_1_2.json
```

```
curl -X PUT -d "{ \"params\": [ { \"name\": \"HDD\", \"value\": \"2\", \"measureUnit\": \"pieces\", \"description\": \"Hard Drives\", \"groupId\": [ 1 ], \"relations\": [ \"HDD samsung 1\", \"HDD samsung 2\" ] }, { \"name\": \"HDD samsung 1\", \"value\": \"4\", \"measureUnit\": \"Celsius\" }, { \"name\": \"HDD samsung 2\", \"value\": \"4\", \"measureUnit\": \"Celsius\" }, { \"name\": \"Video Cards\", \"value\": \"3\", \"measureUnit\": \"pieces\", \"description\": \"Graphic cards\", \"groupId\": [ 1 ], \"relations\": [ \"Graphic Radion 460H 1\", \"Graphic Radion 460H 2\", \"Graphic Radion 500\" ] }, { \"name\": \"Graphic Radion 460H 1\", \"value\": \"40\", \"measureUnit\": \"Celsius\" }, { \"name\": \"Graphic Radion 460H 2\", \"value\": \"4\", \"measureUnit\": \"Celsius\" }, { \"name\": \"Graphic Radion 500\", \"value\": \"400\", \"measureUnit\": \"Celsius\" }, { \"name\": \"CPU\", \"value\": \"2\", \"measureUnit\": \"pieces\", \"description\": \"processors\", \"groupId\": [ 1 ], \"relations\": [ \"Intel core i5\", \"Intel core i7\" ] }, { \"name\": \"Intel core i5\", \"value\": \"40\", \"measureUnit\": \"Celsius\" }, { \"name\": \"Intel core i7\", \"value\": \"400\", \"measureUnit\": \"Celsius\" } ]}" https://server-info-ea885.firebaseio.com/example.json
```