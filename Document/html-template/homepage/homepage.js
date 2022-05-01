const fakeDataRoom = [
	{
		room: "living room",
		numDevices: 4,
		img: "./image/livingroom.avif",
	},
	{
		room: "bathroom",
		numDevices: 4,
		img: "./image/bathroom.jpg",
	},
	{
		room: "bedroom",
		numDevices: 4,
		img: "./image/bedroom.avif",
	},

	{room: "kitchen", numDevices: 4, img: "./image/kitchen.avif"},
];
const fakeDataFeatures = [
	{icon: "fa-solid fa-lightbulb", name: "lightbulb"},
	{icon: "fa-solid fa-temperature-quarter", name: "temperature"},
	{icon: "fa-solid fa-air-conditioner", name: "airConditioner"},
	{icon: "fa-solid fa-gas-pump", name: "gasPump"},
];

const homeRoomWrapper = document.querySelector(".home__room__wrapper");
const homeDeviceIcons = document.querySelector(".home__device__icons");

var htmls = fakeDataRoom.map((item, index) => {
	console.log(item);
	const {room, numDevices, img} = item;
	return `
	<div class="col-sm-6">
                    <div class="home__room__item ">
                        <div class="home__room__item__info">
                            <h2>${room}</h2>
                            <span>${numDevices} device</span>
                        </div>
                        <div class="home__room__item__image">
                            <img src=${img} alt="">
                        </div>
                    </div>
                </div>
	`;
});

homeRoomWrapper.innerHTML = htmls.join("");

var htmls1 = fakeDataFeatures.map((item, index) => {
	return `
	<div class="home__device__icon">
	<span>${item.name}</span>
	<i class="${item.icon}"></i>
</div>
	`;
});

homeDeviceIcons.innerHTML = htmls1.join("");

window.addEventListener("load", () => {
	initClock();
});
function updateClock() {
	var now = new Date();
	var dname = now.getDay(),
		mo = now.getMonth(),
		dnum = now.getDate(),
		y = now.getFullYear(),
		h = now.getHours(),
		m = now.getMinutes(),
		s = now.getSeconds(),
		pe = "AM";
	if (h > 12) {
		h -= 12;
		pe = "PM";
	}
	Number.prototype.pad = function (digits) {
		for (var n = this.toString(); n.length < digits; n = 0 + n);
		return n;
	};
	var months = [
		"Janary",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
	];
	var weeks = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	var ids = [
		"dayname",
		"month",
		"daynum",
		"year",
		"hour",
		"minutes",
		"seconds",
		"period",
	];

	var values = [
		weeks[dname],
		months[mo],
		dnum.pad(2),
		y,
		h.pad(2),
		m.pad(2),
		s.pad(2),
		pe,
	];
	ids.forEach((item, index) => {
		document.getElementById(item).innerHTML = values[index];
	});
}

function initClock() {
	// updateClock();
	// window.setInterval("updateClock()", 1);
	setInterval(() => {
		updateClock();
	}, 1000);
}

var user = document.querySelectorAll(".fa-user");
const listGroup = document.querySelector(".list-group");
user[0].addEventListener("click", () => {
	listGroup.classList.toggle("active");
});

document.body.addEventListener("click", (e) => {
	if (!e.target.classList.contains("fa-user")) {
		if (listGroup.classList.contains("active")) {
			listGroup.classList.remove("active");
		} else {
			console.log("2");
		}
	}
});
