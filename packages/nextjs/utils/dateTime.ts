export const unixTimestampMillisecondsToIsoString = (
	timestamp: bigint
): string => {
	const unixTimestampMilliseconds = Number(timestamp);

	if (isNaN(unixTimestampMilliseconds)) {
		throw new Error("Invalid timestamp provided.");
	}

	const date = new Date(unixTimestampMilliseconds);

	return date.toISOString().substring(0, 10);
};

export const unixTimestampMillisecondsToDate = (timestamp: bigint): Date => {
	const unixTimestampMilliseconds = Number(timestamp);

	if (isNaN(unixTimestampMilliseconds)) {
		throw new Error("Invalid timestamp provided.");
	}

	return new Date(unixTimestampMilliseconds);
};
