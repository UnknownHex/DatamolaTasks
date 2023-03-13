const lst = new List('OUR HEAD');

lst.addNode('1');
lst.addNode('2');
lst.addNode('3');
lst.addNode('4');
lst.addNode({ msg: 'IT\'s A TAIL in object! =)'});

lst.print();

lst.addNode('Suddenly!', 1);

lst.print();

lst.addNode('NEW HEAD!', 0);

lst.print();

console.log('Try insert into wrong index:');
console.log(lst.addNode('WRONG!', 10000));

lst.print();
