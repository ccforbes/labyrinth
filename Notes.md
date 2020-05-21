__Rooms__
 - Bedroom
    - Description
 - Hallway
    - Description
    - Hazard
 - Bathroom
    - Description
    - Hazard: Locked Door
 - Kitchen
    - Description
    - Hazard
 - Living Room
    - Description
    - Hazard
 - Laundry Room
    - Description
    - Hazard
 - Garage
    - Description
    - Hazard: Garage Door
    - Connections: Hallway, EXIT

__Monster__
    - Let's say they started in the garage, moves through hallway, to the living room, moves through hallway to the bathroom etc.
    - Drunk homeless guy locked in the bathroom. Once you unlock the bathroom, he is free to roam around unless you use the item 
    - If you don't have an item to kill him (don't have the knife from the kitchen), you lose. 
    - Is stunned for one move if you have the stun gun

__ITEMS__  
    - Remote for the garage is in the bathroom 
    - Key for the bathroom is in the kitchen
    - Knife from the kitchen 

__TREASURE__
    - Treasure would be maybe some jewelry from the bedroom

__MOVEMENTS__
    - GO <direction> lets the player move in a particular direction to another area.
    - LOOK lets the player see the area's description again. Optionally, you can also support an argument that lets the player "look at" an item or detail.
    - TAKE <item> lets the player pick up an item from the environment.
    - USE <item> lets the player use an item they have picked up to overcome a hazard or monster.
    - INVENTORY gives the player a list of items they have picked up.
    
__OTHER DETAILS__


__APP STRUCTURE__
Objects: Room, Player, Monster, Item 
Interfaces: 
    - AREA - title, description, list of items it contains,
    - CHARACTER - title, description, position in the game
    - ITEM - title, description, action
    
(Room implements AREA interface), (Player implements CHARACTER interface), 

room would contain hazards 

__GAMEPLAY__
Game stores and lists out your location, then a description maybe, then if there is a hazard, an exit strategy out of the room 
(i.e. door to the north/south/east/west), lets you know if there is an item 
- Location
- Description
- What is the hazard?
- Are there doors anywhere? 
- Is there an item? 
- Ask user what they want to do 
- (TAKE COMMAND FROM USER)

__ROOM CONNECTIONS__
labyrinth = [
   [bathroom, bedroom],
   [laundry room, hallway],
   [kitchen, living room, garage],
]