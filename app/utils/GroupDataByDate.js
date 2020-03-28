import moment from 'moment';

export default function GroupNormalizedDataByDate(data={}) {
	let groupedItemsObj = data.allIds.reduce((groups, id) => {
		const currentItem = data.byId[id];
		const date = moment.unix(currentItem.created_at).format('YYYY-MM-DD');
		if(!groups[date]){
			groups[date] = [];
		}
		groups[date].push(currentItem);
		return groups;
	}, {});
	let groupedItemsArr = Object.keys(groupedItemsObj).map(date => {
		return {
			date,
			collection: groupedItemsObj[date].sort((a, b) => moment(a.created_at).isAfter(b.created_at) ? -1 : 1 )
		}
	});
	return groupedItemsArr.sort((a,b) => moment(a.date).isBefore(b.date) ? 1 : -1);
}
