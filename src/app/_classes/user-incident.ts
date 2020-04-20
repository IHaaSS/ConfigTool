import {Impact} from './incident'

export class UserIncident {
    _id:{$oid:Number};
      sources: {
        source: string[];
        description: string;
        id: number;
      }[];
      events: {
        event: string[];
        description: string;
        id: number;
        triggeredBy: number;
      }[];
      entities: {
        entity: string[];
        description: string;
        id: number;
      }[];
      impact: Impact;
      time: Date;
      email: string;
      description: string;
      technicalData: string;
      title: string;
    
      idCount: number = 0;
}
