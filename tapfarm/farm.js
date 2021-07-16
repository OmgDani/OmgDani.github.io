class FarmGame {
    constructor(element, rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.grid = this.makeGridArray(rows, cols);
        this.element = element
        this.gridClick = this.gridClick.bind(this);
        this.itemChange = this.itemChange.bind(this);
        this.calculate = this.calculate.bind(this);
        this.save = this.save.bind(this);
        this.load = this.load.bind(this);
        this.items = {
            carrot: {
                name: "carrot",
                muns: 1,
                cost: 0,
                water: 10
            },
            raddish: {
                name: "raddish",
                muns: 5,
                cost: 2,
                water: 20
            },
            turnip: {
                name: "turnip",
                muns: 12,
                cost: 4,
                water: 35
            },
            onion: {
                name: "onion",
                muns: 16,
                cost: 6,
                water: 40
            },
            corn: {
                name: "corn",
                muns: 25,
                cost: 12,
                water: 50
            },
            "red onion": {
                name: "red onion",
                muns: 35,
                cost: 10,
                water: 35
            },
            potato: {
                name: "potato",
                muns: 45,
                cost: 20,
                water: 75
            },
            cabbage: {
                name: "cabbage",
                muns: 80,
                cost: 30,
                water: 125
            },
            tomato: {
                name: "tomato",
                muns: 125,
                cost: 50,
                water: 175
            },
            wheat: {
                name: "wheat",
                muns: 150,
                cost: 60,
                water: 200
            },
            "butter squash": {
                name: "butter squash",
                muns: 160,
                cost: 45,
                water: 125
            },
            broccoli: {
                name: "broccoli",
                muns: 200,
                cost: 75,
                water: 225
            },
            "cauliflower": {
                name: "cauliflower",
                muns: 200,
                cost: 75,
                water: 225
            },
            parsnip: {
                name: "parsnip",
                muns: 300,
                cost: 100,
                water: 300
            },
            sugarcane: {
                name: "sugarcane",
                muns: 500,
                cost: 150,
                water: 500
            },
            "green bell pepper": {
                name: "green bell pepper",
                muns: 800,
                cost: 300,
                water: 750
            },
            "yellow bell pepper": {
                name: "yellow bell pepper",
                muns: 1000,
                cost: 300,
                water: 650
            },
            "exp plant": {
                name: "exp plant",
                muns: 1000,
                cost: 1050,
                water: 30
            },
            yams: {
                name: "yams",
                muns: 1100,
                cost: 450,
                water: 850
            },
            "chili pepper": {
                name: "chili pepper",
                muns: 1500,
                cost: 500,
                water: 1000
            },
            rhubarb: {
                name: "rhubarb",
                muns: 2100,
                cost: 750,
                water: 1750
            },
            "spring onion": {
                name: "spring onion",
                muns: 3000,
                cost: 1000,
                water: 2500
            },
            ginger: {
                name: "ginger",
                muns: 7000,
                cost: 2500,
                water: 5000
            },
            soybeans: {
                name: "soybeans",
                muns: 11000,
                cost: 4000,
                water: 7500
            },
            pipe: {
                class: "water",
                name: "pipe",
                muns: 25,
                water: 1,
                apm: 20,
                range: 1
            },
            sprinkler: {
                class: "water",
                name: "sprinkler",
                muns: 500,
                water: 1,
                apm: 12,
                range: 2
            },
            "autoharvester mk1": {
                class: "harvester",
                name: "autoharvester mk1",
                muns: 2000,
                apm: 6,
                range: 1
            },
            faucet: {
                class: "water",
                name: "faucet",
                muns: 3000,
                water: 2,
                apm: 20,
                range: 1
            },
            "autoplanter mk1": {
                class: "planter",
                name: "autoplanter mk1",
                muns: 5000,
                apm: 3,
                range: 1
            },
            "hose irrigator": {
                class: "water",
                name: "hose irrigator",
                muns: 10000,
                water: 3,
                apm: 15,
                range: 3
            },
            "autoplanter mk2": {
                class: "planter",
                name: "autoplanter mk2",
                muns: 12500,
                apm: 3,
                range: 2
            },
            "autoharvester mk3": {
                class: "harvester",
                name: "autoharvester mk3",
                muns: 5000,
                apm: 6,
                range: 2
            },
            "hose irrigator mk2": {
                class: "water",
                name: "hose irrigator mk2",
                muns: 20000,
                water: 5,
                apm: 15,
                range: 4
            },
            "autoharvester mk5": {
                class: "harvester",
                name: "autoharvester mk5",
                muns: 150000,
                apm: 12,
                range: 3
            },
            "overclocked autoplanter": {
                class: "planter",
                name: "overclocked autoplanter",
                muns: 100000,
                apm: 12,
                range: 1
            },
        }
        this.ascensions = {
            "2x Money": 1,
            "Extra Earnings": 0.5,
            "Extra Earnings 2": 1,
            "Watering Power": 1,
            "Extra Earnings 3": 1.5,
            "Watering Power 2": 2,
            "Watering Power 3": 5,
            "Extra Earnings 4": 2.5,
            "Watering Power 4": 10,
            "Extra Earnings 5": 5
        }
        // for(let item in this.items) {
        //     let plant = this.items[item]
        //     if (plant.cost) {
        //         console.log(item,(plant.muns-plant.cost)/plant.water)
        //     }
        // }
        this.gold = ["red onion", "butter squash", "cauliflower", "yellow bell pepper", "exp plant", "chili pepper"]
        this.selectedItem = this.items.carrot

        this.mousedown = 0
        document.body.onmousedown = function (e) {
            if (e.button === 1) return false;
        }
        this.element.addEventListener("mousedown", e => {
            if (e.button === 1) {
                this.gridClick(e, this.toremove = "select")
            } else {
                this.mousedown = 1
                this.gridClick(e, this.toremove = e.target.innerText ? true : false)
            }

        })
        document.addEventListener("mouseup", e => {
            this.mousedown = 0
        })

        container.style.setProperty('--grid-rows', rows);
        container.style.setProperty('--grid-cols', cols);
        container.style.setProperty("width", `${rows*50}px`)
        container.style.setProperty("height", `${cols*50}px`)
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                let cell = document.createElement("div");
                cell.dataset.location = JSON.stringify({
                    r,
                    c
                })
                cell.addEventListener("mouseenter", e => {
                    if (this.mousedown) this.gridClick(e, this.toremove)
                })
                container.appendChild(cell).className = "grid-item";
            };
        };

        this.select = document.getElementById("select")
        for (let item in this.items) {
            let option = document.createElement("option")
            option.innerText = item
            if (this.gold.includes(item)) {
                option.style.color = "gold"
            }
            this.select.add(option)
        }
        this.ascensionsbtns = document.getElementById("ascensions")
        for (let ascension in this.ascensions) {
            let btn = document.createElement("input")
            let label = document.createElement("label")
            label.innerText = ascension + ":"
            label.className = "buffLabel"
            btn.className = "buff"
            btn.type = "checkbox"
            btn.addEventListener("change", e => {
                this.calculate()
            })
            label.appendChild(btn)
            this.ascensionsbtns.appendChild(label)
        }
        this.select.addEventListener("change", this.itemChange)
        document.getElementById("save").addEventListener("click", this.save)
        document.getElementById("load").addEventListener("click", this.load)
    }


    makeGridArray(rows, cols) {
        const grid = Array(rows);
        for (let r = 0; r < rows; r++) {
            grid[r] = []
            for (let c = 0; c < cols; c++) {
                grid[r].push({})
            }
        }
        return grid;
    }

    itemChange(evt) {
        this.selectedItem = this.items[evt.target.options[evt.target.selectedIndex].value]
    }

    gridClick(evt) {
        const locationJSON = evt.target.dataset.location
        if (!locationJSON) return;
        const location = JSON.parse(locationJSON)
        const r = location.r
        const c = location.c

        if (document.getElementById("Replace").checked && this.toremove != "select") this.toremove = "replace"
        switch (this.toremove) {
            case "select":
                if (!this.grid[r][c].name) return;
                this.selectedItem = this.items[this.grid[r][c].name]
                this.select.value = this.selectedItem.name
                break;
            case "replace":
                if (this.selectedItem.name == this.grid[r][c].name) break;
                this.render(r, c, true, this.grid[r][c]?.range)
                for (const prop in this.items[this.grid[r][c].name]) {
                    delete this.grid[r][c][prop]
                }
                this.grid[r][c] = Object.assign(this.grid[r][c], this.selectedItem)
                this.render(r, c, false, this.selectedItem?.range)
                break;
            case true:
                this.render(r, c, true, this.grid[r][c]?.range)
                for (const prop in this.items[this.grid[r][c].name]) {
                    delete this.grid[r][c][prop]
                }
                break;
            default:
                if (evt.target.innerText) return;
                this.grid[r][c] = Object.assign(this.grid[r][c], this.selectedItem)
                this.render(r, c, false, this.selectedItem?.range)
                break;
        }
        this.calculate()
    }

    render(r, c, clear = false, area = 0) {
        if (area > 0) {
            if (this.grid[r][c]?.range) this.renderArea(r, c, clear, area)
        }
        let div = this.element.children[r * this.rows + c]
        if (clear) {
            div.innerText = ""
        } else {
            div.innerText = this.selectedItem.name
        }


    }

    renderArea(r, c, clear = false, area = 0) {
        let type = this.grid[r][c].class
        let removed = this.grid[r][c]
        for (let i = r - area; i <= r + area; i++) {
            for (let j = c - area; j <= c + area; j++) {
                if (i >= 0 && i < this.rows && j >= 0 && j < this.cols) {
                    let div = this.element.children[i * this.rows + j]
                    this.effect(type, div, clear, this.grid[i][j], removed)
                }
            }
        }
    }

    effect(type, div, clear, plot, removed) {
        if (clear) {
            div.dataset[`${type}s`] = parseInt(div.dataset[`${type}s`]) - 1
            div.style.setProperty(`--${type}s`, div.dataset[`${type}s`])
            switch (type) {
                case "water":
                    plot.wpm = plot.wpm - removed.apm * removed.water
                    if (plot.wpm == 0) delete plot.wpm;
                    break;
                case "harvester":
                    plot.hpm.splice(plot.hpm.indexOf(removed.apm), 1)
                    if (plot.hpm.length == 0) delete plot.hpm;
                    break;
                case "planter":
                    plot.ppm.splice(plot.ppm.indexOf(removed.apm), 1)
                    if (plot.ppm.length == 0) delete plot.ppm;
                    break;
            }
            if (div.dataset[`${type}s`] == 0) {
                delete div.dataset[`${type}s`]
                div.style.removeProperty(`--${type}s`);
            }
        } else {
            div.dataset[`${type}s`] = parseInt(div.dataset[`${type}s`]) + 1 || 1
            div.style.setProperty(`--${type}s`, div.dataset[`${type}s`])
            let obj = {}
            switch (type) {
                case "water":
                    obj.wpm = plot.wpm + this.selectedItem.apm * this.selectedItem.water || this.selectedItem.apm * this.selectedItem.water
                    break;
                case "harvester":
                    typeof plot.hpm == "object" ? plot.hpm.push(this.selectedItem.apm) : plot.hpm = [this.selectedItem.apm]
                    break;
                case "planter":
                    typeof plot.ppm == "object" ? plot.ppm.push(this.selectedItem.apm) : plot.ppm = [this.selectedItem.apm]
                    break;
            }
            Object.assign(plot, obj)
        }
    }

    calculate() {
        let total = 0;
        let mpm = document.getElementById("mpm")
        let btns = document.getElementsByClassName("buff")
        let moneybuff = 0
        let waterbuff = 0
        for (let btn in btns) {
            if (btns[btn]?.checked) {
                let buffAmt = this.ascensions[btns[btn].parentElement.innerText.replace(":", "")]
                let buffTxt = btns[btn].parentElement.innerText
                if (buffTxt.includes("Money") || buffTxt.includes("Extra Earnings")) {
                    moneybuff += buffAmt
                } else if (buffTxt.includes("Watering Power")) {
                    waterbuff += buffAmt
                }

            }
        }


        this.grid.forEach(r => {
            r.forEach(c => {
                if (c.wpm && c.water && c.muns && typeof c.cost == "number" && c.hpm && c.ppm) {
                    // clean hpm and ppm arrays
                    let hpmSeconds = []
                    let ppmSeconds = []
                    c.hpm.forEach(t => {
                        for (let i = 1; i <= t; i++) {
                            hpmSeconds.push((60 / t) * i)
                        }
                    })
                    c.ppm.forEach(t => {
                        for (let i = 1; i <= t; i++) {
                            ppmSeconds.push((60 / t) * i)
                        }
                    })
                    let hpmTimings = [...new Set(hpmSeconds)]
                    let ppmTimings = [...new Set(ppmSeconds)]
                    // need water per second, copy of plant for watering
                    let wps = (c.wpm + (c.wpm * waterbuff)) / 60
                    let waterneeded = c.water
                    let harvestable = false
                    let harvested = false
                    let planted = true
                    let t = 0
                    for (let i = 1; i <= 300; i++) {
                        // water plant
                        t++
                        if (!harvested) waterneeded -= wps
                        if (waterneeded <= 0 && planted) harvestable = true
                        // harvest if possible
                        if (harvestable && hpmTimings.includes(t)) {
                            total += (c.muns + (c.muns * moneybuff)) - c.cost
                            harvested = true
                            harvestable = false
                            planted = false
                        }
                        // plant if possible
                        if (harvested && !planted && ppmTimings.includes(t)) {
                            harvested = false
                            waterneeded = c.water
                            planted = true
                        }
                        if (i % 60 == 0) {
                            t = 0
                        }
                    }
                    // total += ((c.wpm + (c.wpm * waterbuff)) / c.water) * ((c.muns - c.cost) + ((c.muns - c.cost) * moneybuff))
                }
            })
        })
        total = Math.round((total + Number.EPSILON) * 100) / 100 / 5
        total >= parseInt(mpm.innerText) ? mpm.style.setProperty("color", "green") : mpm.style.setProperty("color", "red")
        mpm.innerText = total
    }

    save() {
        let arr = this.grid.flat()
        let data = []
        let amount = 0
        let type = undefined
        arr.forEach(p => {
            if (type != p?.name) {
                if (amount > 0) data.push(`${type == undefined ? "" : type}*${amount}`)
                amount = 1
                type = p?.name
            } else if (type == p?.name) {
                amount++
            }
        })
        data.push(`${type == undefined ? "" : type}*${amount}`)
        document.getElementById("savedata").innerText = data
    }

    load() {
        let loadData = prompt("Paste in load data");
        if (loadData != null) {
            let farm = []
            loadData = loadData.split(",")
            loadData.forEach(e => {
                e = e.split("*")
                for (let i = 0; i < parseInt(e[1]); i++) farm.push(e[0])
            })
            let plots = document.getElementsByClassName("grid-item")
            for (let plot in plots) {
                if (plots[plot].dataset && farm[plot] && farm[plot] != "undefined") {
                    this.selectedItem = this.items[farm[plot]]
                    let evt = {}
                    evt.target = plots[plot]
                    this.gridClick(evt)
                }
            }
            this.selectedItem = this.items.carrot
        }
    }
}

new FarmGame(document.getElementById("container"), 20, 20);