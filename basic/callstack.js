function multiply(a, b) {
	return a * b;
}

function square(n) {
	return multiply(n, n);
}

function printSquare(n) {
	let result = square(n);
	console.log(result);
	// return;
	// 所有函式即使沒有寫 return，但事實上都會隱藏一個retun;
}

printSquare(4);

// printSquare -> function printSquare(n) -> let result = square(n) -> function square(n) -> return multiply(n, n) -> function multiply(a, b) -> return a * b -> return multiply(n, n) (*看誰呼叫這個function*)-> let result = square(n) -> console.log(result)

/*
stack
- Data Structure 的一種
- Last In First Out (LIFO) 後進先出 或 First In Last Out (FILO) 先進後出
- 把東西放進 stack 的尾巴=⇒ push
- 把東西從 stack 的尾巴拿出來 =⇒ pop
Queue
- 佇列、排隊
- First In First Out (FIFO) 先進先出
- 放入項目到 queue 前端 =⇒ unshift
- 移除 queue 最前端項目 =⇒ shift
*/