export const Esp32_WifiSetUp_code = `
#include <WiFi.h>

// WiFi credentials
const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

void setup() {
  Serial.begin(115200);
  delay(1000);
  
  Serial.println();
  Serial.println("**************************************");
  Serial.println("ESP32 WiFi Connection Setup");
  Serial.println("**************************************");
  
  // Set WiFi mode to station
  WiFi.mode(WIFI_STA);
  
  // Disconnect from any previous connection
  WiFi.disconnect();
  delay(100);
  
  // Begin WiFi connection
  Serial.print("Connecting to: ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  
  // Wait for connection
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 30) {
    delay(500);
    Serial.print(".");
    attempts++;
  }
  
  Serial.println();
  
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("✓ WiFi Connected Successfully!");
    Serial.println("**************************************");
    Serial.print("IP Address: ");
    Serial.println(WiFi.localIP());
    Serial.print("MAC Address: ");
    Serial.println(WiFi.macAddress());
    Serial.print("Signal Strength (RSSI): ");
    Serial.print(WiFi.RSSI());
    Serial.println(" dBm");
    Serial.println("**************************************");
  } else {
    Serial.println("✗ WiFi Connection Failed!");
    Serial.println("Please check:");
    Serial.println("  1. SSID and Password are correct");
    Serial.println("  2. WiFi router is powered on");
    Serial.println("  3. ESP32 is within range");
  }
}

void loop() {
  // Check WiFi connection status
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("WiFi is connected - Running...");
  } else {
    Serial.println("WiFi disconnected - Attempting to reconnect...");
    WiFi.begin(ssid, password);
  }
  
  delay(10000); // Check every 10 seconds
}
`;

export const RaspBerryPi_WifiSetUp_code = `
#!/usr/bin/env python3
import subprocess
import time
import sys

# WiFi Configuration
SSID = "YOUR_WIFI_SSID"
PASSWORD = "YOUR_WIFI_PASSWORD"

def check_wifi_connection():
    """Check if WiFi is connected"""
    try:
        result = subprocess.run(['iwgetid', '-r'], 
                              capture_output=True, 
                              text=True)
        return result.stdout.strip() == SSID
    except Exception as e:
        print(f"Error checking WiFi: {e}")
        return False

def connect_to_wifi():
    """Connect to WiFi network"""
    print("=" * 50)
    print("Raspberry Pi WiFi Setup")
    print("=" * 50)
    print(f"Attempting to connect to: {SSID}")
    
    try:
        # Using nmcli (NetworkManager CLI)
        cmd = [
            'nmcli', 'device', 'wifi', 'connect', 
            SSID, 'password', PASSWORD
        ]
        
        result = subprocess.run(cmd, 
                              capture_output=True, 
                              text=True, 
                              timeout=30)
        
        if result.returncode == 0:
            print("✓ WiFi Connected Successfully!")
            print("=" * 50)
            get_connection_info()
            return True
        else:
            print("✗ WiFi Connection Failed!")
            print(f"Error: {result.stderr}")
            return False
            
    except subprocess.TimeoutExpired:
        print("✗ Connection timeout!")
        return False
    except Exception as e:
        print(f"✗ Error: {e}")
        return False

def get_connection_info():
    """Display connection information"""
    try:
        # Get IP address
        ip_result = subprocess.run(['hostname', '-I'], 
                                  capture_output=True, 
                                  text=True)
        ip_address = ip_result.stdout.strip().split()[0]
        
        # Get signal strength
        signal_result = subprocess.run(['iwconfig', 'wlan0'], 
                                     capture_output=True, 
                                     text=True)
        
        print(f"IP Address: {ip_address}")
        print("Signal Information:")
        for line in signal_result.stdout.split('\\n'):
            if 'Signal level' in line or 'Quality' in line:
                print(f"  {line.strip()}")
                
    except Exception as e:
        print(f"Error getting connection info: {e}")

def main():
    print("Starting WiFi setup...")
    
    if check_wifi_connection():
        print(f"Already connected to {SSID}")
        get_connection_info()
    else:
        print("Not connected, attempting to connect...")
        connect_to_wifi()
    
    print("=" * 50)
    print("Setup complete!")

if __name__ == "__main__":
    main()
`;
