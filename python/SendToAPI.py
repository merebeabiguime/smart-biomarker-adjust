#!/usr/bin/env python
# coding: utf-8

# In[1]:


import requests
import json
from datetime import datetime

import pandas as pd
import numpy as np
import time
import matplotlib.pyplot as plt 


# In[2]:


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
        
breathing_frequency = Biomarker("Fréquence respiratoire", "1/s")
oxygen_saturation = Biomarker("Saturation en oxygène", "%")


# # Créer les mesures de biomarqueurs
# measurement1 = BiomarkerMeasurement(datetime(2024, 10, 17, 8, 30), 95.0, breathing_frequency)
# measurement2 = BiomarkerMeasurement(datetime(2024, 10, 17, 9, 0), 98.5, oxygen_saturation)

# In[3]:


measurement1 = BiomarkerMeasurement(datetime(2024, 10, 17, 9, 0), 97.23824305437, oxygen_saturation)


# In[4]:


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
        }
    ],
    "status": "MILD",  # Statut parmi MILD, MODERATE, SEVERE, INCOMING_ATTACK
    "recommendedDosage": 0
}


# In[6]:


# URL de l'API
#url = "http://172.20.10.3/api/biomarker/receive-data"
url = "http://192.168.56.1:3000/api/biomarker/receive-data"

# Envoyer la requête POST
response = requests.post(url, json=payload)

# Vérifier la réponse
if response.status_code == 200:
    print("Données envoyées avec succès")
else:
    print(f"Erreur : {response.status_code}")

