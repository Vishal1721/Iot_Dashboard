export const esp32_SensorData = `
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";
const char* apiEndpoint = "http://your-backend-url/api/sensor-data";
const char* jwtToken = "YOUR_JWT_TOKEN";
int projectId = 1;
int sensorId = 1;

void setup() {
  Serial.begin(115200);
  
  // Connect to WiFi
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\\nConnected to WiFi");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    // Read your sensor value
    float sensorValue = analogRead(A0) * (5.0 / 1023.0);
    
    // Send data to server
    sendSensorData(sensorValue);
  } else {
    Serial.println("WiFi Disconnected");
  }
  
  delay(5000); // Send every 5 seconds
}

void sendSensorData(float value) {
  HTTPClient http;
  
  // Construct URL
  String url = String(apiEndpoint) + "?projectId=" + String(projectId) + 
               "&sensorId=" + String(sensorId);
  
  http.begin(url);
  http.addHeader("Content-Type", "application/json");
  http.addHeader("Authorization", "Bearer " + String(jwtToken));
  
  // Create JSON payload
  StaticJsonDocument<200> doc;
  doc["value"] = value;
  doc["timestamp"] = millis();
  
  String requestBody;
  serializeJson(doc, requestBody);
  
  // Send POST request
  int httpResponseCode = http.POST(requestBody);
  
  if (httpResponseCode > 0) {
    String response = http.getString();
    Serial.println("HTTP Response code: " + String(httpResponseCode));
    Serial.println("Response: " + response);
  } else {
    Serial.println("Error code: " + String(httpResponseCode));
  }
  
  http.end();
}
`;

export const RaspberryPi_SensorData = `
import requests
import time
import json
from datetime import datetime

# Configuration
API_ENDPOINT = "http://your-backend-url/api/sensor-data"
JWT_TOKEN = "YOUR_JWT_TOKEN"
PROJECT_ID = 1
SENSOR_ID = 1

headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {JWT_TOKEN}"
}

def read_sensor():
    # Replace with your actual sensor reading logic
    # Example: Reading from a GPIO pin or sensor library
    import random
    return random.uniform(20.0, 30.0)

def send_sensor_data(value):
    url = f"{API_ENDPOINT}?projectId={PROJECT_ID}&sensorId={SENSOR_ID}"
    
    payload = {
        "value": value,
        "timestamp": datetime.now().isoformat()
    }
    
    try:
        response = requests.post(url, json=payload, headers=headers)
        
        if response.status_code == 200:
            print(f"✓ Data sent successfully: {value}")
            print(f"Response: {response.json()}")
        else:
            print(f"✗ Error: {response.status_code}")
            print(f"Message: {response.text}")
    except Exception as e:
        print(f"✗ Exception occurred: {str(e)}")

def main():
    print("Starting sensor data transmission...")
    print(f"Connecting to: {API_ENDPOINT}")
    
    try:
        while True:
            sensor_value = read_sensor()
            print(f"\\nReading sensor value: {sensor_value}")
            send_sensor_data(sensor_value)
            time.sleep(5)  # Send data every 5 seconds
    except KeyboardInterrupt:
        print("\\nStopping sensor data transmission...")

if __name__ == "__main__":
    main()
`;
