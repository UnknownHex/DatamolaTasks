const lst = new List('OUR HEAD');

console.log(`Create new list:`);
lst.print();


console.log('\nTry to remove only one element.');
console.log(`And we get: ${lst.removeNode()};\n\n`);


console.log('Add some data in list:');
lst.addNode('1');
lst.print();
lst.addNode('2');
lst.print();
lst.addNode('3');
lst.print();
lst.addNode('4');
lst.print();
lst.addNode({ msg: 'IT\'s A TAIL in object! =)', toString: function() { return this.msg }});
lst.print();
console.log(`Insert before index 1:`);
lst.addNode('Suddenly!', 1);
lst.print();
console.log(`Insert before index 0:`);
lst.addNode('SECOND HEAD!', 0);
lst.print();


console.log(`\nNow let\'s try to remove a 'OUR HEAD' with index 0:`);
console.log(`And we have: ${lst.removeNode(0)};`);
lst.print();


console.log('\nTry insert into wrong index:');
console.log(`And now get: ${lst.addNode('WRONG!', 10000)};\n\n`);
lst.print();


console.log(`\nTry to remove tail obj:`);
console.log(`Has a: ${lst.removeNode()};`);
lst.print();
lst.addNode('NEW TAIL!', 5);
console.log(`'NEW TAIL!' was added!`);
lst.print();

console.log(`\nTry to remove unexist index:`);
console.log(`And it is: ${lst.removeNode(10000)};`);
lst.print();
