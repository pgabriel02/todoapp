import {Task} from "./types"

export function Pagination(data: Task[], current: number, max: number) {
	const last = current * max
	const first = last - max
	const newdata = data.slice(first, last)
	return newdata
}
