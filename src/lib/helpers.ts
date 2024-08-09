export const numbersToWords = [
	'zero',
	'one',
	'two',
	'three',
	'four',
	'five',
	'six',
	'seven',
	'eight',
	'nine',
	'ten',
	'eleven',
	'twelve',
	'thirteen',
	'fourteen',
	'fifteen',
	'sixteen',
	'seventeen',
	'eighteen',
	'nineteen',
	'twenty'
]

export const colours = [
	'#FF7043',
	'#83BA1F',
	'#1ABC9C',
	'#2ECC71',
	'#3498DB',
	'#9B59B6',
	'#F2CD3C',
	'#EE5646'
]


export const DEFAULT_COLOUR = '#d891ff'

export function getWordFromNumber(number: number) {
	return numbersToWords[number] || number
}

export function getColourHex(number = 0) {
	return colours[number % colours.length]
}

export function strToNumber(str: string) {
	return str.toString().split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
}

export function substring1024(str: string) {
	if (str.length > 1020) {
		str = `${str.substring(0, 1020)}...`
	}
	return str
}

export function LightenColour(color: string, percent: number) {
	var num = parseInt(color.replace('#', ''), 16)
	var amt = Math.round(2.55 * percent)
	var R = (num >> 16) + amt
	var B = (num >> 8 & 0x00FF) + amt
	var G = (num & 0x0000FF) + amt
	return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (B < 255 ? B < 1 ? 0 : B : 255) * 0x100 + (G < 255 ? G < 1 ? 0 : G : 255)).toString(16).slice(1)
};

export function SetAlpha(color: string, alphaHex: string) {
	let noHex = color.replace('#', '')
	if (noHex.length === 3) {
		noHex = noHex.substring(0, 1) + noHex.substring(0, 1) + noHex.substring(1, 2) + noHex.substring(1, 2) + noHex.substring(2, 3) + noHex.substring(2, 3)
	} else if (noHex.length === 4) {
		noHex = noHex.substring(0, 1) + noHex.substring(0, 1) + noHex.substring(1, 2) + noHex.substring(1, 2) + noHex.substring(2, 3) + noHex.substring(2, 3) + noHex.substring(3, 4) + noHex.substring(3, 4)
	}
	if (noHex.length === 8) {
		return '#' + noHex.substring(0, 6) + alphaHex
	} else {
		return '#' + noHex + alphaHex
	}
}

export function discordColourToHex(colour: number | undefined) {
	if (!colour) {
		return DEFAULT_COLOUR
	}
	if (colour > 65535) {
		return `#${colour.toString(16)}`
	}
	if (colour > 255) {
		return `#00${colour.toString(16)}`
	}
	return `#0000${colour.toString(16)}`
}

export function formatTime(millis: number) {
	const second = 1000
	const minute = second * 60
	const hour = minute * 60
	const day = hour * 24
	const week = day * 7

	let stringAgo = 'unknowns'
	let number = 0

	if (millis > week) {
		number = Math.round(millis / week)
		stringAgo = 'week'
	} else if (millis > day) {
		number = Math.round(millis / day)
		stringAgo = 'day'
	} else if (millis > hour) {
		number = Math.round(millis / hour)
		stringAgo = 'hour'
	} else if (millis > minute) {
		number = Math.round(millis / minute)
		stringAgo = 'minute'
	} else {
		number = Math.round(millis / second)
		stringAgo = 'second'
	}
	return `${number} ${conditionalPluralize(stringAgo, undefined, number)}`
}

export function conditionalPluralize(singular: string, plural: string | undefined, number: number) {
	if (!plural) {
		plural = singular + 's'
	}
	if (number === 1) {
		return singular
	}
	return plural
}
