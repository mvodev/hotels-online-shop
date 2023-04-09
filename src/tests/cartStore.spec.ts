import reducer, { addToCart, clearCart, removeFromCart } from '../redux/cartSlice';

describe('test cart store',() => {

  test('should return the initial state',()=>{
    expect(reducer(undefined,{type:undefined})).toEqual({"cart": []});
  })

  test('add barcode',()=>{
    const previousState:{
      cart:string[]
    } = {
      cart:[]
    };
    expect(reducer(previousState,addToCart({barcode:'123'}))).toEqual({"cart": ['123']});
  })

  test('add second barcode',()=>{
    const previousState:{
      cart:string[]
    } = {
      cart:['123']
    };
    expect(reducer(previousState,addToCart({barcode:'345'}))).toEqual({"cart": ['123','345']});
  })

  test('remove barcode',()=>{
    const previousState:{
      cart:string[]
    } = {
      cart:['123','345']
    };

    expect(reducer(previousState,removeFromCart({barcode:'123'}))).toEqual({"cart": ['345']});
  })

  test('clear all',()=>{
    const previousState:{
      cart:string[]
    } = {
      cart:['123','345']
    };
    
    expect(reducer(previousState,clearCart())).toEqual({"cart": []});
  })
});

