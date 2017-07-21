const oneof = require('oneof');
const intersection = require('lodash/intersection');


class Reproduction {

  constructor(name){
    this.universe = [
      {id:'world', container:true},
      {id:'lobby', pid:'universe', container:true},
    ];
    this.id('world').name = name;
  }

  id(id){
    const matches = this.universe.filter(o=>o.id===id);

    if(matches.length > 0){
      //console.log('Found %d matches for %s.', matches.length, id)
      const match = matches[matches.length-1];
      return match;
    }else{
      //console.log('Item with id %s did not exist and was created.', id);
      this.create(id);
      return this.id(id);
    }

  }

  create(id, object){

    let pure = {};

    if(object){
      pure = Object.assign( object, {id} );
    }else{
      pure = {id};
    }
    this.universe.push( pure );

    return this;

  }

  merge(id, object){
    let existing = this.id(id);
    if(existing){
      this.universe[this.universe.indexOf(existing)] = Object.assign( existing , object  );
    }
    //console.log(this.universe);

    return this;
  }

  insert(source, target){
    this.id(target); // touch target to create it
    this.id(source).pid = target;
    return this;
  }

  take(source, target){
    this.id(source).pid = 'user';
    return this;
  }

  destroy(source){
    this.universe[this.universe.indexOf(existing)] = undefined;
    return this;
  }


  // Textual

  examine(source, template){
    const object = this.id(source);
    console.log( template(object) );
    return this;
  }

  whereis(source, template){
    const object = this.id(source);
    const location = this.id( object.pid );
    console.log( template(object, location, ) );
    return this;
  }


}





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









module.exports = { Reproduction, Entity, Container, Thing };
