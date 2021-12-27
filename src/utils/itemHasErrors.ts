export default function itemHasError(arr: Array<string>, object: object | undefined) {
	if (!object) 
		return false;
		
	const keys = Object.keys(object);
	return arr.some(arrKey => keys.includes(arrKey));
}