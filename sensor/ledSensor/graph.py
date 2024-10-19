import serial
import matplotlib.pyplot as plt
import time

# Configuration du port série (à adapter selon votre système)
ser = serial.Serial('COM3', 115200)  # Remplacez 'COM3' par le port correct
time.sleep(2)  # Attendre que la connexion soit établie

spo2_values = []  # Liste pour stocker les valeurs de SPO2
timestamps = []   # Liste pour stocker les timestamps

try:
    start_time = time.time()
    while True:
        if ser.in_waiting > 0:
            line = ser.readline().decode('utf-8').strip()  # Lire la ligne du port série
            print(line)  # Afficher la ligne pour débogage
            
            # Chercher la valeur de SPO2 dans la ligne
            if "SPO2=" in line:
                # Extraire la valeur de SPO2
                spo2_value = line.split("SPO2=")[1].split(",")[0]
                spo2_values.append(int(spo2_value))  # Ajouter la valeur à la liste
                
                # Enregistrer le temps écoulé
                timestamps.append(time.time() - start_time)

            # Mettre à jour le graphique en temps réel
            plt.clf()  # Effacer le graphique précédent
            plt.plot(timestamps, spo2_values, label='SPO2')
            plt.xlabel('Temps (s)')
            plt.ylabel('SPO2 (%)')
            plt.title('Suivi en temps réel de SPO2')
            plt.legend()
            plt.pause(0.1)  # Pause pour mettre à jour le graphique

except KeyboardInterrupt:
    print("Arrêt du programme.")

finally:
    ser.close()  # Fermer le port série
    plt.show()   # Afficher le dernier graphique
