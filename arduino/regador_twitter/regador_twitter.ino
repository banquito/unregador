int humedadValue = 0; 
const int humedadPin = A2;
int humedadPercent; 

void setup() { 
  Serial.begin(9600);
}

void loop() {
  humedadValue = analogRead(humedadPin); 
  humedadPercent = (100.0 * humedadValue) / 1024; 
  Serial.print("Humedad:"); 
  Serial.println(humedadPercent); 
  
  delay(1000);
}
