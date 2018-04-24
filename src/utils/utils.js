import sortBy from 'sort-by'

export function sort (posts, order) {
    return posts.sort(sortBy(order))
}

export function timeToString (time = Date.now()) {
    const date = new Date(time)
    const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    return todayUTC.toISOString().split('T')[0]
}