export const esp_SampleCode = `
#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";
const char* serverUrl = "http://your-backend-url/api/sensor-data";
const char* token = "YOUR_JWT_TOKEN";

void setup() {
  Serial.begin(115200);
  
  // Connect to WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    
    // Your sensor reading here
    float temperature = 25.5;
    float humidity = 60.0;
    
    // Create JSON payload
    String jsonData = "{\\"sensorId\\": 1, \\"value\\": " + String(temperature) + "}";
    
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");
    http.addHeader("Authorization", "Bearer " + String(token));
    
    int httpResponseCode = http.POST(jsonData);
    
    if (httpResponseCode > 0) {
      Serial.println("Data sent successfully");
    } else {
      Serial.println("Error sending data");
    }
    
    http.end();
  }
  
  delay(5000); // Send data every 5 seconds
}
`;

export const python_Samplecode = `
import requests
import time
import json

# Configuration
SERVER_URL = "http://your-backend-url/api/sensor-data"
TOKEN = "YOUR_JWT_TOKEN"
SENSOR_ID = 1

headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {TOKEN}"
}

def send_sensor_data(sensor_id, value):
    data = {
        "sensorId": sensor_id,
        "value": value
    }
    
    try:
        response = requests.post(SERVER_URL, json=data, headers=headers)
        if response.status_code == 200:
            print("Data sent successfully")
        else:
            print(f"Error: {response.status_code}")
    except Exception as e:
        print(f"Error sending data: {e}")

# Main loop
while True:
    # Read sensor data here
    temperature = 25.5
    
    send_sensor_data(SENSOR_ID, temperature)
    time.sleep(5)  # Send data every 5 seconds
`;
