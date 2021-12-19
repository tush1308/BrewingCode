const cart=[];

const handleCart = (state = cart, action) =>{
    const product = action.payload;
    switch(action.type){
        case "ADDITEM":
            //Check if the Product Already Exits
            const exist = state.find((x)=>x.item_id === product.item_id);
            if(exist){
                //Increase the Quantity
                return state.map((x)=>
                    x.item_id === product.item_id?{...x, qty:x.qty +1}:x
                );
            }else{
                const product = action.payload;
                return[
                    ...state,
                    {
                        ...product,
                        qty:1,
                    }
                ]
            }
           // break;

            case "DELETEITEM":{
                const exist1 = state.find((x)=> x.item_id === product.item_id);
                if(exist1.qty === 1)
                {
                    return state.filter((x)=>x.item_id !== exist1.id);
                }else{
                    return state.map((x)=>x.item_id === product.item_id ? {...x, qty: x.qty-1}:x
                    );
                }
               // break;
            }

            default:
                return state;
                break;
    }
}