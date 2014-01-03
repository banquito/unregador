#include <MotorShield.h>

int humedadValue = 0; 
const int humedadPin = A2;
int humedadPercent; 

const int buttonPin = 2;
int buttonState = 0;
MS_DCMotor motor(MOTOR_A);
int gruaState = 0;

void setup() { 
  Serial.begin(9600);
  
  pinMode(buttonPin,INPUT);
  motor.run(BRAKE);
  motor.setSpeed(255);  
}

void loop() {
  humedadValue = analogRead(humedadPin); 
  humedadPercent = (100.0 * humedadValue) / 1024; 
  Serial.print("Humedad:"); 
  Serial.println(humedadPercent); 

  buttonState = digitalRead(buttonPin);
  if (buttonState == HIGH) {
    if(gruaState==HIGH){
      motor.run(FORWARD|RELEASE);
    } else {
      motor.run(BACKWARD|RELEASE);
    }
  } else {
    motor.run(BRAKE);
    if(gruaState==HIGH){
      gruaState=LOW; 
    } else {
      gruaState=HIGH;
    }
  }
  delay(1500);
}
