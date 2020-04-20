export class Source {
    _id:{$oid:Number};
    name: string
    elements: {
        name: string;
        id: number;
        elements: {
            name: string 
            id: number
        }[]
      }[];
}
