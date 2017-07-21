const { Reproduction, Entity, Container, Thing } = require('./index.js');

const universe = new Reproduction("Ball World");

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



const examinerExpression = function({object}){
  return `The ${object.name(['the'])} is pretty neat`;
}



const locatorExpression = function({object, location}){
  if(location.entity){
    return `Oh, you mean that ${object.name(['that'])}?, that ${object.name(['that'])} is in ${location.name(['possessive'])} hands now.`
  }
  if(location.container){
    return `The ${object.name(['the']) } is in the ${location.name(['the'])  }`
  }
}

const locatorFabulousExpression = function({object, location}){

    return `The fabulous ${object.name(['the']) } is in the ${location.name(['the'])} again.`

}






  universe

  .create('user', alice)

  .create('ball', ball)
  .create('box', box)

  .insert('ball', 'box')
  .examine('ball', locatorFabulousExpression)

  .take('ball', 'box')

  .examine('ball', examinerExpression)
  .examine('ball', locatorExpression);
