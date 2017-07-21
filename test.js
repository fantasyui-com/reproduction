const Reproduction = require('./index.js');

const universe = new Reproduction("Ball World");

const oneof = require('oneof');
const intersection = require('lodash/intersection');

var baseMixin = Base => class extends Base {
  boo() { }
};

var nameMixin = Base => class extends Base {
  names(list){
    this.nameList = list;
  }
  name(tags){
    let best = oneof(this.nameList[0].names);
    if(!tags) return best;
    this.nameList.forEach(item=>{
      if(intersection(tags,item.tags).length == tags.length){
        best = oneof(item.names);
      }
    });
    return best;
  }
};



class Energy {}
class Entity extends nameMixin(baseMixin(Energy)) {
  constructor(){
    super();
    this.entity = true
  }
}

class Container extends nameMixin(baseMixin(Energy)) {
  constructor(){
    super();
    this.container = true
  }
}

class Thing extends nameMixin(baseMixin(Energy)) {
  constructor(){
    super();
    this.thing = true
  }
}


const alice = new Entity();
const ball = new Thing();
const box = new Container();


alice.names([
  {names:["Alice"], tags:['name']},
  {names:["Alice's"], tags:['possessive']}
]);

ball.names([
  {names:["ball"], tags:['the','that','a']},
  {names:["ball's"], tags:['possessive']}
]);

box.names([
  {names:["box"], tags:['the', 'that', 'a', 'in']},
  {names:["box's"], tags:['possessive']}
]);



const examiner = function(object){
  return `The ${object.name(['the'])} is pretty neat`;
}


const locator = function(object, location){
  if(location.entity){
    return `Oh, you mean that ${object.name(['that'])}?, that ${object.name(['that'])} is in ${location.name(['possessive'])} hands now.`
  }
  if(location.container){
    return `The ${object.name(['the']) } is in the ${location.name(['the'])  }`
  }
}






  universe

  .create('user', alice)

  .create('ball', ball)
  .create('box', box)

  .insert('ball', 'box')
  .whereis('ball', locator)

  .take('ball', 'box')

  .examine('ball', examiner)
  .whereis('ball', locator);
