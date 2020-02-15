#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int main() {

    printf("WASM Ready - Testing with Emscripten HTML\n");

    return 1;
}

// > emcc lib/demo.c -s OPTION=value
// > emcc lib/demo.c -s WASM=1 -o public/demo.js

// [11]
// > emcc lib/demo.c -s WASM=1 -o public/demo.html
// > npm start
// Navigate to localhost:2222/demo.html

// [14]
int getNum() {
    return 22;
}

// > emcc lib/demo.c -s WASM=1 -s EXPORTED_FUNCTIONS="['_getNum', '_main']" -o public/demo.js

// [15]
int getDoubleNum(int n) {
    return n * 2;
}

// [17]
char * greet() {
    return "Hello";
}

// [18]
char * greet2( char * name ) {
    char * greeting = "Hello ";
    
    // strcat mutates first arg
    strcat(greeting, name);

    return greeting;
}
// > emcc lib/demo.c -s WASM=1 -s EXPORTED_FUNCTIONS="['_getNum', '_main', '_getDoubleNum', '_greet', '_greet2']" -o public/demo.js
// > npm start

// -And run in browser:
// > let x = ccall('greet2', 'string', ['string'], ['josh']);
// > console.log(x);
// < "Hello josh"


char * g( char * x ) {
    return x;
}
// > emcc lib/demo.c -s WASM=1 -s EXPORTED_FUNCTIONS="['_getNum', '_main', '_getDoubleNum', '_greet', '_greet2', '_g' ]" -o public/demo.js
// > npm start

// -And run in browser:
// > let x = ccall('g', 'string', ['string'], ['josh']);
// > console.log(x);
// < "Hello josh"


double * h( double * x ) {
    return x;
}
// > emcc lib/demo.c -s WASM=1 -s EXPORTED_FUNCTIONS="['_getNum', '_main', '_getDoubleNum', '_greet', '_greet2', '_h' ]" -o public/demo.js
// > npm start

// -And run in browser:
// > let x = ccall('h', 'number', ['number'], [2.0]);
// > console.log(x);
// < "Hello josh"


double * f( double * x ) {

    *x += 2.0;

    printf("Inside f()\n");
    printf("josh\n");

    *x = 100.0;
    printf("*x=%f\n",*x);

    return x;
}
// > emcc lib/demo.c -s WASM=1 -s EXPORTED_FUNCTIONS="['_main', '_f' ]" -o public/demo.js
// > npm start

// -And run in browser:
// > let x = ccall('f', 'number', ['number'], [2.0]);
// > console.log(x);
// < "Hello josh"




// EMSCRIPTEN_KEEPALIVE
float addNums (float *buffer, int bufSize) {
    float total = 0;

    for (int i=0; i<bufSize; i++) {
        total+= buffer[i];
    }

    return total;
}

// > emcc lib/demo.c -s WASM=1 -s EXPORTED_FUNCTIONS="['_main', '_f', '_addNums' ]" -o public/demo.js