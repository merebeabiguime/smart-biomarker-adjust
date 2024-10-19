#!/usr/bin/env python
# coding: utf-8

# In[7]:


import requests
import json
from datetime import datetime

import pandas as pd
import numpy as np
import time
import matplotlib.pyplot as plt 

import random

# URL du Site
url = "http://192.168.56.1:3000/api/biomarker/receive-data"
file = "smoothed_values_pb.csv"


# In[21]:


# Classe Biomarker
class Biomarker:
    def __init__(self, name: str, measurement_unit: str, id_name: int):
        self.name = name
        self.measurement_unit = measurement_unit
        self.id_name = id_name

# Classe BiomarkerMeasurement
class BiomarkerMeasurement:
    def __init__(self, hour, value: float, biomarker: Biomarker, user_id: int):
        self.hour = hour
        self.value = value
        self.biomarker = biomarker
        self.user_id = user_id
        
breathing_frequency = Biomarker("Fréquence toux", "répétition/min",1)
oxygen_saturation = Biomarker("Saturation en oxygène", "%",2)
spirometre = Biomarker("Débit expiratoire de pointe", "%",3) 


# # Créer les mesures de biomarqueurs
# measurement1 = BiomarkerMeasurement(datetime(2024, 10, 17, 8, 30), 95.0, breathing_frequency)
# measurement2 = BiomarkerMeasurement(datetime(2024, 10, 17, 9, 0), 98.5, oxygen_saturation)

# # Créer la charge utile à envoyer (payload)
# payload = {
#     "measurements": [
#         {
#             "hour": measurement1.hour.isoformat(),
#             "value": measurement1.value,
#             "biomarker": {
#                 "name": measurement1.biomarker.name,
#                 "measurementUnit": measurement1.biomarker.measurement_unit
#             }
#         },
#         {
#             "hour": measurement2.hour.isoformat(),
#             "value": measurement2.value,
#             "biomarker": {
#                 "name": measurement2.biomarker.name,
#                 "measurementUnit": measurement2.biomarker.measurement_unit
#             }
#         }
#     ],
#     "status": "MILD",  # Statut parmi MILD, MODERATE, SEVERE, INCOMING_ATTACK
#     "recommendedDosage": 0
# }

# # URL de l'API
# #url = "http://172.20.10.3/api/biomarker/receive-data"
# url = "http://192.168.56.1:3000/api/biomarker/receive-data"
# 
# # Envoyer la requête POST
# response = requests.post(url, json=payload)
# 
# # Vérifier la réponse
# if response.status_code == 200:
#     print("Données envoyées avec succès")
# else:
#     print(f"Erreur : {response.status_code}")

# In[3]:


seuil_normal1 = 0
seuil_normal2 = 98
seuil_normal3 = 98

seuil_anormal1 = 3
seuil_anormal2 = 95
seuil_anormal3 = 80

seuil_urgence1 = 5
seuil_urgence2 = 90
seuil_urgence3 = 50   


# In[22]:


compte_spie = 0 
quantite = 0
affichage = False
affichage2 = True
nombre = 0
timing_sleep = 1

while (1):

    nombre += 1
    
    df = pd.read_csv(file)

    nom_col_date = df.columns[0]
    nom_col_toux = df.columns[1]
    nom_col_o2 = df.columns[2]
    nom_col_resp = df.columns[3]
    
    #df[nom_col_date] = pd.to_datetime(df[nom_col_date], format='%d-%m-%Y %H:%M', errors='coerce')
    df[nom_col_date] = pd.to_datetime(df[nom_col_date], format='%m/%d/%y %H:%M', errors='coerce')

    valeur_date = df[nom_col_date].iloc[nombre]
    #print(valeur_date)
    valeur_toux = df[nom_col_toux].iloc[nombre]
    valeur_o2 = df[nom_col_o2].iloc[nombre]
    
    if affichage2 :
        print(compte_spie)
        
    if compte_spie == 0 or compte_spie == 12:
        valeur_resp = df[nom_col_resp].iloc[nombre]
        compte_spie = 0

    if affichage2 :
        print(f"Dernière date : {valeur_date}")
        print(f"Dernière valeur de toux : {valeur_toux}")
        print(f"Dernière valeur de taux d'oxygène : {valeur_o2}")
        print(f"Dernière valeur de respiration : {valeur_resp}")
    
    time.sleep(timing_sleep) # every 5 seconds
    compte_spie += 1
    
    if affichage2 :
        print(quantite)
        
    if valeur_toux >= seuil_urgence1 or valeur_o2 <= seuil_urgence2 or valeur_resp <= seuil_urgence3:
        quantite = 200
        print("a1")
        
    elif valeur_resp <= seuil_anormal3 :
        quantite = 100
        print("a2")
            
    elif valeur_toux >= seuil_anormal1 and valeur_o2 <= seuil_anormal2:
        quantite = 100
        print("a3")
        
    elif valeur_toux >= seuil_anormal1 and valeur_o2 <= seuil_normal2:
        quantite = 50
        print("a4")
        
    elif valeur_toux >= seuil_normal1 and valeur_o2 <= seuil_anormal2:
        quantite = 100
        print("a5")
        
    elif valeur_toux >= seuil_normal1 and valeur_o2 >= seuil_normal2:
        quantite = 0
        print("a6")
        
    else :
        quantite = 0
        print("a7")
    
    # Pour calculer le status dans notre requête qu'on envoie à l'appli
    if quantite != 0:
        print("Quantite : ", quantite) 
        
    if quantite <= 0:
        status_a = "MILD"
    
    if 100 >= quantite > 0:
        status_a = "MODERATE"
        
    if quantite > 100:
        status_a = "SEVERE"
    
    if affichage2:
        print("Status : ", status_a)
    
    # Créer les mesures de biomarqueurs
    measurement1 = BiomarkerMeasurement(valeur_date, valeur_toux, breathing_frequency,1)
    measurement2 = BiomarkerMeasurement(valeur_date, valeur_o2, oxygen_saturation,1)
    measurement3 = BiomarkerMeasurement(valeur_date, valeur_resp, spirometre,1)

    # Créer la charge utile à envoyer (payload)
    payload = {
        "measurements": [
            {
                "hour": measurement1.hour.isoformat(),
                "value": measurement1.value,
                "userId": measurement1.user_id,
                "biomarker": {
                    "name": measurement1.biomarker.name,
                    "measurementUnit": measurement1.biomarker.measurement_unit,
                    "id": measurement1.biomarker.id_name
                }
            },
            {
                "hour": measurement2.hour.isoformat(),
                "value": measurement2.value,
                "userId": measurement2.user_id,
                "biomarker": {
                    "name": measurement2.biomarker.name,
                    "measurementUnit": measurement2.biomarker.measurement_unit,
                    "id": measurement2.biomarker.id_name
                }
            },
            {
                "hour": measurement3.hour.isoformat(),
                "value": measurement3.value,
                "userId": measurement3.user_id,
                "biomarker": {
                    "name": measurement3.biomarker.name,
                    "measurementUnit": measurement3.biomarker.measurement_unit,
                    "id": measurement3.biomarker.id_name
                }
            }
        ],
        "status": status_a,  # Statut parmi MILD, MODERATE, SEVERE
        "recommendedDosage": quantite
    }
    
    if affichage :
        print("well")
    # Envoyer la requête POST
    response = requests.post(url, json=payload)

    # Vérifier la réponse
    if response.status_code == 200:
        print("Données envoyées avec succès")
    else:
        print(f"Erreur : {response.status_code}")


# In[ ]:




