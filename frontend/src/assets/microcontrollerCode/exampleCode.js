export const Esp32_ExampleCode = `
#include <WiFi.h>
#include <HTTPClient.h>
#include <DHT.h>

#define DHTPIN 4
#define DHTTYPE DHT22

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";
const char* serverUrl = "http://your-backend-url/api/sensor-data";
const char* token = "YOUR_JWT_TOKEN";

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(115200);
  dht.begin();
  
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
}

void loop() {
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();
  
  if (!isnan(temperature) && !isnan(humidity)) {
    sendData("temperature", temperature);
    sendData("humidity", humidity);
  }
  
  delay(10000);
}

void sendData(String sensorType, float value) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    String jsonData = "{\\"sensorType\\": \\"" + sensorType + "\\", \\"value\\": " + String(value) + "}";
    
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");
    http.addHeader("Authorization", "Bearer " + String(token));
    
    int httpResponseCode = http.POST(jsonData);
    Serial.println("Response code: " + String(httpResponseCode));
    
    http.end();
  }
}
`;

export const RaspBerryPi_ExampleCode = `
import RPi.GPIO as GPIO
import requests
import time
import json

# Configuration
SERVER_URL = "http://your-backend-url/api/sensor-data"
TOKEN = "YOUR_JWT_TOKEN"

headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {TOKEN}"
}

# GPIO Setup
GPIO.setmode(GPIO.BCM)
SENSOR_PIN = 4

def read_sensor():
    # Your sensor reading logic here
    # This is a placeholder
    return 25.5

def send_data(sensor_type, value):
    data = {
        "sensorType": sensor_type,
        "value": value
    }
    
    try:
        response = requests.post(SERVER_URL, json=data, headers=headers)
        print(f"Response: {response.status_code}")
    except Exception as e:
        print(f"Error: {e}")

try:
    while True:
        sensor_value = read_sensor()
        send_data("temperature", sensor_value)
        time.sleep(10)
except KeyboardInterrupt:
    GPIO.cleanup()
`;
