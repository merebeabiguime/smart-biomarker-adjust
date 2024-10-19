import socketio
import time
import serial

arduino = serial.Serial(port='COM5', baudrate=115200, timeout=.1) 

# Crée une instance de client Socket.IO
sio = socketio.Client()

# Callback lorsque la connexion est établie
@sio.event
def connect():
    print('Connection established')

# Callback lorsque la connexion est fermée
@sio.event
def disconnect():
    print('Disconnected from server')

# Callback lorsque des données sont reçues sur l'événement 'measure.new'
@sio.on('measure.new')
def on_measure_new(data):
    # Assurer que 'measurements' contient des données
    if 'status' in data:
        st=data['status']
        print(f"Measurement status: {st}")
        match st:
            case "MILD":
                valueToSend=0
            case "MODERATE":
                valueToSend=1
            case "SEVERE":
                valueToSend=2
        print(f"ValueToSend: {valueToSend}")
        write_read(int(valueToSend))  # Écrire la valeur sur le port série
    else:
        print("Aucune mesure valide reçue.")

# Fonction pour écrire sur le port série
def write_read(x):
    try:
        arduino.write([x])  # Assurez-vous que 'arduino' est correctement initialisé ailleurs
        time.sleep(0.05)
    except Exception as e:
        print(f"Erreur lors de l'écriture sur le port série : {e}")

# Se connecter au serveur Socket.IO
if __name__ == '__main__':
    try:
        # Remplace par l'URL correcte si ce n'est pas 'localhost'
        sio.connect('http://localhost:3000', transports=['websocket'])
        sio.wait()  # Attend les événements (reçoit des messages, etc.)
    except Exception as e:
        print(f"Unable to connect: {e}")
