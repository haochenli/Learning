``` js
describe('all the begaining', () => {
  describe('first blood', () => {
    console.log('initial')
    beforeEach(() => {
      console.log(`start of beforeEach`);
    });
    describe('test1', () => {
      console.log('test1 begain')
      it('should have an id of 1', () => {
        console.log('it1')
        expect(sum(1, 2)).toBe(3);
      });
    });
    describe('test2', () => {
      console.log('test2 begain')
      it('should have ids of 1 and 2', () => {
        console.log('it2')
        expect(sum(2, 2)).toBe(4);
      });
    });
  });
});
```

以上命令的执行顺序是
- initial
- test1 begain
- test2 begain
- start of beforeEach
- it1
- start of beforeEach
- it2


``` js
beforeEach(() => console.log(1));
describe('Foo Class', () => {
  beforeEach(() => console.log(2));
  describe('constructor', () => {
    const fooClassRef = Foo as any; // to pass typechecking
    beforeEach(() => {
      console.log(3);
      fooClassRef._count = 0;
    });
    describe('creating one Foo obj', () => {
      beforeEach(() => console.log('4A'));
      const foo = new Foo();
      console.log('originally constructed a foo here')
      it('should have an id of 1', () => {
        console.log('should have an id of 1');
        expect(foo.id).toBe(1);
      });
    });
    describe('creating two Foo objs', () => {
      beforeEach(() => console.log('4B'));
      const foo1 = new Foo();
      const foo2 = new Foo();
      console.log(`originally constructed 2 more foo's here`);
      it('should have ids of 1 and 2', () => {
        console.log('should have ids of 1 and 2');
        expect(foo1.id).toBe(1);
        expect(foo2.id).toBe(2);
      });
    });
  });
});

```

- originally constructed a foo here
- originally constructed 2 more foo's here
- 1 
- 2
- 3
- 4a
- should have an id of 1
- 1
- 2
- 3
- 4b
- should have ids of 1 and 2

- describe 首先被执行，然后才是setup和teardown中间夹着it
- 即使是嵌套的beforeeach也是需要在it之前执行完的

