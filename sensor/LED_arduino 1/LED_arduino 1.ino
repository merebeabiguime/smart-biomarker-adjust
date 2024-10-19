
/*
  Blink

  Turns an LED on for one second, then off for one second, repeatedly.

  Most Arduinos have an on-board LED you can control. On the UNO, MEGA and ZERO
  it is attached to digital pin 13, on MKR1000 on pin 6. LED_BUILTIN is set to
  the correct LED pin independent of which board is used.
  If you want to know what pin the on-board LED is connected to on your Arduino
  model, check the Technical Specs of your board at:
  https://www.arduino.cc/en/Main/Products

  modified 8 May 2014
  by Scott Fitzgerald
  modified 2 Sep 2016
  by Arturo Guadalupi
  modified 8 Sep 2016
  by Colby Newman

  This example code is in the public domain.

  https://www.arduino.cc/en/Tutorial/BuiltInExamples/Blink
*/
int a;

// the setup function runs once when you press reset or power the board
void setup() {
  // initialize digital pin LED_BUILTIN as an output.
  pinMode(12, OUTPUT);
  pinMode(11, OUTPUT);
  pinMode(10, OUTPUT);
  Serial.begin(115200); 
	Serial.setTimeout(0.1); 
  
 
}

// the loop function runs over and over again forever
void loop() {
  if(Serial.available()){
    a = Serial.read();
    if (a>93 && a<=95){
      digitalWrite(11, HIGH);  // turn the LED on (HIGH is the voltage level)
      digitalWrite(12, LOW);  
      digitalWrite(10, LOW); 
    } else if (a<=93){
      digitalWrite(10, HIGH);  // turn the LED on (HIGH is the voltage level)
      digitalWrite(12, LOW);  
      digitalWrite(11, LOW); 
    }
    else{
      digitalWrite(12, HIGH);  // turn the LED on (HIGH is the voltage level)
      digitalWrite(10, LOW);  
      digitalWrite(11, LOW);
    }
    Serial.write(a);
  }
 
  
}
