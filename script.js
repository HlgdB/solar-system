function Planet(name, cycle, selfSize, orbitSize, zIndex){
    this.cycle = cycle;
    this.selfSize = selfSize;
    this.orbitSize = orbitSize;
    this.zIndex = zIndex;
    this.name = name;
};

// 行星div初始化
// solar节点在外部获取，只用获取一次，减少dom的读取次数
Planet.prototype.init = function(solar){
    // 创建星球对应的div
    let planet = document.createElement('div');
    // 如果是土星，加上土星环
    if(this.name === "saturn") {
        let ring = document.createElement("div");
        ring.setAttribute("class", "ring");
        planet.appendChild(ring);
    }
    let pos = document.createElement('div');
    let orbit = document.createElement('div');
    planet.setAttribute("class", "planet");
    pos.setAttribute("class", "pos");
    orbit.setAttribute("class", "orbit");
    orbit.setAttribute("id", this.name);

    // 设置自身球体大小
    planet.style['font-size'] = this.selfSize + 'em';

    // 设置公转周期
    planet.style['animation-duration'] = this.cycle + 's';
    pos.style['animation-duration'] = this.cycle + 's';
    orbit.style['animation-duration'] = this.cycle + 's';

    // 设置轨道大小并水平垂直居中
    orbit.style.height = this.orbitSize + 'em';
    orbit.style.width = this.orbitSize + 'em';
    orbit.style['margin-top'] = -(this.orbitSize / 2) + 'em';
    orbit.style['margin-left'] = -(this.orbitSize / 2) + 'em';

    orbit.style['z-index'] = this.zIndex;

    // 加入solar中
    pos.appendChild(planet);
    orbit.appendChild(pos);
    solar.appendChild(orbit);
};

Planet.prototype.modifyCycle = function(newCycle){
    this.cycle = newCycle;
}

var allPlanetInfos = {
    mercury: { cycle: 2.89016, orbitSize: 32, selfSize: 1.5, zIndex: 10 },
    venus: { cycle: 7.38237, orbitSize: 40, selfSize: 3.72, zIndex: 9 },
    earth: { cycle: 12.00021, orbitSize: 56, selfSize: 3.92, zIndex: 8 },
    mars: { cycle: 22.57017, orbitSize: 72, selfSize: 3.9, zIndex: 6 },
    jupiter: { cycle: 142.35138, orbitSize: 100, selfSize: 12, zIndex: 5 },
    saturn: { cycle: 352.36998, orbitSize: 150, selfSize: 10.8, zIndex: 4 },
    uranus: { cycle: 1008.20215, orbitSize: 186, selfSize: 4.68, zIndex: 3 },
    neptune: { cycle: 1977.49582, orbitSize: 210, selfSize: 4.9, zIndex: 2 },
};

window.onload = function(){
    var planet_check = document.getElementsByName("planet");
    planet_check.forEach(function(item){
        item.onclick = function(){
            if(this.checked){
                var name = this.value;
                var infos = allPlanetInfos[name];
                var planet = new Planet(name, infos.cycle, infos.selfSize, infos.orbitSize, infos.zIndex);
                var solar = document.getElementById("solar-system");
                planet.init(solar);
                solar = null;
            } else {
                var solar = document.getElementById("solar-system");
                var planet = document.getElementById(this.value);
                solar.removeChild(planet);
            }
        };
    })
};