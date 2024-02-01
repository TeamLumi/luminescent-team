# Map Info Locations

<b>Context:</b>

	Each ArenaID below is formed by the combination of a g### file and a s### file by ArenaInfo in gamesettings.
	They do not match up with ArenaID. 0 is associated with g001 and the offset increases to 3 (ie ArenaID
	75 is associated with g078). s### are approximately around the first g### to use them.

<b>Missingno:</b>

	On default are routed to use g001/s001, acting basically like ArenaID 0.
	In dump.cs, they are associated with g### files but will crash the game if you attempt
	to use g### files by those names, since they are not actually specified within
	Environments's AssetBundle Array. My attempts to add files to the array failed.

<table>
    <tr>
        <td>Arena ID</td>
        <td>Proper Translated Caption</td>
        <td>Ground Asset Bundle Name</td>
        <td>Sky Asset Bundle Name</td>
        <td>Dusk Ball</td>
        <td>Burmy Form</td>
        <td>Nature Power Move Name</td>
        <td>Reflection Resolution</td>
        <td>Shadow Resolution</td>
        <td>Is Indoor</td>
    </tr>
    <tr>
        <td>0</td>
        <td>Grass - West Sinnoh</td>
        <td>bg/arenas/ground/g001</td>
        <td>bg/arenas/sky/s001</td>
        <td>0</td>
        <td>0</td>
        <td>Energy Ball</td>
        <td>0</td>
        <td>2</td>
        <td>0</td>
    </tr>
    <tr>
        <td>1</td>
        <td>Fuego Ironworks</td>
        <td>bg/arenas/ground/g002</td>
        <td>bg/arenas/sky/s006</td>
        <td>0</td>
        <td>2</td>
        <td>Lava Plume</td>
        <td>0</td>
        <td>2</td>
        <td>0</td>
    </tr>
    <tr>
        <td>2</td>
        <td>Flower Paradise</td>
        <td>bg/arenas/ground/g004</td>
        <td>bg/arenas/sky/s004</td>
        <td>0</td>
        <td>0</td>
        <td>Energy Ball</td>
        <td>0</td>
        <td>2</td>
        <td>0</td>
    </tr>
    <tr>
        <td>3</td>
        <td>Forest - West Sinnoh</td>
        <td>bg/arenas/ground/g005</td>
        <td>bg/arenas/sky/s001</td>
        <td>0</td>
        <td>0</td>
        <td>Energy Ball</td>
        <td>0</td>
        <td>2</td>
        <td>0</td>
    </tr>
    <tr>
        <td>4</td>
        <td>Cave</td>
        <td>bg/arenas/ground/g006</td>
        <td>bg/arenas/sky/s006</td>
        <td>1</td>
        <td>1</td>
        <td>Power Gem</td>
        <td>0</td>
        <td>2</td>
        <td>0</td>
    </tr>
    <tr>
        <td>5</td>
        <td>Cave - Water</td>
        <td>bg/arenas/ground/g007</td>
        <td>bg/arenas/sky/s006</td>
        <td>1</td>
        <td>0</td>
        <td>Hydro Pump</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
    </tr>
    <tr>
        <td>6</td>
        <td>Rocky Terrain</td>
        <td>bg/arenas/ground/g008</td>
        <td>bg/arenas/sky/s008</td>
        <td>0</td>
        <td>1</td>
        <td>Earth Power</td>
        <td>0</td>
        <td>2</td>
        <td>0</td>
    </tr>
    <tr>
        <td>7</td>
        <td>Shallow Water</td>
        <td>bg/arenas/ground/g009</td>
        <td>bg/arenas/sky/s009</td>
        <td>0</td>
        <td>0</td>
        <td>Hydro Pump</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
    </tr>
    <tr>
        <td>8</td>
        <td>Water Route - Water</td>
        <td>bg/arenas/ground/g010</td>
        <td>bg/arenas/sky/s010</td>
        <td>0</td>
        <td>0</td>
        <td>Hydro Pump</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
    </tr>
    <tr>
        <td>9</td>
        <td>Water Route - Sand</td>
        <td>bg/arenas/ground/g011</td>
        <td>bg/arenas/sky/s011</td>
        <td>0</td>
        <td>0</td>
        <td>Earth Power</td>
        <td>0</td>
        <td>2</td>
        <td>0</td>
    </tr>
    <tr>
        <td>10</td>
        <td>Verity Cavern</td>
        <td>bg/arenas/ground/g012</td>
        <td>bg/arenas/sky/s006</td>
        <td>1</td>
        <td>1</td>
        <td>Psychic</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
    </tr>
    <tr>
        <td>11</td>
        <td>Valor Cavern</td>
        <td>bg/arenas/ground/g013</td>
        <td>bg/arenas/sky/s006</td>
        <td>1</td>
        <td>1</td>
        <td>Psychic</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
    </tr>
    <tr>
        <td>12</td>
        <td>Acuity Cavern</td>
        <td>bg/arenas/ground/g014</td>
        <td>bg/arenas/sky/s006</td>
        <td>1</td>
        <td>1</td>
        <td>Psychic</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
    </tr>
    <tr>
        <td>13</td>
        <td>Trainer&#39;s School</td>
        <td>bg/arenas/ground/g015</td>
        <td>bg/arenas/sky/s006</td>
        <td>0</td>
        <td>2</td>
        <td>Tri Attack</td>
        <td>0</td>
        <td>2</td>
        <td>1</td>
    </tr>
    <tr>
        <td>14</td>
        <td>Indoors</td>
        <td>bg/arenas/ground/g016</td>
        <td>bg/arenas/sky/s006</td>
        <td>0</td>
        <td>2</td>
        <td>Tri Attack</td>
        <td>0</td>
        <td>0</td>
        <td>1</td>
    </tr>
    <tr>
        <td>15</td>
        <td>Snowy Area</td>
        <td>bg/arenas/ground/g017</td>
        <td>bg/arenas/sky/s017</td>
        <td>0</td>
        <td>0</td>
        <td>Ice Beam</td>
        <td>0</td>
        <td>2</td>
        <td>0</td>
    </tr>
    <tr>
        <td>16</td>
        <td>Snowpoint Temple</td>
        <td>bg/arenas/ground/g018</td>
        <td>bg/arenas/sky/s006</td>
        <td>0</td>
        <td>1</td>
        <td>Ice Beam</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
    </tr>
    <tr>
        <td>17</td>
        <td>Great Marsh</td>
        <td>bg/arenas/ground/g020</td>
        <td>bg/arenas/sky/s020</td>
        <td>0</td>
        <td>0</td>
        <td>Mud Shot</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
    </tr>
    <tr>
        <td>18</td>
        <td>Old Chateau</td>
        <td>bg/arenas/ground/g021</td>
        <td>bg/arenas/sky/s006</td>
        <td>1</td>
        <td>2</td>
        <td>Shadow Ball</td>
        <td>0</td>
        <td>2</td>
        <td>1</td>
    </tr>
    <tr>
        <td>19</td>
        <td>Lost Tower</td>
        <td>bg/arenas/ground/g022</td>
        <td>bg/arenas/sky/s006</td>
        <td>1</td>
        <td>2</td>
        <td>Shadow Ball</td>
        <td>0</td>
        <td>2</td>
        <td>0</td>
    </tr>
    <tr>
        <td>20</td>
        <td>Ball Capsule Preview</td>
        <td>bg/arenas/ground/g023</td>
        <td>bg/arenas/sky/s006</td>
        <td>0</td>
        <td>2</td>
        <td>Tri Attack</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
    </tr>
    <tr>
        <td>21</td>
        <td>Oreburgh Gym (VS Roark)</td>
        <td>bg/arenas/ground/g024</td>
        <td>bg/arenas/sky/s006</td>
        <td>0</td>
        <td>2</td>
        <td>Power Gem</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
    </tr>
    <tr>
        <td>22</td>
        <td>Eterna Gym (VS Gardenia)</td>
        <td>bg/arenas/ground/g025</td>
        <td>bg/arenas/sky/s006</td>
        <td>0</td>
        <td>2</td>
        <td>Energy Ball</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
    </tr>
    <tr>
        <td>23</td>
        <td>Veilstone Gym (VS Maylene)</td>
        <td>bg/arenas/ground/g026</td>
        <td>bg/arenas/sky/s006</td>
        <td>0</td>
        <td>2</td>
        <td>Aura Sphere</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
    </tr>
    <tr>
        <td>24</td>
        <td>Pastoria Gym (VS Wake)</td>
        <td>bg/arenas/ground/g027</td>
        <td>bg/arenas/sky/s006</td>
        <td>0</td>
        <td>2</td>
        <td>Hydro Pump</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
    </tr>
    <tr>
        <td>25</td>
        <td>Hearthome Gym (VS Fantina)</td>
        <td>bg/arenas/ground/g028</td>
        <td>bg/arenas/sky/s006</td>
        <td>0</td>
        <td>2</td>
        <td>Shadow Ball</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
    </tr>
    <tr>
        <td>26</td>
        <td>Canalve Gym (VS Byron)</td>
        <td>bg/arenas/ground/g029</td>
        <td>bg/arenas/sky/s006</td>
        <td>0</td>
        <td>2</td>
        <td>Flash Cannon</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
    </tr>
    <tr>
        <td>27</td>
        <td>Snowpoint Gym (VS Candice)</td>
        <td>bg/arenas/ground/g030</td>
        <td>bg/arenas/sky/s006</td>
        <td>0</td>
        <td>2</td>
        <td>Ice Beam</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
    </tr>
    <tr>
        <td>28</td>
        <td>Sunyshore Gym (VS Volkner)</td>
        <td>bg/arenas/ground/g031</td>
        <td>bg/arenas/sky/s006</td>
        <td>0</td>
        <td>2</td>
        <td>Thunderbolt</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
    </tr>
    <tr>
        <td>29</td>
        <td>Galactic Grunt</td>
        <td>bg/arenas/ground/g032</td>
        <td>bg/arenas/sky/s032</td>
        <td>0</td>
        <td>2</td>
        <td>Dark Pulse</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
    </tr>
    <tr>
        <td>30</td>
        <td>Galactic Admin (VS Saturn)</td>
        <td>bg/arenas/ground/g033</td>
        <td>bg/arenas/sky/s032</td>
        <td>0</td>
        <td>2</td>
        <td>Dark Pulse</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
    </tr>
    <tr>
        <td>31</td>
        <td>Galactic Admin (VS Mars)</td>
        <td>bg/arenas/ground/g034</td>
        <td>bg/arenas/sky/s032</td>
        <td>0</td>
        <td>2</td>
        <td>Dark Pulse</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
    </tr>
    <tr>
        <td>32</td>
        <td>Galactic Admin (VS Jupiter)</td>
        <td>bg/arenas/ground/g035</td>
        <td>bg/arenas/sky/s032</td>
        <td>0</td>
        <td>2</td>
        <td>Dark Pulse</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
    </tr>
    <tr>
        <td>33</td>
        <td>Galactic Boss (VS Cyrus)</td>
        <td>bg/arenas/ground/g036</td>
        <td>bg/arenas/sky/s032</td>
        <td>0</td>
        <td>2</td>
        <td>Dark Pulse</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
    </tr>
    <tr>
        <td>34</td>
        <td>Spear Pillar (Pearl)</td>
        <td>bg/arenas/ground/g037</td>
        <td>bg/arenas/sky/s037</td>
        <td>0</td>
        <td>1</td>
        <td>Draco Meteor</td>
        <td>0</td>
        <td>2</td>
        <td>0</td>
    </tr>
    <tr>
        <td>35</td>
        <td>Pokémon League (VS Aaron)</td>
        <td>bg/arenas/ground/g038</td>
        <td>bg/arenas/sky/s006</td>
        <td>0</td>
        <td>2</td>
        <td>Bug Buzz</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
    </tr>
    <tr>
        <td>36</td>
        <td>Pokémon League (VS Bertha)</td>
        <td>bg/arenas/ground/g039</td>
        <td>bg/arenas/sky/s006</td>
        <td>0</td>
        <td>2</td>
        <td>Earth Power</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
    </tr>
    <tr>
        <td>37</td>
        <td>Pokémon League (VS Flint)</td>
        <td>bg/arenas/ground/g040</td>
        <td>bg/arenas/sky/s006</td>
        <td>0</td>
        <td>2</td>
        <td>Lava Plume</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
    </tr>
    <tr>
        <td>38</td>
        <td>Pokémon League (VS Lucian)</td>
        <td>bg/arenas/ground/g041</td>
        <td>bg/arenas/sky/s006</td>
        <td>0</td>
        <td>2</td>
        <td>Psychic</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
    </tr>
    <tr>
        <td>39</td>
        <td>Pokémon League (VS Cynthia)</td>
        <td>bg/arenas/ground/g042</td>
        <td>bg/arenas/sky/s006</td>
        <td>0</td>
        <td>2</td>
        <td>Ancient Power</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
    </tr>
    <tr>
        <td>40</td>
        <td>Battle Tower</td>
        <td>bg/arenas/ground/g043</td>
        <td>bg/arenas/sky/s006</td>
        <td>0</td>
        <td>2</td>
        <td>Tri Attack</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
    </tr>
    <tr>
        <td>41</td>
        <td>Ramanas Park (Pure Space)</td>
        <td>bg/arenas/ground/g044</td>
        <td>bg/arenas/sky/s044</td>
        <td>0</td>
        <td>0</td>
        <td>Dazzling Gleam</td>
        <td>0</td>
        <td>2</td>
        <td>0</td>
    </tr>
    <tr>
        <td>42</td>
        <td>Ramanas Park (Strange Space)</td>
        <td>bg/arenas/ground/g045</td>
        <td>bg/arenas/sky/s045</td>
        <td>1</td>
        <td>1</td>
        <td>Shadow Ball</td>
        <td>0</td>
        <td>2</td>
        <td>0</td>
    </tr>
    <tr>
        <td>43</td>
        <td>Union Room</td>
        <td>bg/arenas/ground/g046</td>
        <td>bg/arenas/sky/s006</td>
        <td>0</td>
        <td>2</td>
        <td>Tri Attack</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
    </tr>
    <tr>
        <td>44</td>
        <td>Underground - Spacious Cave</td>
        <td>bg/arenas/ground/g047</td>
        <td>bg/arenas/sky/s006</td>
        <td>1</td>
        <td>1</td>
        <td>Earth Power</td>
        <td>0</td>
        <td>2</td>
        <td>0</td>
    </tr>
    <tr>
        <td>45</td>
        <td>Underground - Grassland Cave</td>
        <td>bg/arenas/ground/g048</td>
        <td>bg/arenas/sky/s006</td>
        <td>1</td>
        <td>0</td>
        <td>Energy Ball</td>
        <td>0</td>
        <td>2</td>
        <td>0</td>
    </tr>
    <tr>
        <td>46</td>
        <td>Underground - Fountainspring Cave</td>
        <td>bg/arenas/ground/g049</td>
        <td>bg/arenas/sky/s006</td>
        <td>1</td>
        <td>1</td>
        <td>Hydro Pump</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
    </tr>
    <tr>
        <td>47</td>
        <td>Underground - Rocky Cave</td>
        <td>bg/arenas/ground/g050</td>
        <td>bg/arenas/sky/s006</td>
        <td>1</td>
        <td>1</td>
        <td>Earth Power</td>
        <td>0</td>
        <td>2</td>
        <td>0</td>
    </tr>
    <tr>
        <td>48</td>
        <td>Underground - Volcanic Cave</td>
        <td>bg/arenas/ground/g051</td>
        <td>bg/arenas/sky/s006</td>
        <td>1</td>
        <td>1</td>
        <td>Lava Plume</td>
        <td>0</td>
        <td>2</td>
        <td>0</td>
    </tr>
    <tr>
        <td>49</td>
        <td>Underground - Dazzling Cave</td>
        <td>bg/arenas/ground/g052</td>
        <td>bg/arenas/sky/s006</td>
        <td>1</td>
        <td>1</td>
        <td>Dazzling Gleam</td>
        <td>0</td>
        <td>2</td>
        <td>0</td>
    </tr>
    <tr>
        <td>50</td>
        <td>Underground - Swampy Cave</td>
        <td>bg/arenas/ground/g053</td>
        <td>bg/arenas/sky/s006</td>
        <td>1</td>
        <td>1</td>
        <td>Mud Shot</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
    </tr>
    <tr>
        <td>51</td>
        <td>Underground - Whiteout Cave</td>
        <td>bg/arenas/ground/g054</td>
        <td>bg/arenas/sky/s006</td>
        <td>1</td>
        <td>1</td>
        <td>Ice Beam</td>
        <td>0</td>
        <td>2</td>
        <td>0</td>
    </tr>
    <tr>
        <td>52</td>
        <td>Underground - Icy Cave</td>
        <td>bg/arenas/ground/g055</td>
        <td>bg/arenas/sky/s006</td>
        <td>1</td>
        <td>1</td>
        <td>Ice Beam</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
    </tr>
    <tr>
        <td>53</td>
        <td>Cave - Darker</td>
        <td>bg/arenas/ground/g056</td>
        <td>bg/arenas/sky/s006</td>
        <td>1</td>
        <td>1</td>
        <td>Power Gem</td>
        <td>0</td>
        <td>2</td>
        <td>0</td>
    </tr>
    <tr>
        <td>54</td>
        <td>Missing No.</td>
        <td>bg/arenas/ground/g075</td>
        <td>bg/arenas/sky/s071</td>
        <td>0</td>
        <td>2</td>
        <td>Tri Attack</td>
        <td>0</td>
        <td>2</td>
        <td>0</td>
    </tr>
    <tr>
        <td>55</td>
        <td>Newmoon Island</td>
        <td>bg/arenas/ground/g058</td>
        <td>bg/arenas/sky/s001</td>
        <td>1</td>
        <td>1</td>
        <td>Dark Pulse</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
    </tr>
    <tr>
        <td>56</td>
        <td>Oreburgh Gym (VS Trainer)</td>
        <td>bg/arenas/ground/g059</td>
        <td>bg/arenas/sky/s006</td>
        <td>0</td>
        <td>2</td>
        <td>Power Gem</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
    </tr>
    <tr>
        <td>57</td>
        <td>Eterna Gym (VS Trainer)</td>
        <td>bg/arenas/ground/g060</td>
        <td>bg/arenas/sky/s006</td>
        <td>0</td>
        <td>2</td>
        <td>Energy Ball</td>
        <td>0</td>
        <td>2</td>
        <td>0</td>
    </tr>
    <tr>
        <td>58</td>
        <td>Veilstone Gym (VS Trainer)</td>
        <td>bg/arenas/ground/g061</td>
        <td>bg/arenas/sky/s006</td>
        <td>0</td>
        <td>2</td>
        <td>Aura Sphere</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
    </tr>
    <tr>
        <td>59</td>
        <td>Pastoria Gym (VS Trainer)</td>
        <td>bg/arenas/ground/g062</td>
        <td>bg/arenas/sky/s006</td>
        <td>0</td>
        <td>2</td>
        <td>Hydro Pump</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
    </tr>
    <tr>
        <td>60</td>
        <td>Hearthome Gym (VS Trainer)</td>
        <td>bg/arenas/ground/g063</td>
        <td>bg/arenas/sky/s006</td>
        <td>0</td>
        <td>2</td>
        <td>Shadow Ball</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
    </tr>
    <tr>
        <td>61</td>
        <td>Canalve Gym (VS Trainer)</td>
        <td>bg/arenas/ground/g064</td>
        <td>bg/arenas/sky/s006</td>
        <td>0</td>
        <td>2</td>
        <td>Flash Cannon</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
    </tr>
    <tr>
        <td>62</td>
        <td>Snowpoint Gym (VS Trainer)</td>
        <td>bg/arenas/ground/g065</td>
        <td>bg/arenas/sky/s006</td>
        <td>0</td>
        <td>2</td>
        <td>Ice Beam</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
    </tr>
    <tr>
        <td>63</td>
        <td>Sunyshore Gym (VS Trainer)</td>
        <td>bg/arenas/ground/g066</td>
        <td>bg/arenas/sky/s006</td>
        <td>0</td>
        <td>2</td>
        <td>Thunderbolt</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
    </tr>
    <tr>
        <td>64</td>
        <td>Grass - East Sinnoh</td>
        <td>bg/arenas/ground/g067</td>
        <td>bg/arenas/sky/s001</td>
        <td>0</td>
        <td>0</td>
        <td>Energy Ball</td>
        <td>0</td>
        <td>2</td>
        <td>0</td>
    </tr>
    <tr>
        <td>65</td>
        <td>Forest - East Sinnoh</td>
        <td>bg/arenas/ground/g005</td>
        <td>bg/arenas/sky/s001</td>
        <td>0</td>
        <td>0</td>
        <td>Energy Ball</td>
        <td>0</td>
        <td>2</td>
        <td>0</td>
    </tr>
    <tr>
        <td>66</td>
        <td>Spear Pillar (Diamond)</td>
        <td>bg/arenas/ground/g069</td>
        <td>bg/arenas/sky/s069</td>
        <td>0</td>
        <td>1</td>
        <td>Draco Meteor</td>
        <td>0</td>
        <td>2</td>
        <td>0</td>
    </tr>
    <tr>
        <td>67</td>
        <td>Cave (Unused)</td>
        <td>bg/arenas/ground/g070</td>
        <td>bg/arenas/sky/s071</td>
        <td>0</td>
        <td>2</td>
        <td>Tri Attack</td>
        <td>0</td>
        <td>2</td>
        <td>0</td>
    </tr>
    <tr>
        <td>68</td>
        <td>Hearthome City</td>
        <td>bg/arenas/ground/g071</td>
        <td>bg/arenas/sky/s071</td>
        <td>0</td>
        <td>2</td>
        <td>Tri Attack</td>
        <td>0</td>
        <td>2</td>
        <td>0</td>
    </tr>
    <tr>
        <td>69</td>
        <td>Canalave City</td>
        <td>bg/arenas/ground/g072</td>
        <td>bg/arenas/sky/s071</td>
        <td>0</td>
        <td>1</td>
        <td>Earth Power</td>
        <td>0</td>
        <td>2</td>
        <td>0</td>
    </tr>
    <tr>
        <td>70</td>
        <td>Pastoria City</td>
        <td>bg/arenas/ground/g073</td>
        <td>bg/arenas/sky/s071</td>
        <td>0</td>
        <td>2</td>
        <td>Tri Attack</td>
        <td>0</td>
        <td>2</td>
        <td>0</td>
    </tr>
    <tr>
        <td>71</td>
        <td>House</td>
        <td>bg/arenas/ground/g074</td>
        <td>bg/arenas/sky/s074</td>
        <td>0</td>
        <td>2</td>
        <td>Tri Attack</td>
        <td>0</td>
        <td>2</td>
        <td>0</td>
    </tr>
    <tr>
        <td>72</td>
        <td>Seven Stars Restaurant</td>
        <td>bg/arenas/ground/g075</td>
        <td>bg/arenas/sky/s074</td>
        <td>0</td>
        <td>2</td>
        <td>Tri Attack</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
    </tr>
    <tr>
        <td>73</td>
        <td>Valor Lakefront Lobby</td>
        <td>bg/arenas/ground/g076</td>
        <td>bg/arenas/sky/s074</td>
        <td>0</td>
        <td>2</td>
        <td>Tri Attack</td>
        <td>0</td>
        <td>2</td>
        <td>0</td>
    </tr>
    <tr>
        <td>74</td>
        <td>Café Cabin</td>
        <td>bg/arenas/ground/g077</td>
        <td>bg/arenas/sky/s074</td>
        <td>0</td>
        <td>2</td>
        <td>Tri Attack</td>
        <td>0</td>
        <td>2</td>
        <td>0</td>
    </tr>
    <tr>
        <td>75</td>
        <td>Pokémon League Lobby</td>
        <td>bg/arenas/ground/g078</td>
        <td>bg/arenas/sky/s074</td>
        <td>0</td>
        <td>2</td>
        <td>Tri Attack</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
    </tr>
    <tr>
        <td>76</td>
        <td>Missing No.</td>
        <td>bg/arenas/ground/g074</td>
        <td>bg/arenas/sky/s071</td>
        <td>0</td>
        <td>2</td>
        <td>Air Slash</td>
        <td>0</td>
        <td>2</td>
        <td>0</td>
    </tr>
    <tr>
        <td>77</td>
        <td>Missing No.</td>
        <td>bg/arenas/ground/g001</td>
        <td>bg/arenas/sky/s001</td>
        <td>0</td>
        <td>0</td>
        <td>Energy Ball</td>
        <td>0</td>
        <td>2</td>
        <td>0</td>
    </tr>
    <tr>
        <td>78</td>
        <td>GWS</td>
        <td>bg/arenas/ground/eventarea005</td>
        <td>bg/arenas/sky/s032</td>
        <td>0</td>
        <td>2</td>
        <td>Tri Attack</td>
        <td>16</td>
        <td>0</td>
        <td>0</td>
    </tr>
    <tr>
        <td>79</td>
        <td>Credits - Sunset</td>
        <td>bg/arenas/ground/eventarea008</td>
        <td>bg/arenas/sky/eventsky001</td>
        <td>0</td>
        <td>0</td>
        <td>Tri Attack</td>
        <td>0</td>
        <td>2</td>
        <td>0</td>
    </tr>
    <tr>
        <td>80</td>
        <td>Credits - Seaside Walk</td>
        <td>bg/arenas/ground/eventarea009</td>
        <td>bg/arenas/sky/eventsky001</td>
        <td>0</td>
        <td>0</td>
        <td>Tri Attack</td>
        <td>0</td>
        <td>2</td>
        <td>0</td>
    </tr>
    <tr>
        <td>81</td>
        <td>Credits - Night Forest</td>
        <td>bg/arenas/ground/eventarea010</td>
        <td>bg/arenas/sky/eventsky001</td>
        <td>0</td>
        <td>0</td>
        <td>Tri Attack</td>
        <td>0</td>
        <td>2</td>
        <td>0</td>
    </tr>
    <tr>
        <td>82</td>
        <td>Missing No.</td>
        <td>bg/arenas/ground/g001</td>
        <td>bg/arenas/sky/s001</td>
        <td>0</td>
        <td>0</td>
        <td>Energy Ball</td>
        <td>0</td>
        <td>2</td>
        <td>0</td>
    </tr>
    <tr>
        <td>83</td>
        <td>Missing No.</td>
        <td>bg/arenas/ground/g001</td>
        <td>bg/arenas/sky/s001</td>
        <td>0</td>
        <td>0</td>
        <td>Energy Ball</td>
        <td>0</td>
        <td>2</td>
        <td>0</td>
    </tr>
    <tr>
        <td>84</td>
        <td>Missing No.</td>
        <td>bg/arenas/ground/g001</td>
        <td>bg/arenas/sky/s001</td>
        <td>0</td>
        <td>0</td>
        <td>Energy Ball</td>
        <td>0</td>
        <td>2</td>
        <td>0</td>
    </tr>
    <tr>
        <td>85</td>
        <td>Missing No.</td>
        <td>bg/arenas/ground/g001</td>
        <td>bg/arenas/sky/s001</td>
        <td>0</td>
        <td>0</td>
        <td>Energy Ball</td>
        <td>0</td>
        <td>2</td>
        <td>0</td>
    </tr>
    <tr>
        <td>86</td>
        <td>Missing No.</td>
        <td>bg/arenas/ground/g001</td>
        <td>bg/arenas/sky/s001</td>
        <td>0</td>
        <td>0</td>
        <td>Energy Ball</td>
        <td>0</td>
        <td>2</td>
        <td>0</td>
    </tr>
    <tr>
        <td>87</td>
        <td>Missing No.</td>
        <td>bg/arenas/ground/g001</td>
        <td>bg/arenas/sky/s001</td>
        <td>0</td>
        <td>0</td>
        <td>Energy Ball</td>
        <td>0</td>
        <td>2</td>
        <td>0</td>
    </tr>
    <tr>
        <td>88</td>
        <td>Missing No.</td>
        <td>bg/arenas/ground/g001</td>
        <td>bg/arenas/sky/s001</td>
        <td>0</td>
        <td>0</td>
        <td>Energy Ball</td>
        <td>0</td>
        <td>2</td>
        <td>0</td>
    </tr>
    <tr>
        <td>89</td>
        <td>Missing No.</td>
        <td>bg/arenas/ground/g001</td>
        <td>bg/arenas/sky/s001</td>
        <td>0</td>
        <td>0</td>
        <td>Energy Ball</td>
        <td>0</td>
        <td>2</td>
        <td>0</td>
    </tr>
    <tr>
        <td>90</td>
        <td>Missing No.</td>
        <td>bg/arenas/ground/g001</td>
        <td>bg/arenas/sky/s001</td>
        <td>0</td>
        <td>0</td>
        <td>Energy Ball</td>
        <td>0</td>
        <td>2</td>
        <td>0</td>
    </tr>
    <tr>
        <td>91</td>
        <td>Missing No.</td>
        <td>bg/arenas/ground/g001</td>
        <td>bg/arenas/sky/s001</td>
        <td>0</td>
        <td>0</td>
        <td>Energy Ball</td>
        <td>0</td>
        <td>2</td>
        <td>0</td>
    </tr>
    <tr>
        <td>92</td>
        <td>Missing No.</td>
        <td>bg/arenas/ground/g001</td>
        <td>bg/arenas/sky/s001</td>
        <td>0</td>
        <td>0</td>
        <td>Energy Ball</td>
        <td>0</td>
        <td>2</td>
        <td>0</td>
    </tr>
    <tr>
        <td>93</td>
        <td>Opening (Pearl)</td>
        <td>bg/arenas/ground/eventarea001</td>
        <td>bg/arenas/sky/s006</td>
        <td>0</td>
        <td>2</td>
        <td>Tri Attack</td>
        <td>0</td>
        <td>2</td>
        <td>0</td>
    </tr>
    <tr>
        <td>94</td>
        <td>Opening (Diamond)</td>
        <td>bg/arenas/ground/eventarea002</td>
        <td>bg/arenas/sky/s006</td>
        <td>0</td>
        <td>2</td>
        <td>Tri Attack</td>
        <td>0</td>
        <td>2</td>
        <td>0</td>
    </tr>
    <tr>
        <td>95</td>
        <td>Evolution/Hatching</td>
        <td>bg/arenas/ground/eventarea003</td>
        <td>bg/arenas/sky/s006</td>
        <td>0</td>
        <td>2</td>
        <td>Tri Attack</td>
        <td>0</td>
        <td>2</td>
        <td>0</td>
    </tr>
    <tr>
        <td>96</td>
        <td>Starter Briefcase</td>
        <td>bg/arenas/ground/eventarea004</td>
        <td>bg/arenas/sky/s006</td>
        <td>0</td>
        <td>2</td>
        <td>Tri Attack</td>
        <td>0</td>
        <td>2</td>
        <td>0</td>
    </tr>
    <tr>
        <td>97</td>
        <td>Hall of Fame</td>
        <td>bg/arenas/ground/eventarea006</td>
        <td>bg/arenas/sky/s006</td>
        <td>0</td>
        <td>2</td>
        <td>Tri Attack</td>
        <td>0</td>
        <td>2</td>
        <td>0</td>
    </tr>
    <tr>
        <td>98</td>
        <td>Mystery Gift</td>
        <td>bg/arenas/ground/eventarea007</td>
        <td>bg/arenas/sky/s006</td>
        <td>0</td>
        <td>2</td>
        <td>Tri Attack</td>
        <td>0</td>
        <td>2</td>
        <td>0</td>
    </tr>
    <tr>
        <td>99</td>
        <td>Trading</td>
        <td>bg/arenas/ground/eventarea011</td>
        <td>bg/arenas/sky/s006</td>
        <td>0</td>
        <td>2</td>
        <td>Tri Attack</td>
        <td>0</td>
        <td>2</td>
        <td>0</td>
    </tr>
    <tr>
        <td>100</td>
        <td>Contest Stage (Rank 1)</td>
        <td>bg/arenas/ground/cont001</td>
        <td>bg/arenas/sky/s006</td>
        <td>0</td>
        <td>2</td>
        <td>Tri Attack</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
    </tr>
    <tr>
        <td>101</td>
        <td>Contest Stage (Rank 2)</td>
        <td>bg/arenas/ground/cont002</td>
        <td>bg/arenas/sky/s006</td>
        <td>0</td>
        <td>2</td>
        <td>Tri Attack</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
    </tr>
    <tr>
        <td>102</td>
        <td>Contest Stage (Rank 3)</td>
        <td>bg/arenas/ground/cont003</td>
        <td>bg/arenas/sky/s006</td>
        <td>0</td>
        <td>2</td>
        <td>Tri Attack</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
    </tr>
    <tr>
        <td>103</td>
        <td>Contest Stage (Rank 4)</td>
        <td>bg/arenas/ground/cont004</td>
        <td>bg/arenas/sky/s006</td>
        <td>0</td>
        <td>2</td>
        <td>Tri Attack</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
    </tr>
    <tr>
        <td>104</td>
        <td>Hall of Origin (Diamond)</td>
        <td>bg/arenas/ground/g081</td>
        <td>bg/arenas/sky/s081</td>
        <td>0</td>
        <td>1</td>
        <td>Draco Meteor</td>
        <td>0</td>
        <td>2</td>
        <td>0</td>
    </tr>
    <tr>
        <td>105</td>
        <td>Hall of Origin (Pearl)</td>
        <td>bg/arenas/ground/g082</td>
        <td>bg/arenas/sky/s081</td>
        <td>0</td>
        <td>1</td>
        <td>Draco Meteor</td>
        <td>0</td>
        <td>2</td>
        <td>0</td>
    </tr>
</table>