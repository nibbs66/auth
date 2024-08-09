import { adjectives as adjectivesPool, distanceMessages, finishMessages, leetChars, nouns } from "./constants";

export function generateUsername(length: number, leetChance: number) {
	const maxAttempts = 20
	let username = ''

	const noun = toWord(getRandomItem(nouns))
	let adjectives = [toWord(getRandomItem(adjectivesPool))]
	let totalLength = adjectives[0].length + noun.length
	let attempts = 0

	while (totalLength < length && attempts < maxAttempts) {
		const additionalAdjective = toWord(getRandomUniqueItem(adjectivesPool, adjectives))
		adjectives.push(additionalAdjective)
		totalLength = adjectives.join(' ').length + noun.length
		attempts++
	}

	username = adjectives.join(' ') + ' ' + noun

	if (username.length < length) {
		attempts = 0
		while (username.length < length && attempts < maxAttempts) {
			const additionalAdjective = toWord(getRandomUniqueItem(adjectivesPool, adjectives))
			adjectives.unshift(additionalAdjective)
			username = adjectives.join(' ') + ' ' + noun
			attempts++
		}
	}

	username = leetSpeak(username, leetChance)

	return username
}

function toWord(word: string) {
	return word.slice(0, 1).toUpperCase() + word.slice(1)
}

function getRandomUniqueItem(array: Array<any>, exclude: Array<any>) {
	let rnd = getRandomItem(array)
	while (exclude.includes(rnd)) {
		rnd = getRandomItem(array)
	}
	return rnd
}

export function getRandomItem(array: Array<any>) {
	return array[getRandomNumber(0, array.length - 1)]
}

export function getRandomNumber(min: number = 0, max: number = 1) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function leetSpeak(string: string, leetChance: number) {
	return string
		.split('')
		.map((char) => {
			const leetChar = leetChars.find((pair) => pair.char === char.toLowerCase())
			if (leetChar && getRandomNumber(0, 100) < leetChance) {
				return leetChar.num.toString()
			} else {
				return char
			}
		})
		.join('')
}

export function getRandomFinishMessage(routeName: string) {
	return getRandomItem(finishMessages).replace('<ROUTE>', routeName)
}

export function getRandomEncouragement() {
	return getRandomItem(distanceMessages)
}

