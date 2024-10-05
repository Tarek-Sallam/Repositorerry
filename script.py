import calcs as c
import os
import json
import math

data_path = os.path.join(os.getcwd(), 'public', 'data')

with open (os.path.join(data_path, 'keplar.json'), 'r') as f:
    data = json.load(f)

planets = ["Mercury" , "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"]

delta_t = 85

grav_constant = 6.674e-11
sun_mass = 1.989e30

pos_data = {}

for planet in planets: 

    positions = []
    planet_data = data[planet]
    a = planet_data["semi_major_axis"]
    e = planet_data["eccentricity"]
    i = planet_data["inclination"]
    mean_long = planet_data["mean_long"]
    mean_long_change = planet_data["mean_long_change"]
    long_peri = planet_data["long_peri"]
    long_node = planet_data["long_node"]

    orbital_time = 2*math.pi *math.sqrt(math.pow(a*1.496e11,3)/(grav_constant*sun_mass))/86400


    n_keyframes = math.floor(orbital_time/delta_t)

    for i in range(n_keyframes):

        T = c.convert_to_jed(5,10,2024,0)
        T = c.get_T(T)
        arg_peri = c.arg_peri(long_peri, long_node)
        mean_long = c.mean_long(mean_long,mean_long_change,T)
        M = c.mean_anomaly(mean_long, arg_peri)
        e_adj = c.rad_to_deg(e)
        E = c.newton_raphson_kepler(M, e_adj)
        pos = c.get_orbital_pos(E,e,a)
        pos = c.get_relative_pos(pos, i, long_node, arg_peri)

        positions.append(pos)
    
    pos_data[planet] = {"positions": positions}



print(pos_data)

