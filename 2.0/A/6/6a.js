/* A. Горячо-Холодно */

var readline = require('readline');
process.stdin.setEncoding('utf-8');

var rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const LIMIT = 10 ** 9;

let l = 0;
let r = LIMIT;

rl.write('1 1\n');
let curans = '1 1';
let x = -1;
let y = 0;
rl.output.clearLine();
rl.output.cursorTo(0);

let x_finded = false;
let y_finded = false;
rl.prompt(); 

rl.on('line', function (aText) {
   if (curans!==aText){
      if (x_finded === false){
         if (aText === 1){
            r = x;
         }else{
            l = x + 1;
         }
         if (l===r){
            x_finded = x;
            l = 0;
            r = LIMIT;
            y = -1;
         }else{
            x = Math.floor((l + r) / 2);    
         }
         
      }else if (y_finded === false){
         if (aText === 1){
            r = y;
         }else{
            l = y + 1;
         }
         if (l===r){
            y_finded = y;
         }else{
            y = Math.floor((l + r) / 2);    
         }      
      }else{
         curans = `A ${x_finded} ${y_finded}`;
         rl.write(curans);
         rl.write('\n');
         rl.output.clearLine();
         rl.output.cursorTo(0);
      }
        
      if (x_finded === false || y_finded === false){
         curans = `${x} ${y}`;
         rl.write(curans);
         rl.write('\n');
         rl.output.clearLine();
         rl.output.cursorTo(0);
         rl.prompt(); 
      }
   }
   
});
