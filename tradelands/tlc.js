window.addEventListener("load", init, false);

let cannonWood = 0
let cannonMetal = 0
let totalcost = {}
let shipcost = {}
let cannoncost = {}
let engines

function calculateCannons() {
    cannoncost = {}
    cannonMetal = 0
    cannonWood = 0

    for (let cannon of document.getElementsByClassName("cannon")) {
        cannonMetal += cannon.value * tllist.cannons[cannon.name].metal
        cannonWood += cannon.value * tllist.cannons[cannon.name].wood
    }
}

function outputCost(str, json) {
    for (let mat in json) {
        if (json[mat] != 0) {
            str += `${json[mat]} ${mat}<br>`
        }
    }
    return str
}

function getElbyIdVal(element) {
    return document.getElementById(element).value
}

function getFirstElByClassVal(element) {
    return document.getElementsByClassName(element)[0].value
}

function updateOuput() {
    calculateCannons()
    let dropdown = document.getElementById("ship-dropdown");
    let rawcost = 0
    let ship = tllist.ships[dropdown.value]
    engines = getElbyIdVal("amount")
    if (dropdown.value != "none") {
        shipcost[getFirstElByClassVal("ship wood dropdown")] = ship.wood
        shipcost["Iron"] = ship.iron
        shipcost["Doubloons"] = ship.doubloons
        if (ship.extra) {
            switch (ship.extra[0]) {
                case "Blessed Steam engine parts":
                    switch (getFirstElByClassVal("engine type dropdown")) {
                        case "Raw":
                            for (mat in tllist.other["Raw Blessed"]) {
                                totalcost[mat] = tllist.other["Raw Blessed"][mat] * engines
                            }
                            rawcost = rawcost + totalcost.Iron * getElbyIdVal("iron") + totalcost.Coal * getElbyIdVal("coal") + totalcost.Copper * getElbyIdVal("copper")
                            break;
                        case "Blessed":
                            totalcost[ship.extra[0]] = engines
                            rawcost = engines * getElbyIdVal("copper")
                            break;
                        case "Un-Blessed":
                            totalcost["Steam engine parts"] = engines
                            totalcost["Loyalty Tokens"] = engines * 3
                            rawcost = engines * getElbyIdVal("copper")
                            break;
                        default:
                            break;
                    }
                    break;
                case "Premium Tokens":
                    shipcost[ship.extra[0]] = ship.extra[1]
                    totalcost[ship.extra[0]] = ship.extra[1]
                    rawcost = rawcost + ship.extra[1] * getFirstElByClassVal("prems cost")
                    break;
                case "Spruce decking":
                case "Pine decking":
                    shipcost[ship.extra[0]] = ship.extra[1]
                    for (let mat in tllist.other[ship.extra[0]]) {
                        totalcost[mat] = tllist.other[ship.extra[0]][mat] * ship.extra[1]
                    }
                    rawcost = rawcost + totalcost["Premium Tokens"] * getFirstElByClassVal("prems cost")
                    break;
                default:
                    shipcost[ship.extra[0]] = ship.extra[1]
                    totalcost[ship.extra[0]] = ship.extra[1]
                    break;
            }
        }
        totalcost[getFirstElByClassVal("ship wood dropdown")] = (totalcost[getFirstElByClassVal("ship wood dropdown")] || 0) + ship.wood
        totalcost["Iron"] = (totalcost["Iron"] || 0) + ship.iron
        totalcost["Doubloons"] = (totalcost["Doubloons"] || 0) + ship.doubloons

        rawcost = rawcost + ship.wood * getFirstElByClassVal("ship wood input") + shipcost["Iron"] * getFirstElByClassVal("ship iron input") + shipcost["Doubloons"]

    }
    cannoncost[getFirstElByClassVal("cannon-metal-dropdown")] = cannonMetal
    cannoncost[getFirstElByClassVal("cannon-wood-dropdown")] = cannonWood

    totalcost[getFirstElByClassVal("cannon-metal-dropdown")] = (totalcost[getFirstElByClassVal("cannon-metal-dropdown")] || 0) + cannonMetal
    totalcost[getFirstElByClassVal("cannon-wood-dropdown")] = (totalcost[getFirstElByClassVal("cannon-wood-dropdown")] || 0) + cannonWood

    rawcost = rawcost + cannonWood * getFirstElByClassVal("cannon-wood-input") + cannonMetal * getFirstElByClassVal("cannon-metal-input")

    document.getElementById("shipcost").innerHTML = outputCost("Ship cost:<br>", shipcost)
    document.getElementById("cannoncost").innerHTML = outputCost("Cannon cost:<br>", cannoncost)
    document.getElementById("totalcost").innerHTML = outputCost("Total cost:<br>", totalcost)
    document.getElementById("rawcost").innerHTML = "Raw cost in doubloons:" + rawcost
    totalcost = {}
}

function init() {

    document.querySelectorAll('input')
        .forEach(e => e.addEventListener("change", updateOuput));

    document.querySelectorAll('input')
        .forEach(e => e.value = "");

    let dropdown = document.getElementById("ship-dropdown");
    let option;
    let ships = Object.keys(tllist.ships)

    for (let ship of ships) {
        option = document.createElement('option');
        option.text = ship
        dropdown.add(option);
    }
    document.getElementById("ship-dropdown").value = "none"
    document.getElementById("engine-dropdown").value = "Blessed"

    document.getElementById("ship-dropdown").addEventListener("change", function (event) {
        shipcost = {}
        let output = document.getElementById("shipcost")
        output.innerHTML = "Ship cost:"
        if (tllist.ships[dropdown.value].extra && tllist.ships[dropdown.value].extra[0].includes("engine")) {
            document.getElementById("amount").value = tllist.ships[dropdown.value].extra[1]
        }
        updateOuput()
    });

    document.getElementById("engine-dropdown").addEventListener("change", function (event) {
        switch (getFirstElByClassVal("engine type dropdown")) {
            case "Raw":
                document.getElementById("copper").placeholder = "copper cost per piece"
                document.getElementById("coal").placeholder = "coal cost per piece"
                document.getElementById("iron").placeholder = "iron cost per piece"
                document.getElementById("coal").style.visibility = "visible"
                document.getElementById("iron").style.visibility = "visible"
                updateOuput()
                break;
            default:
                document.getElementById("copper").placeholder = "cost per piece"
                document.getElementById("coal").style.visibility = "hidden"
                document.getElementById("iron").style.visibility = "hidden"
                updateOuput()
                break;
        }
    });
}


let tllist = {
    "ships": {
        "Goldfish": {
            "wood": 16,
            "iron": 0,
            "doubloons": 500
        },
        "Minnow": {
            "wood": 16,
            "iron": 0,
            "doubloons": 500
        },
        "Titan": {
            "wood": 25,
            "iron": 10,
            "doubloons": 0,
            "extra": ["Empty barrel", 1]
        },
        "Mortar Platform": {
            "wood": 100,
            "iron": 20,
            "doubloons": 0,
            "extra": ["Mortar platform voucher", 1]
        },
        "Sparrow": {
            "wood": 40,
            "iron": 5,
            "doubloons": 1000
        },
        "Swallow": {
            "wood": 40,
            "iron": 5,
            "doubloons": 1000
        },
        "Lark": {
            "wood": 40,
            "iron": 5,
            "doubloons": 1000
        },
        "Heron": {
            "wood": 80,
            "iron": 25,
            "doubloons": 25
        },
        "Koi": {
            "wood": 60,
            "iron": 15,
            "doubloons": 12000
        },
        "War Koi": {
            "wood": 100,
            "iron": 20,
            "doubloons": 0,
            "extra": ["Mortar platform voucher", 2]
        },
        "Starling": {
            "wood": 130,
            "iron": 25,
            "doubloons": 8000
        },
        "Dart": {
            "wood": 140,
            "iron": 30,
            "doubloons": 8000
        },
        "Pelican": {
            "wood": 160,
            "iron": 35,
            "doubloons": 8000
        },
        "Arrow": {
            "wood": 140,
            "iron": 30,
            "doubloons": 10000
        },
        "Bullet": {
            "wood": 200,
            "iron": 40,
            "doubloons": 12500
        },
        "Tetra": {
            "wood": 150,
            "iron": 40,
            "doubloons": 40000
        },
        "Kestral": {
            "wood": 280,
            "iron": 60,
            "doubloons": 15000
        },
        "Pheasant": {
            "wood": 270,
            "iron": 40,
            "doubloons": 16000
        },
        "Falcon": {
            "wood": 280,
            "iron": 45,
            "doubloons": 16000
        },
        "Raider": {
            "wood": 250,
            "iron": 35,
            "doubloons": 24000
        },
        "Marlin": {
            "wood": 340,
            "iron": 55,
            "doubloons": 26500
        },
        "Orca": {
            "wood": 340,
            "iron": 60,
            "doubloons": 26500
        },
        "Shark": {
            "wood": 330,
            "iron": 60,
            "doubloons": 30000
        },
        "Manta": {
            "wood": 330,
            "iron": 65,
            "doubloons": 28000
        },
        "Dragon": {
            "wood": 330,
            "iron": 60,
            "doubloons": 45000,
            "extra": ["Blessed Steam engine parts", 2]
        },
        "Maurader": {
            "wood": 400,
            "iron": 70,
            "doubloons": 29000
        },
        "Taipan": {
            "wood": 400,
            "iron": 70,
            "doubloons": 35000,
            "extra": ["Taipan voucher", 1]
        },
        "Goose": {
            "wood": 450,
            "iron": 80,
            "doubloons": 34500
        },
        "Widgeon": {
            "wood": 450,
            "iron": 80,
            "doubloons": 34500
        },
        "Steam Goose": {
            "wood": 450,
            "iron": 0,
            "doubloons": 45000,
            "extra": ["Blessed Steam engine parts", 2]
        },
        "Beaver": {
            "wood": 540,
            "iron": 80,
            "doubloons": 46000
        },
        "Otter": {
            "wood": 550,
            "iron": 90,
            "doubloons": 44000
        },
        "Serpent": {
            "wood": 540,
            "iron": 80,
            "doubloons": 45000
        },
        "Fox": {
            "wood": 660,
            "iron": 100,
            "doubloons": 64000,
            "extra": ["Blessed Steam engine parts", 4]
        },
        "Stiletto": {
            "wood": 660,
            "iron": 120,
            "doubloons": 56000
        },
        "Cutlass": {
            "wood": 660,
            "iron": 120,
            "doubloons": 56500
        },
        "Hook": {
            "wood": 650,
            "iron": 115,
            "doubloons": 60000,
            "extra": ["Premium Tokens", 500]
        },
        "Badger": {
            "wood": 550,
            "iron": 590,
            "doubloons": 65000
        },
        "Phoenix": {
            "wood": 550,
            "iron": 600,
            "doubloons": 75000,
            "extra": ["Blessed Steam engine parts", 4]
        },
        "Steam Fish": {
            "wood": 500,
            "iron": 250,
            "doubloons": 75000
        },
        "Combat Log": {
            "wood": 720,
            "iron": 50,
            "doubloons": 0,
            "extra": ["Mark of the Nahrluminati", 1]
        },
        "Tyrant": {
            "wood": 650,
            "iron": 130,
            "doubloons": 70000
        },
        "Atlas": {
            "wood": 900,
            "iron": 200,
            "doubloons": 84000
        },
        "Astraeus": {
            "wood": 920,
            "iron": 240,
            "doubloons": 88000
        },
        "Prometheus": {
            "wood": 980,
            "iron": 320,
            "doubloons": 150000,
            "extra": ["Blessed Steam engine parts", 5]
        },
        "Osprey": {
            "wood": 960,
            "iron": 300,
            "doubloons": 140000
        },
        "Retaliator": {
            "wood": 1020,
            "iron": 280,
            "doubloons": 140000
        },
        "Kraken": {
            "wood": 900,
            "iron": 200,
            "doubloons": 85000,
            "extra": ["Kraken voucher", 1]
        },
        "Alliance (Pine Deck)": {
            "wood": 1500,
            "iron": 300,
            "doubloons": 1200000,
            "extra": ["Pine decking", 5]
        },
        "Alliance (Spruce Deck)": {
            "wood": 1500,
            "iron": 300,
            "doubloons": 1200000,
            "extra": ["Spruce decking", 5]
        },
        "Poseidon": {
            "wood": 800,
            "iron": 1500,
            "doubloons": 500000,
            "extra": ["Advanced engine", 1]
        },
        "Neptune": {
            "wood": 800,
            "iron": 1500,
            "doubloons": 1000000,
            "extra": ["Advanced engine", 1]
        },
        "Binglehopper": {
            "wood": 550,
            "iron": 2600,
            "doubloons": 2000000,
            "extra": ["Advanced engine", 1]
        },
    },
    "cannons": {
        "Light Long Gun": {
            "metal": 35,
            "wood": 20
        },
        "Medium Long Gun": {
            "metal": 60,
            "wood": 35
        },
        "Heavy Long Gun": {
            "metal": 80,
            "wood": 45
        },
        "Light Carronade": {
            "metal": 20,
            "wood": 15
        },
        "Medium Carronade": {
            "metal": 50,
            "wood": 35
        },
        "Heavy Carronade": {
            "metal": 75,
            "wood": 45
        },
        "Light Mortar": {
            "metal": 40,
            "wood": 20
        },
        "Medium Mortar": {
            "metal": 60,
            "wood": 35
        },
        "Heavy Mortar": {
            "metal": 80,
            "wood": 50
        },
        "Swivel": {
            "metal": 20,
            "wood": 5
        },
        "Poseidon Long Gun": {
            "metal": 350,
            "wood": 60
        },
        "Neptune Howitzer (Long Gun)": {
            "metal": 380,
            "wood": 60
        },
        "Neptune Twin Long Gun": {
            "metal": 400,
            "wood": 60
        },
        "Neptune Super Carronade": {
            "metal": 425,
            "wood": 70
        }
    },
    "other": {
        "Steel": {
            "iron": 3,
            "coal": 1
        },
        "Lord Gaben's Blessing": {
            "Loyalty Tokens": 3
        },
        "Steam engine parts": {
            "Steel": 100,
            "Copper": 50
        },
        "Blessed Steam engine parts": {
            "Steam engine parts": 1,
            "Lord Gaben's Blessing": 1
        },
        "Pine decking": {
            "Pine": 40,
            "Premium Tokens": 200
        },
        "Spruce decking": {
            "Spruce": 40,
            "Premium Tokens": 200
        },
        "Raw Blessed": {
            "Loyalty Tokens": 3,
            "Iron": 300,
            "Coal": 100,
            "Copper": 50
        }
    }
}