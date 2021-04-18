var a = [ 9, 10, 2, 1, 5, 4, 3, 6, 8, 7, 13 ];
// time complexity nlogn 
 function swap(a, i, j) {
     var tmp = a[i];
     a[i] = a[j];
     a[j] = tmp;
 }
 
 function max_heapify(a, i, length) {
     while (true) {
         var left = i*2 + 1;
         var right = i*2 + 2;
         var largest = i;
 
         if (left < length && a[left] > a[largest]) {
             largest = left;
         }
 
         if (right < length && a[right] > a[largest]) {
             largest = right;
         }
 
         if (i == largest) {
             break;
         }
 
         swap(a, i, largest);
         i = largest;
     }
 }
 
 function heapify(a) {
     for (var i = a.length; i >= 0; i--) {
         max_heapify(a, i, a.length);
     }
 }
 
 function heapsort(a) {
     heapify(a);
     for (var i = a.length - 1; i >= 0; i--) {
         swap(a, 0, i);
         max_heapify(a, 0, i);
     }
 }
 
 heapsort(a);
