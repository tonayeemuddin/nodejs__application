const { Result } = require("express-validator");

// cart
module.exports= {
    add: (item, oldCart, results)=>{
      
        if(oldCart.length==0){
            var a={storedId: item.mid, storedName:item.mname, storedQty: 1, storedPrice: item.mprice };
            oldCart.push(a);
            results(oldCart);
            return;
        }
        if(oldCart.length!=0){
            var exists=false;
            for (var i = 0; i < oldCart.length; i++) {
                if(oldCart[i].storedId == item.mid){
                    exists=true;
                }                
            }

            if(!exists){
                var a={storedId: item.mid, storedName:item.mname, storedQty: 1, storedPrice: item.mprice };
                oldCart.push(a);
                results(oldCart);
                return;
            }else{
                for(var i=0; i<oldCart.length; i++){ 
                    if(oldCart[i].storedId==item.mid){
                        oldCart[i].storedQty++;
                        oldCart[i].storedPrice+=item.mprice;
                    }
                }
                results(oldCart);
                return;
            }

        }
        

    },
    reduceByOne:(item, oldCart, results)=>{
        for(var i=0; i<oldCart.length; i++){ 
            if(oldCart[i].storedId==item.mid){
                if(oldCart[i].storedQty != 0){
                    oldCart[i].storedQty--;
                    oldCart[i].storedPrice-=item.mprice;
                }
            }
        }
        results(oldCart);
        return;
    },
    addByOne:(item, oldCart, results)=>{
        for(var i=0; i<oldCart.length; i++){ 
            if(oldCart[i].storedId==item.mid){
                oldCart[i].storedQty++;
                oldCart[i].storedPrice+=item.mprice;
            }
        }
        results(oldCart);
        return;
    },
}


// cart