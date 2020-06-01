export class Question {
    text: string;
    sources: {
      source: string[];
    }[];
    events: {
      event: string[];
    }[];
    entities: {
      entity: string[];
    }[];
    impacts: {
      impact: string[];
    }[];
  
    constructor(){
      this.addElement({source: []});
      this.addElement({event: []});
      this.addElement({entity: []});
      this.addElement({impact:[]});
    }
  
    addElement(element: {source: []}): void;
  
    addElement(element: {event: []}): void;
  
    addElement(element: {entity: []}): void;

    addElement(element: {impact: []}): void; 
  
    addElement(element: {}): void{
      let key: string;
      if(element['source'])
        key = 'sources';
      else if(element['event'])
        key = 'events';
      else if(element['entity'])
        key = 'entities';
      else if(element['impact'])
        key = 'impacts'
      if(!this[key])
        this[key] = [element]
      else
        this[key].push(element)
    }
  
    isOneEventSet(): boolean{
      for(let event of this.events){
        if(event.event.length > 0)
          return true;
      }
      return false;
    }
  
    isOneSourceSet(): boolean{
      for(let source of this.sources){
        if(source.source.length > 0)
          return true;
      }
      return false;
    }
  
    isOneEntitySet(): boolean{
      for(let entity of this.entities){
        if(entity.entity.length > 0)
          return true;
      }
      return false;
    }

    isOneImpactSet(): boolean{
      for(let impact of this.impacts){
        if(impact.impact.length > 0)
          return true;
      }
      return false;
    }

}