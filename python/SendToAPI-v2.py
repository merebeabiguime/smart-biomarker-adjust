#!/usr/bin/env python
# coding: utf-8

# In[32]:


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


# In[23]:


# Classe Biomarker
class Biomarker:
    def __init__(self, name: str, measurement_unit: str):
        self.name = name
        self.measurement_unit = measurement_unit

# Classe BiomarkerMeasurement
class BiomarkerMeasurement:
    def __init__(self, hour, value: float, biomarker: Biomarker):
        self.hour = hour
        self.value = value
        self.biomarker = biomarker
        
breathing_frequency = Biomarker("Fréquence toux", "répétition/min")
oxygen_saturation = Biomarker("Saturation en oxygène", "%")
spirometre = Biomarker("Débit expiratoire de pointe", "%") 


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

# In[24]:


freq_toux=1
sat_o2=99
dbt_exp=99

compteur = 0
compte_spie = 0

seuil_normal1 = 0
seuil_normal2 = 100
seuil_normal3 = 100

seuil_anormal1 = 3
seuil_anormal2 = 95
seuil_anormal3 = 80

seuil_urgence1 = 5
seuil_urgence2 = 90
seuil_urgence3 = 50   


# In[25]:


df = pd.read_csv("smoothed_values.csv")
df


# In[33]:


compte_spie = 0 
compteur = 0
quantite = 0
affichage = True

while (1):
    
    # Créer une liste des nombres de 0 à 500
    nombres_possibles = list(range(501))  # Inclut 0 à 500

    # Tirer un nombre aléatoire sans remise
    nombre = random.choice(nombres_possibles)

    # Supprimer ce nombre de la liste pour éviter qu'il soit tiré à nouveau
    nombres_possibles.remove(nombre)

    # Afficher le résultat
    if affichage :
        print(f"Nombre choisi : {nombre}")
    
    df = pd.read_csv("smoothed_values.csv")

    nom_col_date = df.columns[0]
    nom_col_toux = df.columns[1]
    nom_col_o2 = df.columns[2]
    nom_col_resp = df.columns[3]
    
    df[nom_col_date] = pd.to_datetime(df[nom_col_date], errors='coerce')

    valeur_date = df[nom_col_date].iloc[-nombre]
    valeur_toux = df[nom_col_toux].iloc[-nombre]
    valeur_o2 = df[nom_col_o2].iloc[-nombre]
    
    if affichage :
        print(compte_spie)
        
    if compte_spie == 0 or compte_spie == 12:
        valeur_resp = df[nom_col_resp].iloc[-nombre]
        compte_spie = 0

    if affichage :
        print(f"Dernière date : {valeur_date}")
        print(f"Dernière valeur de toux : {valeur_toux}")
        print(f"Dernière valeur de taux d'oxygène : {valeur_o2}")
        print(f"Dernière valeur de respiration : {valeur_resp}")
    
    time.sleep(5) # every 5 seconds
    compte_spie += 1

#     if seuil_anormal <= valeur <= seuil_normal:  # Normal : entre 95% et 105% de la moyenne
#         return 1  # Normal
#     elif seuil_urgence <= valeur < seuil_anormal:  # Anormal : entre 90% et 95% de la moyenne : Prendre mesure spirometre  
#         return 2  # Anormal 
#     elif valeur < seuil_urgence:  # Urgence : en dessous de 90% de la moyenne
#         return 3  # Urgence
#     else:
#         return 0  # Erreur
    
    if affichage :
        print(quantite)
        
    if freq_toux >= seuil_urgence1 or sat_o2 <= seuil_urgence2 or dbt_exp <= seuil_urgence3:
        quantite = 200
        print("a1")
        
    elif dbt_exp <= seuil_anormal2 :
        quantite = 100
        compteur += 1
        print("a2")
        
        if compteur == 5:
            print("Vas aux urgences mon frérot")
            compteur = 0
            
    elif freq_toux >= seuil_anormal1 and sat_o2 <= seuil_anormal2:
        quantite = 100
        print("a3")
        
    elif freq_toux >= seuil_anormal1 and sat_o2 <= seuil_normal2:
        quantite = 50
        print("a4")
        
    elif freq_toux >= seuil_normal1 and sat_o2 <= seuil_anormal2:
        quantite = 100
        print("a5")
        
    elif freq_toux >= seuil_normal1 and sat_o2 >= seuil_normal2:
        quantite = 0
        print("a6")
        
    else :
        quantite = 0
        
    if quantite != 0:
        print("Quantite : ", quantite) 
    
    # Créer les mesures de biomarqueurs
    measurement1 = BiomarkerMeasurement(valeur_date, valeur_toux, breathing_frequency)
    measurement2 = BiomarkerMeasurement(valeur_date, valeur_o2, oxygen_saturation)
    measurement3 = BiomarkerMeasurement(valeur_date, valeur_resp, spirometre)

    # Créer la charge utile à envoyer (payload)
    payload = {
        "measurements": [
            {
                "hour": measurement1.hour.isoformat(),
                "value": measurement1.value,
                "biomarker": {
                    "name": measurement1.biomarker.name,
                    "measurementUnit": measurement1.biomarker.measurement_unit
                }
            },
            {
                "hour": measurement2.hour.isoformat(),
                "value": measurement2.value,
                "biomarker": {
                    "name": measurement2.biomarker.name,
                    "measurementUnit": measurement2.biomarker.measurement_unit
                }
            },
            {
                "hour": measurement3.hour.isoformat(),
                "value": measurement3.value,
                "biomarker": {
                    "name": measurement3.biomarker.name,
                    "measurementUnit": measurement3.biomarker.measurement_unit
                }
            }
        ],
        "status": "MILD",  # Statut parmi MILD, MODERATE, SEVERE
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


