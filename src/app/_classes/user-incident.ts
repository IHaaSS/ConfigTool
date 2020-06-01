import {Impact} from './incident'

export class UserIncident {
    _id:{$oid:Number};
    myId: number;
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
      impacts: {
        impact: string[];
        description: string;
        id: number;
      }[]
      time: Date;
      email: string;
      description: string;
      technicalData: string;
      title: string;
      staged: boolean
    
      idCount: number = 0;
}
