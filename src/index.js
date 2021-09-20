// observer

/*

	Observer:

	* Build an app that has one button to change the value
	* The value gets reflected at two different locations

*/

// The observer pattern is a software design pattern in which an object,
// named the subject, maintains a list of its dependents, called observers,
// and notifies them automatically of any state changes, usually by calling
// one of their methods.

console.log('Is this working?');

let state = { three: false, two: false };

class Observer {
	constructor() {
		this.subscribers = [];
	}

	subscribe(subscriber) {
		this.subscribers.push(subscriber);
	}

	publish(id, data) {
		this.subscribers
			.filter((subscriber) => subscriber.id === id)
			.forEach((subscriber) => subscriber.action(id, data));
	}
}

const observer1 = new Observer();

observer1.subscribe({
	id: 'addTwo',
	action: (id, data) => {
		const el = document.getElementById(id);
		console.log(data + 2);
		el.innerHTML = data + 2;
	},
});

const observer2 = new Observer();

observer2.subscribe({
	id: 'addThree',
	action: (id, data) => {
		console.log('This is add three');
		const el = document.getElementById(id);

		el.innerHTML = data + 3;
	},
});

//observer2.publish('addTwo', 0);
//observer1.publish('addThree', 0);

document.getElementById('enterNumber').addEventListener('change', (event) => {
	let val = parseInt(event.target.value);
	console.log('Value', val);

	if (state.two) observer1.publish('addTwo', val);
	if (state.three) observer2.publish('addThree', val);
});

document.getElementById('showThree').addEventListener('change', (event) => {
	if (event.target.value === 'on') state.three = true;
});

document.getElementById('showTwo').addEventListener('change', (event) => {
	if (event.target.value === 'on') state.two = true;
});
