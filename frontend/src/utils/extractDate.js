export function extractDate(inputDate) {
	const date = new Date(inputDate);

	const formattedDate = date.toLocaleDateString("en-US", {
		day: "2-digit",
		month: "long",
		year: "numeric",
	});

	return formattedDate;
}
